import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { VariableId } from './variableId'
import { GoStreamModel } from '../../models/types'
import { PlaybackStateT } from './state'
export function create(_model: GoStreamModel): CompanionVariableDefinition[] {
	return [
		{
			name: 'Play State of PlayBack',
			variableId: VariableId.PlayState,
		},
		{
			name: 'Loaded video file',
			variableId: VariableId.PlayFile,
		},
	]
}

export function getValues(state: PlaybackStateT): CompanionVariableValues {
	const newValues = {}
	newValues[VariableId.PlayState] = state.Pause ? 'Play' : 'Pause'
	newValues[VariableId.PlayFile] = state.FileList[state.File]
	return newValues
}
