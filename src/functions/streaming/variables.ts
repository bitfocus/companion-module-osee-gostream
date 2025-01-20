import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import type { GoStreamInstance } from '../../index'

function variableIdFromNumber(num: number): string {
	return 'Stream_' + num.toString() + '_state'
}
function createVariables(instance: GoStreamInstance): CompanionVariableDefinition[] {
	const variables: CompanionVariableDefinition[] = []
	for (let i = 0; i < instance.model.streams; i++) {
		variables.push({
			name: 'Stream ' + (i + 1).toString() + ' state',
			variableId: variableIdFromNumber(i + 1),
		})
	}

	return variables
}
export function create(instance: GoStreamInstance): CompanionVariableDefinition[] {
	return [...createVariables(instance)]
}

function getStateString(state: number): string {
	if (state === 0) return 'Off'
	if (state === 1) return 'OnAir'
	return 'Abnormal'
}
export function getValues(instance: GoStreamInstance): CompanionVariableValues {
	const newValues = {}
	for (let i = 0; i < instance.model.streams; i++) {
		newValues[variableIdFromNumber(i + 1)] = getStateString(instance.states.Streaming.streamInfo[i].status)
	}
	return newValues
}
