import { ActionId } from './actionId'
import { sendCommand, GoStreamData } from '../../connection'
import { ReqType } from '../../enums'
import { GoStreamInstance } from '../../index'
import { TransitionStyleChoice } from '../../model'
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

export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.PvwIndex: {
			if (data.value[0] !== undefined) {
				instance.states.MixEffect.PvwSrc = data.value[0]
			}
			return true
		}
		case ActionId.PgmIndex: {
			if (data.value[0] !== undefined) {
				instance.states.MixEffect.PgmSrc = data.value[0]
			}
			return true
		}
		case ActionId.AutoTransition:
			instance.states.MixEffect.transitionPosition.inTransition = data.value[0] === 1 ? true : false
			return true
		case ActionId.FTB:
			if (data.value[0] === 0) {
				instance.states.MixEffect.fadeToBlack.isFullyBlack = false
				instance.states.MixEffect.fadeToBlack.inTransition = false
			} else if (data.value[0] === 1) {
				instance.states.MixEffect.fadeToBlack.inTransition = false
				instance.states.MixEffect.fadeToBlack.isFullyBlack = true
			} else if (data.value[0] === 2) {
				instance.states.MixEffect.fadeToBlack.inTransition = true
			}
			return true
		case ActionId.FtbAudioAFV:
			instance.states.MixEffect.fadeToBlack.AFV = data.value[0] === 1 ? true : false
			return true
		case ActionId.FtbRate:
			instance.states.MixEffect.fadeToBlack.rate = data.value[0]
			return true
		case ActionId.Prev:
			instance.states.MixEffect.selectTransitionStyle.PrevState = data.value[0] === 1 ? true : false
			return true
		case ActionId.TransitionIndex: {
			const selectValue = Number(data.value[0])
			const selectStyle = TransitionStyleChoice.find((s) => s.id === selectValue)
			if (selectStyle !== undefined) {
				instance.states.MixEffect.selectTransitionStyle.style = selectStyle
			}
			return true
		}
		case ActionId.TransitionRate: {
			const type = data.value[0]
			const typeValue = data.value[1]
			if (type === 0) {
				instance.states.MixEffect.selectTransitionStyle.mixrate = typeValue
			} else if (type === 1) {
				instance.states.MixEffect.selectTransitionStyle.diprate = typeValue
			} else if (type === 2) {
				instance.states.MixEffect.selectTransitionStyle.wiperate = typeValue
			}
			return true
		}
		case ActionId.TransitionSource: {
			/*const intstate = Number(data.value[0])
			if ((intstate & 1) === 1) {
				instance.states.MixEffect.TKeyeState.M_Key = true
			} else {
				instance.states.MixEffect.TKeyeState.M_Key = false
			}
			if (((intstate >> 1) & 1) === 1) {
				instance.states.MixEffect.TKeyeState.DSK = true
			} else {
				instance.states.MixEffect.TKeyeState.DSK = false
			}
			if (((intstate >> 2) & 1) === 1) {
				instance.states.MixEffect.TKeyeState.BKGD = true
			} else {
				instance.states.MixEffect.TKeyeState.BKGD = false
			}*/
			//instance.log('info',intstate.toString());
			return true
		}
	}
	return false
}
