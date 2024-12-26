import { ActionId } from './actionId'
import { sendCommand, GoStreamData } from '../../connection'
import { ReqType } from '../../enums'
import { GoStreamInstance } from '../../index'

export type State = {
	transitionEnabled: boolean
	micEnabled: boolean[]
	inputEnabled: boolean[]
	auxEnabled: boolean[]
}

export type AudioMixerState = {
	AudioMixer: State
}

export function create(): AudioMixerState {
	return {
		AudioMixer: {
			transitionEnabled: false,
			micEnabled: [false, false],
			inputEnabled: [false, false, false, false],
			auxEnabled: [false],
		},
	}
}

export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.AudioTransition:
			instance.states.AudioMixer.transitionEnabled = data.value[0] === 1 ? true : false
			return true
		case ActionId.AudioEnable: {
			const audiotype = data.value[0]
			const audiotypeValue = data.value[1]
			if (audiotype == 0) {
				instance.states.AudioMixer.micEnabled[0] = audiotypeValue
			} else if (audiotype == 1) {
				instance.states.AudioMixer.micEnabled[1] = audiotypeValue
			} else if (audiotype == 2) {
				instance.states.AudioMixer.inputEnabled[0] = audiotypeValue
			} else if (audiotype == 3) {
				instance.states.AudioMixer.inputEnabled[1] = audiotypeValue
			} else if (audiotype == 4) {
				instance.states.AudioMixer.inputEnabled[2] = audiotypeValue
			} else if (audiotype == 5) {
				instance.states.AudioMixer.inputEnabled[3] = audiotypeValue
			} else if (audiotype == 6) {
				instance.states.AudioMixer.auxEnabled[0] = audiotypeValue
			}
			return true
		}
	}
	return false
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.AudioTransition, ReqType.Get)
	await sendCommand(ActionId.AudioEnable, ReqType.Get, [0])
	await sendCommand(ActionId.AudioEnable, ReqType.Get, [1])
	await sendCommand(ActionId.AudioEnable, ReqType.Get, [2])
	await sendCommand(ActionId.AudioEnable, ReqType.Get, [3])
	await sendCommand(ActionId.AudioEnable, ReqType.Get, [4])
	await sendCommand(ActionId.AudioEnable, ReqType.Get, [5])
	await sendCommand(ActionId.AudioEnable, ReqType.Get, [6])
}