import { ActionId } from '../ActionId'
import { getOptNumber } from '../index'
import { getChoices } from '../../choices'
import { SwitchChoices, KeyResizeSizeChoices } from '../../model'
import { ReqType, ActionType } from '../../enums'
import { sendCommand } from '../../connection'
import type { GoStreamInstance } from '../../index'
import type { CompanionActionDefinitions } from '@companion-module/base'

export function createChromaKeyActions(_self: GoStreamInstance): CompanionActionDefinitions {
	return {
		[ActionId.ChromaKeyFill]: {
			name: 'UpStream Key:Set Chroma Key Source Fill',
			options: [
				{
					type: 'dropdown',
					label: 'Source Fill',
					id: 'KeyFill',
					choices: getChoices(ActionType.ChromaKeySourceKey),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyFill, ReqType.Set, [getOptNumber(action, 'KeyFill')])
			},
		},
		[ActionId.ChromaKeyMaskEnable]: {
			name: 'UpStream Key:Set Chroma Key Mask Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Mask Enable',
					id: 'ChromaKeyMaskEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyMaskEnable, ReqType.Set, [getOptNumber(action, 'ChromaKeyMaskEnable')])
			},
		},
		[ActionId.ChromaKeyMaskHStart]: {
			name: 'UpStream Key:Set Chroma Key Mask H Start',
			options: [
				{
					type: 'number',
					label: 'H Start',
					id: 'ChromaKeyMaskHStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyMaskHStart, ReqType.Set, [getOptNumber(action, 'ChromaKeyMaskHStart')])
			},
		},
		[ActionId.ChromaKeyMaskVStart]: {
			name: 'UpStream Key:Set Chroma Key Mask V Start',
			options: [
				{
					type: 'number',
					label: 'V Start',
					id: 'ChromaKeyMaskVStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyMaskVStart, ReqType.Set, [getOptNumber(action, 'ChromaKeyMaskVStart')])
			},
		},
		[ActionId.ChromaKeyMaskHEnd]: {
			name: 'UpStream Key:Set Chroma Key Mask H End',
			options: [
				{
					type: 'number',
					label: 'H End',
					id: 'ChromaKeyMaskHEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyMaskHEnd, ReqType.Set, [getOptNumber(action, 'ChromaKeyMaskHEnd')])
			},
		},
		[ActionId.ChromaKeyMaskVEnd]: {
			name: 'UpStream Key:Set Chroma Key Mask V End',
			options: [
				{
					type: 'number',
					label: 'V End',
					id: 'ChromaKeyMaskVEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyMaskVEnd, ReqType.Set, [getOptNumber(action, 'ChromaKeyMaskVEnd')])
			},
		},
		[ActionId.ChromaKeyResizeEnable]: {
			name: 'UpStream Key:Set Chroma Key Resize Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'ChromaKeyResizeEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyResizeEnable, ReqType.Set, [getOptNumber(action, 'ChromaKeyResizeEnable')])
			},
		},
		[ActionId.ChromaKeyResizeSize]: {
			name: 'UpStream Key:Set Chroma Key Resize Size',
			options: [
				{
					type: 'dropdown',
					label: 'Size',
					id: 'ChromaKeyResizeSize',
					choices: KeyResizeSizeChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				let value = 0.25
				const info = KeyResizeSizeChoices.find((s) => s.id === action.options.ChromaKeyResizeSize)
				if (info !== null && info !== undefined) {
					value = Number(info.label)
				}
				await sendCommand(ActionId.ChromaKeyResizeSize, ReqType.Set, [value])
			},
		},
		[ActionId.ChromaKeyResizeXPosition]: {
			name: 'UpStream Key:Set Chroma Key X Position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'ChromaKeyResizeXPosition',
					min: -16,
					max: 16,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyResizeXPosition, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyResizeXPosition'),
				])
			},
		},
		[ActionId.ChromaKeyResizeYPosition]: {
			name: 'UpStream Key:Set Chroma Key Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'ChromaKeyResizeYPosition',
					min: -9.0,
					max: 9.0,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyResizeYPosition, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyResizeYPosition'),
				])
			},
		},
		[ActionId.ChromaKeyControlSMPXPosition]: {
			name: 'UpStream Key:Set Chroma Key SMP X Position',
			options: [
				{
					type: 'number',
					label: 'SMP X Position',
					id: 'ChromaKeyControlSMPXPosition',
					min: -16.0,
					max: 16.0,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyControlSMPXPosition, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyControlSMPXPosition'),
				])
			},
		},
		[ActionId.ChromaKeyControlSMPYPosition]: {
			name: 'UpStream Key:Set Chroma Key SMP Y Position',
			options: [
				{
					type: 'number',
					label: 'SMP Y Position',
					id: 'ChromaKeyControlSMPYPosition',
					min: -9.0,
					max: 9.0,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyControlSMPYPosition, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyControlSMPYPosition'),
				])
			},
		},
		[ActionId.ChromaKeyControlSample]: {
			name: 'UpStream Key:Set Chroma Key Control Sample Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Sample Enable',
					id: 'ChromaKeyControlSample',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyControlSample, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyControlSample'),
				])
			},
		},
		[ActionId.ChromaKeyControlColor]: {
			name: 'UpStream Key:Set Chroma Key Control Color',
			options: [
				{
					type: 'colorpicker',
					label: 'Control Color',
					id: 'ChromaKeyControlColor',
					default: 0,
				},
			],
			callback: async () => {
				//await sendCommand( ActionId.ChromaKeyControlSample, ReqType.Set, [getOptNumber(action, 'ChromaKeyControlSample')]);
			},
		},
		[ActionId.ChromaKeyControlForeground]: {
			name: 'UpStream Key:Set Chroma Key Foreground',
			options: [
				{
					type: 'number',
					label: 'Foreground',
					id: 'ChromaKeyControlForeground',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyControlForeground, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyControlForeground'),
				])
			},
		},
		[ActionId.ChromaKeyControlBackground]: {
			name: 'UpStream Key:Set Chroma Key Background',
			options: [
				{
					type: 'number',
					label: 'Background',
					id: 'ChromaKeyControlBackground',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyControlBackground, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyControlBackground'),
				])
			},
		},
		[ActionId.ChromaKeyControlKeyEdge]: {
			name: 'UpStream Key:Set Chroma Key Edge',
			options: [
				{
					type: 'number',
					label: 'Key Edge',
					id: 'ChromaKeyControlKeyEdge',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyControlKeyEdge, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyControlKeyEdge'),
				])
			},
		},
	}
}
