import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'

const ptzSize = '18'
export function create(): CompanionPresetDefinitions {
	const presets = {}
	for (let Still = 0; Still < 31; Still++) {
		presets[`Still_Selection_${Still}`] = {
			category: 'Still',
			name: `Still: Slect pic index`,
			type: 'button',
			style: {
				text: `Still${Still + 1}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.Still,
					options: {
						Stillindex: 0,
						PicIndex: Still,
					},
					style: {
						bgcolor: combineRgb(255, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
			],
			steps: [
				{
					down: [
						{
							actionId: ActionId.StillSelection,
							options: {
								Stillindex: 0,
								PicIndex: Still,
							},
						},
					],
					up: [],
				},
			],
		}
	}
	return presets
}
