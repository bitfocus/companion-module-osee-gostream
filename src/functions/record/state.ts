import { ActionId } from './actionId'
import { sendCommand } from '../../connection'
import { ReqType } from '../../enums'
import type { GoStreamModel } from '../../models/types'
import { GoStreamCmd } from '../../connection'

export type RecordStateT = {
	isRecording: boolean
	recordTime: string
}

export function create(_model: GoStreamModel): RecordStateT {
	return {
		isRecording: false,
		recordTime: '',
	}
}

export async function sync(_model: GoStreamModel): Promise<boolean> {
	return await sendCommand(ActionId.Record, ReqType.Get)
}

export function update(state: RecordStateT, data: GoStreamCmd): boolean {
	switch (data.id as ActionId) {
		case ActionId.Record:
			state.isRecording = data.value![0] === 1 ? true : false
			break
		case ActionId.RecordTime:
			state.recordTime = data.value![0].toString()
			break
	}
	return false
}
