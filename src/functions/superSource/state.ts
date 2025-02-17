import { ActionId } from './actionId'
import { sendCommands, GoStreamCmd, valueAsBoolean } from '../../connection'
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
			if (data.value !== undefined) state.controlStyle = data.value[0]
			break
		}
		case ActionId.SuperSourceControlYPosition: {
			if (data.value !== undefined) state.controlYPosition = data.value[0]
			break
		}
		case ActionId.SuperSourceEnable: {
			state.enable = data.value && data.value[0] == 1 ? true : false
			break
		}
		case ActionId.SuperSourceMaskEnable: {
			if (data.value !== undefined) state.maskEnable[data.value[0]] = valueAsBoolean(data.value[1])
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
			if (data.value !== undefined) state.source1 = data.value[0]
			break
		}
		case ActionId.SuperSourceSource2: {
			if (data.value !== undefined) state.source2 = data.value[0]
			break
		}
		case ActionId.SuperSourceBackground: {
			if (data.value !== undefined) state.background = data.value[0]
			break
		}
	}
	return false
}
