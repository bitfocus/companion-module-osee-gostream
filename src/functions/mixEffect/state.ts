import { ActionId } from './actionId'
import { sendCommands, GoStreamCmd } from '../../connection'
import { ReqType } from '../../enums'
import type { GoStreamModel } from '../../models/types'

export enum TransitionKey {
	USK = 1 << 0,
	DSK = 1 << 1,
	BKGD = 1 << 2,
}

export type MixEffectStateT = {
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
		style: number
		mixrate: number
		diprate: number
		wiperate: number
	}
	keyOnAir: boolean
	pvwOnAir: boolean
	tied: boolean
	onAir: boolean
	transitionKeys: number
}

export function create(_model: GoStreamModel): MixEffectStateT {
	return {
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
			style: 0,
			mixrate: 0,
			diprate: 0,
			wiperate: 0,
		},
		keyOnAir: false,
		pvwOnAir: false,
		tied: false,
		onAir: false,
		transitionKeys: TransitionKey.BKGD,
	}
}

export async function sync(model: GoStreamModel): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
		{ id: ActionId.KeyOnAir, type: ReqType.Get },
		{ id: ActionId.PgmIndex, type: ReqType.Get },
		{ id: ActionId.PvwIndex, type: ReqType.Get },
		{ id: ActionId.AutoTransition, type: ReqType.Get },
		{ id: ActionId.Prev, type: ReqType.Get },
		{ id: ActionId.FTB, type: ReqType.Get },
		{ id: ActionId.FtbRate, type: ReqType.Get },
		{ id: ActionId.FtbAudioAFV, type: ReqType.Get },
		{ id: ActionId.TransitionIndex, type: ReqType.Get },
		{ id: ActionId.TransitionSource, type: ReqType.Get },
	]

	for (let i = 0; i < model.transitionTypes; i++) {
		cmds.push({ id: ActionId.TransitionRate, type: ReqType.Get, value: [i] })
	}
	return await sendCommands(cmds)
}

export function update(state: MixEffectStateT, data: GoStreamCmd): boolean {
	if (!data.value) return false
	switch (data.id as ActionId) {
		case ActionId.PvwIndex: {
			if (data.value[0] !== undefined) {
				state.PvwSrc = data.value[0]
			}
			break
		}
		case ActionId.PgmIndex: {
			if (data.value[0] !== undefined) {
				state.PgmSrc = data.value[0]
			}
			break
		}
		case ActionId.KeyOnAir:
			state.keyOnAir = data.value && data.value[0] === 1 ? true : false
			break
		case ActionId.AutoTransition:
			state.transitionPosition.inTransition = data.value[0] === 1 ? true : false
			break
		case ActionId.FTB:
			if (data.value[0] === 0) {
				state.fadeToBlack.isFullyBlack = false
				state.fadeToBlack.inTransition = false
			} else if (data.value[0] === 1) {
				state.fadeToBlack.inTransition = false
				state.fadeToBlack.isFullyBlack = true
			} else if (data.value[0] === 2) {
				state.fadeToBlack.inTransition = true
			}
			break
		case ActionId.FtbAudioAFV:
			state.fadeToBlack.AFV = data.value[0] === 1 ? true : false
			break
		case ActionId.FtbRate:
			state.fadeToBlack.rate = data.value[0]
			break
		case ActionId.Prev:
			state.selectTransitionStyle.PrevState = Boolean(data.value[0])
			break
		case ActionId.TransitionIndex: {
			const selectValue = Number(data.value[0])
			state.selectTransitionStyle.style = selectValue
			break
		}
		case ActionId.TransitionRate: {
			const type = data.value[0]
			const typeValue = data.value[1]
			if (type === 0) {
				state.selectTransitionStyle.mixrate = typeValue
			} else if (type === 1) {
				state.selectTransitionStyle.diprate = typeValue
			} else if (type === 2) {
				state.selectTransitionStyle.wiperate = typeValue
			}
			break
		}
		case ActionId.TransitionSource:
			if (!data.value) return false
			state.transitionKeys = data.value[0]
			break
	}
	return false
}
