import { ActionId } from './actionId'
import { sendCommands } from '../../connection'
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
	const cmds = [
		{ id: ActionId.PgmIndex, type: ReqType.Get },
		{ id: ActionId.PvwIndex, type: ReqType.Get },
		{ id: ActionId.AutoTransition, type: ReqType.Get },
		{ id: ActionId.Prev, type: ReqType.Get },
		{ id: ActionId.FTB, type: ReqType.Get },
		{ id: ActionId.FtbRate, type: ReqType.Get },
		{ id: ActionId.FtbAudioAFV, type: ReqType.Get },
		{ id: ActionId.TransitionIndex, type: ReqType.Get },
		{ id: ActionId.TransitionRate, type: ReqType.Get, value: [0] },
		{ id: ActionId.TransitionRate, type: ReqType.Get, value: [1] },
		{ id: ActionId.TransitionRate, type: ReqType.Get, value: [2] },
		{ id: ActionId.TransitionSource, type: ReqType.Get },
	]
	await sendCommands(cmds)
	return
}
