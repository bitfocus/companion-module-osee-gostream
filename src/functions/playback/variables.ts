import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import type { GoStreamInstance } from '../../index'
import { VariableId } from './variableId'

export function create(_instance: GoStreamInstance): CompanionVariableDefinition[] {
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

export function getValues(instance: GoStreamInstance): CompanionVariableValues {
	const newValues = {}
	newValues[VariableId.PlayState] = instance.states.Playback.Pause ? 'Play' : 'Pause'
	newValues[VariableId.PlayFile] = instance.states.Playback.FileList[instance.states.Playback.File]
	return newValues
}
