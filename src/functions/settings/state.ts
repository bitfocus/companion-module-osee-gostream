import { ActionId } from './actionId'
import { sendCommand } from '../../connection'
import { ReqType } from '../../enums'

export type State = {
	auxSource: number
	inputWindowLayout: number
	mvMeter: number[]
	outSource: number[] // hdmi1, hdmi2, uvc
	outputColorSpace: number[]
	outputFormat: number
	micInput: number[]
	mvLayout: number
	sourceSelection: number[]
}

export type SettingsState = {
	Settings: State
}

export function create(): SettingsState {
	return {
		Settings: {
			auxSource: 0,
			inputWindowLayout: 0,
			mvMeter: [0, 0, 0, 0, 0, 0],
			outSource: [0, 0, 0],
			outputColorSpace: [0, 0],
			outputFormat: 0,
			micInput: [0, 0],
			mvLayout: 0,
			sourceSelection: [0, 0, 0, 0],
		},
	}
}

export async function sync(): Promise<void> {
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
}
