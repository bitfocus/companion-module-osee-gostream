import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { FeedbackId } from './feedbackId'
import { RecordStateT } from './state'
import { GoStreamModel } from '../../models/types'
import { getOptString, makeChoices } from '../../util'

export function create(_model: GoStreamModel, state: RecordStateT): CompanionFeedbackDefinitions {
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
		[FeedbackId.Quality]: {
			type: 'boolean',
			name: 'Record:Quality',
			description: 'The recording quality (high...low)',
			options: [
				{
					type: 'dropdown',
					label: 'Quality',
					id: 'Quality',
					...makeChoices(state.qualityValues()),
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (action) => {
				return state.quality === getOptString(action, 'Quality')
			},
		},
	}
}
