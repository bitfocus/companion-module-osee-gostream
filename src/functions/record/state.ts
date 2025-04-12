import { ActionId } from './actionId'
import { sendCommands } from '../../connection'
import { ReqType } from '../../enums'
import type { GoStreamModel } from '../../models/types'
import { GoStreamCmd } from '../../connection'

export type RecordStateT = {
	isRecording: boolean
	recordTime: string
	quality: number
}

export function create(_model: GoStreamModel): RecordStateT {
	return {
		isRecording: false,
		recordTime: '',
		quality: 0,
	}
}

export async function sync(_model: GoStreamModel): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
		{ id: ActionId.Record, type: ReqType.Get },
		{ id: 'quality', type: ReqType.Get, value: [0] },
	]
	return sendCommands(cmds)
}

export function update(state: RecordStateT, data: GoStreamCmd): boolean {
	switch (data.id as ActionId) {
		case ActionId.Record:
			state.isRecording = Boolean(data.value![0])
			break
		case ActionId.RecordTime:
			state.recordTime = String(data.value![0])
			break
		case 'quality' as ActionId:
			// 0 indicates record
			if (data.value![0] == 0) {
				state.quality = Number(data.value![1])
			}
			break
	}
	return false
}
