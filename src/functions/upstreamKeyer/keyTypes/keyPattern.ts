import { ActionId } from '../actionId'
import { getOptNumber } from './../../../util'
import { SwitchChoices, KeyResizeSizeChoices } from './../../../model'
import { ReqType, ActionType } from './../../../enums'
import { sendCommand, sendCommands, GoStreamCmd } from './../../../connection'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { UpstreamKeyerStateT, USKKeyTypes } from '../state'
import { GoStreamModel } from '../../../models/types'
export function createKeyPatternActions(model: GoStreamModel, state: UpstreamKeyerStateT): CompanionActionDefinitions {
	return {
		[ActionId.KeyPatternSourceFill]: {
			name: 'UpStream Key:Set Key Pattern Source Fill',
			options: [
				{
					type: 'dropdown',
					label: 'Source Fill',
					id: 'KeyFill',
					choices: model.getChoices(ActionType.KeyPatternSourceKey),
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
		[ActionId.KeyPatternSetMaskProperties]: {
			name: 'UpStream Key: Set keypattern mask properties',
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
					if (paramOpt === 2) paramOpt = state.keyInfo[USKKeyTypes.KeyPattern].mask.enabled ? 0 : 1
					commands.push({
						id: ActionId.KeyPatternMaskEnable,
						type: ReqType.Set,
						value: [paramOpt],
					})
				}
				if (props.includes('hMaskStart')) {
					commands.push({
						id: ActionId.KeyPatternMaskHStart,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskHStart')],
					})
				}
				if (props.includes('hMaskEnd')) {
					commands.push({
						id: ActionId.KeyPatternMaskHEnd,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskHEnd')],
					})
				}
				if (props.includes('vMaskStart')) {
					commands.push({
						id: ActionId.KeyPatternMaskVStart,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskVStart')],
					})
				}
				if (props.includes('vMaskEnd')) {
					commands.push({
						id: ActionId.KeyPatternMaskVEnd,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskVEnd')],
					})
				}

				if (commands.length > 0) await sendCommands(commands)
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
				await sendCommand(ActionId.KeyPatternResizeSize, ReqType.Set, [getOptNumber(action, 'KeyPatternResizeSize')])
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
