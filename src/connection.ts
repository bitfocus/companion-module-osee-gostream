import { TCPHelper, InstanceStatus } from '@companion-module/base'
import { portDefault } from './config'
import { ReqType } from './enums'
import { Bytes2ToInt, UpackDatas, PackData } from './util'

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

let tcp: any = null // TCPHelper
let Working_byte_resp_lens: any = null // BUFFER
export function connect(instance: GoStreamInstance): void {
	if (tcp !== null) {
		tcp.destroy()
	}
	instance.updateStatus(InstanceStatus.Connecting)
	const host = instance.config.host
	const port = instance.config.port
	const option = {
		reconnect_interval: instance.config.reconnectInterval,
		reconnect: instance.config.reconnect,
	}
	tcp = new TCPHelper(host, port || portDefault, option)
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
		//console.log(msg_data.toString('hex').match(/.{1,2}/g)?.join(' '));
		//粘包处理
		let index = msg_data.indexOf(0xeb)
		if (index === 0) {
			//从数据头开始得数据
			const msg_data_len = msg_data.length
			const byte_resp_len = Buffer.alloc(2)
			msg_data.copy(byte_resp_len, 0, 3, 5)
			const resp_len = Bytes2ToInt(byte_resp_len, true)
			if (resp_len + 5 !== msg_data_len) {
				if (msg_data_len > resp_len + 5) {
					while (index == 0) {
						if (msg_data[index + 1] == 0xa6) {
							const part_byte_resp_len = Buffer.alloc(2)
							msg_data.copy(part_byte_resp_len, 0, 3, 5)
							//console.log(part_byte_resp_len);
							const part_resp_len = Bytes2ToInt(part_byte_resp_len, true)
							if (msg_data.length < part_resp_len + 5) {
								Working_byte_resp_lens = Buffer.alloc(msg_data.length)
								msg_data.copy(Working_byte_resp_lens, 0, 0, msg_data.length)
								break
							}
							const part_resp = msg_data.subarray(0, part_resp_len + 5)
							//console.log("msg:"+msg_data.toString('hex').match(/.{1,2}/g)?.join(' '));
							msg_data = msg_data.subarray(part_resp_len + 5, msg_data.length)
							// console.log("part:"+part_resp.toString('hex').match(/.{1,2}/g)?.join(' '));
							//  console.log(part_resp_len);
							//  console.log(Working_byte_resp_lens);
							// console.log('444444444');
							ParaData(part_resp, instance)
							index = msg_data.indexOf(0xeb)
						}
					}
				} else {
					//数据长度不够，放入暂存区
					Working_byte_resp_lens = Buffer.alloc(msg_data_len)
					msg_data.copy(Working_byte_resp_lens, 0, 0, msg_data_len)
				}
			} else {
				//console.log('3333333');
				ParaData(msg_data, instance)
			}
		} else if (index < 0) {
			//console.log(msg_data.toString('hex').match(/.{1,2}/g)?.join(' '));
			throw new Error('Recv Data Error...')
		} else {
			//暂存区肯定存在一段不完整得数据，否则不成立丢弃
			// console.log(msg_data.toString('hex').match(/.{1,2}/g)?.join(' '));
			// console.log(index);
			const bytes_remaining_data = msg_data.subarray(0, index)
			msg_data = msg_data.subarray(index, msg_data.length)
			if (Working_byte_resp_lens != null && Working_byte_resp_lens.length > 0) {
				const bytes_right_packages = Buffer.alloc(Working_byte_resp_lens.length + bytes_remaining_data.length)
				Working_byte_resp_lens.copy(bytes_right_packages, 0, 0, Working_byte_resp_lens.length)
				bytes_remaining_data.copy(bytes_right_packages, Working_byte_resp_lens.length, 0, bytes_remaining_data.length)
				//console.log('2222222');
				ParaData(bytes_right_packages, instance)
			}
			Working_byte_resp_lens = null
			index = msg_data.indexOf(0xeb)
			// console.log('12312312312');
			// console.log(index);
			while (index == 0) {
				if (msg_data[index + 1] == 0xa6) {
					const part_byte_resp_len = Buffer.alloc(2)
					msg_data.copy(part_byte_resp_len, 0, 3, 5)
					const part_resp_len = Bytes2ToInt(part_byte_resp_len, true)
					if (msg_data.length < part_resp_len + 5) {
						Working_byte_resp_lens = Buffer.alloc(msg_data.length)
						msg_data.copy(Working_byte_resp_lens, 0, 0, msg_data.length)
						break
					}
					const part_resp = msg_data.subarray(0, part_resp_len + 5)
					msg_data = msg_data.subarray(part_resp_len + 5, msg_data.length)
					//console.log('111111111');
					ParaData(part_resp, instance)
					index = msg_data.indexOf(0xeb)
				}
			}
		}
	})
}

export type GoStreamData = {
	id: string
	type: string
	value: number[]
}

export function ParaData(msg_data: Buffer, instance: GoStreamInstance): void {
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

export async function sendCommand(id: string, type: ReqType, value?: string | number | any[]): Promise<boolean> {
	if (tcp !== null) {
		const obj = { id: id, type: type, value: value }
		const json = JSON.stringify(obj)
		const bufs = Buffer.from(json, 'utf-8')
		const send_data = PackData(bufs)
		//console.log(send_data.toString('hex').match(/.{1,2}/g)?.join(' '));
		const sign = await tcp.send(send_data)
		// if (type == ReqType.Set) {
		// 	instance.checkFeedbacks();
		// }
		return sign
	}
	return false
}
