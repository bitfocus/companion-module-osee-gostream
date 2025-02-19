import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { FeedbackId } from './feedbackId'
import { StreamingChoices } from '../../model'
import { StreamingStateT } from './state'
import { GoStreamModel } from '../../models/types'

export function create(_model: GoStreamModel, state: StreamingStateT): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.StreamOutput]: {
			type: 'boolean',
			name: 'Streaming: Set Stream Enable',
			description: 'If you turn on Stream Enable, change style of the button',
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
				return state.streamInfo[Number(feedback.options.StreamID)].enabled
			},
		},
		[FeedbackId.LiveInfo]: {
			type: 'boolean',
			name: 'Live: Set Live Start or Stop',
			description: 'If you turn on Live Start, change style of the button',
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
				return state.status === feedback.options.statesId
			},
		},
	}
}
