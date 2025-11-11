import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { VariableId } from './variableId'
import { StreamDeckState } from '../../connection/state'

export function create(_state: StreamDeckState): CompanionVariableDefinition[] {
	return [
		{
			name: 'Play State of PlayBack',
			variableId: VariableId.PlayState,
		},
		// {
		// 	name: 'Loaded video file',
		// 	variableId: VariableId.PlayFile,
		// },
	]
}

export function getValues(state: StreamDeckState): CompanionVariableValues {
	const newValues = {}
	newValues[VariableId.PlayState] = state.playBack.config[0]?.playStatus ? 'Play' : 'Pause'
	// newValues[VariableId.PlayFile] = state.FileList[state.File]
	return newValues
}
