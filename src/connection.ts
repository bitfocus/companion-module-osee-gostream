import { TCPHelper, InstanceStatus } from '@companion-module/base'
import { portDefault } from './config'
import { ReqType } from './enums'
import { ActionId } from './actions/ActionId'
import { Bytes2ToInt, UpackDatas, PackData } from './util'

import { GoStreamInstance } from './index'

import { MixEffectState } from './functions/mixEffect'
import { LiveState } from './functions/live'
import { PlaybackState } from './functions/playback'
import { RecordState } from './functions/record'
import { StillGeneratorState } from './functions/stillGenerator'
import { StreamingState } from './functions/streaming'
import { SuperSourceState } from './functions/superSource'
import { AudioMixerState } from './functions/audioMixer'
import { DownstreamKeyerState } from './functions/downstreamKeyer'
import { SettingsState } from './functions/settings'
import { MacroState } from './functions/macro'

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
	//console.log("jsonContent", jsonContent)
	const jsonStr = jsonContent.toString('utf8')
	//console.log(jsonStr);
	const json = JSON.parse(jsonStr)

	if (MixEffectState.handleData(instance, json)) return
	if (LiveState.handleData(instance, json)) return
	if (PlaybackState.handleData(instance, json)) return
	if (RecordState.handleData(instance, json)) return
	if (StillGeneratorState.handleData(instance, json)) return
	if (StreamingState.handleData(instance, json)) return
	if (SuperSourceState.handleData(instance, json)) return
	if (AudioMixerState.handleData(instance, json)) return
	if (DownstreamKeyerState.handleData(instance, json)) return
	if (SettingsState.handleData(instance, json)) return
	if (MacroState.handleData(instance, json)) return
	if (SuperSourceState.handleData(instance, json)) return

	//console.log(json);
	if (json !== null && json.id !== '' && Array.isArray(json.value)) {
		switch (json.id) {
			case ActionId.TransitionSource: {
				const intstate = Number(json.value[0])
				if ((intstate & 1) === 1) {
					instance.states.TKeyeState.M_Key = true
				} else {
					instance.states.TKeyeState.M_Key = false
				}
				if (((intstate >> 1) & 1) === 1) {
					instance.states.TKeyeState.DSK = true
				} else {
					instance.states.TKeyeState.DSK = false
				}
				if (((intstate >> 2) & 1) === 1) {
					instance.states.TKeyeState.BKGD = true
				} else {
					instance.states.TKeyeState.BKGD = false
				}
				//instance.log('info',intstate.toString());
				break
			}

			//upStreamKeyType
			case ActionId.KeyOnAir:
				instance.states.TKeyeState.KeyOnAir = json.value[0] === 1 ? true : false
				break
			case ActionId.UpStreamKeyType:
				instance.states.upStreamKeyState.UpStreamKeyType = json.value[0]
				break
			case ActionId.LumaKeySourceFill:
				instance.states.upStreamKeyState.ArrayKeySourceFill[0] = json.value[0]
				break
			case ActionId.ChromaKeyFill:
				instance.states.upStreamKeyState.ArrayKeySourceFill[1] = json.value[0]
				break
			case ActionId.KeyPatternSourceFill:
				instance.states.upStreamKeyState.ArrayKeySourceFill[2] = json.value[0]
				break
			case ActionId.PipSource:
				instance.states.upStreamKeyState.ArrayKeySourceFill[3] = json.value[0]
				break

			//Audio Mixer

			//Record

			//Settings

			//macro

			default:
				return
		}
		instance.checkFeedbacks()
	} else {
		instance.log('error', json.error_info)
	}
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

	//upStreamKeyType
	await sendCommand(ActionId.KeyOnAir, ReqType.Get)
	await sendCommand(ActionId.UpStreamKeyType, ReqType.Get)
	await sendCommand(ActionId.LumaKeySourceFill, ReqType.Get)
	await sendCommand(ActionId.ChromaKeyFill, ReqType.Get)
	await sendCommand(ActionId.KeyPatternSourceFill, ReqType.Get)
	await sendCommand(ActionId.PipSource, ReqType.Get)

	//Macro
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
