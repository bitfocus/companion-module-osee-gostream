import { FeedbackId } from './feedbackId'
import type { GoStreamInstance } from '../../index'
import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'

export function create(instance: GoStreamInstance): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.PlaybackMode]: {
			type: 'boolean',
			name: 'Playback: Set Playback Mode',
			description: 'If you turn on Playback Mode, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'ModeID',
					choices: [
						{ id: 0, label: 'play in one group' },
						{ id: 1, label: 'play cross groups' },
					],
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				return feedback.options.ModeID === instance.states.Playback.Mode
			},
		},
		[FeedbackId.PlaybackRepeat]: {
			type: 'boolean',
			name: 'Playback: Set Playback Repeat',
			description: 'If you turn on Playback Repeat, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return instance.states.Playback.Repeat
			},
		},
		[FeedbackId.PlaybackPause]: {
			type: 'boolean',
			name: 'Playback: Set Playback Pause',
			description: 'If you turn on Playback Pause, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return instance.states.Playback.Pause
			},
		},
		[FeedbackId.PlaybackBar]: {
			type: 'boolean',
			name: 'Playback: Set Playback Bar',
			description: 'If you turn on Playback Bar, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return instance.states.Playback.Bar
			},
		},
		[FeedbackId.PlayFile]: {
			type: 'boolean',
			name: 'PlayFile: feedback based on current loaded video file',
			description: 'Change style of bank if video file is loaded',
			options: [
				{
					type: 'dropdown',
					label: 'Video file',
					id: 'PlayFileID',
					choices: instance.states.Playback.FileList.map((s, index) => ({
						id: index,
						label: s,
					})),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				return feedback.options.PlayFileID === instance.states.Playback.PlayFile
			},
		},
	}
}
