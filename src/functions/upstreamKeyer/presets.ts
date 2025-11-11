import { USK } from "../../connection/actionids"
import { FeedbackId } from './feedbackId'
import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { GetKeyChoices, KeyTypeChoices } from '../../model'
import { StreamDeck } from '../../connection/streamdeck'

// const arrows = [
// 	{ text: '⬉', h: -0.2, v: -0.2 },
// 	{ text: '⬆', h: 0, v: -0.2 },
// 	{ text: '⬈', h: 0.2, v: -0.2 },
// 	{ text: '⬅', h: -0.2, v: 0 },
// 	{ text: '⦾', h: 0, v: 0 },
// 	{ text: '➡', h: 0.2, v: 0 },
// 	{ text: '⬋', h: -0.2, v: 0.2 },
// 	{ text: '⬇', h: 0, v: 0.2 },
// 	{ text: '⬊', h: 0.2, v: 0.2 },
// ]
const ptzSize = '18'
export function create(deck: StreamDeck): CompanionPresetDefinitions {
	const presets = {}

	const keys = GetKeyChoices(deck.state);
	for (let index = 0; index < keys.length; index++) {
		presets[`KeyEnable_${keys[index].id}`] = {
			category: `Key`,
			name: `Set ${keys[index].label} Enable`,
			type: 'button',
			style: {
				text: `${keys[index].label} Enable`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.KeyEnable,
					options: {
						keyId: keys[index].id,
						enable: 1,
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
							actionId: USK.ActionId.KeyEnable,
							options: {
								keyId: keys[index].id,
								enable: 2,
							},
						},
					],
					up: [],
				},
			],
		}
	}

	for (let index = 0; index < keys.length; index++) {
		presets[`KeyOnAir_${keys[index].id}`] = {
			category: `Key`,
			name: `Set ${keys[index].label} On Air`,
			type: 'button',
			style: {
				text: `${keys[index].label} On Air`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.KeyOnAir,
					options: {
						keyId: keys[index].id,
						enable: 1,
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
							actionId: USK.ActionId.KeyOnAir,
							options: {
								keyId: keys[index].id,
								onAir: 2,
							},
						},
					],
					up: [],
				},
			],
		}
	}

	const keytypes = KeyTypeChoices;

	for (let index = 0; index < keys.length; index++) {
		for (let t_index = 0; t_index < keytypes.length; t_index++) {
			presets[`KeyType_${keys[index].id}_${keytypes[t_index].id}`] = {
				category: `Key`,
				name: `Set ${keys[index].label} Type`,
				type: 'button',
				style: {
					text: `Set ${keys[index].label} ${keytypes[t_index].label}`,
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				feedbacks: [
					{
						feedbackId: FeedbackId.KeyType,
						options: {
							keyId: keys[index].id,
							type: keytypes[t_index].id,
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
								actionId: USK.ActionId.KeyType,
								options: {
									keyId: keys[index].id,
									type: keytypes[t_index].id,
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
