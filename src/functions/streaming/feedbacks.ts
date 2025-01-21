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
				console.log('Stream info', instance.states.Streaming.streamInfo)
				return instance.states.Streaming.streamInfo[Number(feedback.options.StreamID)].enabled
			},
		},
		[FeedbackId.LiveInfo]: {
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
						{ id: 1, label: 'on air' },
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
				return instance.states.Streaming.status === feedback.options.statesId
			},
		},
	}
}
