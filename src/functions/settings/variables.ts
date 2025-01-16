import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import type { GoStreamInstance } from '../../index'

export function create(_instance: GoStreamInstance): CompanionVariableDefinition[] {
	const vars: CompanionVariableDefinition[] = []
	for (let i = 0; i < 9; i++) {
		vars.push({
			name: `SrcId ${i} name`,
			variableId: `SrcId${i}_name`,
		})
	}
	return vars
}

export function getValues(instance: GoStreamInstance): CompanionVariableValues {
	const newValues: CompanionVariableValues = {}
	for (let i = 0; i < 9; i++) {
		newValues[`SrcId${i}_name`] = instance.states.Settings.sourceName[i]
	}
	return newValues
}
