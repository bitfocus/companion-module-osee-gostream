import { ActionId } from './actionId'
import { sendCommands, GoStreamCmd } from '../../connection'
import { ReqType, ActionType } from '../../enums'
import type { IModelSpec } from '../../models/types'
import { getChoices } from './../../choices'

export type DownstreamKeyerStateT = {
	onAir: boolean
	fill: number
	key: number
	invert: boolean
	mask: boolean
	shapedKey: boolean
}

export function create(_model: IModelSpec): DownstreamKeyerStateT {
	return {
		onAir: false,
		fill: 0,
		key: 0,
		invert: false,
		mask: false,
		shapedKey: false,
	}
}

export async function sync(_model: IModelSpec): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
		{ id: ActionId.DskOnAir, type: ReqType.Get },
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
			const select = getChoices(ActionType.DskSourceFill).find((s) => data.value && s.id === data.value[0])
			if (select !== undefined) state.fill = select.id
			break
		}
		case ActionId.DskSourceKey: {
			const select = getChoices(ActionType.DskSourceFill).find((s) => s.id === data.value && data.value[0])
			if (select !== undefined) state.key = select.id
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
		case ActionId.DskOnAir:
			state.onAir = data.value[0] === 1 ? true : false
			break
	}
	return false
}
