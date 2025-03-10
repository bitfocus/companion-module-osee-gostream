import { CommId } from './actionId'
import { sendCommands } from '../../connection'
import { ReqType } from '../../enums'
import type { GoStreamModel } from '../../models/types'
import { GoStreamCmd } from '../../connection'

export class RecordStateT {
	model: GoStreamModel
	isRecording = false
	recordTime = ''
	quality: string | undefined
	constructor(model: GoStreamModel) {
		this.model = model
	}

	qualityValues(_protocolOrder = false): string[] {
		// setting protocolOrder to true guarantees it will correspond to the
		//  Osee communication protocol's index numbers. In this case it's a noop
		return ['high', 'good', 'medium', 'low']
	}

	encodeRecordingQuality(val: string): number[] {
		// the first value is 0 = recording, 1 = streaming
		return [0, this.qualityValues(true).indexOf(val)]
	}

	decodeRecordingQuality(vals: number[]): string | undefined {
		// only save it if it's a recording quality
		if (vals[0] === 0 && vals.length === 2) {
			const qualities = this.qualityValues(true)
			return qualities[vals[1]]
		} else {
			return undefined
		}
	}
}

export async function sync(_model: GoStreamModel): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
		{ id: CommId.Record, type: ReqType.Get },
		{ id: CommId.Quality, type: ReqType.Get, value: [0] },
	]
	return sendCommands(cmds)
}

export function update(state: RecordStateT, data: GoStreamCmd): boolean {
	switch (data.id as CommId) {
		case CommId.Record:
			state.isRecording = Boolean(data.value![0])
			break
		case CommId.RecordTime:
			state.recordTime = String(data.value![0])
			break
		case CommId.Quality:
			state.quality = state.decodeRecordingQuality(<number[]>data.value)
			break
	}
	return false
}
