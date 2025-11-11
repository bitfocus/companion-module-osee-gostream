import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'
import { GoStreamModel } from '../../models/types'

const ptzSize = '18'
export function create(_model: GoStreamModel): CompanionPresetDefinitions {
	const presets = {}
	presets[`PlayMode_0`] = {
		type: 'button',
		category: 'Playback',
		name: 'Set Playback mode',
		style: {
			text: `Play in one group`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.PlaybackMode,
						options: {
							ModeID: 0,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: FeedbackId.PlaybackMode,
				options: {
					ModeID: 0,
				},
				style: {
					bgcolor: combineRgb(255, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	}
	presets[`PlayMode_1`] = {
		type: 'button',
		category: 'Playback',
		name: 'Set Playback mode',
		style: {
			text: `Play cross group`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.PlaybackMode,
						options: {
							ModeID: 1,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: FeedbackId.PlaybackMode,
				options: {
					ModeID: 1,
				},
				style: {
					bgcolor: combineRgb(255, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	}
	presets[`PlayMode_Repeat_1`] = {
		type: 'button',
		category: 'Playback',
		name: 'Set Playback Repeat',
		style: {
			text: `Repeat`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.PlaybackRepeat,
						options: {
							EnableID: 2,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: FeedbackId.PlaybackRepeat,
				options: {},
				style: {
					bgcolor: combineRgb(255, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	}

	presets[`PlayMode_Play_Pause_Toggle`] = {
		type: 'button',
		category: 'Playback',
		name: 'Play/Pause video',
		style: {
			text: `Play`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.PlaybackPause,
						options: {
							EnableID: 2,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: FeedbackId.PlaybackPause,
				options: {},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
					text: 'Pause',
				},
			},
			{
				feedbackId: FeedbackId.PlaybackPause,
				options: {},
				isInverted: true,
				style: {
					bgcolor: combineRgb(0, 0, 0),
					color: combineRgb(255, 255, 255),
					text: 'Play',
				},
			},
		],
	}

	presets[`PlayMode_Bar_1`] = {
		type: 'button',
		category: 'Playback',
		name: 'Set Playback Bar',
		style: {
			text: `Bar`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.PlaybackBar,
						options: {
							EnableID: 2,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: FeedbackId.PlaybackBar,
				options: {},
				style: {
					bgcolor: combineRgb(255, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	}

	presets[`PlayModeRepeatPause_0`] = {
		type: 'button',
		category: 'Playback',
		name: 'Play/pause repeat',
		style: {
			text: `Play repeat`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.PlayModeRepeatPause,
						options: {
							ModeID: 0,
							repeatId: 1,
							pauseId: 2,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: FeedbackId.PlaybackPause,
				options: {},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
					text: 'Pause',
				},
			},
			{
				feedbackId: FeedbackId.PlaybackPause,
				options: {},
				isInverted: true,
				style: {
					bgcolor: combineRgb(0, 0, 0),
					color: combineRgb(255, 255, 255),
					text: 'Play repeat',
				},
			},
		],
	}

	return presets
}
