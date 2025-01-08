import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import type { GoStreamInstance } from '../../index'
import { VariableId } from './variableId'
export function create(_instance: GoStreamInstance): CompanionVariableDefinition[] {
	return [
		{
			name: 'Recording duration (hh:mm)',
			variableId: VariableId.RecordDuration,
		},
	]
}

export function getValues(instance: GoStreamInstance): CompanionVariableValues {
	const newValues: CompanionVariableValues = {}
	newValues[VariableId.RecordDuration] = instance.states.Record.RecordTime
	return newValues
}
