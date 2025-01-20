import { ActionId } from './actionId'
import { sendCommands } from '../../connection'
import { ReqType, PortCaps } from '../../enums'
import type { IModelSpec } from '../../models/types'
import { Range } from '../../util'
import { GoStreamCmd } from '../../connection'

export type AudioMixerState = {
	transitionEnabled: boolean
	enabled: boolean[]
}

export function create(model: IModelSpec): AudioMixerState {
	const audioCapableInputs = model.inputs.filter((inp) => inp.caps & PortCaps.Audio).length

	return {
		transitionEnabled: false,
		enabled: Array(audioCapableInputs),
	}
}

export async function sync(model: IModelSpec): Promise<boolean> {
	const audioCapableInputs = model.inputs.filter((inp) => inp.caps & PortCaps.Audio).length

	const cmds = [
		{ id: ActionId.AudioTransition, type: ReqType.Get },
		...Range(audioCapableInputs).map((id) => ({ id: ActionId.AudioEnable, type: ReqType.Get, value: [id] })),
	]
	return await sendCommands(cmds)
}

export function update(state: AudioMixerState, data: GoStreamCmd): boolean {
	if (!data.value) return false
	switch (data.id as ActionId) {
		case ActionId.AudioTransition:
			state.transitionEnabled = data.value[0] === 1 ? true : false
			break
		case ActionId.AudioEnable: {
			const audiotype = data.value[0]
			const audiotypeValue = data.value[1]
			state.enabled[audiotype] = audiotypeValue
			break
		}
	}
	return false
}
