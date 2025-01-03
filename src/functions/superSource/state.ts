import { ActionId } from './actionId'
import { sendCommand, GoStreamData } from '../../connection'
import { ActionType, ReqType } from '../../enums'
import { GoStreamInstance } from '../../index'

import { SuperSourceStyleChoices } from './../../model'
import { getChoices } from './../../choices'

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

export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.SuperSourceBackground: {
			const select = getChoices(ActionType.SuperSourceSource).find((s) => s.id === data.value[0])
			if (select !== undefined) instance.states.SuperSource.background = select
			return true
		}
		case ActionId.SuperSourceBorderBrightness: {
			return true
		}
		case ActionId.SuperSourceBorderHue: {
			return true
		}
		case ActionId.SuperSourceBorderSaturation: {
			return true
		}
		case ActionId.SuperSourceBorderWidth: {
			return true
		}
		case ActionId.SuperSourceControlStyle: {
			const sschoice = SuperSourceStyleChoices.find((s) => s.id === data.value[0])
			if (sschoice !== undefined) instance.states.SuperSource.controlStyle = sschoice
			return true
		}
		case ActionId.SuperSourceControlYPosition: {
			return true
		}
		case ActionId.SuperSourceEnable: {
			instance.states.SuperSource.enable = data.value[0] == 1 ? true : false
			return true
		}
		case ActionId.SuperSourceMaskEnable: {
			const masktype = data.value[0]
			const masktypeValue = data.value[1]
			if (masktype === 0) {
				instance.states.SuperSource.maskEnable.mask1 = masktypeValue === 1 ? true : false
			} else {
				instance.states.SuperSource.maskEnable.mask2 = masktypeValue === 1 ? true : false
			}
			return true
		}
		case ActionId.SuperSourceMaskHEnd: {
			return true
		}
		case ActionId.SuperSourceMaskHStart: {
			return true
		}
		case ActionId.SuperSourceMaskVEnd: {
			return true
		}
		case ActionId.SuperSourceMaskVStart: {
			return true
		}
		case ActionId.SuperSourceSource1: {
			const select = getChoices(ActionType.SuperSourceSource).find((s) => s.id === data.value[0])
			if (select !== undefined) instance.states.SuperSource.source1 = select
			return true
		}
		case ActionId.SuperSourceSource2: {
			const select = getChoices(ActionType.SuperSourceSource).find((s) => s.id === data.value[0])
			if (select !== undefined) instance.states.SuperSource.source2 = select
			return true
		}
	}
	return false
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
