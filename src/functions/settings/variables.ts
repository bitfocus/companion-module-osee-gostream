import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { GoStreamModel } from '../../models/types'
import { SettingsStateT } from './state'
import { SettingsAuxSourceChoices } from './../../model'

export function create(model: GoStreamModel): CompanionVariableDefinition[] {
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
	vars.push({
		name: 'Aux Source',
		variableId: 'auxSource',
	})
	vars.push({
		name: 'Aux Storage Device',
		variableId: 'auxStorageDevice',
	})

	for (const dditem of model.outputPorts) {
		const outport = dditem.label
		const output_sym = outport.replaceAll(' ', '_')
		vars.push({
			name: `${outport} Output Source`,
			variableId: `OutputSource_${output_sym}`,
		})
	}

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

	newValues['auxSource'] = SettingsAuxSourceChoices.find((item) => item.id === state.auxSource)?.label
	newValues['auxStorageDevice'] = state.storageDevice

	// Output Sources
	for (const dditem of state.model.outputPorts) {
		const outport = dditem.label
		const output_sym = outport.replaceAll(' ', '_')
		const idx = dditem.id
		newValues[`OutputSource_${output_sym}`] = state.model
			.OutputSources()
			.find((item) => item.id === state.outSource[idx])?.label
	}

	return newValues
}
