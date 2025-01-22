import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { GoStreamModel } from '../../models/types'
import { SettingsStateT } from './state'
export function create(_model: GoStreamModel): CompanionVariableDefinition[] {
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

export function getValues(state: SettingsStateT): CompanionVariableValues {
	const newValues: CompanionVariableValues = {}
	for (let i = 0; i < 9; i++) {
		newValues[`SrcId${i}_name`] = state.sourceName[i]
	}
	newValues['version'] = state['version']
	newValues['buildInfo'] = state['buildInfo']
	newValues['deviceId'] = state['deviceId']
	newValues['deviceName'] = state['deviceName']

	return newValues
}
