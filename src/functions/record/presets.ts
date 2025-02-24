import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'
import { GoStreamModel } from '../../models/types'

const ptzSize = '14'
export function create(_model: GoStreamModel): CompanionPresetDefinitions {
	return {
		[`Record_0`]: {
			type: 'button',
			category: 'Record',
			name: 'Record',
			style: {
				text: `Record\\n$(gostreamdeck:record_duration_hm)`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Record,
							options: {
								Record: 2,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: FeedbackId.Record,
					options: {},
					style: {
						bgcolor: combineRgb(255, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
			],
		},
	}
}
