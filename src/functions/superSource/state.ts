import { ActionId } from './actionId'
import { sendCommands } from '../../connection'
import { ReqType } from '../../enums'

export type State = {
	enable: boolean
	source1: number
	source2: number
	background: number
	controlStyle: number
	maskEnable: {
		mask1: boolean
		mask2: boolean
	}
}

export type SuperSourceState = {
	SuperSource: State
}

export function create(): SuperSourceState {
	return {
		SuperSource: {
			enable: false,
			source1: 0,
			source2: 0,
			background: 0,
			controlStyle: 0,
			maskEnable: {
				mask1: false,
				mask2: false,
			},
		},
	}
}

export async function sync(): Promise<void> {
	const cmds = [
		{ id: ActionId.SuperSourceEnable, type: ReqType.Get },
		{ id: ActionId.SuperSourceSource1, type: ReqType.Get },
		{ id: ActionId.SuperSourceSource2, type: ReqType.Get },
		{ id: ActionId.SuperSourceBackground, type: ReqType.Get },
		{ id: ActionId.SuperSourceControlStyle, type: ReqType.Get },
		{ id: ActionId.SuperSourceMaskEnable, type: ReqType.Get },
		{ id: ActionId.SuperSourceBorderBrightness, type: ReqType.Get },
		{ id: ActionId.SuperSourceBorderHue, type: ReqType.Get },
		{ id: ActionId.SuperSourceBorderSaturation, type: ReqType.Get },
		{ id: ActionId.SuperSourceBorderWidth, type: ReqType.Get },
		{ id: ActionId.SuperSourceControlYPosition, type: ReqType.Get },
		{ id: ActionId.SuperSourceMaskHEnd, type: ReqType.Get },
		{ id: ActionId.SuperSourceMaskHStart, type: ReqType.Get },
		{ id: ActionId.SuperSourceMaskVEnd, type: ReqType.Get },
		{ id: ActionId.SuperSourceMaskVStart, type: ReqType.Get },
	]
	return sendCommands(cmds)
}
