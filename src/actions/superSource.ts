import { ActionId } from './ActionId'
import { getOptNumber } from './index'
import { getChoices } from '../choices'
import { SwitchChoices, SuperSourceBorderChoices, SuperSourceMaskChoices, SuperSourceStyleChoices } from '../model'
import { ReqType, ActionType } from '../enums'
import { sendCommand } from '../connection'
import { type GoStreamDeckInstance } from '../index'
import { type CompanionActionDefinitions } from '@companion-module/base'

export function createSuperSourceActions(_self: GoStreamDeckInstance): CompanionActionDefinitions {
	return {
		[ActionId.SuperSourceEnable]: {
			name: 'Super Source:Super Source Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable:',
					id: 'SuperSourceEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'SuperSourceEnable')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.SuperSourcePorp.SSEnable === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.SuperSourceEnable, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.SuperSourceEnable, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.SuperSourceSource1]: {
			name: 'Super Source:Super Source Source1',
			options: [
				{
					type: 'dropdown',
					label: 'SuperSource Source1:',
					id: 'SuperSourceSource1',
					choices: getChoices(ActionType.SuperSourceSource),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceSource1, ReqType.Set, [getOptNumber(action, 'SuperSourceSource1')])
			},
		},
		[ActionId.SuperSourceSource2]: {
			name: 'Super Source:Super Source Source2',
			options: [
				{
					type: 'dropdown',
					label: 'SuperSource Source2:',
					id: 'SuperSourceSource2',
					choices: getChoices(ActionType.SuperSourceSource),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceSource2, ReqType.Set, [getOptNumber(action, 'SuperSourceSource2')])
			},
		},
		[ActionId.SuperSourceBackground]: {
			name: 'Super Source:Super Source Background',
			options: [
				{
					type: 'dropdown',
					label: 'SuperSource Background:',
					id: 'SuperSourceBackground',
					choices: getChoices(ActionType.SuperSourceSource),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceBackground, ReqType.Set, [getOptNumber(action, 'SuperSourceBackground')])
			},
		},
		[ActionId.SuperSourceControlStyle]: {
			name: 'Super Source:Super Source Style',
			options: [
				{
					type: 'dropdown',
					label: 'SuperSource Style:',
					id: 'SuperSourceStyle',
					choices: SuperSourceStyleChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceControlStyle, ReqType.Set, [getOptNumber(action, 'SuperSourceStyle')])
			},
		},
		[ActionId.SuperSourceControlYPosition]: {
			name: 'Super Source:Super Source Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position:',
					id: 'SuperSourceYPosition',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceControlYPosition, ReqType.Set, [
					getOptNumber(action, 'SuperSourceYPosition'),
				])
			},
		},
		[ActionId.SuperSourceMaskEnable]: {
			name: 'Super Source:Super Source Mask Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Mask',
					id: 'SuperSourceMask',
					choices: SuperSourceMaskChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Mask Enable',
					id: 'SuperSourceMaskEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceMaskEnable, ReqType.Set, [
					getOptNumber(action, 'SuperSourceMask'),
					getOptNumber(action, 'SuperSourceMaskEnable'),
				])
			},
		},
		[ActionId.SuperSourceMaskHStart]: {
			name: 'Super Source:Super Source H Start',
			options: [
				{
					type: 'dropdown',
					label: 'Mask',
					id: 'SuperSourceMask',
					choices: SuperSourceMaskChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'H Start',
					id: 'SuperSourceMaskHStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceMaskHStart, ReqType.Set, [
					getOptNumber(action, 'SuperSourceMask'),
					getOptNumber(action, 'SuperSourceMaskHStart'),
				])
			},
		},
		[ActionId.SuperSourceMaskVStart]: {
			name: 'Super Source:Super Source V Start',
			options: [
				{
					type: 'dropdown',
					label: 'Mask',
					id: 'SuperSourceMask',
					choices: SuperSourceMaskChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'V Start',
					id: 'SuperSourceMaskVStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceMaskVStart, ReqType.Set, [
					getOptNumber(action, 'SuperSourceMask'),
					getOptNumber(action, 'SuperSourceMaskVStart'),
				])
			},
		},
		[ActionId.SuperSourceMaskHEnd]: {
			name: 'Super Source:Super Source H End',
			options: [
				{
					type: 'dropdown',
					label: 'Mask',
					id: 'SuperSourceMask',
					choices: SuperSourceMaskChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'H End',
					id: 'SuperSourceMaskHEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceMaskHEnd, ReqType.Set, [
					getOptNumber(action, 'SuperSourceMask'),
					getOptNumber(action, 'SuperSourceMaskHEnd'),
				])
			},
		},
		[ActionId.SuperSourceMaskVEnd]: {
			name: 'Super Source:Super Source V End',
			options: [
				{
					type: 'dropdown',
					label: 'Mask',
					id: 'SuperSourceMask',
					choices: SuperSourceMaskChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'V End',
					id: 'SuperSourceMaskVEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceMaskVEnd, ReqType.Set, [
					getOptNumber(action, 'SuperSourceMask'),
					getOptNumber(action, 'SuperSourceMaskVEnd'),
				])
			},
		},
		[ActionId.SuperSourceBorderWidth]: {
			name: 'Super Source:Super Source Border Width',
			options: [
				{
					type: 'dropdown',
					label: 'Border',
					id: 'SuperSourceBorder',
					choices: SuperSourceBorderChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Border Width',
					id: 'SuperSourceBorderWidth',
					min: 0,
					max: 10,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceBorderWidth, ReqType.Set, [
					getOptNumber(action, 'SuperSourceBorder'),
					getOptNumber(action, 'SuperSourceBorderWidth'),
				])
			},
		},
		[ActionId.SuperSourceBorderHue]: {
			name: 'Super Source:Super Source Border Hue',
			options: [
				{
					type: 'dropdown',
					label: 'Border',
					id: 'SuperSourceBorder',
					choices: SuperSourceBorderChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Border Hue',
					id: 'SuperSourceBorderHue',
					min: 0,
					max: 359,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceBorderHue, ReqType.Set, [
					getOptNumber(action, 'SuperSourceBorder'),
					getOptNumber(action, 'SuperSourceBorderHue'),
				])
			},
		},
		[ActionId.SuperSourceBorderSaturation]: {
			name: 'Super Source:Super Source Border Saturation',
			options: [
				{
					type: 'dropdown',
					label: 'Border',
					id: 'SuperSourceBorder',
					choices: SuperSourceBorderChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Border Saturation',
					id: 'SuperSourceBorderSaturation',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceBorderSaturation, ReqType.Set, [
					getOptNumber(action, 'SuperSourceBorder'),
					getOptNumber(action, 'SuperSourceBorderSaturation'),
				])
			},
		},
		[ActionId.SuperSourceBorderBrightness]: {
			name: 'Super Source:Super Source Border Brightness',
			options: [
				{
					type: 'dropdown',
					label: 'Border',
					id: 'SuperSourceBorder',
					choices: SuperSourceBorderChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Border Brightness',
					id: 'SuperSourceBrightness',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceBorderBrightness, ReqType.Set, [
					getOptNumber(action, 'SuperSourceBorder'),
					getOptNumber(action, 'SuperSourceBrightness'),
				])
			},
		},
	}
}