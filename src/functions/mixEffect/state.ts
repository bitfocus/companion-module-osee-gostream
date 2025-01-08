import { ActionId } from './actionId'
import { sendCommand } from '../../connection'
import { ReqType } from '../../enums'
import { Choice } from '../../choices'

export type State = {
	PvwSrc: number
	PgmSrc: number
	transitionPosition: {
		inTransition: boolean
		handlePosition: number
	}
	fadeToBlack: {
		inTransition: boolean
		isFullyBlack: boolean
		AFV: boolean
		rate: number
	}
	selectTransitionStyle: {
		PrevState: boolean
		style: Choice
		mixrate: number
		diprate: number
		wiperate: number
	}
}

export type MixEffectState = {
	MixEffect: State
}

export function create(): MixEffectState {
	return {
		MixEffect: {
			PvwSrc: 0,
			PgmSrc: 0,
			transitionPosition: {
				inTransition: false,
				handlePosition: 0,
			},
			fadeToBlack: {
				inTransition: false,
				isFullyBlack: false,
				AFV: false,
				rate: 0,
			},
			selectTransitionStyle: {
				PrevState: false,
				style: { id: 0, label: 'MIX' },
				mixrate: 0,
				diprate: 0,
				wiperate: 0,
			},
		},
	}
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.PgmIndex, ReqType.Get)
	await sendCommand(ActionId.PvwIndex, ReqType.Get)
	await sendCommand(ActionId.AutoTransition, ReqType.Get)
	await sendCommand(ActionId.Prev, ReqType.Get)
	await sendCommand(ActionId.FTB, ReqType.Get)
	await sendCommand(ActionId.FtbRate, ReqType.Get)
	await sendCommand(ActionId.FtbAudioAFV, ReqType.Get)
	await sendCommand(ActionId.TransitionIndex, ReqType.Get)
	await sendCommand(ActionId.TransitionRate, ReqType.Get, [0])
	await sendCommand(ActionId.TransitionRate, ReqType.Get, [1])
	await sendCommand(ActionId.TransitionRate, ReqType.Get, [2])
	await sendCommand(ActionId.TransitionSource, ReqType.Get)
}
