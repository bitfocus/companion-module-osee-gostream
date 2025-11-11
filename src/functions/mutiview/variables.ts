import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { StreamDeckState } from '../../connection/state'
export function create(_state: StreamDeckState): CompanionVariableDefinition[] {
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

export function getValues(_state: StreamDeckState): CompanionVariableValues {
	const newValues: CompanionVariableValues = {}
	
	newValues['version'] = '10.0'
	return newValues
}
