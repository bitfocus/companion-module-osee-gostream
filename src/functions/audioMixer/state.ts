import { ActionId } from './actionId'
import { sendCommand } from '../../connection'
import { ReqType } from '../../enums'

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
