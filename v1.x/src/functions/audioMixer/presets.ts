import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'
import { AudioInputSourcesChoices, AudioMicChoices } from './../../model'
import { GoStreamModel } from '../../models/types'
const ptzSize = '18'
export function create(_model: GoStreamModel): CompanionPresetDefinitions {
	const presets = {}
	presets[`AudioMixer_Trans`] = {
		category: 'AudioMixer',
		name: `Audio Mixer: Set AudioTransition Enable`,
		type: 'button',
		style: {
			text: `AudioFade`,
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		feedbacks: [
			{
				feedbackId: FeedbackId.AudioTransition,
				options: {},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
		],
		steps: [
			{
				down: [
					{
						actionId: ActionId.AudioTransition,
						options: {
							AudioTrans: 2,
						},
					},
				],
				up: [],
			},
		],
	}
	for (const mic of AudioMicChoices) {
		presets[`AudioMixer_Enable_${mic.id}`] = {
			category: 'AudioMixer',
			name: `Audio Mixer: Set Audio ${mic.label} Enable`,
			type: 'button',
			style: {
				text: `${mic.label}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.AudioEnable,
					options: {
						AudioEnable: 1,
						ASource: mic.id,
					},
					style: {
						bgcolor: combineRgb(255, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
			],
			steps: [
				{
					down: [
						{
							actionId: ActionId.AudioEnable,
							options: {
								ASource: mic.id,
								AudioEnable: 2,
							},
						},
					],
					up: [],
				},
			],
		}
	}
	for (const audio_in of AudioInputSourcesChoices) {
		presets[`AudioMixer_Enable_${audio_in.id}`] = {
			category: 'AudioMixer',
			name: `Audio Mixer: Set Audio ${audio_in.label} Enable`,
			type: 'button',
			style: {
				text: `${audio_in.label}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.AudioEnable,
					options: {
						ASource: audio_in.id,
						AudioEnable: 0,
					},
					style: {
						bgcolor: combineRgb(0, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
				{
					feedbackId: FeedbackId.AudioEnable,
					options: {
						ASource: audio_in.id,
						AudioEnable: 1,
					},
					style: {
						bgcolor: combineRgb(255, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
				{
					feedbackId: FeedbackId.AudioEnable,
					options: {
						ASource: audio_in.id,
						AudioEnable: 2,
					},
					style: {
						bgcolor: combineRgb(255, 255, 0),
						color: combineRgb(0, 0, 0),
					},
				},
			],
			steps: [
				{
					down: [
						{
							actionId: ActionId.AudioEnable1,
							options: {
								ASource: audio_in.id,
								AudioEnable: 3,
							},
						},
					],
					up: [],
				},
			],
		}
	}
	return presets
}
