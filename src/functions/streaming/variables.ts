import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { StreamDeckState } from '../../connection/state'

function variableIdFromNumber(num: number): string {
	return 'Stream_' + num.toString() + '_state'
}
function createVariables(state: StreamDeckState): CompanionVariableDefinition[] {
	const variables: CompanionVariableDefinition[] = []
	for (let i = 0; i < state.device.inputSources.length; i++) {
		variables.push({
			name: 'Stream ' + (i + 1).toString() + ' state',
			variableId: variableIdFromNumber(i + 1),
		})
	}

	return variables
}
export function create(state: StreamDeckState): CompanionVariableDefinition[] {
	return [...createVariables(state)]
}

function getStateString(state: number): string {
	if (state === 0) return 'Off'
	if (state === 1) return 'OnAir'
	return 'Abnormal'
}
export function getValues(state: StreamDeckState): CompanionVariableValues {
	const newValues = {}
	const length = Object.values(state.stream.streamInfos).filter(value => value !== undefined).length;
	for (let i = 0; i < length; i++) {
		var stream =state.stream.streamInfos[i];
		if(stream) newValues[variableIdFromNumber(i + 1)] = getStateString(stream.status)
	}
	return newValues
}
