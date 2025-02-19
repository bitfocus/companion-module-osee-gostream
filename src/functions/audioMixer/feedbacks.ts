import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { FeedbackId } from './feedbackId'
import { ActionType } from '../../enums'
import { AudioMixerStateT, AudioState } from './state'
import { GoStreamModel } from '../../models/types'
export function create(model: GoStreamModel, state: AudioMixerStateT): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.AudioEnable]: {
			type: 'boolean',
			name: 'Audio Mixer: Set Audio Enabled',
			description: 'If audio source is enabled change style of button',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: model.getChoices(ActionType.AudioEnableSource),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'AudioEnable',
					choices: model.getChoices(ActionType.AudioEnable),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeid = Number(feedback.options.ASource)
				const t_enable = <AudioState>feedback.options.AudioEnable
				return state.state[typeid] === t_enable
			},
		},
		[FeedbackId.AudioTransition]: {
			type: 'boolean',
			name: 'Audio Mixer: Set AudioTransition	Enable',
			description: 'If you turn on AudioTransition, change style of the button',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return state.transitionEnabled
			},
		},
		[FeedbackId.AudioMonitorSource]: {
			type: 'boolean',
			name: 'Audio Mixer: Set Monitor Source',
			description: 'If monitor (headphone) is set to selected value, change the button style',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'AudioSource',
					choices: model.getChoices(ActionType.AudioMonitorSource),
					default: model.getChoices(ActionType.AudioMonitorSource)[0].id,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				return state.monitorSource === Number(feedback.options.AudioSource)
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					AudioSource: state.monitorSource,
				}
			},
		},
	}
}
