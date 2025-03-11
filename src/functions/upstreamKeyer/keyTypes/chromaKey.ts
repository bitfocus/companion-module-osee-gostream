import { ActionId } from '../actionId'
import { getOptNumber } from './../../../util'
import { SwitchChoices, KeyResizeSizeChoices } from './../../../model'
import { ReqType, ActionType } from './../../../enums'
import { sendCommand, sendCommands, GoStreamCmd } from './../../../connection'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { UpstreamKeyerStateT, USKKeyTypes } from '../state'
import { GoStreamModel } from '../../../models/types'
export function createChromaKeyActions(model: GoStreamModel, state: UpstreamKeyerStateT): CompanionActionDefinitions {
	return {
		[ActionId.ChromaKeyFill]: {
			name: 'UpStream Key:Set Chroma Key Source Fill',
			options: [
				{
					type: 'dropdown',
					label: 'Source Fill',
					id: 'KeyFill',
					choices: model.getChoices(ActionType.ChromaKeySourceKey),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyFill, ReqType.Set, [getOptNumber(action, 'KeyFill')])
			},
		},
		[ActionId.ChromaKeySetMaskProperties]: {
			name: 'UpStream Key: Set chroma mask properties',
			options: [
				{
					id: 'props',
					type: 'multidropdown',
					label: 'Select properties',
					choices: [
						{ id: 'enable', label: 'enable' },
						{ id: 'hMaskStart', label: 'hMaskStart' },
						{ id: 'hMaskEnd', label: 'hMaskEnd' },
						{ id: 'vMaskStart', label: 'vMaskStart' },
						{ id: 'vMaskEnd', label: 'vMaskEnd' },
					],
					minSelection: 1,
					default: ['enable', 'hMaskStart', 'hMaskEnd', 'vMaskStart', 'vMaskEnd'],
				},
				{
					type: 'dropdown',
					label: 'Mask Enable',
					id: 'maskEnable',
					choices: SwitchChoices,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('enable'),
				},
				{
					type: 'number',
					label: 'H Start',
					id: 'maskHStart',
					min: 0,
					max: 100,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('hMaskStart'),
				},
				{
					type: 'number',
					label: 'H End',
					id: 'maskHEnd',
					min: 0,
					max: 100,
					default: 100,
					isVisible: (options) => (<string[]>options.props!).includes('hMaskEnd'),
				},
				{
					type: 'number',
					label: 'V Start',
					id: 'maskVStart',
					min: 0,
					max: 100,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('vMaskStart'),
				},
				{
					type: 'number',
					label: 'V End',
					id: 'maskVEnd',
					min: 0,
					max: 100,
					default: 100,
					isVisible: (options) => (<string[]>options.props!).includes('vMaskEnd'),
				},
			],
			callback: async (action) => {
				const props = <string[]>action.options.props
				const commands: GoStreamCmd[] = []
				if (props.includes('enable')) {
					let paramOpt = getOptNumber(action, 'maskEnable')
					if (paramOpt === 2) paramOpt = state.keyInfo[USKKeyTypes.Chroma].mask.enabled ? 0 : 1
					commands.push({
						id: ActionId.ChromaKeyMaskEnable,
						type: ReqType.Set,
						value: [paramOpt],
					})
				}
				if (props.includes('hMaskStart')) {
					commands.push({
						id: ActionId.ChromaKeyMaskHStart,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskHStart')],
					})
				}
				if (props.includes('hMaskEnd')) {
					commands.push({
						id: ActionId.ChromaKeyMaskHEnd,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskHEnd')],
					})
				}
				if (props.includes('vMaskStart')) {
					commands.push({
						id: ActionId.ChromaKeyMaskVStart,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskVStart')],
					})
				}
				if (props.includes('vMaskEnd')) {
					commands.push({
						id: ActionId.ChromaKeyMaskVEnd,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskVEnd')],
					})
				}

				if (commands.length > 0) await sendCommands(commands)
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
					value = Number(info.id)
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
