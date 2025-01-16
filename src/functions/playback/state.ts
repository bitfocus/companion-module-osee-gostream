import { ActionId } from './actionId'
import { sendCommands } from '../../connection'
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
	const cmds = [
		{ id: ActionId.PlaybackMode, type: ReqType.Get },
		{ id: ActionId.PlaybackRepeat, type: ReqType.Get },
		{ id: ActionId.PlaybackPause, type: ReqType.Get },
		{ id: ActionId.PlaybackBar, type: ReqType.Get },
		{ id: ActionId.PlaybackList, type: ReqType.Get },
	]
	await sendCommands(cmds)
}
