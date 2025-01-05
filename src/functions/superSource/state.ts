import { ActionId } from './actionId'
import { sendCommand } from '../../connection'
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
	await sendCommand(ActionId.SuperSourceEnable, ReqType.Get)
	await sendCommand(ActionId.SuperSourceSource1, ReqType.Get)
	await sendCommand(ActionId.SuperSourceSource2, ReqType.Get)
	await sendCommand(ActionId.SuperSourceBackground, ReqType.Get)
	await sendCommand(ActionId.SuperSourceControlStyle, ReqType.Get)
	await sendCommand(ActionId.SuperSourceMaskEnable, ReqType.Get)
	await sendCommand(ActionId.SuperSourceBorderBrightness, ReqType.Get)
	await sendCommand(ActionId.SuperSourceBorderHue, ReqType.Get)
	await sendCommand(ActionId.SuperSourceBorderSaturation, ReqType.Get)
	await sendCommand(ActionId.SuperSourceBorderWidth, ReqType.Get)
	await sendCommand(ActionId.SuperSourceControlYPosition, ReqType.Get)
	await sendCommand(ActionId.SuperSourceMaskHEnd, ReqType.Get)
	await sendCommand(ActionId.SuperSourceMaskHStart, ReqType.Get)
	await sendCommand(ActionId.SuperSourceMaskVEnd, ReqType.Get)
	await sendCommand(ActionId.SuperSourceMaskVStart, ReqType.Get)
}
