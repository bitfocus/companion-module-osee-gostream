import { ActionId } from './actionId'
import { sendCommands } from '../../connection'
import { ReqType } from '../../enums'

export type TransitionKeyState = {
	BKGD: boolean
	DSK: boolean
	M_Key: boolean
	KeyOnAir: boolean
	DSKOnAir: boolean
}

export type State = {
	transitionKey: TransitionKeyState
	PvwOnAir: boolean
	Tied: boolean
	OnAir: boolean
	UpStreamKeyType: number
	ArrayKeySourceFill: number[]
}

export type UpstreamKeyState = {
	UpstreamKeyer: State
}

export function create(): UpstreamKeyState {
	return {
		UpstreamKeyer: {
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
		},
	}
}

export async function sync(): Promise<void> {
	const cmds = [
		{ id: ActionId.KeyOnAir, type: ReqType.Get },
		{ id: ActionId.UpStreamKeyType, type: ReqType.Get },
		{ id: ActionId.LumaKeySourceFill, type: ReqType.Get },
		{ id: ActionId.ChromaKeyFill, type: ReqType.Get },
		{ id: ActionId.KeyPatternSourceFill, type: ReqType.Get },
		{ id: ActionId.PipSource, type: ReqType.Get },
	]
	return sendCommands(cmds)
}
