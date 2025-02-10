import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'
import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionType } from './../../enums'
import { GoStreamModel } from '../../models/types'

export function create(model: GoStreamModel): CompanionPresetDefinitions {
	const presets = {}
	const sources = model.getChoices(ActionType.LumaKeySourceKey)
	for (const source of sources) {
		let id = Number(source.id) + 1
		if (id === sources.length) id = 0
		//console.log(source.label);
		presets[`UpStreamKeylumakeySourceAndKey_${source.id}`] = {
			category: `lumakey`,
			name: `Upstream key: Set lumakey Source ${source.label}`,
			type: 'button',
			style: {
				text: `${source.label}`,
				size: '24',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.KeySourceFill,
					options: {
						USKKeyType: 0,
						USKSourceFill: source.id,
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
							actionId: ActionId.UpStreamKeyFillKeyType,
							options: {
								FillSource: source.id,
								KeySource: id,
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
