import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'

const ptzSize = '18'
export function create(): CompanionPresetDefinitions {
	const presets = {}
	presets[`PlayMode_0`] = {
		type: 'button',
		category: 'Playback',
		name: 'Set Playback mode',
		style: {
			text: `play in one group`,
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
			text: `play cross group`,
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

	presets[`PlayMode_Pause_1`] = {
		type: 'button',
		category: 'Playback',
		name: 'Set Playback Pause',
		style: {
			text: `Pause`,
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
					bgcolor: combineRgb(255, 255, 0),
					color: combineRgb(0, 0, 0),
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
		name: 'Set Playback Info',
		style: {
			text: `$(gostreamdeck:PlayState)`,
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
				},
			},
		],
	}

	return presets
}
