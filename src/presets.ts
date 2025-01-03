import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'

import { ActionType, feedbackId } from './enums'
import { ActionId } from './actions/ActionId'
import { MixEffectPresets } from './functions/mixEffect'
import { StreamingPresets } from './functions/streaming'
import { LivePresets } from './functions/live'
import { AudioMixerPresets } from './functions/audioMixer'
import { DownstreamKeyerPresets } from './functions/downstreamKeyer'
import { MacroPresets } from './functions/macro'
import { SuperSourcePresets } from './functions/superSource'
import { PlaybackPresets } from './functions/playback'

import { getChoices } from './choices'
import { KeySwitchChoices } from './model'

const ptzSize = '18'
export function presets(): CompanionPresetDefinitions {
	const presets = {
		...MixEffectPresets.create(),
		...StreamingPresets.create(),
		...LivePresets.create(),
		...AudioMixerPresets.create(),
		...DownstreamKeyerPresets.create(),
		...MacroPresets.create(),
		...SuperSourcePresets.create(),
		...PlaybackPresets.create(),
	}
	//Prev 和Progra
	//Transitions

	//Keys On Air
	const Keys = KeySwitchChoices
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

	//Still

	//SuperSource
	//
	//UpStreamKey
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
	// for (const UpKey of UpStreamKeyTypeChoices) {
	// 	presets[`UpStreamKey_${UpKey.id}`] = {
	// 		category: 'UpStreamKeyType',
	// 		name: `Upstream key: Set Key Type ${UpKey.label}`,
	// 		type: 'button',
	// 		style: {
	// 			text: `${UpKey.label}`,
	// 			size: '24',
	// 			color: combineRgb(255, 255, 255),
	// 			bgcolor: combineRgb(0, 0, 0),
	// 		},
	// 		feedbacks: [
	// 			{
	// 				feedbackId: feedbackId.UpStreamKeyType,
	// 				options: {
	// 					USKType: UpKey.id,
	// 				},
	// 				style: {
	// 					bgcolor: combineRgb(255, 0, 0),
	// 					color: combineRgb(255, 255, 255),
	// 				},
	// 			},
	// 		],
	// 		steps: [
	// 			{
	// 				down: [
	// 					{
	// 						actionId: ActionId.UpStreamKeyType,
	// 						options: {
	// 							USKType: UpKey.id,
	// 						},
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 	}
	// 	let _ActionId = ActionId.LumaKeySourceFill;
	// 	switch (UpKey.id) {
	// 		case 0:
	// 			_ActionId = ActionId.LumaKeySourceFill;
	// 			break;
	// 		case 1:
	// 			_ActionId = ActionId.ChromaKeyFill;
	// 			break;
	// 		case 2:
	// 			_ActionId = ActionId.KeyPatternSourceFill;
	// 			break;
	// 		case 3:
	// 			_ActionId = ActionId.PipSource;
	// 			break;
	// 	}
	// 	var sources = getChoices(ActionType.LumaKeySourceKey);
	// 	for (const source of sources) {
	// 		presets[`UpStreamKey_${source.id}_${UpKey.id}`] = {
	// 			category: `${UpKey.label}`,
	// 			name: `Upstream key: Set ${UpKey.label} Source Fill ${source.label}`,
	// 			type: 'button',
	// 			style: {
	// 				text: `${source.label}`,
	// 				size: '24',
	// 				color: combineRgb(255, 255, 255),
	// 				bgcolor: combineRgb(0, 0, 0),
	// 			},
	// 			feedbacks: [
	// 				{
	// 					feedbackId: feedbackId.KeySourceFill,
	// 					options: {
	// 						USKKeyType: UpKey.id,
	// 						USKSourceFill: source.id,
	// 					},
	// 					style: {
	// 						bgcolor: combineRgb(255, 0, 0),
	// 						color: combineRgb(255, 255, 255),
	// 					},
	// 				},
	// 			],
	// 			steps: [
	// 				{
	// 					down: [
	// 						{
	// 							actionId: _ActionId,
	// 							options: {
	// 								KeyFill: [source.id],
	// 							},
	// 						},
	// 					],
	// 					up: [],
	// 				},
	// 			],
	// 		}
	// 	}
	// }
	//Audio Mixer

	//Macro

	//FTB

	//Playback
	//

	return presets
}
