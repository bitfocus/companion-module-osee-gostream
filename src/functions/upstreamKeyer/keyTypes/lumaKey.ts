import { ActionId } from '../actionId'
import { getOptNumber } from './../../../util'
import { SwitchChoices, KeyResizeSizeChoices } from './../../../model'
import { ReqType, ActionType } from './../../../enums'
import { sendCommand, sendCommands, GoStreamCmd } from './../../../connection'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { UpstreamKeyerStateT, USKKeyTypes } from '../state'
import { GoStreamModel } from '../../../models/types'
export function createLumaKeyActions(model: GoStreamModel, state: UpstreamKeyerStateT): CompanionActionDefinitions {
	return {
		[ActionId.LumaKeySourceFill]: {
			name: 'UpStream Key:Set Luma Key Source Fill',
			options: [
				{
					type: 'dropdown',
					label: 'Source Fill',
					id: 'KeyFill',
					choices: model.getChoices(ActionType.LumaKeySourceKey),
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
					choices: model.getChoices(ActionType.LumaKeySourceKey),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.LumaKeySourceKey, ReqType.Set, [getOptNumber(action, 'LumaKeySourceKey')])
			},
		},
		[ActionId.LumaKeySetMaskProperties]: {
			name: 'UpStream Key: Set luma mask properties',
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
					if (paramOpt === 2) paramOpt = state.keyInfo[USKKeyTypes.Luma].mask.enabled ? 0 : 1
					commands.push({
						id: ActionId.LumaKeyMaskEnable,
						type: ReqType.Set,
						value: [paramOpt],
					})
				}
				if (props.includes('hMaskStart')) {
					commands.push({
						id: ActionId.LumaKeyMaskHStart,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskHStart')],
					})
				}
				if (props.includes('hMaskEnd')) {
					commands.push({
						id: ActionId.LumaKeyMaskHEnd,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskHEnd')],
					})
				}
				if (props.includes('vMaskStart')) {
					commands.push({
						id: ActionId.LumaKeyMaskVStart,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskVStart')],
					})
				}
				if (props.includes('vMaskEnd')) {
					commands.push({
						id: ActionId.LumaKeyMaskVEnd,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskVEnd')],
					})
				}

				if (commands.length > 0) await sendCommands(commands)
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
