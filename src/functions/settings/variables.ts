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

	vars.push({
		name: 'version',
		variableId: 'version',
	})
	vars.push({
		name: 'build',
		variableId: 'buildInfo',
	})
	vars.push({
		name: 'device id',
		variableId: 'deviceId',
	})
	vars.push({
		name: 'device name',
		variableId: 'deviceName',
	})

	return vars
}

export function getValues(instance: GoStreamInstance): CompanionVariableValues {
	const newValues: CompanionVariableValues = {}
	for (let i = 0; i < 9; i++) {
		newValues[`SrcId${i}_name`] = instance.states.Settings.sourceName[i]
	}
	newValues['version'] = instance.states.Settings['version']
	newValues['buildInfo'] = instance.states.Settings['buildInfo']
	newValues['deviceId'] = instance.states.Settings['deviceId']
	newValues['deviceName'] = instance.states.Settings['deviceName']

	return newValues
}
