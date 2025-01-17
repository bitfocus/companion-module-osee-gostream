import { TCPHelper, InstanceStatus } from '@companion-module/base'
import { ReqType } from './enums'
import crc16modbus from 'crc/crc16modbus'

import { GoStreamInstance } from './index'
import { updateVariables } from './variables'
import type { IModelSpec } from './models/types'

import { MixEffectState } from './functions/mixEffect'
import { PlaybackState } from './functions/playback'
import { RecordState } from './functions/record'
import { StillGeneratorState } from './functions/stillGenerator'
import { StreamingState } from './functions/streaming'
import { SuperSourceState } from './functions/superSource'
import { AudioMixerState } from './functions/audioMixer'
import { DownstreamKeyerState } from './functions/downstreamKeyer'
import { SettingsState } from './functions/settings'
import { MacroState } from './functions/macro'
import { UpstreamKeyerState } from './functions/upstreamKeyer'

export const HEAD1 = 0xeb
export const HEAD2 = 0xa6
export const ProType = 0x00
let tcp: TCPHelper | null = null
let partialPacketBuffer: Buffer | null = null

const PACKET_HEADER_SIZE = 5
const PACKET_HEAD = new Uint8Array([HEAD1, HEAD2])
const PORT_NUMBER = 19010

export type GoStreamCmd = {
	id: string
	type: ReqType
	value?: string | number | any[]
}

/*
 * A data packet, Little Endian encoded
 *
 * U16 HEADER = 0xA6 0xEB
 * U8 protoid
 * U16 length
 * GoStreamData[] data
 * U16 crc
 *
 * A TCP datagram might contain many data packets
 * A Packet might be cut based on TCP datagram lenght,
 * the next packet will then start with rest of data
 * without the header
 * E.g.
 * Datagram 1 => | P1: <HEADER> data <crc> | P2: P1: <HEADER> data <crc> | P3a: P1: <HEADER> data
 * Datagram 2 => P3b: data <crc> | P4: <HEADER> data <crc>
 *
 * CRC is a normal crc16 modbus sum, the whole header is part of the crc sum
 */

export function connect(instance: GoStreamInstance): void {
	if (tcp !== null) {
		tcp.destroy()
	}
	instance.updateStatus(InstanceStatus.Connecting)
	const host = instance.config.bonjourDevices ? instance.config.bonjourDevices.split(':')[0] : instance.config.host
	tcp = new TCPHelper(host, PORT_NUMBER)
	tcp.on('status_change', (state, message) => {
		instance.updateStatus(state, message)
		instance.log('debug', 'Socket reconnected')
	})
	tcp.on('connect', () => {
		instance.updateStatus(InstanceStatus.Ok)
		instance.log('debug', 'Socket connected')
		ReqStateData(instance.model)
			.catch((err) => {
				instance.log('error', 'Error while syncing data ' + err)
			})
			.then(
				() => {
					instance.log('debug', 'State data synced OK!')
				},
				() => {
					instance.log('debug', 'No handler defined to reconnect')
				},
			)
			.catch(() => {
				// Do nothing
			})
	})
	tcp.on('error', () => {
		instance.updateStatus(InstanceStatus.ConnectionFailure, 'Connection error')
		instance.log('debug', 'Socket connect error')
	})
	tcp.on('end', () => {
		instance.updateStatus(InstanceStatus.Disconnected, 'Disconnecting')
		instance.log('debug', 'Socket Disconnecting')
		tcp?.destroy()
	})
	tcp.on('data', (msg_data) => {
		const commands = handleGoStreamPacket(msg_data)
		handleCommands(instance, commands)
	})
}

export function handleGoStreamPacket(msg_data: Buffer): GoStreamCmd[] {
	const commands: GoStreamCmd[] = []

	let index = msg_data.indexOf(PACKET_HEAD)
	// Take care of data before start of packet, i.e. if index > 0
	// OR packets that dont have a head i.e. index < 0
	// The data needs to be merged with hopefully saved data
	if (index !== 0) {
		if (partialPacketBuffer != null) {
			// Either we have found a head sequence or this is plain data
			const offset = index > 0 ? index : msg_data.length
			// Merge with saved packet data
			const packet_data = Buffer.alloc(partialPacketBuffer.length + offset, partialPacketBuffer)
			const remaining_data = msg_data.subarray(0, offset)
			remaining_data.copy(packet_data, partialPacketBuffer.length)

			if (index > 0) {
				// We did found a head somewhere later in data
				// process packet to that index then resume with
				// rest of package in while loop below
				commands.push(unpackData(packet_data))
				partialPacketBuffer = null
			} else if (index < 0) {
				// All data in this msg_data belongs to same package
				// as we did not find any head sequence
				const expected_length = packet_data.readUInt16LE(3)
				if (expected_length + 5 === packet_data.length) {
					// This is a full packet received, process it
					commands.push(unpackData(packet_data))
					partialPacketBuffer = null
				} else {
					// Save packet_data as it is not complete yet
					partialPacketBuffer = Buffer.from(packet_data)
				}
				return commands
			}
		} else {
			console.error('packet data out of order, dropping packet!')
			return []
		}
	}

	while (index >= 0) {
		const packet_size = msg_data.readUInt16LE(index + 3)
		const packet_data = msg_data.subarray(index, index + PACKET_HEADER_SIZE + packet_size)
		if (index + PACKET_HEADER_SIZE + packet_size > msg_data.length) {
			// Packet is not complete, save this in partial packet buffer
			partialPacketBuffer = Buffer.alloc(msg_data.length - index, msg_data.subarray(index))
			break
		}
		commands.push(unpackData(packet_data))
		index = msg_data.indexOf(PACKET_HEAD, index + PACKET_HEADER_SIZE + packet_size)
	}

	return commands
}

