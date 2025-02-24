import { ActionId } from './actionId'
import { sendCommands, GoStreamCmd } from '../../connection'
import { ReqType } from '../../enums'
import type { GoStreamModel } from '../../models/types'

export type SuperSourceStateT = {
	enable: boolean
	source1: number
	source2: number
	background: number
	controlStyle: number
	controlYPosition: number
	maskEnable: boolean[]
}

export function create(_model: GoStreamModel): SuperSourceStateT {
	return {
		enable: false,
		source1: 0,
		source2: 0,
		background: 0,
		controlStyle: 0,
		controlYPosition: 0,
		maskEnable: [false, false],
	}
}

export async function sync(_model: GoStreamModel): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
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
	return await sendCommands(cmds)
}
export function update(state: SuperSourceStateT, data: GoStreamCmd): boolean {
	switch (data.id as ActionId) {
		case ActionId.SuperSourceBorderBrightness: {
			return true
		}
		case ActionId.SuperSourceBorderHue: {
			break
		}
		case ActionId.SuperSourceBorderSaturation: {
			break
		}
		case ActionId.SuperSourceBorderWidth: {
			break
		}
		case ActionId.SuperSourceControlStyle: {
			state.controlStyle = Number(data.value![0])
			break
		}
		case ActionId.SuperSourceControlYPosition: {
			state.controlYPosition = Number(data.value![0])
			break
		}
		case ActionId.SuperSourceEnable: {
			state.enable = Boolean(data.value![0])
			break
		}
		case ActionId.SuperSourceMaskEnable: {
			state.maskEnable[data.value![0]] = Boolean(data.value![1])
			break
		}
		case ActionId.SuperSourceMaskHEnd: {
			break
		}
		case ActionId.SuperSourceMaskHStart: {
			break
		}
		case ActionId.SuperSourceMaskVEnd: {
			break
		}
		case ActionId.SuperSourceMaskVStart: {
			break
		}
		case ActionId.SuperSourceSource1: {
			state.source1 = Number(data.value![0])
			break
		}
		case ActionId.SuperSourceSource2: {
			state.source2 = Number(data.value![0])
			break
		}
		case ActionId.SuperSourceBackground: {
			state.background = Number(data.value![0])
			break
		}
	}
	return false
}
