import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import type { GoStreamInstance } from '../../index'
import { FeedbackId } from './feedbackId'
import { StreamingChoices } from '../../model'

export function create(instance: GoStreamInstance): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.StreamOutput]: {
			type: 'boolean',
			name: 'Streamming: Set Stream Enable',
			description: 'If you turn on Stream Enable, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Stream',
					id: 'StreamID',
					choices: StreamingChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				if (feedback.options.StreamID === 0) {
					return instance.states.StreamingProp.stream1
				} else if (feedback.options.StreamID === 1) {
					return instance.states.StreamingProp.stream2
				} else if (feedback.options.StreamID === 2) {
					return instance.states.StreamingProp.stream3
				}
				return false
			},
		},
	}
}
