import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { DSK } from "../../connection/actionids"
import { FeedbackId } from './feedbackId'
import {GetDSKChoices} from '../../model'
import { StreamDeck } from '../../connection/streamdeck'

const ptzSize = '18'
export function create(deck: StreamDeck): CompanionPresetDefinitions {
	const presets = {}
	const dskKeys = GetDSKChoices(deck.state);

	for(const info of dskKeys){
		presets[`DSKEnable_${info.id}`] = {
			category: 'DSK',
			name: `Set ${info.label} Enable`,
			type: 'button',
			style: {
				text: `${info.label} Enable`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.DskEnable,
					options: {
						keyId: info.id,
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
							actionId: DSK.ActionId.DskEnable,
							options: {
								keyId: info.id,
								enable: 2,
							},
						},
					],
					up: [],
				},
			],
		}
		presets[`DSKOnAir_${info.id}`] = {
			category: 'DSK',
			name: `Set ${info.label} On Air`,
			type: 'button',
			style: {
				text: `${info.label} OnAir`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.DskOnAir,
					options: {
						keyId: info.id,
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
							actionId: DSK.ActionId.DskOnAir,
							options: {
								keyId: info.id,
								enable: 2,
							},
						},
					],
					up: [],
				},
			],
		}
		presets[`DSKMaskEnable_${info.id}`] = {
			category: 'DSK',
			name: `Set ${info.label} Mask Enable`,
			type: 'button',
			style: {
				text: `${info.label} Mask Enable`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.DskMaskEnable,
					options: {
						keyId: info.id,
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
							actionId:  DSK.ActionId.DskMaskEnable,
							options: {
								keyId: info.id,
								maskEnable: 2,
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
