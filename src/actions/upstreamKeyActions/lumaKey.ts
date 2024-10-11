import { ActionId } from '../ActionId'
import { getOptNumber } from '../index'
import { getChoices } from '../../choices'
import { SwitchChoices, KeyResizeSizeChoices } from '../../model'
import { ReqType, ActionType } from '../../enums'
import { sendCommand } from '../../connection'
import { type GoStreamDeckInstance } from '../index'
import { type CompanionActionDefinitions } from '@companion-module/base'

export function createLumaKeyActions(_self: GoStreamDeckInstance): CompanionActionDefinitions {
	return {
		[ActionId.LumaKeySourceFill]: {
			name: 'UpStream Key:Set Luma Key Source Fill',
			options: [
				{
					type: 'dropdown',
					label: 'Source Fill',
					id: 'KeyFill',
					choices: getChoices(ActionType.LumaKeySourceKey),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.LumaKeySourceFill, ReqType.Set, [getOptNumber(action, 'KeyFill')])
			},
		},
		[ActionId.LumaKeySourceKey]: {
			name: 'UpStream Key:Set Luma Key Source Key',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'LumaKeySourceKey',
					choices: getChoices(ActionType.LumaKeySourceKey),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.LumaKeySourceKey, ReqType.Set, [getOptNumber(action, 'LumaKeySourceKey')])
			},
		},
		[ActionId.LumaKeyMaskEnable]: {
			name: 'UpStream Key:Set Luma Key Mask Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Mask Enable',
					id: 'LumaKeyMaskEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.LumaKeyMaskEnable, ReqType.Set, [getOptNumber(action, 'LumaKeyMaskEnable')])
			},
		},
		[ActionId.LumaKeyMaskHStart]: {
			name: 'UpStream Key:Set Luma Key Mask H Start',
			options: [
				{
					type: 'number',
					label: 'H Start',
					id: 'LumaKeyMaskHStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.LumaKeyMaskHStart, ReqType.Set, [getOptNumber(action, 'LumaKeyMaskHStart')])
			},
		},
		[ActionId.LumaKeyMaskVStart]: {
			name: 'UpStream Key:Set Luma Key Mask V Start',
			options: [
				{
					type: 'number',
					label: 'V Start',
					id: 'LumaKeyMaskVStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.LumaKeyMaskVStart, ReqType.Set, [getOptNumber(action, 'LumaKeyMaskVStart')])
			},
		},
		[ActionId.LumaKeyMaskHEnd]: {
			name: 'UpStream Key:Set Luma Key Mask H End',
			options: [
				{
					type: 'number',
					label: 'H End',
					id: 'LumaKeyMaskHEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.LumaKeyMaskHEnd, ReqType.Set, [getOptNumber(action, 'LumaKeyMaskHEnd')])
			},
		},
		[ActionId.LumaKeyMaskVEnd]: {
			name: 'UpStream Key:Set Luma Key Mask V End',
			options: [
				{
					type: 'number',
					label: 'V End',
					id: 'LumaKeyMaskVEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.LumaKeyMaskVEnd, ReqType.Set, [getOptNumber(action, 'LumaKeyMaskVEnd')])
			},
		},
		[ActionId.LumaKeyControlShapedKey]: {
			name: 'UpStream Key:Set Luma Key Control ShapedKey',
			options: [
				{
					type: 'dropdown',
					label: 'ShapedKey',
					id: 'LumaKeyControlShapedKey',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.LumaKeyControlShapedKey, ReqType.Set, [
					getOptNumber(action, 'LumaKeyControlShapedKey'),
				])
			},
		},
		[ActionId.LumaKeyControlClip]: {
			name: 'UpStream Key:Set Luma Key Control Clip',
			options: [
				{
					type: 'number',
					label: 'Clip',
					id: 'LumaKeyControlClip',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.LumaKeyControlClip, ReqType.Set, [getOptNumber(action, 'LumaKeyControlClip')])
			},
		},
		[ActionId.LumaKeyControlGain]: {
			name: 'UpStream Key:Set Luma Key Control Gain',
			options: [
				{
					type: 'number',
					label: 'Gain',
					id: 'LumaKeyControlGain',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.LumaKeyControlGain, ReqType.Set, [getOptNumber(action, 'LumaKeyControlGain')])
			},
		},
		[ActionId.LumaKeyControlInvert]: {
			name: 'UpStream Key:Set Luma Key Control Invert',
			options: [
				{
					type: 'dropdown',
					label: 'Invert',
					id: 'LumaKeyControlInvert',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.LumaKeyControlInvert, ReqType.Set, [getOptNumber(action, 'LumaKeyControlInvert')])
			},
		},
		[ActionId.LumaKeyResizeEnable]: {
			name: 'UpStream Key:Set Luma Key Resize Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'LumaKeyResizeEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.LumaKeyResizeEnable, ReqType.Set, [getOptNumber(action, 'LumaKeyResizeEnable')])
			},
		},
		[ActionId.LumaKeyResizeSize]: {
			name: 'UpStream Key:Set Luma Key Resize Size',
			options: [
				{
					type: 'dropdown',
					label: 'Size',
					id: 'LumaKeyResizeSize',
					choices: KeyResizeSizeChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				let value = 0.25
				const info = KeyResizeSizeChoices.find((s) => s.id === action.options.LumaKeyResizeSize)
				if (info !== null && info !== undefined) {
					value = Number(info.label)
				}
				await sendCommand(ActionId.LumaKeyResizeSize, ReqType.Set, [value])
			},
		},
		[ActionId.LumaKeyResizeXPosition]: {
			name: 'UpStream Key:Set Luma Key X Position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'LumaKeyResizeXPosition',
					min: -16,
					max: 16,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.LumaKeyResizeXPosition, ReqType.Set, [
					getOptNumber(action, 'LumaKeyResizeXPosition'),
				])
			},
		},
		[ActionId.LumaKeyResizeYPosition]: {
			name: 'UpStream Key:Set Luma Key Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'LumaKeyResizeYPosition',
					min: -9.0,
					max: 9.0,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.LumaKeyResizeYPosition, ReqType.Set, [
					getOptNumber(action, 'LumaKeyResizeYPosition'),
				])
			},
		},
	}
}
