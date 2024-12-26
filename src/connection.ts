import { TCPHelper, InstanceStatus } from '@companion-module/base'
import { portDefault } from './config'
import { ActionType, ReqType } from './enums'
import { ActionId } from './actions/ActionId'
import { Bytes2ToInt, UpackDatas, PackData } from './util'
import { getChoices } from './choices'
import { updateRecordVariables } from './variables'
import { GoStreamInstance } from './index'

import { MixEffectState } from './functions/mixEffect'
import { LiveState } from './functions/live'
import { PlaybackState } from './functions/playback'
import { RecordState } from './functions/record'
import { StillGeneratorState } from './functions/stillGenerator'
import { StreamingState } from './functions/streaming'
import { SuperSourceState } from './functions/superSource'
import { AudioMixerState } from './functions/audioMixer'

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
	//if(SuperSourceState.handleData(instance, json)) return;

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
			case ActionId.DskOnAir:
				instance.states.TKeyeState.DSKOnAir = json.value[0] === 1 ? true : false
				break
			case ActionId.KeyOnAir:
				instance.states.TKeyeState.KeyOnAir = json.value[0] === 1 ? true : false
				break
			//DSK
			case ActionId.DskSourceFill: {
				const select = getChoices(ActionType.DskSourceFill).find((s) => s.id === json.value[0])
				if (select !== undefined) instance.states.DSKState.DSKSourceFill = select
				break
			}
			case ActionId.DskSourceKey: {
				const select = getChoices(ActionType.DskSourceFill).find((s) => s.id === json.value[0])
				if (select !== undefined) instance.states.DSKState.DSKSourceKeyFill = select
				break
			}
			case ActionId.DskControlInvert:
				instance.states.DSKState.DskControlInvert = json.value[0] === 1 ? true : false
				break
			case ActionId.DskMaskEnable:
				instance.states.DSKState.DskMask = json.value[0] === 1 ? true : false
				break
			case ActionId.DskControlShapedKey:
				instance.states.DSKState.DskControlShapedKey = json.value[0] === 1 ? true : false
				break
		
		
			//upStreamKeyType
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
			case ActionId.RecordTime:
				updateRecordVariables(instance, json.value[0])
				break
			//Settings
			case ActionId.AuxSource:
				instance.states.SettingsProp.AuxSource = json.value[0]
				break
			case ActionId.InputWindowLayout:
				instance.states.SettingsProp.SettingsInputWindowLayout = json.value[0]
				break
			case ActionId.MvMeter:
				instance.states.SettingsProp.MvMeter[json.value[0]] = json.value[1]
				break
			case ActionId.OutSource: {
				const outType = json.value[0]
				const outTypeValue = json.value[1]
				const selectSource = getChoices(ActionType.SettingsoutSource).find((s) => s.id === outTypeValue)
				if (outType === 0) {
					if (selectSource !== undefined) {
						instance.states.SettingsProp.OutSource.hdmi1 = selectSource
					}
				} else if (outType === 1) {
					if (selectSource !== undefined) {
						instance.states.SettingsProp.OutSource.hdmi2 = selectSource
					}
				} else if (outType === 2) {
					if (selectSource !== undefined) {
						instance.states.SettingsProp.OutSource.uvc = selectSource
					}
				}
				break
			}
			case ActionId.OutputColorSpace:
				instance.states.SettingsProp.OutputColorSpace[json.value[0]] = json.value[1]
				break
			case ActionId.OutFormat:
				instance.states.SettingsProp.OutputFormat = json.value[0]
				break
			case ActionId.MicInput:
				instance.states.SettingsProp.MicInput[json.value[0]] = json.value[1]
				break
			case ActionId.MvLayout:
				instance.states.SettingsProp.MvLayout = json.value[0]
				break
			case ActionId.SrcSelection:
				instance.states.SettingsProp.SourceSelection[json.value[0]] = json.value[1]
				break
			//macro
			case ActionId.MacroInfo: {
				const obj = {
					MacroIndex: Number(json.value[0]),
					Name: json.value[1],
					description: json.value[2],
					isUsed: true,
					isWaiting: false,
					isRecording: false,
					isRunning: false,
				}
				instance.states.MacroProp.macroProperties.push(obj)
				break
			}
			case ActionId.MacroRun: {
				const macroIndex = Number(json.value[1])
				const macrostate = json.value[0]
				const macro = instance.states.MacroProp.macroProperties.find((s) => s?.MacroIndex === macroIndex)
				if (macro !== undefined) {
					macro.isRunning = macrostate === 1 ? true : false
				}
				break
			}
			case ActionId.MacroRecord: {
				const r_index = Number(json.value[1])
				const r_state = json.value[0]
				const r_macro = instance.states.MacroProp.macroProperties.find((s) => s?.MacroIndex === r_index)
				if (r_macro !== undefined) {
					r_macro.isRecording = r_state === 1 ? true : false
				} else {
					instance.states.MacroProp.macroProperties.push({
						Name: '',
						description: '',
						isRecording: r_state,
						isUsed: true,
						isRunning: false,
						isWaiting: false,
						MacroIndex: r_index,
					})
				}
				break
			}
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
	//SuperSourceState.sync()

	/*await sendCommand(ActionId.PgmIndex, ReqType.Get)
	await sendCommand(ActionId.PvwIndex, ReqType.Get)
	await sendCommand(ActionId.AutoTransition, ReqType.Get)
	await sendCommand(ActionId.Prev, ReqType.Get)
	await sendCommand(ActionId.FTB, ReqType.Get)
	await sendCommand(ActionId.FtbRate, ReqType.Get)
	await sendCommand(ActionId.FtbAudioAFV, ReqType.Get)
	await sendCommand(ActionId.TransitionIndex, ReqType.Get)
	await sendCommand(ActionId.TransitionRate, ReqType.Get, [0])
	await sendCommand(ActionId.TransitionRate, ReqType.Get, [1])
	await sendCommand(ActionId.TransitionRate, ReqType.Get, [2])
	await sendCommand(ActionId.TransitionSource, ReqType.Get)*/

	await sendCommand(ActionId.DskOnAir, ReqType.Get)
	await sendCommand(ActionId.KeyOnAir, ReqType.Get)
	//DSK
	await sendCommand(ActionId.DskSourceFill, ReqType.Get)
	await sendCommand(ActionId.DskSourceKey, ReqType.Get)
	await sendCommand(ActionId.DskMaskEnable, ReqType.Get)
	await sendCommand(ActionId.DskControlShapedKey, ReqType.Get)
	await sendCommand(ActionId.DskControlInvert, ReqType.Get)

	//upStreamKeyType
	await sendCommand(ActionId.UpStreamKeyType, ReqType.Get)
	await sendCommand(ActionId.LumaKeySourceFill, ReqType.Get)
	await sendCommand(ActionId.ChromaKeyFill, ReqType.Get)
	await sendCommand(ActionId.KeyPatternSourceFill, ReqType.Get)
	await sendCommand(ActionId.PipSource, ReqType.Get)
	//Still
	//await sendCommand(ActionId.StillSelection, ReqType.Get, [0])
	//await sendCommand(ActionId.StillSelection, ReqType.Get, [1])
	//Audio Mixer
	//await sendCommand(ActionId.AudioTransition, ReqType.Get)
	//await sendCommand(ActionId.AudioEnable, ReqType.Get, [0])
	//await sendCommand(ActionId.AudioEnable, ReqType.Get, [1])
	//await sendCommand(ActionId.AudioEnable, ReqType.Get, [2])
	//await sendCommand(ActionId.AudioEnable, ReqType.Get, [3])
	//await sendCommand(ActionId.AudioEnable, ReqType.Get, [4])
	//await sendCommand(ActionId.AudioEnable, ReqType.Get, [5])
	//await sendCommand(ActionId.AudioEnable, ReqType.Get, [6])
	//Streaming
	//await sendCommand(ActionId.StreamOutput, ReqType.Get, [0])
	//await sendCommand(ActionId.StreamOutput, ReqType.Get, [1])
	//await sendCommand(ActionId.StreamOutput, ReqType.Get, [2])
	//Playback
	//await sendCommand(ActionId.PlaybackMode, ReqType.Get)
	//await sendCommand(ActionId.PlaybackRepeat, ReqType.Get)
	//await sendCommand(ActionId.PlaybackPause, ReqType.Get)
	//await sendCommand(ActionId.PlaybackBar, ReqType.Get)
	//await sendCommand(ActionId.PlaybackList, ReqType.Get)
	//Record
	//await sendCommand(ActionId.Record, ReqType.Get)
	//await sendCommand(ActionId.Live, ReqType.Get)
	//Settings
	await sendCommand(ActionId.AuxSource, ReqType.Get)
	await sendCommand(ActionId.OutSource, ReqType.Get, [0])
	await sendCommand(ActionId.OutSource, ReqType.Get, [1])
	await sendCommand(ActionId.OutSource, ReqType.Get, [2])
	await sendCommand(ActionId.InputWindowLayout, ReqType.Get)
	await sendCommand(ActionId.MvMeter, ReqType.Get, [0])
	await sendCommand(ActionId.MvMeter, ReqType.Get, [1])
	await sendCommand(ActionId.MvMeter, ReqType.Get, [2])
	await sendCommand(ActionId.MvMeter, ReqType.Get, [3])
	await sendCommand(ActionId.MvMeter, ReqType.Get, [4])
	await sendCommand(ActionId.MvMeter, ReqType.Get, [5])
	await sendCommand(ActionId.OutputColorSpace, ReqType.Get)
	await sendCommand(ActionId.OutFormat, ReqType.Get)
	await sendCommand(ActionId.MvLayout, ReqType.Get)
	await sendCommand(ActionId.MicInput, ReqType.Get, [0])
	await sendCommand(ActionId.MicInput, ReqType.Get, [1])
	//Macro
	await sendCommand(ActionId.GetMacroInfoAll, ReqType.Get)
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
