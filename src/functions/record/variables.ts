import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { VariableId } from './variableId'
import { GoStreamModel } from '../../models/types'
import { RecordStateT } from './state'

export function create(_model: GoStreamModel): CompanionVariableDefinition[] {
	return [
		{
			name: 'Recording duration (hh:mm)',
			variableId: VariableId.RecordDuration,
		},
	]
}

export function getValues(state: RecordStateT): CompanionVariableValues {
	const newValues: CompanionVariableValues = {}
	newValues[VariableId.RecordDuration] = state.recordTime
	return newValues
}
