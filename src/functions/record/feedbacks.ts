import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import type { GoStreamInstance } from '../../index'
import { FeedbackId } from './feedbackId'

export function create(instance: GoStreamInstance): CompanionFeedbackDefinitions {
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
				return instance.states.RecordState
			},
		},
	}
}
