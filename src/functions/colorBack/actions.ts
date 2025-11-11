import { ColorBack } from "../../connection/actionids"
import { getOptNumber } from './../../util'
import { ColorSourceChoices } from './../../model'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { StreamDeck } from '../../connection/streamdeck'

export function create(deck: StreamDeck): CompanionActionDefinitions {
	return {
		[ColorBack.ActionId.ColorHue]: {
			name: 'Color Back:Set Color Hue',
			options: [
				{
					type: 'dropdown',
					label: 'Color:',
					id: 'ColorHub1',
					choices: ColorSourceChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Hue',
					id: 'ColorHub2',
					default: 0,
					min: 0,
					max: 359,
				},
			],
			callback: async (action) => {
				await deck.setColorHue(getOptNumber(action, 'ColorHub1'),getOptNumber(action, 'ColorHub2'))
			},
		},
		[ColorBack.ActionId.ColorSaturation]: {
			name: 'Color Back:Set Color Saturation',
			options: [
				{
					type: 'dropdown',
					label: 'Color:',
					id: 'ColorSaturation1',
					choices: ColorSourceChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Saturation',
					id: 'ColorSaturation2',
					default: 0,
					min: 0,
					max: 100,
				},
			],
			callback: async (action) => {
				await deck.setColorSaturation(getOptNumber(action, 'ColorSaturation1'),getOptNumber(action, 'ColorSaturation2'))
			},
		},
		[ColorBack.ActionId.ColorBrightness]: {
			name: 'Color Back:Set Color Brightness',
			options: [
				{
					type: 'dropdown',
					label: 'Color:',
					id: 'ColorBrightness1',
					choices: ColorSourceChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Brightness',
					id: 'ColorBrightness2',
					default: 100,
					min: 0,
					max: 100,
				},
			],
			callback: async (action) => {
				await deck.setColorBrightness(getOptNumber(action, 'ColorBrightness1'),getOptNumber(action, 'ColorBrightness2'))
			},
		},
	}
}
