import { FeedbackId } from './feedbackId'
import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { SwitchChoices } from './../../model'
import { ActionType } from '../../enums'
import { GoStreamModel } from '../../models/types'
import { DownstreamKeyerStateT } from './state'

export function create(model: GoStreamModel, state: DownstreamKeyerStateT): CompanionFeedbackDefinitions {
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
				return state.onAir && feedback.options.DSKOnAir === 1
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
					choices: model.getChoices(ActionType.KeyPatternSourceKey),
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
					return state.key === dsk_source
				} else {
					return state.fill === dsk_source
				}
			},
		},
	}
}
