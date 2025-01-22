import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { GoStreamModel } from '../../models/types'
import { StreamingStateT } from './state'

function variableIdFromNumber(num: number): string {
	return 'Stream_' + num.toString() + '_state'
}
function createVariables(model: GoStreamModel): CompanionVariableDefinition[] {
	const variables: CompanionVariableDefinition[] = []
	for (let i = 0; i < model.streams; i++) {
		variables.push({
			name: 'Stream ' + (i + 1).toString() + ' state',
			variableId: variableIdFromNumber(i + 1),
		})
	}

	return variables
}
export function create(model: GoStreamModel): CompanionVariableDefinition[] {
	return [...createVariables(model)]
}

function getStateString(state: number): string {
	if (state === 0) return 'Off'
	if (state === 1) return 'OnAir'
	return 'Abnormal'
}
export function getValues(state: StreamingStateT): CompanionVariableValues {
	const newValues = {}
	for (let i = 0; i < state.streamInfo.length; i++) {
		newValues[variableIdFromNumber(i + 1)] = getStateString(state.streamInfo[i].status)
	}
	return newValues
}
