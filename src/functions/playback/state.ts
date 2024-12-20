import { ActionId } from './actionId'
import { sendCommand, GoStreamData } from '../../connection'
import { ReqType } from '../../enums'
import { GoStreamInstance } from '../../index'

export type State = {
	Mode: number
	Repeat: boolean
	Pause: boolean
	Bar: boolean
	File: number
	// Not really state variable, hold videofile list
	// TODO: place somewhere more logical
	FileList: string[]
}

export type PlaybackState = {
	Playback: State
}

export function create(): PlaybackState {
	return {
		Playback: {
			Mode: 0,
			Repeat: false,
			Pause: false,
			Bar: false,
			File: 0,
			// Not really state variable, hold videofile list
			// TODO: place somewhere more logical
			FileList: [],
		},
	}
}

export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.PlaybackMode:
			instance.states.Playback.Mode = data.value[0]
			break
		case ActionId.PlaybackRepeat:
			instance.states.Playback.Repeat = data.value[0] === 1 ? true : false
			break
		case ActionId.PlaybackPause:
			instance.states.Playback.Pause = data.value[0] === 1 ? true : false
			//updatePlayStatedVariables(instance, instance.states.PlayBackState.PlaybackPause)
			break
		case ActionId.PlaybackBar:
			instance.states.Playback.Bar = data.value[0] === 1 ? true : false
			break
		case ActionId.PlayFile:
			instance.states.Playback.File = instance.states.Playback.FileList.indexOf(data.value[0])
			//updatePlayFileVariables(instance, data.value[0])
			break
		case ActionId.PlaybackList:
			instance.states.Playback.FileList = instance.states.Playback.FileList.concat(data.value)
			// Re-initialize actions and feedbackls so that dropdown are updated
			instance.init_actions()
			instance.init_feedbacks()
			break
	}
	return false
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.PlaybackMode, ReqType.Get)
	await sendCommand(ActionId.PlaybackRepeat, ReqType.Get)
	await sendCommand(ActionId.PlaybackPause, ReqType.Get)
	await sendCommand(ActionId.PlaybackBar, ReqType.Get)
	await sendCommand(ActionId.PlaybackList, ReqType.Get)
}
