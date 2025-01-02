import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'

import { ActionType } from '../../enums'
import { getChoices } from './../../choices'
import {
	KeySwitchChoices,
} from './../../model'

const ptzSize = '18'
export function create(): CompanionPresetDefinitions {
	const presets = {}
	//DSK
	const dsk_sources = getChoices(ActionType.DskSourceFill)
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
					feedbackId: FeedbackId.DskSourceFill,
					options: {
						TypeID: 1,
						DSKFill: s.id,
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

	const Keys = KeySwitchChoices
	for (const key of Keys) {
		if (key.label != 'BKGD' && key.label !== 'Key') {
			presets[`keys_Next_Air_${key.id}`] = {
				category: 'Keys On Air',
				name: `Toggle upstream KEY ${key.label} OnAir`,
				type: 'button',
				style: {
					text: `${key.label}`,
					size: ptzSize,
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				feedbacks: [
					{
						feedbackId: FeedbackId.DskOnAir,
						options: {
							KeyOnAir: 1,
							DSKOnAir: 1,
						},
						style: {
							bgcolor: combineRgb(255, 255, 0),
							color: combineRgb(0, 0, 0),
						},
					},
				],
				steps: [
					{
						down: [
							{
								actionId: ActionId.DskOnAir,
								options: {
									KeyOnAir: 2,
									DSKOnAir: 2,
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