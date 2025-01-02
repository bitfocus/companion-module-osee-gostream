import { ActionId } from './actionId'
import { sendCommand, GoStreamData } from '../../connection'
import { ReqType, ActionType } from '../../enums'
import { GoStreamInstance } from '../../index'
import { getChoices } from './../../choices'


export type State = {
	onAir: boolean
	fill: number
	key: number
	invert: boolean
	mask: boolean
	shapedKey: boolean
}

export type DownstreamKeyerState = {
	DownstreamKeyer: State
}

export function create(): DownstreamKeyerState {
	return {
		DownstreamKeyer: {
			onAir: false,
			fill: 0,
			key: 0,
			invert: false,
			mask: false,
			shapedKey: false,
		},
	}
}

export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.DskSourceFill: {
			const select = getChoices(ActionType.DskSourceFill).find((s) => s.id === data.value[0])
			if (select !== undefined) instance.states.DownstreamKeyer.fill = select
			return true
		}
		case ActionId.DskSourceKey: {
			const select = getChoices(ActionType.DskSourceFill).find((s) => s.id === data.value[0])
			if (select !== undefined) instance.states.DownstreamKeyer.key = select
			return true
		}
		case ActionId.DskControlInvert:
			instance.states.DownstreamKeyer.invert = data.value[0] === 1 ? true : false
			return true
		case ActionId.DskMaskEnable:
			instance.states.DownstreamKeyer.mask = data.value[0] === 1 ? true : false
			return true
		case ActionId.DskControlShapedKey:
			instance.states.DownstreamKeyer.shapedKey = data.value[0] === 1 ? true : false
			return true
		case ActionId.DskOnAir:
			instance.states.DownstreamKeyer.onAir = data.value[0] === 1 ? true : false
			break
	}
	return false
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.DskOnAir, ReqType.Get)
	await sendCommand(ActionId.DskSourceFill, ReqType.Get)
	await sendCommand(ActionId.DskSourceKey, ReqType.Get)
	await sendCommand(ActionId.DskMaskEnable, ReqType.Get)
	await sendCommand(ActionId.DskControlShapedKey, ReqType.Get)
	await sendCommand(ActionId.DskControlInvert, ReqType.Get)
}