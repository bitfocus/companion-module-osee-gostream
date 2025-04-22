import { ActionId } from './actionId'
import { getOptNumber } from './../../util'
import { SwitchChoices } from './../../model'
import { ReqType } from './../../enums'
import { sendCommand, sendCommands, GoStreamCmd } from './../../connection'
import { GoStreamModel } from '../../models/types'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { DownstreamKeyerStateT } from './state'

function createActionName(name: string): string {
	return 'DownstreamKeyer: ' + name
}
export function create(model: GoStreamModel, state: DownstreamKeyerStateT): CompanionActionDefinitions {
	return {
		[ActionId.DskSourceFillKey]: {
			name: createActionName('Set source and key'),
			options: [
				{
					type: 'dropdown',
					label: 'Fill',
					id: 'DSKFill',
					choices: model.FillKeySources().map((item) => ({ id: item.id, label: item.name })),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Key',
					id: 'DSKKey',
					choices: model.FillKeySources().map((item) => ({ id: item.id, label: item.name })),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskSourceFillKey, ReqType.Set, [
					getOptNumber(action, 'DSKFill'),
					getOptNumber(action, 'DSKKey'),
				])
			},
		},
		[ActionId.DskSourceFill]: {
			name: createActionName('Set fill source'),
			options: [
				{
					type: 'dropdown',
					label: 'DSK Fill',
					id: 'DSKFill',
					choices: model.FillKeySources().map((item) => ({ id: item.id, label: item.name })),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskSourceFill, ReqType.Set, [getOptNumber(action, 'DSKFill')])
			},
		},
		[ActionId.DskSourceKey]: {
			name: createActionName('Set key'),
			options: [
				{
					type: 'dropdown',
					label: 'DSK Key',
					id: 'DSKKey',
					choices: model.FillKeySources().map((item) => ({ id: item.id, label: item.name })),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskSourceKey, ReqType.Set, [getOptNumber(action, 'DSKKey')])
			},
		},
		[ActionId.DskSetMaskProperties]: {
			name: createActionName('Set mask properties'),
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
					const opt = getOptNumber(action, 'maskEnable')
					let paramOpt = 0
					if (opt === 2) {
						if (state.mask.enabled === true) {
							paramOpt = 0
						} else {
							paramOpt = 1
						}
						commands.push({
							id: ActionId.DskMaskEnable,
							type: ReqType.Set,
							value: [paramOpt],
						})
					} else {
						commands.push({
							id: ActionId.DskMaskEnable,
							type: ReqType.Set,
							value: [opt],
						})
					}
				}
				if (props.includes('hMaskStart')) {
					commands.push({
						id: ActionId.DskMaskHStart,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskHStart')],
					})
				}
				if (props.includes('hMaskEnd')) {
					commands.push({
						id: ActionId.DskMaskHEnd,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskHEnd')],
					})
				}
				if (props.includes('vMaskStart')) {
					commands.push({
						id: ActionId.DskMaskVStart,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskVStart')],
					})
				}
				if (props.includes('vMaskEnd')) {
					commands.push({
						id: ActionId.DskMaskVEnd,
						type: ReqType.Set,
						value: [getOptNumber(action, 'maskVEnd')],
					})
				}

				if (commands.length > 0) await sendCommands(commands)
			},
		},
		[ActionId.DskControlShapedKey]: {
			name: createActionName('Set shaped key'),
			options: [
				{
					type: 'dropdown',
					label: 'Shaped Key',
					id: 'ShapedKey',
					default: 0,
					choices: SwitchChoices,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'ShapedKey')
				let paramOpt = 0
				if (opt === 2) {
					if (state.control.shapedKey === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.DskControlShapedKey, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.DskControlShapedKey, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.DskControlClip]: {
			name: createActionName('Set clip'),
			options: [
				{
					type: 'number',
					label: 'Clip',
					id: 'Clip',
					default: 15,
					min: 0,
					max: 100,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskControlClip, ReqType.Set, [getOptNumber(action, 'Clip')])
			},
		},
		[ActionId.DskControlGain]: {
			name: createActionName('Set gain'),
			options: [
				{
					type: 'number',
					label: 'Gain',
					id: 'Gain',
					default: 50,
					min: 0,
					max: 100,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskControlGain, ReqType.Set, [getOptNumber(action, 'Gain')])
			},
		},
		[ActionId.DskControlInvert]: {
			name: createActionName('Set invert'),
			options: [
				{
					type: 'dropdown',
					label: 'Invert',
					id: 'Invert',
					default: 0,
					choices: SwitchChoices,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'Invert')
				let paramOpt = 0
				if (opt === 2) {
					if (state.control.invert === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.DskControlInvert, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.DskControlInvert, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.DskRate]: {
			name: createActionName('Set rate'),
			options: [
				{
					type: 'number',
					label: 'dskRate',
					id: 'dskRate',
					default: 0,
					min: 0.5,
					max: 8.0,
					range: true,
					step: 0.5,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskRate, ReqType.Set, [getOptNumber(action, 'dskRate')])
			},
		},
	}
}
