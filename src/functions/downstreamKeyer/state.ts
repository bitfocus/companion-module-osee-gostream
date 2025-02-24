import { ActionId } from './actionId'
import { sendCommands, GoStreamCmd } from '../../connection'
import { ReqType } from '../../enums'
import type { GoStreamModel } from '../../models/types'

export type DownstreamKeyerStateT = {
	source: {
		fill: number
		key: number
	}
	mask: {
		enabled: boolean
		hStart: number
		vStart: number
		hEnd: number
		vEnd: number
	}
	control: {
		invert: boolean
		shapedKey: boolean
		clip: number
		gain: number
	}
	rate: {
		rate: number
	}
}
export function create(_model: GoStreamModel): DownstreamKeyerStateT {
	return {
		source: {
			fill: 7, // Still 2
			key: 8, // Still 2 key
		},
		mask: {
			enabled: false,
			hStart: 0,
			vStart: 0,
			hEnd: 100,
			vEnd: 100,
		},
		control: {
			shapedKey: false,
			clip: 15,
			gain: 50,
			invert: false,
		},
		rate: {
			rate: 1.0,
		},
	}
}

export async function sync(_model: GoStreamModel): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
		{ id: ActionId.DskSourceFill, type: ReqType.Get },
		{ id: ActionId.DskSourceKey, type: ReqType.Get },
		{ id: ActionId.DskMaskEnable, type: ReqType.Get },
		{ id: ActionId.DskMaskHStart, type: ReqType.Get },
		{ id: ActionId.DskMaskVStart, type: ReqType.Get },
		{ id: ActionId.DskMaskHEnd, type: ReqType.Get },
		{ id: ActionId.DskMaskVEnd, type: ReqType.Get },
		{ id: ActionId.DskControlShapedKey, type: ReqType.Get },
		{ id: ActionId.DskControlClip, type: ReqType.Get },
		{ id: ActionId.DskControlGain, type: ReqType.Get },
		{ id: ActionId.DskControlInvert, type: ReqType.Get },
		{ id: ActionId.DskRate, type: ReqType.Get },
	]
	return await sendCommands(cmds)
}
export function update(state: DownstreamKeyerStateT, data: GoStreamCmd): boolean {
	switch (data.id as ActionId) {
		case ActionId.DskSourceFill: {
			state.source.fill = Number(data.value![0])
			break
		}
		case ActionId.DskSourceKey: {
			state.source.key = Number(data.value![0])
			break
		}
		case ActionId.DskControlInvert:
			state.control.invert = Boolean(data.value![0])
			break
		case ActionId.DskControlClip:
			state.control.clip = Number(data.value![0])
			break
		case ActionId.DskControlGain:
			state.control.gain = Number(data.value![0])
			break
		case ActionId.DskMaskEnable:
			state.mask.enabled = Boolean(data.value![0])
			break
		case ActionId.DskControlShapedKey:
			state.control.shapedKey = Boolean(data.value![0])
			break
		case ActionId.DskMaskHEnd:
			state.mask.hEnd = Number(data.value![0])
			break
		case ActionId.DskMaskVEnd:
			state.mask.vEnd = Number(data.value![0])
			break
		case ActionId.DskMaskHStart:
			state.mask.hStart = Number(data.value![0])
			break
		case ActionId.DskMaskVStart:
			state.mask.vStart = Number(data.value![0])
			break
		case ActionId.DskRate:
			state.rate.rate = Number(data.value![0])
			break
	}
	return false
}
