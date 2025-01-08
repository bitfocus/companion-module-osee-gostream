import { FeedbackId } from './feedbackId'
import type { GoStreamInstance } from '../../index'
import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { SwitchChoices } from './../../model'
import { getChoices } from '../../choices'
import { ActionType } from '../../enums'

export function create(instance: GoStreamInstance): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.DskOnAir]: {
			type: 'boolean',
			name: 'Next Transition:DSK OnAir',
			description: 'Set the special effect Transition DSK OnAir',
			options: [
				{
					type: 'dropdown',
					label: 'DSK OnAir',
					id: 'DSKOnAir',
					choices: SwitchChoices,
					default: 1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				if (instance.states.TKeyeState.DSKOnAir && feedback.options.DSKOnAir === 1) {
					return true
				} else {
					return false
				}
			},
		},
		[FeedbackId.DskSourceFill]: {
			type: 'boolean',
			name: 'DSK:DSK source fill or key fill',
			description: 'Set the special effect DSK source fill or key fill',
			options: [
				{
					type: 'dropdown',
					label: 'Type:',
					id: 'TypeID',
					choices: [
						{ id: 0, label: 'Key Fill' },
						{ id: 1, label: 'Source Fill' },
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Fill:',
					id: 'DSKFill',
					choices: getChoices(ActionType.KeyPatternSourceKey),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeId = Number(feedback.options.TypeID)
				const dsk_source = Number(feedback.options.DSKFill)
				if (typeId === 0) {
					return instance.states.DSKState.DSKSourceKeyFill.id === dsk_source
				} else {
					return instance.states.DSKState.DSKSourceFill.id === dsk_source
				}
			},
		},
	}
}
