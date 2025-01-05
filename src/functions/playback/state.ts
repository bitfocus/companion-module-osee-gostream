import { ActionId } from './actionId'
import { sendCommand } from '../../connection'
import { ReqType } from '../../enums'

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

export async function sync(): Promise<void> {
	await sendCommand(ActionId.PlaybackMode, ReqType.Get)
	await sendCommand(ActionId.PlaybackRepeat, ReqType.Get)
	await sendCommand(ActionId.PlaybackPause, ReqType.Get)
	await sendCommand(ActionId.PlaybackBar, ReqType.Get)
	await sendCommand(ActionId.PlaybackList, ReqType.Get)
}
