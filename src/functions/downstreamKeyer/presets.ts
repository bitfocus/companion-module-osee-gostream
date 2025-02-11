import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'
import { ActionType } from '../../enums'
import { GoStreamModel } from '../../models/types'
const ptzSize = '18'
export function create(model: GoStreamModel): CompanionPresetDefinitions {
	const presets = {}
	//DSK
	const dsk_sources = model.getChoices(ActionType.DskSourceFill)
	for (const s of dsk_sources) {
		let id = Number(s.id) + 1
		if (id === dsk_sources.length) id = 0
		presets[`DskFillKey_${s.id}`] = {
			category: `DSK`,
			name: `DSK Source Fill And Key ${s.label}`,
			type: 'button',
			style: {
				text: `${s.label}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.DskSourceFillKey,
					options: {
						TypeID: 1,
						DSKSource: s.id,
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
							actionId: ActionId.DskSourceFillKey,
							options: { DSKFill: s.id, DSKKey: id },
						},
					],
					up: [],
				},
			],
		}
	}
	return presets
}
