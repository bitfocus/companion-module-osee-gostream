import { TCPHelper, InstanceStatus } from '@companion-module/base'
import { portDefault } from './config'
import { ActionId, ActionType, ReqType } from './enums'
import { Bytes2ToInt, UpackDatas, PackData } from './util'
import { getChoices, Choice } from './choices'
import { updatePlayStatedVariables, updatePlayFileVariables, updateRecordVariables } from './variables'
import { TransitionStyleChoice, SuperSourceStyleChoices } from './model'

let tcp: any = null // TCPHelper
let Working_byte_resp_lens: any = null // BUFFER
export function connect(self) {
	if (tcp !== null) {
		tcp.destroy()
	}
	self.updateStatus(InstanceStatus.Connecting)
	let host = self.config.host
	const port = self.config.port
	var option = {
		reconnect_interval: self.config.reconnectInterval,
		reconnect: self.config.reconnect,
	}
	tcp = new TCPHelper(host, port || portDefault, option)
	tcp.on('status_change', (state, message) => {
		self.updateStatus(state, message)
		self.log('debug', 'Socket reconnected')
	})
	tcp.on('connect', () => {
		self.updateStatus(InstanceStatus.Ok)
		self.log('debug', 'Socket connected')
		ReqStateData()
	})
	tcp.on('error', () => {
		self.updateStatus(InstanceStatus.ConnectionFailure, 'Connection error')
		self.log('debug', 'Socket connect error')
	})
	tcp.on('end', () => {
		self.updateStatus(InstanceStatus.Disconnected, 'Disconnecting')
		self.log('debug', 'Socket Disconnecting')
	})
	tcp.on('data', (msg_data) => {
		//console.log(msg_data.toString('hex').match(/.{1,2}/g)?.join(' '));
		//粘包处理
		let index = msg_data.indexOf(0xeb)
		if (index === 0) {
			//从数据头开始得数据
			let msg_data_len = msg_data.length
			let byte_resp_len = Buffer.alloc(2)
			msg_data.copy(byte_resp_len, 0, 3, 5)
			let resp_len = Bytes2ToInt(byte_resp_len, true)
			if (resp_len + 5 !== msg_data_len) {
				if (msg_data_len > resp_len + 5) {
					while (index == 0) {
						if (msg_data[index + 1] == 0xa6) {
							let part_byte_resp_len = Buffer.alloc(2)
							msg_data.copy(part_byte_resp_len, 0, 3, 5)
							//console.log(part_byte_resp_len);
							let part_resp_len = Bytes2ToInt(part_byte_resp_len, true)
							if (msg_data.length < part_resp_len + 5) {
								Working_byte_resp_lens = Buffer.alloc(msg_data.length)
								msg_data.copy(Working_byte_resp_lens, 0, 0, msg_data.length)
								break
							}
							var part_resp = msg_data.subarray(0, part_resp_len + 5)
							//console.log("msg:"+msg_data.toString('hex').match(/.{1,2}/g)?.join(' '));
							msg_data = msg_data.subarray(part_resp_len + 5, msg_data.length)
							// console.log("part:"+part_resp.toString('hex').match(/.{1,2}/g)?.join(' '));
							//  console.log(part_resp_len);
							//  console.log(Working_byte_resp_lens);
							// console.log('444444444');
							ParaData(part_resp, self)
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
				ParaData(msg_data, self)
			}
		} else if (index < 0) {
			//console.log(msg_data.toString('hex').match(/.{1,2}/g)?.join(' '));
			throw new Error('Recv Data Error...')
		} else {
			//暂存区肯定存在一段不完整得数据，否则不成立丢弃
			// console.log(msg_data.toString('hex').match(/.{1,2}/g)?.join(' '));
			// console.log(index);
			let bytes_remaining_data = msg_data.subarray(0, index)
			msg_data = msg_data.subarray(index, msg_data.length)
			if (Working_byte_resp_lens != null && Working_byte_resp_lens.length > 0) {
				let bytes_right_packages = Buffer.alloc(Working_byte_resp_lens.length + bytes_remaining_data.length)
				Working_byte_resp_lens.copy(bytes_right_packages, 0, 0, Working_byte_resp_lens.length)
				bytes_remaining_data.copy(bytes_right_packages, Working_byte_resp_lens.length, 0, bytes_remaining_data.length)
				//console.log('2222222');
				ParaData(bytes_right_packages, self)
			}
			Working_byte_resp_lens = null
			index = msg_data.indexOf(0xeb)
			// console.log('12312312312');
			// console.log(index);
			while (index == 0) {
				if (msg_data[index + 1] == 0xa6) {
					let part_byte_resp_len = Buffer.alloc(2)
					msg_data.copy(part_byte_resp_len, 0, 3, 5)
					let part_resp_len = Bytes2ToInt(part_byte_resp_len, true)
					if (msg_data.length < part_resp_len + 5) {
						Working_byte_resp_lens = Buffer.alloc(msg_data.length)
						msg_data.copy(Working_byte_resp_lens, 0, 0, msg_data.length)
						break
					}
					var part_resp = msg_data.subarray(0, part_resp_len + 5)
					msg_data = msg_data.subarray(part_resp_len + 5, msg_data.length)
					//console.log('111111111');
					ParaData(part_resp, self)
					index = msg_data.indexOf(0xeb)
				}
			}
		}
	})
}

export function ParaData(msg_data, self) {
	let jsonContent = UpackDatas(msg_data)
	//console.log("jsonContent", jsonContent)
	let jsonStr = jsonContent.toString('utf8')
	//console.log(jsonStr);
	var json = JSON.parse(jsonStr)
	//console.log(json);
	if (json !== null && json.id !== '' && Array.isArray(json.value)) {
		switch (json.id) {
			case ActionId.PvwIndex:
				var select: Choice = getChoices(ActionType.Preview).find((s) => s.id === json.value[0])
				if (select !== undefined) {
					self.states.selectPrevInput = select
				}
				break
			case ActionId.PgmIndex:
				var select: Choice = getChoices(ActionType.Program).find((s) => s.id === json.value[0])
				if (select !== undefined) {
					self.states.selectPgmInput = select
				}
				break
			case ActionId.AutoTransition:
				self.states.transitionPosition.inTransition = json.value[0] === 1 ? true : false
				break
			case ActionId.FTB:
				if (json.value[0] === 0) {
					self.states.fadeToBlack.isFullyBlack = false
					self.states.fadeToBlack.inTransition = false
				} else if (json.value[0] === 1) {
					self.states.fadeToBlack.inTransition = false
					self.states.fadeToBlack.isFullyBlack = true
				} else if (json.value[0] === 2) {
					self.states.fadeToBlack.inTransition = true
				}
				break
			case ActionId.FtbAudioAFV:
				self.states.fadeToBlack.AFV = json.value[0] === 1 ? true : false
				break
			case ActionId.FtbRate:
				self.states.fadeToBlack.rate = json.value[0]
				break
			case ActionId.Prev:
				self.states.selectTransitionStyle.PrevState = json.value[0] === 1 ? true : false
				break
			case ActionId.TransitionIndex:
				let selectValue = Number(json.value[0])
				let selectStyle = TransitionStyleChoice.find((s) => s.id === selectValue)
				if (selectStyle !== undefined) {
					self.states.selectTransitionStyle.style = selectStyle
				}
				break
			case ActionId.TransitionRate:
				let type = json.value[0]
				let typeValue = json.value[1]
				if (type === 0) {
					self.states.selectTransitionStyle.mixrate = typeValue
				} else if (type === 1) {
					self.states.selectTransitionStyle.diprate = typeValue
				} else if (type === 2) {
					self.states.selectTransitionStyle.wiperate = typeValue
				}
				break
			case ActionId.TransitionSource:
				let intstate = Number(json.value[0])
				if ((intstate & 1) === 1) {
					self.states.TKeyeState.M_Key = true
				} else {
					self.states.TKeyeState.M_Key = false
				}
				if (((intstate >> 1) & 1) === 1) {
					self.states.TKeyeState.DSK = true
				} else {
					self.states.TKeyeState.DSK = false
				}
				if (((intstate >> 2) & 1) === 1) {
					self.states.TKeyeState.BKGD = true
				} else {
					self.states.TKeyeState.BKGD = false
				}
				//self.log('info',intstate.toString());
				break
			case ActionId.DskOnAir:
				self.states.TKeyeState.DSKOnAir = json.value[0] === 1 ? true : false
				break
			case ActionId.KeyOnAir:
				self.states.TKeyeState.KeyOnAir = json.value[0] === 1 ? true : false
				break
			//DSK
			case ActionId.DskSourceFill:
				var select: Choice = getChoices(ActionType.DskSourceFill).find((s) => s.id === json.value[0])
				if (select !== undefined) self.states.DSKState.DSKSourceFill = select
				break
			case ActionId.DskSourceKey:
				var select: Choice = getChoices(ActionType.DskSourceFill).find((s) => s.id === json.value[0])
				if (select !== undefined) self.states.DSKState.DSKSourceKeyFill = select
				break
			case ActionId.DskControlInvert:
				self.states.DSKState.DskControlInvert = json.value[0] === 1 ? true : false
				break
			case ActionId.DskMaskEnable:
				self.states.DSKState.DskMask = json.value[0] === 1 ? true : false
				break
			case ActionId.DskControlShapedKey:
				self.states.DSKState.DskControlShapedKey = json.value[0] === 1 ? true : false
				break
			//SuperSource
			case ActionId.SuperSourceEnable:
				self.states.SuperSourcePorp.SSEnable = json.value[0] === 1 ? true : false
				break
			case ActionId.SuperSourceSource1:
				var select: Choice = getChoices(ActionType.SuperSourceSource).find((s) => s.id === json.value[0])
				if (select !== undefined) self.states.SuperSourcePorp.SuperSourceSource1 = select
				break
			case ActionId.SuperSourceSource2:
				var select: Choice = getChoices(ActionType.SuperSourceSource).find((s) => s.id === json.value[0])
				if (select !== undefined) self.states.SuperSourcePorp.SuperSourceSource2 = select
				break
			case ActionId.SuperSourceBackground:
				var select: Choice = getChoices(ActionType.SuperSourceSource).find((s) => s.id === json.value[0])
				if (select !== undefined) self.states.SuperSourcePorp.SuperSourceBackground = select
				break
			case ActionId.SuperSourceControlStyle:
				var sschoice = SuperSourceStyleChoices.find((s) => s.id === json.value[0])
				if (sschoice !== undefined) self.states.SuperSourcePorp.SuperSourceControlStyle = sschoice
				break
			case ActionId.SuperSourceMaskEnable:
				let masktype = json.value[0]
				let masktypeValue = json.value[1]
				if (masktype === 0) {
					self.states.SuperSourcePorp.SuperSourceMaskEnable.mask1 = masktypeValue === 1 ? true : false
				} else {
					self.states.SuperSourcePorp.SuperSourceMaskEnable.mask2 = masktypeValue === 1 ? true : false
				}
				break
			//upStreamKeyType
			case ActionId.UpStreamKeyType:
				let USKType = json.value[0]
				self.states.upStreamKeyState.UpStreamKeyType = USKType
				break
			case ActionId.LumaKeySourceFill:
				self.states.upStreamKeyState.ArrayKeySourceFill[0] = json.value[0]
				break
			case ActionId.ChromaKeyFill:
				self.states.upStreamKeyState.ArrayKeySourceFill[1] = json.value[0]
				break
			case ActionId.KeyPatternSourceFill:
				self.states.upStreamKeyState.ArrayKeySourceFill[2] = json.value[0]
				break
			case ActionId.PipSource:
				self.states.upStreamKeyState.ArrayKeySourceFill[3] = json.value[0]
				break
			//Still
			case ActionId.StillSelection:
				let stype = json.value[0]
				let stypeValue = json.value[1]
				if (stype === 0) {
					self.states.StillProp.Still1 = stypeValue
				} else {
					self.states.StillProp.Still2 = stypeValue
				}
				break
			//Streaming
			case ActionId.StreamOutput:
				let streamtype = json.value[0]
				if (streamtype === 0) {
					self.states.StreamingProp.stream1 = json.value[1] === 1 ? true : false
				} else if (streamtype === 1) {
					self.states.StreamingProp.stream2 = json.value[1] === 1 ? true : false
				} else if (streamtype === 2) {
					self.states.StreamingProp.stream3 = json.value[1] === 1 ? true : false
				} else {
				}
				break
			//Audio Mixer
			case ActionId.AudioTransition:
				self.states.AudioMixerPorp.AudioTransition = json.value[0] === 1 ? true : false
				break
			case ActionId.AudioEnable:
				let audiotype = json.value[0]
				let audiotypeValue = json.value[1]
				if (audiotype == 0) {
					self.states.AudioMixerPorp.AudioEnable.mic1 = audiotypeValue
				} else if (audiotype == 1) {
					self.states.AudioMixerPorp.AudioEnable.mic2 = audiotypeValue
				} else if (audiotype == 2) {
					self.states.AudioMixerPorp.AudioEnable.in1 = audiotypeValue
				} else if (audiotype == 3) {
					self.states.AudioMixerPorp.AudioEnable.in2 = audiotypeValue
				} else if (audiotype == 4) {
					self.states.AudioMixerPorp.AudioEnable.in3 = audiotypeValue
				} else if (audiotype == 5) {
					self.states.AudioMixerPorp.AudioEnable.in4 = audiotypeValue
				} else if (audiotype == 6) {
					self.states.AudioMixerPorp.AudioEnable.aux = audiotypeValue
				} else {
				}
				break
			//Playback
			case ActionId.PlaybackMode:
				self.states.PlayBackState.PlaybackMode = json.value[0]
				break
			case ActionId.PlaybackRepeat:
				self.states.PlayBackState.PlaybackRepeat = json.value[0] === 1 ? true : false
				break
			case ActionId.PlaybackPause:
				self.states.PlayBackState.PlaybackPause = json.value[0] === 1 ? true : false
				updatePlayStatedVariables(self, self.states.PlayBackState.PlaybackPause)
				break
			case ActionId.PlaybackBar:
				self.states.PlayBackState.PlaybackBar = json.value[0] === 1 ? true : false
				break
			case ActionId.PlayFile:
				self.states.PlayBackState.PlayFile = self.states.PlayBackState.PlayFileList.indexOf(json.value[0])
				updatePlayFileVariables(self, json.value[0])
				break
			case ActionId.PlaybackList:
				self.states.PlayBackState.PlayFileList = self.states.PlayBackState.PlayFileList.concat(json.value)
				// Re-initialize actions and feedbackls so that dropdown are updated
				self.init_actions()
				self.init_feedbacks()
				break
			//Record
			case ActionId.RecordTime:
				let time = json.value[0]
				updateRecordVariables(self, time)
				break
			case ActionId.Record:
				self.states.RecordState = json.value[0] === 1 ? true : false
				break
			case ActionId.Live:
				self.states.LiveState = json.value[0]
				break
			//Settings
			case ActionId.AuxSource:
				self.states.SettingsProp.AuxSource = json.value[0]
				break
			case ActionId.InputWindowLayout:
				self.states.SettingsProp.SettingsInputWindowLayout = json.value[0]
				break
			case ActionId.MvMeter:
				self.states.SettingsProp.MvMeter[json.value[0]] = json.value[1]
				break
			case ActionId.OutSource:
				let outType = json.value[0]
				let outTypeValue = json.value[1]
				var selectSource = getChoices(ActionType.SettingsoutSource).find((s) => s.id === outTypeValue)
				if (outType === 0) {
					if (selectSource !== undefined) {
						self.states.SettingsProp.OutSource.hdmi1 = selectSource
					}
				} else if (outType === 1) {
					if (selectSource !== undefined) {
						self.states.SettingsProp.OutSource.hdmi2 = selectSource
					}
				} else if (outType === 2) {
					if (selectSource !== undefined) {
						self.states.SettingsProp.OutSource.uvc = selectSource
					}
				}
				break
			case ActionId.OutputColorSpace:
				self.states.SettingsProp.OutputColorSpace[json.value[0]] = json.value[1]
				break
			case ActionId.OutFormat:
				self.states.SettingsProp.OutputFormat = json.value[0]
				break
			case ActionId.SrcSelection:
				self.states.SettingsProp.SourceSelection[json.value[0]] = json.value[1]
				break
			//macro
			case ActionId.MacroInfo:
				let obj = {
					MacroIndex: Number(json.value[0]),
					Name: json.value[1],
					description: json.value[2],
					isUsed: true,
					isWaiting: false,
					isRecording: false,
					isRunning: false,
				}
				self.states.MacroProp.macroProperties.push(obj)
				break
			case ActionId.MacroRun:
				let macroIndex = Number(json.value[1])
				let macrostate = json.value[0]
				const macro = self.states.MacroProp.macroProperties.find((s) => s?.MacroIndex === macroIndex)
				if (macro !== undefined) {
					macro.isRunning = macrostate === 1 ? true : false
				}
				break
			case ActionId.MacroRecord:
				let r_index = Number(json.value[1])
				let r_state = json.value[0]
				const r_macro = self.states.MacroProp.macroProperties.find((s) => s?.MacroIndex === r_index)
				if (r_macro !== undefined) {
					r_macro.isRecording = r_state === 1 ? true : false
				} else {
					self.states.MacroProp.macroProperties.push({
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
			default:
				return
		}
		self.checkFeedbacks()
	} else if (json.result === '0') {
	} else {
		self.log('error', json.error_info)
	}
}
export function ReqStateData() {
	sendCommand(ActionId.PgmIndex, ReqType.Get)
	sendCommand(ActionId.PvwIndex, ReqType.Get)
	sendCommand(ActionId.AutoTransition, ReqType.Get)
	sendCommand(ActionId.Prev, ReqType.Get)
	sendCommand(ActionId.FTB, ReqType.Get)
	sendCommand(ActionId.FtbRate, ReqType.Get)
	sendCommand(ActionId.FtbAudioAFV, ReqType.Get)
	sendCommand(ActionId.TransitionIndex, ReqType.Get)
	sendCommand(ActionId.TransitionRate, ReqType.Get, [0])
	sendCommand(ActionId.TransitionRate, ReqType.Get, [1])
	sendCommand(ActionId.TransitionRate, ReqType.Get, [2])
	sendCommand(ActionId.TransitionSource, ReqType.Get)
	sendCommand(ActionId.DskOnAir, ReqType.Get)
	sendCommand(ActionId.KeyOnAir, ReqType.Get)
	//DSK
	sendCommand(ActionId.DskSourceFill, ReqType.Get)
	sendCommand(ActionId.DskSourceKey, ReqType.Get)
	sendCommand(ActionId.DskMaskEnable, ReqType.Get)
	sendCommand(ActionId.DskControlShapedKey, ReqType.Get)
	sendCommand(ActionId.DskControlInvert, ReqType.Get)
	//SuperSource
	// sendCommand(ActionId.SuperSourceEnable, ReqType.Get)
	// sendCommand(ActionId.SuperSourceSource1, ReqType.Get)
	// sendCommand(ActionId.SuperSourceSource2, ReqType.Get)
	// sendCommand(ActionId.SuperSourceBackground, ReqType.Get)
	// sendCommand(ActionId.SuperSourceControlStyle, ReqType.Get)
	// sendCommand(ActionId.SuperSourceMaskEnable, ReqType.Get)
	//upStreamKeyType
	sendCommand(ActionId.UpStreamKeyType, ReqType.Get)
	sendCommand(ActionId.LumaKeySourceFill, ReqType.Get)
	sendCommand(ActionId.ChromaKeyFill, ReqType.Get)
	sendCommand(ActionId.KeyPatternSourceFill, ReqType.Get)
	sendCommand(ActionId.PipSource, ReqType.Get)
	//Still
	sendCommand(ActionId.StillSelection, ReqType.Get, [0])
	sendCommand(ActionId.StillSelection, ReqType.Get, [1])
	//Audio Mixer
	sendCommand(ActionId.AudioTransition, ReqType.Get)
	sendCommand(ActionId.AudioEnable, ReqType.Get, [0])
	sendCommand(ActionId.AudioEnable, ReqType.Get, [1])
	sendCommand(ActionId.AudioEnable, ReqType.Get, [2])
	sendCommand(ActionId.AudioEnable, ReqType.Get, [3])
	sendCommand(ActionId.AudioEnable, ReqType.Get, [4])
	sendCommand(ActionId.AudioEnable, ReqType.Get, [5])
	sendCommand(ActionId.AudioEnable, ReqType.Get, [6])
	//Streaming
	sendCommand(ActionId.StreamOutput, ReqType.Get, [0])
	sendCommand(ActionId.StreamOutput, ReqType.Get, [1])
	sendCommand(ActionId.StreamOutput, ReqType.Get, [2])
	//Playback
	sendCommand(ActionId.PlaybackMode, ReqType.Get)
	sendCommand(ActionId.PlaybackRepeat, ReqType.Get)
	sendCommand(ActionId.PlaybackPause, ReqType.Get)
	sendCommand(ActionId.PlaybackBar, ReqType.Get)
	sendCommand(ActionId.PlaybackList, ReqType.Get)
	//Record
	sendCommand(ActionId.Record, ReqType.Get)
	sendCommand(ActionId.Live, ReqType.Get)
	//Settings
	sendCommand(ActionId.AuxSource, ReqType.Get)
	sendCommand(ActionId.OutSource, ReqType.Get, [0])
	sendCommand(ActionId.OutSource, ReqType.Get, [1])
	sendCommand(ActionId.OutSource, ReqType.Get, [2])
	sendCommand(ActionId.InputWindowLayout, ReqType.Get)
	sendCommand(ActionId.MvMeter, ReqType.Get, [0])
	sendCommand(ActionId.MvMeter, ReqType.Get, [1])
	sendCommand(ActionId.MvMeter, ReqType.Get, [2])
	sendCommand(ActionId.MvMeter, ReqType.Get, [3])
	sendCommand(ActionId.MvMeter, ReqType.Get, [4])
	sendCommand(ActionId.MvMeter, ReqType.Get, [5])
	sendCommand(ActionId.OutputColorSpace, ReqType.Get)
	sendCommand(ActionId.OutFormat, ReqType.Get)
	//Macro
	sendCommand(ActionId.GetMacroInfoAll, ReqType.Get)
}

export function disconnectSocket() {
	if (tcp !== null) {
		tcp.destroy()
	}
}

export async function sendCommand(id: string, type: any, value?: any) {
	if (tcp !== null) {
		let obj = { id: id, type: type, value: value }
		let json = JSON.stringify(obj)
		let bufs = Buffer.from(json, 'utf-8')
		let send_data = PackData(bufs)
		//console.log(send_data.toString('hex').match(/.{1,2}/g)?.join(' '));
		var sign = await tcp.send(send_data)
		// if (type == ReqType.Set) {
		// 	self.checkFeedbacks();
		// }
		return sign
	}
	return false
}
