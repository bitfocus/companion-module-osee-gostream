import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'
import { GoStreamModel } from '../../models/types'

const ptzSize = '18'
export function create(_model: GoStreamModel): CompanionPresetDefinitions {
	const presets = {}
	for (const index of [0, 1]) {
		for (let Still = 0; Still < 32; Still++) {
			presets[`Still_Selection_${index}_${Still}`] = {
				category: 'Still',
				name: `Still: Select pic index ${Still} to still ${index}`,
				type: 'button',
				style: {
					text: `Still\n${index}:${Still}`,
					size: ptzSize,
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				feedbacks: [
					{
						feedbackId: FeedbackId.Still,
						options: {
							StillIndex: index,
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
									StillIndex: index,
									PicIndex: Still,
								},
							},
						],
						up: [],
					},
				],
			}
		}
	}
	return presets
}
