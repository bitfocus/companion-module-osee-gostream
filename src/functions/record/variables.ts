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
		{
			name: 'Recording quality',
			variableId: VariableId.RecordQuality,
		},
		{
			name: 'Recording: free space',
			variableId: VariableId.RecordFreeSpace,
		},
		{
			name: 'Recording: free time (hh:mm:ss)',
			variableId: VariableId.RecordFreeTime,
		},
		{
			name: 'Recording free space and time',
			variableId: VariableId.RecordFree,
		},
		{
			name: 'Recoding media present (SD or SSD)',
			variableId: VariableId.RecordMediaPresent,
		},
	]
}

export function getValues(state: RecordStateT): CompanionVariableValues {
	const newValues: CompanionVariableValues = {}
	newValues[VariableId.RecordDuration] = state.recordTime
	newValues[VariableId.RecordQuality] = state.quality
	newValues[VariableId.RecordFreeSpace] = state.freeSpace
	newValues[VariableId.RecordFreeTime] = state.freeTime
	newValues[VariableId.RecordFree] = state.freeSpaceTime
	newValues[VariableId.RecordMediaPresent] = state.storageMediaPresent
	return newValues
}
