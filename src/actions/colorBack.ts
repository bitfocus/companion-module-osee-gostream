import { ActionId } from './ActionId'
import { getOptNumber } from './index'
import { ColorSwitchChoices } from '../model'
import { ReqType } from '../enums'
import { sendCommand } from '../connection'
import type { CompanionActionDefinitions } from '@companion-module/base'
import type { GoStreamDeckInstance } from '../index'

export function createColorBackActions(_self: GoStreamDeckInstance): CompanionActionDefinitions {
	return {
		[ActionId.ColorHue]: {
			name: 'Color Back:Set Color Hue',
			options: [
				{
					type: 'dropdown',
					label: 'Color:',
					id: 'ColorHub1',
					choices: ColorSwitchChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Hue',
					id: 'ColorHub2',
					default: 82,
					min: 0,
					max: 359,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ColorHue, ReqType.Set, [
					getOptNumber(action, 'ColorHub1'),
					getOptNumber(action, 'ColorHub2'),
				])
			},
		},
		[ActionId.ColorSaturation]: {
			name: 'Color Back:Set Color Saturation',
			options: [
				{
					type: 'dropdown',
					label: 'Color:',
					id: 'ColorSaturation1',
					choices: ColorSwitchChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Saturation',
					id: 'ColorSaturation2',
					default: 100,
					min: 0,
					max: 100,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ColorSaturation, ReqType.Set, [
					getOptNumber(action, 'ColorSaturation1'),
					getOptNumber(action, 'ColorSaturation2'),
				])
			},
		},
		[ActionId.ColorBrightness]: {
			name: 'Color Back:Set Color Brightness',
			options: [
				{
					type: 'dropdown',
					label: 'Color:',
					id: 'ColorBrightness1',
					choices: ColorSwitchChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Brightness',
					id: 'ColorBrightness2',
					default: 70,
					min: 0,
					max: 100,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ColorBrightness, ReqType.Set, [
					getOptNumber(action, 'ColorBrightness1'),
					getOptNumber(action, 'ColorBrightness2'),
				])
			},
		},
	}
}
