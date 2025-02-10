import { ActionId } from './actionId'
import { sendCommands, GoStreamCmd } from '../../connection'
import { ReqType } from '../../enums'
import type { GoStreamModel } from '../../models/types'

export type DownstreamKeyerStateT = {
	fill: number
	key: number
	invert: boolean
	mask: boolean
	shapedKey: boolean
}

export function create(_model: GoStreamModel): DownstreamKeyerStateT {
	return {
		fill: 0,
		key: 0,
		invert: false,
		mask: false,
		shapedKey: false,
	}
}

export async function sync(_model: GoStreamModel): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
		{ id: ActionId.DskSourceFill, type: ReqType.Get },
		{ id: ActionId.DskSourceKey, type: ReqType.Get },
		{ id: ActionId.DskMaskEnable, type: ReqType.Get },
		{ id: ActionId.DskControlShapedKey, type: ReqType.Get },
		{ id: ActionId.DskControlInvert, type: ReqType.Get },
	]
	return await sendCommands(cmds)
}
export function update(state: DownstreamKeyerStateT, data: GoStreamCmd): boolean {
	if (!data.value) return false
	switch (data.id as ActionId) {
		case ActionId.DskSourceFill: {
			if (data.value !== undefined) state.fill = data.value[0]
			break
		}
		case ActionId.DskSourceKey: {
			if (data.value !== undefined) state.key = data.value[0]
			break
		}
		case ActionId.DskControlInvert:
			state.invert = data.value[0] === 1 ? true : false
			break
		case ActionId.DskMaskEnable:
			state.mask = data.value[0] === 1 ? true : false
			break
		case ActionId.DskControlShapedKey:
			state.shapedKey = data.value[0] === 1 ? true : false
			break
	}
	return false
}
