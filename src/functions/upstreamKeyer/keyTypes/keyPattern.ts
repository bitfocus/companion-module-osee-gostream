import { ActionId } from '../actionId'
import { getOptNumber } from './../../../actions'
import { getChoices } from './../../../choices'
import { SwitchChoices, KeyResizeSizeChoices } from './../../../model'
import { ReqType, ActionType } from './../../../enums'
import { sendCommand } from './../../../connection'
import type { GoStreamInstance } from './../../../index'
import type { CompanionActionDefinitions } from '@companion-module/base'

export function createKeyPatternActions(_self: GoStreamInstance): CompanionActionDefinitions {
	return {
		[ActionId.KeyPatternSourceFill]: {
			name: 'UpStream Key:Set Key Pattern Source Fill',
			options: [
				{
					type: 'dropdown',
					label: 'Source Fill',
					id: 'KeyFill',
					choices: getChoices(ActionType.KeyPatternSourceKey),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.KeyPatternSourceFill, ReqType.Set, [getOptNumber(action, 'KeyFill')])
			},
		},
		[ActionId.KeyPatternWipePattern]: {
			name: 'UpStream Key:Set Key Pattern Wipe Pattern',
			options: [
				{
					type: 'number',
					label: 'Wipe Pattern',
					id: 'KeyPatternWipePattern',
					min: 0,
					max: 17,
					default: 0,
					range: true,
					step: 1,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.KeyPatternWipePattern, ReqType.Set, [getOptNumber(action, 'KeyPatternWipePattern')])
			},
		},
		[ActionId.KeyPatternWipeSize]: {
			name: 'UpStream Key:Set Key Pattern Wipe Size',
			options: [
				{
					type: 'number',
					label: 'Wipe Size',
					id: 'KeyPatternWipeSize',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.KeyPatternWipeSize, ReqType.Set, [getOptNumber(action, 'KeyPatternWipeSize')])
			},
		},
		[ActionId.KeyPatternWipeXPosition]: {
			name: 'UpStream Key:Set Key Pattern wipe X Position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'KeyPatternWipeXPosition',
					min: -16.0,
					max: 16.0,
					step: 0.2,
					range: true,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.KeyPatternWipeXPosition, ReqType.Set, [
					getOptNumber(action, 'KeyPatternWipeXPosition'),
				])
			},
		},
		[ActionId.KeyPatternWipeYPosition]: {
			name: 'UpStream Key:Set Key Pattern wipe Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'KeyPatternWipeYPosition',
					min: -9.0,
					max: 9.0,
					step: 0.2,
					range: true,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.KeyPatternWipeYPosition, ReqType.Set, [
					getOptNumber(action, 'KeyPatternWipeYPosition'),
				])
			},
		},
		[ActionId.KeyPatternWipeSymmetry]: {
			name: 'UpStream Key:Set Key Pattern Symmetry',
			options: [
				{
					type: 'number',
					label: 'Symmetry',
					id: 'KeyPatternWipeSymmetry',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.KeyPatternWipeSymmetry, ReqType.Set, [
					getOptNumber(action, 'KeyPatternWipeSymmetry'),
				])
			},
		},
		[ActionId.KeyPatternWipeSoftness]: {
			name: 'UpStream Key:Set Key Pattern Softness',
			options: [
				{
					type: 'number',
					label: 'Softness',
					id: 'KeyPatternWipeSoftness',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.KeyPatternWipeSoftness, ReqType.Set, [
					getOptNumber(action, 'KeyPatternWipeSoftness'),
				])
			},
		},
		[ActionId.KeyPatternMaskEnable]: {
			name: 'UpStream Key:Set KeyPattern Mask Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Mask Enable',
					id: 'KeyPatternMaskEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.KeyPatternMaskEnable, ReqType.Set, [getOptNumber(action, 'KeyPatternMaskEnable')])
			},
		},
		[ActionId.KeyPatternMaskHStart]: {
			name: 'UpStream Key:Set Key Pattern Mask H Start',
			options: [
				{
					type: 'number',
					label: 'H Start',
					id: 'KeyPatternMaskHStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.KeyPatternMaskHStart, ReqType.Set, [getOptNumber(action, 'KeyPatternMaskHStart')])
			},
		},
		[ActionId.KeyPatternMaskVStart]: {
			name: 'UpStream Key:Set Key Pattern Mask V Start',
			options: [
				{
					type: 'number',
					label: 'V Start',
					id: 'KeyPatternMaskVStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.KeyPatternMaskVStart, ReqType.Set, [getOptNumber(action, 'KeyPatternMaskVStart')])
			},
		},
		[ActionId.KeyPatternMaskHEnd]: {
			name: 'UpStream Key:Set Key Pattern Mask H End',
			options: [
				{
					type: 'number',
					label: 'H End',
					id: 'KeyPatternMaskHEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.KeyPatternMaskHEnd, ReqType.Set, [getOptNumber(action, 'KeyPatternMaskHEnd')])
			},
		},
		[ActionId.KeyPatternMaskVEnd]: {
			name: 'UpStream Key:Set Key Pattern Mask V End',
			options: [
				{
					type: 'number',
					label: 'V End',
					id: 'KeyPatternMaskVEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.KeyPatternMaskVEnd, ReqType.Set, [getOptNumber(action, 'KeyPatternMaskVEnd')])
			},
		},
		[ActionId.KeyPatternResizeEnable]: {
			name: 'UpStream Key:Set Key Pattern Resize Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'KeyPatternResizeEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.KeyPatternResizeEnable, ReqType.Set, [
					getOptNumber(action, 'KeyPatternResizeEnable'),
				])
			},
		},
		[ActionId.KeyPatternResizeSize]: {
			name: 'UpStream Key:Set Key Pattern Resize Size',
			options: [
				{
					type: 'dropdown',
					label: 'Size',
					id: 'KeyPatternResizeSize',
					choices: KeyResizeSizeChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				let value = 0.25
				const info = KeyResizeSizeChoices.find((s) => s.id === action.options.KeyPatternResizeSize)
				if (info !== null && info !== undefined) {
					value = Number(info.label)
				}
				await sendCommand(ActionId.KeyPatternResizeSize, ReqType.Set, [value])
			},
		},
		[ActionId.KeyPatternResizeXPosition]: {
			name: 'UpStream Key:Set Key Pattern Resize X Position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'KeyPatternResizeXPosition',
					min: -16,
					max: 16,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.KeyPatternResizeXPosition, ReqType.Set, [
					getOptNumber(action, 'KeyPatternResizeXPosition'),
				])
			},
		},
		[ActionId.KeyPatternResizeYPosition]: {
			name: 'UpStream Key:Set Key Pattern Resize Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'KeyPatternResizeYPosition',
					min: -9.0,
					max: 9.0,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.KeyPatternResizeYPosition, ReqType.Set, [
					getOptNumber(action, 'KeyPatternResizeYPosition'),
				])
			},
		},
	}
}
