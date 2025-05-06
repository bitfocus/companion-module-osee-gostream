import { ActionId } from './actionId'
import { sendCommands, GoStreamCmd } from '../../connection'
import { ReqType } from '../../enums'
import type { GoStreamModel } from '../../models/types'

export type PlaybackStateT = {
	Mode: number
	Repeat: boolean
	Pause: boolean
	Bar: boolean
	File: number
	Playhead: number
	Playlength: number
	// Not really state variable, hold videofile list
	// TODO: place somewhere more logical
	FileList: string[]
}

export function create(_model: GoStreamModel): PlaybackStateT {
	return {
		Mode: 0,
		Repeat: false,
		Pause: false,
		Bar: false,
		Playhead: 0,
		Playlength: 0,
		File: 0,
		FileList: [],
	}
}

export async function sync(_model: GoStreamModel): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
		{ id: ActionId.PlaybackMode, type: ReqType.Get },
		{ id: ActionId.PlaybackRepeat, type: ReqType.Get },
		{ id: ActionId.PlaybackPause, type: ReqType.Get },
		{ id: ActionId.PlaybackBar, type: ReqType.Get },
		{ id: ActionId.PlaybackList, type: ReqType.Get },
		{ id: ActionId.PlaybackPlayhead, type: ReqType.Get },
	]
	return await sendCommands(cmds)
}
export function update(state: PlaybackStateT, data: GoStreamCmd): boolean {
	switch (data.id as ActionId) {
		case ActionId.PlaybackMode:
			state.Mode = Number(data.value![0])
			break
		case ActionId.PlaybackRepeat:
			state.Repeat = Boolean(data.value![0])
			break
		case ActionId.PlaybackPause:
			state.Pause = Boolean(data.value![0])
			break
		case ActionId.PlaybackBar:
			state.Bar = Boolean(data.value![0])
			break
		case ActionId.PlayFile:
			state.File = state.FileList.indexOf(String(data.value![0]))
			break
		case ActionId.PlaybackPlayhead:
			state.Playhead = Number(data.value![0])
			state.Playlength = Number(data.value![1])
			break
		case ActionId.PlaybackList:
			if (!('value' in data)) {
				// list is empty
				state.FileList = []
			} else {
				state.FileList = <string[]>data.value
			}
			return true
	}
	return false
}
