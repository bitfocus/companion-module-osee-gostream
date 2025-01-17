import { ActionId } from './actionId'
import { sendCommands, GoStreamCmd } from '../../connection'
import { ReqType } from '../../enums'
import type { IModelSpec } from '../../models/types'

export type TransitionKeyState = {
	BKGD: boolean
	DSK: boolean
	M_Key: boolean
	KeyOnAir: boolean
	DSKOnAir: boolean
}

export type UpstreamKeyerStateT = {
	transitionKey: TransitionKeyState
	PvwOnAir: boolean
	Tied: boolean
	OnAir: boolean
	UpStreamKeyType: number
	ArrayKeySourceFill: number[]
}

export function create(_model: IModelSpec): UpstreamKeyerStateT {
	return {
		transitionKey: {
			BKGD: false,
			DSK: false,
			M_Key: false,
			KeyOnAir: false,
			DSKOnAir: false,
		},
		PvwOnAir: false,
		Tied: false,
		OnAir: false,
		UpStreamKeyType: 0,
		ArrayKeySourceFill: [],
	}
}

export async function sync(_model: IModelSpec): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
		{ id: ActionId.KeyOnAir, type: ReqType.Get },
		{ id: ActionId.UpStreamKeyType, type: ReqType.Get },
		{ id: ActionId.LumaKeySourceFill, type: ReqType.Get },
		{ id: ActionId.ChromaKeyFill, type: ReqType.Get },
		{ id: ActionId.KeyPatternSourceFill, type: ReqType.Get },
		{ id: ActionId.PipSource, type: ReqType.Get },
	]
	return sendCommands(cmds)
}
export function update(state: UpstreamKeyerStateT, data: GoStreamCmd): boolean {
	switch (data.id as ActionId) {
		case ActionId.KeyOnAir:
			state.transitionKey.KeyOnAir = data.value && data.value[0] === 1 ? true : false
			break
		case ActionId.UpStreamKeyType:
			state.UpStreamKeyType = data.value && data.value[0]
			break
		case ActionId.LumaKeySourceFill:
			state.ArrayKeySourceFill[0] = data.value && data.value[0]
			break
		case ActionId.ChromaKeyFill:
			state.ArrayKeySourceFill[1] = data.value && data.value[0]
			break
		case ActionId.KeyPatternSourceFill:
			state.ArrayKeySourceFill[2] = data.value && data.value[0]
			break
		case ActionId.PipSource:
			state.ArrayKeySourceFill[3] = data.value && data.value[0]
			break
	}
	return false
}
