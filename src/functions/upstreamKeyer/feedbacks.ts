import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { ActionType } from './../../enums'
import { getChoices } from './../../choices'
import { FeedbackId } from './feedbackId'
import { UpStreamKeyTypeChoices, SwitchChoices } from './../../model'
import type { GoStreamInstance } from './../../index'

export function create(instance: GoStreamInstance): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.TransitionSource]: {
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
				if (instance.states.UpstreamKeyer.Tied === (feedback.options.KeyTied === 0 ? true : false)) {
					return true
				} else {
					return false
				}
			},
		},
		[FeedbackId.KeyOnAir]: {
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
				if (instance.states.UpstreamKeyer.transitionKey.KeyOnAir && feedback.options.KeyOnAir === 1) {
					return true
				} else {
					return false
				}
			},
		},
		[FeedbackId.KeyOnPvw]: {
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
				if (instance.states.UpstreamKeyer.PvwOnAir && feedback.options.KeyOnAir === 1) {
					return true
				} else {
					return false
				}
			},
		},
		[FeedbackId.KeySourceFill]: {
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
				return instance.states.UpstreamKeyer.ArrayKeySourceFill[typeId] === Number(feedback.options.USKSourceFill)
			},
		},
		[FeedbackId.UpStreamKeyType]: {
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
				return instance.states.UpstreamKeyer.UpStreamKeyType === typeid
			},
		},
	}
}
