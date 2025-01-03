import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { ActionType, feedbackId } from './enums'
import { getChoices } from './choices'
import type { GoStreamInstance } from './index'
import { SuperSourceFeedbacks } from './functions/superSource'
import { MixEffectFeedbacks } from './functions/mixEffect'
import { StreamingFeedbacks } from './functions/streaming'
import { LiveFeedbacks } from './functions/live'
import { RecordFeedbacks } from './functions/record'
import { StillGeneratorFeedbacks } from './functions/stillGenerator'
import { DownstreamKeyerFeedbacks } from './functions/downstreamKeyer'
import { MacroFeedbacks } from './functions/macro'
import { PlaybackFeedbacks } from './functions/playback'
import { SettingsFeedbacks } from './functions/settings'

import { UpStreamKeyTypeChoices, SwitchChoices } from './model'

export function feedbacks(instance: GoStreamInstance): CompanionFeedbackDefinitions {
	return {
		[feedbackId.TransitionSource]: {
			type: 'boolean',
			name: 'USK: Tied',
			description: 'Indicate if USK is tied to next transition',
			options: [
				{
					type: 'dropdown',
					label: 'Key Tied',
					id: 'KeyTied',
					choices: [
						{ id: 0, label: 'on' },
						{ id: 1, label: 'off' },
					],
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				if (instance.states.upStreamKeyState.Tied === (feedback.options.KeyTied === 0 ? true : false)) {
					return true
				} else {
					return false
				}
			},
		},
		[feedbackId.KeyOnAir]: {
			type: 'boolean',
			name: 'Next Transition:Key OnAir Switch',
			description: 'Set the special effect Transition key switch',
			options: [
				{
					type: 'dropdown',
					label: 'Key OnAir',
					id: 'KeyOnAir',
					choices: SwitchChoices,
					default: 1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				if (instance.states.TKeyeState.KeyOnAir && feedback.options.KeyOnAir === 1) {
					return true
				} else {
					return false
				}
			},
		},
		[feedbackId.KeyOnPvw]: {
			type: 'boolean',
			name: 'USK: Key on preview',
			description: 'Indicates if USK on on air on the preview bus',
			options: [
				{
					type: 'dropdown',
					label: 'Key OnAir',
					id: 'KeyOnAir',
					choices: SwitchChoices,
					default: 1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			callback: (feedback) => {
				if (instance.states.upStreamKeyState.PvwOnAir && feedback.options.KeyOnAir === 1) {
					return true
				} else {
					return false
				}
			},
		},
		[feedbackId.KeySourceFill]: {
			type: 'boolean',
			name: 'UpStreamKey:UpStream Key Source Fill',
			description: 'Set the special effect UpStream Key Source Fill',
			options: [
				{
					type: 'dropdown',
					label: 'Key Type:',
					id: 'USKKeyType',
					choices: UpStreamKeyTypeChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source Fill:',
					id: 'USKSourceFill',
					choices: getChoices(ActionType.KeyPatternSourceKey),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeId = Number(feedback.options.USKKeyType)
				return instance.states.upStreamKeyState.ArrayKeySourceFill[typeId] === Number(feedback.options.USKSourceFill)
			},
		},
		//upStreamKeyType
		[feedbackId.UpStreamKeyType]: {
			type: 'boolean',
			name: 'UpStream Key: Set UpStream Key Type',
			description: 'If you Select UpStream Key, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Type',
					id: 'USKType',
					choices: UpStreamKeyTypeChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeid = Number(feedback.options.USKType)
				return instance.states.upStreamKeyState.UpStreamKeyType === typeid
			},
		},
		//AUdio Mixer

		//Playback

		...RecordFeedbacks.create(instance),
		...LiveFeedbacks.create(instance),
		...SuperSourceFeedbacks.create(instance),
		...MixEffectFeedbacks.create(instance),
		...StreamingFeedbacks.create(instance),
		...StillGeneratorFeedbacks.create(instance),
		...DownstreamKeyerFeedbacks.create(instance),
		...MacroFeedbacks.create(instance),
		...PlaybackFeedbacks.create(instance),
		...SettingsFeedbacks.create(instance),
	}
}
