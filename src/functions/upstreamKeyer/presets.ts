import { ActionId } from './actionId'
import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'

import { ActionType, feedbackId } from './../../enums'

import { getChoices } from './../../choices'
import { KeySwitchChoices } from './../../model'

const Keys = KeySwitchChoices
const ptzSize = '18'
export function create(): CompanionPresetDefinitions {
	const presets = {}
	for (const key of Keys) {
		if (key.label != 'BKGD' && key.label === 'Key') {
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
						feedbackId: feedbackId.KeyOnAir,
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
								actionId: ActionId.KeyOnAir,
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

	// USK
	presets[`USKOnPvw`] = {
		category: `Keys On Air`,
		name: `Toggle USK on preview`,
		type: 'button',
		style: {
			text: `USK on PVW`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		feedbacks: [
			{
				feedbackId: feedbackId.KeyOnPvw,
				options: {
					KeyOnAir: 1,
				},
				style: {
					bgcolor: combineRgb(0, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
		steps: [
			{
				down: [
					{
						actionId: ActionId.USKOnPreview,
						options: { USKPvwState: 0 },
					},
				],
				up: [],
			},
		],
	}

	const sources = getChoices(ActionType.LumaKeySourceKey)
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
					feedbackId: feedbackId.KeySourceFill,
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