function unpackData(msg_data: Buffer): GoStreamCmd {
	const jsonContent = UpackDatas(msg_data)
	const jsonStr = jsonContent.toString('utf8')
	const json = JSON.parse(jsonStr)
	return json
}

function handleCommands(instance: GoStreamInstance, data: GoStreamCmd[]): void {
	let needReinit = false
	data.forEach((json) => {
		if (MixEffectState.update(instance.states.MixEffect, json)) needReinit = true
		if (PlaybackState.update(instance.states.Playback, json)) needReinit = true
		if (RecordState.update(instance.states.Record, json)) needReinit = true
		if (StillGeneratorState.update(instance.states.StillGenerator, json)) needReinit = true
		if (StreamingState.update(instance.states.Streaming, json)) needReinit = true
		if (SuperSourceState.update(instance.states.SuperSource, json)) needReinit = true
		if (AudioMixerState.update(instance.states.AudioMixer, json)) needReinit = true
		if (DownstreamKeyerState.update(instance.states.DownstreamKeyer, json)) needReinit = true
		if (SettingsState.update(instance.states.Settings, json)) needReinit = true
		if (MacroState.update(instance.states.Macro, json)) needReinit = true
		if (UpstreamKeyerState.update(instance.states.UpstreamKeyer, json)) needReinit = true
	})
	if (needReinit) {
		instance.init_actions()
		instance.init_feedbacks()
	}
	instance.checkFeedbacks()
	updateVariables(instance)
}

export async function ReqStateData(model?: IModelSpec): Promise<boolean> {
	if (!model) return false
	await MixEffectState.sync(model)
	await PlaybackState.sync(model)
	await RecordState.sync(model)
	await StillGeneratorState.sync(model)
	await StreamingState.sync(model)
	await AudioMixerState.sync(model)
	await DownstreamKeyerState.sync(model)
	await MacroState.sync(model)
	await SuperSourceState.sync(model)
	await UpstreamKeyerState.sync(model)
	await SettingsState.sync(model)
	return false
}

export function disconnectSocket(): void {
	if (tcp !== null) {
		tcp.destroy()
	}
}

export async function sendCommands(commands: GoStreamCmd[]): Promise<boolean> {
	if (tcp !== null) {
		const packedCmds: Buffer[] = []
		commands.forEach((cmd) => {
			const json = JSON.stringify(cmd)
			const buf = Buffer.from(json, 'utf-8')
			packedCmds.push(PackData(buf))
		})
		return tcp.send(Buffer.concat(packedCmds))
	}
	return false
}

export async function sendCommand(id: string, type: ReqType, value?: string | number | any[]): Promise<boolean> {
	if (tcp !== null) {
		const obj = { id: id, type: type, value: value }
		const json = JSON.stringify(obj)
		const bufs = Buffer.from(json, 'utf-8')
		const send_data = PackData(bufs)
		return tcp.send(send_data)
	}
	return false
}

function PackData(data: Buffer): Buffer {
	const packetLen = data.length + 7
	const packet = Buffer.alloc(packetLen)

	packet[0] = HEAD1
	packet[1] = HEAD2
	packet[2] = ProType
	packet.writeUInt16LE(packetLen - 5, 3)

	if (data != undefined) data.copy(packet, 5, 0, data.length)
	packet.writeUInt16LE(crc16modbus(packet.subarray(0, packetLen - 2)), packet.length - 2)
	return packet
}
function UpackDatas(resp: Buffer): Buffer {
	if (resp.length == 0) {
		throw new Error('recv null')
	}
	if (resp[0] != exports.HEAD1 || resp[1] != exports.HEAD2) {
		throw new Error('recv head error')
	}
	const resp_len = resp.readInt16LE(3)
	if (resp_len != resp.length - 5) {
		console.log(
			'Recv Error:' +
				resp
					.toString('hex')
					.match(/.{1,2}/g)
					?.join(' '),
		)
		throw new Error('recv data length error')
	}
	if (!IsCrcOK(resp)) {
		throw new Error('recv data crc error')
	}
	return resp.subarray(5, resp.length - 2)
}

function IsCrcOK(datas: Buffer): boolean {
	const length = datas.length - 2
	const recvCrc = datas.readUInt16LE(length)
	const calcCrc = crc16modbus(datas.subarray(0, length))
	return recvCrc === calcCrc
}
