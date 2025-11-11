import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { FeedbackId } from './feedbackId'
import { getOptNumber } from '../../util'
import { StreamDeck } from '../../connection/streamdeck'

export function create(deck: StreamDeck): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.PGMRecord]: {
			type: 'boolean',
			name: 'Record:PGM Recording status',
			description: 'If GoStream is recording, change style of the button',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return deck.state?.record.isRecording === 1
			},
		},
		[FeedbackId.ISORecord]: {
			type: 'boolean',
			name: 'Record:ISO Recording status',
			description: 'If GoStream is recording, change style of the button',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return deck.state?.record.isRecording === 2
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
					id: 'quality',
					choices: [
						{ id: 0, label: 'low' },
						{ id: 1, label: 'mid' },
						{ id: 2, label: 'good' },
						{ id: 3, label: 'hight' },
					],
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (action) => {
				return deck.state?.record.quality === getOptNumber(action, 'quality')
			},
		},
		[FeedbackId.RecordSSDAbnormalInfo]: {
			// note: it seems more likely to want feedback when media is absent, so this avoids having to negate the condition in the GUI.
			type: 'boolean',
			name: 'Record:Storage media absent (SD/SSD)',
			description: 'If storage media are absent (SD or SSD), change style of the button',
			options: [],
			defaultStyle: {
				color: combineRgb(110, 110, 110),
				bgcolor: combineRgb(72, 72, 72),
			},
			callback: () => {
				return deck.state?.record.recordFree.freeSpace===0&&
						deck.state?.record.recordFree.freeTime===0
			},
		},
		[FeedbackId.ISORecordSSDAbnormalInfo]: {
			// note: it seems more likely to want feedback when media is absent, so this avoids having to negate the condition in the GUI.
			type: 'boolean',
			name: 'Record:Storage media absent (SD/SSD)',
			description: 'If storage media are absent (SD or SSD), change style of the button',
			options: [],
			defaultStyle: {
				color: combineRgb(110, 110, 110),
				bgcolor: combineRgb(72, 72, 72),
			},
			callback: () => {
				return deck.state?.record.ISORecordFree.freeSpace===0&&
						deck.state?.record.ISORecordFree.freeTime===0
			},
		},
	}
}
