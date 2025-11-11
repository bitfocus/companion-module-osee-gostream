import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { VariableId } from './variableId'
import { StreamDeckState } from '../../connection/state'

function secondsToHHMMSS(seconds: number): string {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export function create(_state: StreamDeckState): CompanionVariableDefinition[] {
	return [
		{
			name: 'Recording duration (hh:mm)',
			variableId: VariableId.RecordDuration,
		},
		{
			name: 'Recording Current duration (hh:mm)',
			variableId: VariableId.RecordCurDuration,
		},
		{
			name: 'Recording quality',
			variableId: VariableId.RecordQuality,
		},
		{
			name: 'Recording: PGM free space',
			variableId: VariableId.PGMRecordFreeSpace,
		},
		{
			name: 'Recording: PGM free time (hh:mm:ss)',
			variableId: VariableId.PGMRecordFreeTime,
		},
		{
			name: 'Recording: ISO free space',
			variableId: VariableId.ISORecordFreeSpace,
		},
		{
			name: 'Recording: ISO free time (hh:mm:ss)',
			variableId: VariableId.ISORecordFreeTime,
		},
		{
			name: 'Recoding media present (SD or SSD)',
			variableId: VariableId.RecordErrCode,
		},
	]
}

export function getValues(state: StreamDeckState): CompanionVariableValues {
	const newValues: CompanionVariableValues = {}
	newValues[VariableId.RecordCurDuration] = secondsToHHMMSS(state.record.recordTime?state.record.recordTime:0)
	newValues[VariableId.RecordDuration] = state.record.recordTime
	newValues[VariableId.RecordQuality] = state.record.quality
	newValues[VariableId.PGMRecordFreeSpace] = state.record.recordFree.freeSpace
	newValues[VariableId.PGMRecordFreeTime] = state.record.recordFree.freeTime
	newValues[VariableId.ISORecordFreeSpace] = state.record.ISORecordFree.freeSpace
	newValues[VariableId.ISORecordFreeTime] = state.record.ISORecordFree.freeTime
	newValues[VariableId.RecordErrCode] = state.record.isoErrCode
	return newValues
}
