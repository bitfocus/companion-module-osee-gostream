import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { FeedbackId } from './feedbackId'
import { RecordStateT } from './state'
import { GoStreamModel } from '../../models/types'
import { getOptString, makeChoices } from '../../util'

export function create(_model: GoStreamModel, state: RecordStateT): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.Record]: {
			type: 'boolean',
			name: 'Record:Recording status',
			description: 'If GoStream is recording, change style of the button',
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
		[FeedbackId.mediaAbsent]: {
			// note: it seems more likely to want feedback when media is absent, so this avoids having to negate the condition in the GUI.
			type: 'boolean',
			name: 'Record:Storage media absent (SD/SSD)',
			description: 'If storage media are absent (SD or SSD), change style of the button',
			options: [],
			defaultStyle: {
				color: combineRgb(128, 128, 128),
				bgcolor: combineRgb(72, 72, 72),
			},
			callback: () => {
				return !state.storageMediaPresent
			},
		},
	}
}
