import { ActionId } from './../actionId'
import { getOptNumber } from './../../../actions'
import { getChoices } from './../../../choices'
import { SwitchChoices, KeyResizeSizeChoices } from './../../../model'
import { ReqType, ActionType } from './../../../enums'
import { sendCommand } from './../../../connection'
import type { GoStreamInstance } from './../../../index'
import type { CompanionActionDefinitions } from '@companion-module/base'

export function createPIPActions(_self: GoStreamInstance): CompanionActionDefinitions {
	return {
		[ActionId.PipSource]: {
			name: 'UpStream Key:Set Pip Source',
			options: [
				{
					type: 'dropdown',
					label: 'PIP Source',
					id: 'KeyFill',
					choices: getChoices(ActionType.PipSource),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipSource, ReqType.Set, [getOptNumber(action, 'KeyFill')])
			},
		},
		[ActionId.PipSize]: {
			name: 'UpStream Key:Set PIP Size',
			options: [
				{
					type: 'dropdown',
					label: 'Size',
					id: 'PipSize',
					choices: KeyResizeSizeChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				let value = 0
				const info = KeyResizeSizeChoices.find((s) => s.id === action.options.PipSize)
				if (info !== null && info !== undefined) {
					value = Number(info.id)
				}
				await sendCommand(ActionId.PipSize, ReqType.Set, [value])
			},
		},
		[ActionId.PipXPosition]: {
			name: 'UpStream Key:Set PIP X Position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'PipXPosition',
					min: -16,
					max: 16,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipXPosition, ReqType.Set, [getOptNumber(action, 'PipXPosition')])
			},
		},
		[ActionId.PipYPosition]: {
			name: 'UpStream Key:Set PIP Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'PipYPosition',
					min: -9.0,
					max: 9.0,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipYPosition, ReqType.Set, [getOptNumber(action, 'PipYPosition')])
			},
		},
		[ActionId.PipMaskEnable]: {
			name: 'UpStream Key:Set PIP Mask Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Mask Enable',
					id: 'PipMaskEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipMaskEnable, ReqType.Set, [getOptNumber(action, 'PipMaskEnable')])
			},
		},
		[ActionId.PipMaskHStart]: {
			name: 'UpStream Key:Set PIP Mask H Start',
			options: [
				{
					type: 'number',
					label: 'H Start',
					id: 'PipMaskHStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipMaskHStart, ReqType.Set, [getOptNumber(action, 'PipMaskHStart')])
			},
		},
		[ActionId.PipMaskVStart]: {
			name: 'UpStream Key:Set Pip Mask V Start',
			options: [
				{
					type: 'number',
					label: 'V Start',
					id: 'PipMaskVStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipMaskVStart, ReqType.Set, [getOptNumber(action, 'PipMaskVStart')])
			},
		},
		[ActionId.PipMaskHEnd]: {
			name: 'UpStream Key:Set Pip Mask H End',
			options: [
				{
					type: 'number',
					label: 'H End',
					id: 'PipMaskHEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipMaskHEnd, ReqType.Set, [getOptNumber(action, 'PipMaskHEnd')])
			},
		},
		[ActionId.PipMaskVEnd]: {
			name: 'UpStream Key:Set Pip Mask V End',
			options: [
				{
					type: 'number',
					label: 'V End',
					id: 'PipMaskVEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipMaskVEnd, ReqType.Set, [getOptNumber(action, 'PipMaskVEnd')])
			},
		},
		[ActionId.PipBorderEnable]: {
			name: 'UpStream Key:Set Pip Border Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'PipBorderEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipBorderEnable, ReqType.Set, [getOptNumber(action, 'PipBorderEnable')])
			},
		},
		[ActionId.PipBorderWidth]: {
			name: 'UpStream Key:Set Pip Border Width',
			options: [
				{
					type: 'number',
					label: 'Width',
					id: 'PipBorderWidth',
					min: 0,
					max: 31,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipBorderWidth, ReqType.Set, [getOptNumber(action, 'PipBorderWidth')])
			},
		},
		[ActionId.PipBorderHue]: {
			name: 'UpStream Key:Set Pip Color Hue',
			options: [
				{
					type: 'number',
					label: 'Hue',
					id: 'PipBorderHue',
					min: 0,
					max: 359,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipBorderHue, ReqType.Set, [getOptNumber(action, 'PipBorderHue')])
			},
		},
		[ActionId.PipBorderSaturation]: {
			name: 'UpStream Key:Set Pip Color Saturation',
			options: [
				{
					type: 'number',
					label: 'Saturation',
					id: 'PipBorderSaturation',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipBorderSaturation, ReqType.Set, [getOptNumber(action, 'PipBorderSaturation')])
			},
		},
		[ActionId.PipBorderBrightness]: {
			name: 'UpStream Key:Set Pip Color Brightness',
			options: [
				{
					type: 'number',
					label: 'Brightness',
					id: 'PipBorderBrightness',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipBorderBrightness, ReqType.Set, [getOptNumber(action, 'PipBorderBrightness')])
			},
		},
	}
}
