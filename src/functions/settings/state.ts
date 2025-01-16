import { ActionId } from './actionId'
import { sendCommands } from '../../connection'
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
	sourceName: string[]
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
			sourceName: new Array(9),
		},
	}
}

export async function sync(): Promise<void> {
	// TODO : Read these from the model info
	const cmds = [
		{ id: ActionId.AuxSource, type: ReqType.Get },
		{ id: ActionId.OutSource, type: ReqType.Get, value: [0] },
		{ id: ActionId.OutSource, type: ReqType.Get, value: [1] },
		{ id: ActionId.OutSource, type: ReqType.Get, value: [2] },
		{ id: ActionId.InputWindowLayout, type: ReqType.Get },
		{ id: ActionId.MvMeter, type: ReqType.Get, value: [0] },
		{ id: ActionId.MvMeter, type: ReqType.Get, value: [1] },
		{ id: ActionId.MvMeter, type: ReqType.Get, value: [2] },
		{ id: ActionId.MvMeter, type: ReqType.Get, value: [3] },
		{ id: ActionId.MvMeter, type: ReqType.Get, value: [4] },
		{ id: ActionId.MvMeter, type: ReqType.Get, value: [5] },
		{ id: ActionId.OutputColorSpace, type: ReqType.Get },
		{ id: ActionId.OutFormat, type: ReqType.Get },
		{ id: ActionId.MvLayout, type: ReqType.Get },
		{ id: ActionId.MicInput, type: ReqType.Get, value: [0] },
		{ id: ActionId.MicInput, type: ReqType.Get, value: [1] },
		{ id: ActionId.SrcName, type: ReqType.Get, value: [0] },
		{ id: ActionId.SrcName, type: ReqType.Get, value: [1] },
		{ id: ActionId.SrcName, type: ReqType.Get, value: [2] },
		{ id: ActionId.SrcName, type: ReqType.Get, value: [3] },
		{ id: ActionId.SrcName, type: ReqType.Get, value: [4] },
		{ id: ActionId.SrcName, type: ReqType.Get, value: [5] },
		{ id: ActionId.SrcName, type: ReqType.Get, value: [6] },
		{ id: ActionId.SrcName, type: ReqType.Get, value: [7] },
		{ id: ActionId.SrcName, type: ReqType.Get, value: [8] },
	]
	await sendCommands(cmds)
}
