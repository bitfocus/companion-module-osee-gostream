import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { getChoicesByStill } from '../../choices'
import type { GoStreamInstance } from '../../index'
import { FeedbackId } from './feedbackId'

export function create(instance: GoStreamInstance): CompanionFeedbackDefinitions {
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
					choices: getChoicesByStill(),
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const stillIndex = Number(feedback.options.StillIndex)
				const picIndex = Number(feedback.options.PicIndex)
				if (stillIndex === 0) return instance.states.StillProp.Still1 === picIndex
				else return instance.states.StillProp.Still2 === picIndex
			},
		},
	}
}
