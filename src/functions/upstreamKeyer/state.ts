import { ActionId } from './actionId'
import { sendCommand } from '../../connection'
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
	await sendCommand(ActionId.KeyOnAir, ReqType.Get)
	await sendCommand(ActionId.UpStreamKeyType, ReqType.Get)
	await sendCommand(ActionId.LumaKeySourceFill, ReqType.Get)
	await sendCommand(ActionId.ChromaKeyFill, ReqType.Get)
	await sendCommand(ActionId.KeyPatternSourceFill, ReqType.Get)
	await sendCommand(ActionId.PipSource, ReqType.Get)
}
