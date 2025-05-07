import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { VariableId } from './variableId'
import { GoStreamModel } from '../../models/types'
import { PlaybackStateT } from './state'
export function create(_model: GoStreamModel): CompanionVariableDefinition[] {
	return [
		{
			name: 'Playback state (play/pause)',
			variableId: VariableId.PlayState,
		},
		{
			name: 'Loaded video file',
			variableId: VariableId.PlayFile,
		},
		{
			name: 'Playhead (s)',
			variableId: VariableId.PlaybackPlayhead,
		},
		{
			name: 'Video length (s)',
			variableId: VariableId.PlaybackPlaylength,
		},
		{
			name: 'Playhead (MM:SS)',
			variableId: VariableId.PlaybackPlayheadMMSS,
		},
		{
			name: 'Time remaining (MM:SS)',
			variableId: VariableId.PlaybackRemainingMMSS,
		},
		{
			name: 'Video length (MM:SS)',
			variableId: VariableId.PlaybackPlaylengthMMSS,
		},
	]
}

function asMMSS(seconds: number, maxval: number = seconds): string {
	// return "MM:SS" if interval is less than an hour; otherwise "HH:MM:SS"
	//  if maxval is specified, it is used for deciding whether to add "HH:"
	//  (so if cliplength is 1:00:00 but time remaining is 40s, it will still format it to match cliplength)
	let minutes = Math.floor(seconds / 60)
	seconds -= minutes * 60
	const hours = Math.floor(minutes / 60)
	if (hours > 0) {
		minutes -= hours * 60
	}

	const hourStr = (hours < 10 ? '0' : '') + hours + ':'
	const minutesStr = (minutes < 10 ? '0' : '') + minutes + ':'
	const secStr = (seconds < 10 ? '0' : '') + seconds

	return (maxval >= 3600 ? hourStr : '') + minutesStr + secStr
}

export function getValues(state: PlaybackStateT): CompanionVariableValues {
	const newValues = {}
	newValues[VariableId.PlayState] = state.Pause ? 'Play' : 'Pause'
	newValues[VariableId.PlayFile] = state.FileList[state.File]
	newValues[VariableId.PlaybackPlayhead] = state.Playhead
	newValues[VariableId.PlaybackPlaylength] = state.Playlength
	newValues[VariableId.PlaybackPlayheadMMSS] = asMMSS(state.Playhead, state.Playlength)
	newValues[VariableId.PlaybackRemainingMMSS] = asMMSS(state.Playlength - state.Playhead)
	newValues[VariableId.PlaybackPlaylengthMMSS] = asMMSS(state.Playlength)
	return newValues
}
