import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'

const ptzSize = '18'
export function create(): CompanionPresetDefinitions {
	const presets = {}
	presets[`Live_0`] = {
		type: 'button',
		category: 'Live',
		name: 'Live',
		style: {
			text: `Live`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.Live,
						options: {
							LiveEnable: 2,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: FeedbackId.Live,
				options: {
					statesId: 0,
				},
				style: {
					bgcolor: combineRgb(0, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
			{
				feedbackId: FeedbackId.Live,
				options: {
					statesId: 1,
				},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
			{
				feedbackId: FeedbackId.Live,
				options: {
					statesId: 2,
				},
				style: {
					bgcolor: combineRgb(255, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	}
	return presets
}
