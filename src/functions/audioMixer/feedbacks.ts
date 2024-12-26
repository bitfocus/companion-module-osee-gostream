import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import type { GoStreamInstance } from '../../index'
import { FeedbackId } from './feedbackId'
import { ActionType } from '../../enums'
import { getChoices } from '../../choices'

export function create(instance: GoStreamInstance): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.AudioEnable]: {
			type: 'boolean',
			name: 'UpStream Key: Set UpStream Key Type',
			description: 'If you Select UpStream Key, change style of the bank',
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
				if (typeid === 0) {
					return instance.states.AudioMixerPorp.AudioEnable.mic1 === t_enable
				} else if (typeid === 1) {
					return instance.states.AudioMixerPorp.AudioEnable.mic2 === t_enable
				} else if (typeid === 2) {
					return instance.states.AudioMixerPorp.AudioEnable.in1 === t_enable
				} else if (typeid === 3) {
					return instance.states.AudioMixerPorp.AudioEnable.in2 === t_enable
				} else if (typeid === 4) {
					return instance.states.AudioMixerPorp.AudioEnable.in3 === t_enable
				} else if (typeid === 5) {
					return instance.states.AudioMixerPorp.AudioEnable.in4 === t_enable
				} else {
					return instance.states.AudioMixerPorp.AudioEnable.aux === t_enable
				}
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
				return instance.states.AudioMixerPorp.AudioTransition
			},
		},
	}
}
