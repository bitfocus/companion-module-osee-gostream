import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { FeedbackId } from './feedbackId'
import { StillGeneratorStateT } from './state'
import { GoStreamModel } from '../../models/types'
export function create(model: GoStreamModel, state: StillGeneratorStateT): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.Still]: {
			type: 'boolean',
			name: 'Still: Select pic index',
			description: '',
			options: [
				{
					type: 'dropdown',
					label: 'Still',
					id: 'StillIndex',
					choices: [
						{ id: 0, label: 'Still1' },
						{ id: 1, label: 'Still2' },
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Pic index (0-32)',
					id: 'PicIndex',
					default: 0,
					choices: model.getChoicesByStill(),
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const stillIndex = Number(feedback.options.StillIndex)
				const picIndex = Number(feedback.options.PicIndex)
				return state.slots[stillIndex] == picIndex
			},
		},
	}
}
