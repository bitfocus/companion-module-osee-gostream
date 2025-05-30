import { ActionId } from './actionId'
import { sendCommands } from '../../connection'
import { ReqType, PortCaps, ActionType } from '../../enums'
import type { GoStreamModel } from '../../models/types'
import { Range } from '../../util'
import { GoStreamCmd } from '../../connection'

export enum AudioState {
	Off = 0,
	On = 1,
	AFV = 2,
}

export type AudioMixerStateT = {
	model: GoStreamModel
	transitionEnabled: boolean
	state: AudioState[]
	fader: number[]
	monitorSource: number
	monitorLevel: number
}

export function create(model: GoStreamModel): AudioMixerStateT {
	// the number of audio capabale items (including PGM, for example but not headphones)
	const audioCapableInputs = model.inputs.filter((inp) => inp.caps & PortCaps.Audio).length
	const nrFaderSource = model.getChoices(ActionType.AudioFader).length

	return {
		model: model,
		transitionEnabled: false,
		state: Array(audioCapableInputs), //enable/disable/afv
		fader: Array(nrFaderSource),
		monitorSource: 0,
		monitorLevel: 0,
	}
}

export async function sync(model: GoStreamModel): Promise<boolean> {
	const audioCapableInputs = model.inputs.filter((inp) => inp.caps & PortCaps.Audio).length
	const faderSources = model.getChoices(ActionType.AudioFader)

	const cmds = [
		{ id: ActionId.AudioTransition, type: ReqType.Get },
		...Range(audioCapableInputs).map((id) => ({ id: ActionId.AudioEnable, type: ReqType.Get, value: [id] })),
		...faderSources.map(({ id }) => ({ id: ActionId.AudioFader, type: ReqType.Get, value: [id] })),
		{ id: ActionId.AudioMonitorSource, type: ReqType.Get },
		{ id: ActionId.AudioMonitorLevel, type: ReqType.Get },
	]
	return await sendCommands(cmds)
}

export function update(state: AudioMixerStateT, data: GoStreamCmd): boolean {
	if (!data.value) return false
	switch (data.id as ActionId) {
		case ActionId.AudioTransition:
			state.transitionEnabled = data.value[0] === 1 ? true : false
			break
		case ActionId.AudioEnable: {
			const audiotype = data.value[0]
			const audiotypeValue = data.value[1]
			state.state[audiotype] = audiotypeValue
			break
		}
		case ActionId.AudioFader: {
			const audiotype = data.value[0]
			const audiotypeValue = data.value[1]
			state.fader[audiotype] = audiotypeValue
			break
		}
		case ActionId.AudioMonitorSource: {
			state.monitorSource = Number(data.value[0])
			break
		}
		case ActionId.AudioMonitorLevel: {
			state.monitorLevel = Number(data.value[0])
			break
		}
	}
	return false
}
