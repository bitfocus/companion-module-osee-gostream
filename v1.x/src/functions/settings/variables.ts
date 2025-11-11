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
	vars.push({
		name: 'connected NDI source name',
		variableId: 'connectedNDISource_name',
	})
	vars.push({
		name: 'connected NDI source address',
		variableId: 'connectedNDISource_address',
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

	newValues['connectedNDISource_name'] = state.connectedNdiSource.name
	newValues['connectedNDISource_address'] = state.connectedNdiSource.address
	return newValues
}
