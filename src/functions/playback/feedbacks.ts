import { FeedbackId } from './feedbackId'
import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { PlaybackStateT } from './state'
import type { GoStreamModel } from '../../models/types'
export function create(_model: GoStreamModel, state: PlaybackStateT): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.PlaybackMode]: {
			type: 'boolean',
			name: 'Playback: Set Playback Mode',
			description: 'If you turn on Playback Mode, change style of the button',
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
				return feedback.options.ModeID === state.Mode
			},
		},
		[FeedbackId.PlaybackRepeat]: {
			type: 'boolean',
			name: 'Playback: Set Playback Repeat',
			description: 'If you turn on Playback Repeat, change style of the button',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return state.Repeat
			},
		},
		[FeedbackId.PlaybackPause]: {
			type: 'boolean',
			name: 'Playback: Playing',
			description: 'Change style of the button if internal video is playing',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return state.Pause
			},
		},
		[FeedbackId.PlaybackBar]: {
			type: 'boolean',
			name: 'Playback: Set Playback Bar',
			description: 'If you turn on Playback Bar, change style of the button',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return state.Bar
			},
		},
		[FeedbackId.PlayFile]: {
			type: 'boolean',
			name: 'PlayFile: feedback based on current loaded video file',
			description: 'Change style of button if video file is loaded',
			options: [
				{
					type: 'dropdown',
					label: 'Video file',
					id: 'PlayFileID',
					choices: state.FileList.map((s, index) => ({
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
				return feedback.options.PlayFileID === state.File
			},
		},
		[FeedbackId.PlaybackNoFiles]: {
			type: 'boolean',
			name: 'PlayFile:No files present',
			description: 'Change button style if no video files are on the storage medium',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(72, 72, 72),
				text: 'No video files to play',
				size: '14',
			},
			callback: (_feedback) => {
				return state.FileList.length === 0
			},
		},
	}
}
