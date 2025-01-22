import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { FeedbackId } from './feedbackId'
import { RecordStateT } from './state'
import { GoStreamModel } from '../../models/types'
export function create(_model: GoStreamModel, state: RecordStateT): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.Record]: {
			type: 'boolean',
			name: 'Record: Set Record Start or Stop',
			description: 'If you turn on Record Start, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return state.isRecording
			},
		},
	}
}
