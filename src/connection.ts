import { TCPHelper, InstanceStatus } from '@companion-module/base'
import { ReqType } from './enums'
import crc16modbus from 'crc/crc16modbus'

import { GoStreamInstance } from './index'
import { updateVariables } from './variables'

import { MixEffectActions, MixEffectState } from './functions/mixEffect'
import { LiveActions, LiveState } from './functions/live'
import { PlaybackActions, PlaybackState } from './functions/playback'
import { RecordActions, RecordState } from './functions/record'
import { StillGeneratorActions, StillGeneratorState } from './functions/stillGenerator'
import { StreamingActions, StreamingState } from './functions/streaming'
import { SuperSourceActions, SuperSourceState } from './functions/superSource'
import { AudioMixerActions, AudioMixerState } from './functions/audioMixer'
import { DownstreamKeyerActions, DownstreamKeyerState } from './functions/downstreamKeyer'
import { SettingsActions } from './functions/settings'
import { MacroActions, MacroState } from './functions/macro'

import { UpstreamKeyerActions, UpstreamKeyerState } from './functions/upstreamKeyer'

export const HEAD1 = 0xeb
export const HEAD2 = 0xa6
export const ProType = 0x00
let tcp: TCPHelper | null = null
let partialPacketBuffer: Buffer | null = null

const PACKET_HEADER_SIZE = 5
const PACKET_HEAD = new Uint8Array([HEAD1, HEAD2])
const PORT_NUMBER = 19010

export type GoStreamData = {
	id: string
	type: string
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
		void ReqStateData()
	})
	tcp.on('error', () => {
		instance.updateStatus(InstanceStatus.ConnectionFailure, 'Connection error')
		instance.log('debug', 'Socket connect error')
	})
	tcp.on('end', () => {
		instance.updateStatus(InstanceStatus.Disconnected, 'Disconnecting')
		instance.log('debug', 'Socket Disconnecting')
	})
	tcp.on('data', (msg_data) => {
		let index = msg_data.indexOf(PACKET_HEAD)
		// Take care of data before start of packet, i.e. if index > 0
		// OR packets that dont have a head i.e. index < 0
		// The data needs to be merged with hopefully saved data
		if (index !== 0) {
			if (partialPacketBuffer != null) {
				const packet_data = Buffer.alloc(partialPacketBuffer.length + index, partialPacketBuffer)
				const remaining_data = msg_data.subarray(0, index)
				remaining_data.copy(packet_data, partialPacketBuffer.length)

				if (index > 0) {
					// Process packet_data and continue
					ParaData(instance, packet_data)
					partialPacketBuffer = null
				} else if (index < 0) {
					// Save packet_data as it is not complete yet
					partialPacketBuffer = Buffer.from(packet_data)
					return // No more data
				}
			} else {
				console.error('packet data out of order, dropping packet!')
				return
			}
		}

		while (index === 0) {
			const packet_size = msg_data.readUInt16LE(index + 3)
			const packet_data = msg_data.subarray(index, index + PACKET_HEADER_SIZE + packet_size)
			ParaData(instance, packet_data)
			index = msg_data.indexOf(PACKET_HEAD, index + PACKET_HEADER_SIZE + packet_size)
			if (index + PACKET_HEADER_SIZE + packet_size > msg_data.length) {
				partialPacketBuffer = Buffer.alloc(msg_data.length - index, msg_data.subarray(index))
				break
			}
		}
	})
}

export function ParaData(instance: GoStreamInstance, msg_data: Buffer): void {
	const jsonContent = UpackDatas(msg_data)
	const jsonStr = jsonContent.toString('utf8')
	const json = JSON.parse(jsonStr)

	MixEffectActions.handleData(instance, json)
	LiveActions.handleData(instance, json)
	PlaybackActions.handleData(instance, json)
	RecordActions.handleData(instance, json)
	StillGeneratorActions.handleData(instance, json)
	StreamingActions.handleData(instance, json)
	SuperSourceActions.handleData(instance, json)
	AudioMixerActions.handleData(instance, json)
	DownstreamKeyerActions.handleData(instance, json)
	SettingsActions.handleData(instance, json)
	MacroActions.handleData(instance, json)
	SuperSourceActions.handleData(instance, json)
	UpstreamKeyerActions.handleData(instance, json)
	instance.checkFeedbacks()
	updateVariables(instance)
}

export async function ReqStateData(): Promise<void> {
	await MixEffectState.sync()
	await LiveState.sync()
	await PlaybackState.sync()
	await RecordState.sync()
	await StillGeneratorState.sync()
	await StreamingState.sync()
	await AudioMixerState.sync()
	await DownstreamKeyerState.sync()
	await MacroState.sync()
	await SuperSourceState.sync()
	await UpstreamKeyerState.sync()
}

export function disconnectSocket(): void {
	if (tcp !== null) {
		tcp.destroy()
	}
}

export async function sendCommands(commands: GoStreamData[]): Promise<boolean> {
	if (tcp !== null) {
		const cmdStrings: string[] = []
		commands.forEach((cmd) => {
			const json = JSON.stringify(cmd)
			const bufs = Buffer.from(json, 'utf-8')
			cmdStrings.push(PackData(bufs).toString())
		})
		const sign = await tcp.send(cmdStrings.join(''))
		return sign
	}
	return false
}

export async function sendCommand(id: string, type: ReqType, value?: string | number | any[]): Promise<boolean> {
	if (tcp !== null) {
		const obj = { id: id, type: type, value: value }
		const json = JSON.stringify(obj)
		const bufs = Buffer.from(json, 'utf-8')
		const send_data = PackData(bufs)
		const sign = await tcp.send(send_data)
		return sign
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
