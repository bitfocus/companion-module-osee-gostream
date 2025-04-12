import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { FeedbackId } from './feedbackId'
import { RecordStateT } from './state'
import { GoStreamModel } from '../../models/types'
export function create(model: GoStreamModel, state: RecordStateT): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.Record]: {
			type: 'boolean',
			name: 'Record: Set Record Start or Stop',
			description: 'If you turn on Record Start, change style of the button',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return state.isRecording
			},
		},
		[FeedbackId.RecordQuality]: {
			type: 'boolean',
			name: 'Record: quality',
			description: 'change style of the button if record quality matches feedback',
			options: [
				{
					type: 'dropdown',
					label: 'Quality',
					id: 'Quality',
					choices: model.RecordQualityChoices(),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const qualityIndex = Number(feedback.options.Quality)
				return state.quality === Number(model.RecordQualityChoices()[qualityIndex].id)
			},
		},
	}
}
