import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import type { GoStreamInstance } from '../../index'
import { FeedbackId } from './feedbackId'
import { ActionType } from '../../enums'
import { getChoices } from '../../choices'

export function create(instance: GoStreamInstance): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.AudioEnable]: {
			type: 'boolean',
			name: 'Audio Mixer: Set Audio Enabled',
			description: 'If audio source is enabled change style of bank',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: getChoices(ActionType.AudioEnableSource),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'AudioEnable',
					choices: getChoices(ActionType.AudioEnable),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeid = Number(feedback.options.ASource)
				const t_enable = Number(feedback.options.AudioEnable)
				return instance.states.AudioMixer.enabled[typeid] === t_enable
			},
		},
		[FeedbackId.AudioTransition]: {
			type: 'boolean',
			name: 'Audio Mixer: Set AudioTransition	Enable',
			description: 'If you turn on AudioTransition, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return instance.states.AudioMixer.transitionEnabled
			},
		},
	}
}
