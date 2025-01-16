import { ActionId } from './actionId'
import { sendCommands } from '../../connection'
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
	const cmds = [
		{ id: ActionId.AudioTransition, type: ReqType.Get },
		{ id: ActionId.AudioEnable, type: ReqType.Get, value: [0] },
		{ id: ActionId.AudioEnable, type: ReqType.Get, value: [1] },
		{ id: ActionId.AudioEnable, type: ReqType.Get, value: [2] },
		{ id: ActionId.AudioEnable, type: ReqType.Get, value: [3] },
		{ id: ActionId.AudioEnable, type: ReqType.Get, value: [4] },
		{ id: ActionId.AudioEnable, type: ReqType.Get, value: [5] },
		{ id: ActionId.AudioEnable, type: ReqType.Get, value: [6] },
	]
	await sendCommands(cmds)
}
