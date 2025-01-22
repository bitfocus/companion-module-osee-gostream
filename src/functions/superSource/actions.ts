import { ActionId } from './actionId'
import { getOptNumber } from '../../util'
import {
	SwitchChoices,
	SuperSourceBorderChoices,
	SuperSourceMaskChoices,
	SuperSourceStyleChoices,
	SuperSourceChoices,
} from '../../model'
import { ReqType, ActionType } from '../../enums'
import { sendCommand } from '../../connection'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { SuperSourceStateT } from './state'
import { GoStreamModel } from '../../models/types'

export function create(model: GoStreamModel, state: SuperSourceStateT): CompanionActionDefinitions {
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
					if (state.enable === true) {
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
		[ActionId.SuperSourceSource]: {
			name: 'Super Source: Set SuperSource Source',
			options: [
				{
					type: 'dropdown',
					label: 'Super Source',
					id: 'typeid',
					choices: SuperSourceChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'SourceID',
					choices: model.getChoices(ActionType.SuperSourceSource),
					default: 0,
				},
			],
			callback: async (action) => {
				const type = Number(action.options.typeid)
				const sourceID = Number(action.options.SourceID)
				if (type === 0) {
					await sendCommand(ActionId.SuperSourceSource1, ReqType.Set, [sourceID])
				} else if (type === 1) {
					await sendCommand(ActionId.SuperSourceSource2, ReqType.Set, [sourceID])
				} else if (type === 2) {
					await sendCommand(ActionId.SuperSourceBackground, ReqType.Set, [sourceID])
				}
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
					id: 'superSourceYPosition',
					min: 0,
					max: 100,
					default: 50,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceControlYPosition, ReqType.Set, [
					getOptNumber(action, 'superSourceYPosition'),
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
