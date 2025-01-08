import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import type { GoStreamInstance } from '../../index'
import { FeedbackId } from './feedbackId'

export function create(instance: GoStreamInstance): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.Live]: {
			type: 'boolean',
			name: 'Live: Set Live Start or Stop',
			description: 'If you turn on Live Start, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'states',
					id: 'statesId',
					choices: [
						{ id: 0, label: 'off' },
						{ id: 1, label: 'on' },
						{ id: 2, label: 'abnormal' },
					],
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				return instance.states.Live.State === feedback.options.statesId
			},
		},
	}
}
