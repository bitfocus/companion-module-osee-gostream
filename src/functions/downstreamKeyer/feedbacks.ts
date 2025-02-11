import { FeedbackId } from './feedbackId'
import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { ActionType } from '../../enums'
import { GoStreamModel } from '../../models/types'
import { DownstreamKeyerStateT } from './state'

export function create(model: GoStreamModel, state: DownstreamKeyerStateT): CompanionFeedbackDefinitions {
	return {
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
					return state.source.key === dsk_source
				} else {
					return state.source.fill === dsk_source
				}
			},
		},
	}
}
