import { ActionId } from './actionId'
import { getOptNumber } from './../../util'
import { SwitchChoices } from './../../model'
import { ReqType, ActionType } from './../../enums'
import { sendCommand } from './../../connection'
import { GoStreamModel } from '../../models/types'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { DownstreamKeyerStateT } from './state'

export function create(model: GoStreamModel, state: DownstreamKeyerStateT): CompanionActionDefinitions {
	return {
		[ActionId.DskSourceFillKey]: {
			name: 'DSK:Set Source And Key',
			options: [
				{
					type: 'dropdown',
					label: 'Fill',
					id: 'DSKFill',
					choices: model.getChoices(ActionType.DskSourceFill),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Key',
					id: 'DSKKey',
					choices: model.getChoices(ActionType.DskSourceFill),
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
			name: 'DSK:Set Source',
			options: [
				{
					type: 'dropdown',
					label: 'DSK Fill',
					id: 'DSKFill',
					choices: model.getChoices(ActionType.DskSourceFill),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskSourceFill, ReqType.Set, [getOptNumber(action, 'DSKFill')])
			},
		},
		[ActionId.DskSourceKey]: {
			name: 'DSK:Set Source Key',
			options: [
				{
					type: 'dropdown',
					label: 'DSK Key',
					id: 'DSKKey',
					choices: model.getChoices(ActionType.DskSourceFill),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskSourceKey, ReqType.Set, [getOptNumber(action, 'DSKKey')])
			},
		},
		[ActionId.DskMaskEnable]: {
			name: 'DSK:Set Mask Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Dsk Mask Enable',
					id: 'DskMaskEnable',
					default: 2,
					choices: SwitchChoices,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'DskMaskEnable')
				let paramOpt = 0
				if (opt === 2) {
					if (state.mask.enabled === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.DskMaskEnable, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.DskMaskEnable, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.DskMaskHStart]: {
			name: 'DSK:Set Mask H Start',
			options: [
				{
					type: 'number',
					label: 'H Start',
					id: 'HStart',
					default: 0,
					min: 0,
					max: 100,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskMaskHStart, ReqType.Set, [getOptNumber(action, 'HStart')])
			},
		},
		[ActionId.DskMaskVStart]: {
			name: 'DSK:Set Mask V Start',
			options: [
				{
					type: 'number',
					label: 'V Start',
					id: 'VStart',
					default: 0,
					min: 0,
					max: 100,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskMaskVStart, ReqType.Set, [getOptNumber(action, 'VStart')])
			},
		},
		[ActionId.DskMaskHEnd]: {
			name: 'DSK:Set Mask H End',
			options: [
				{
					type: 'number',
					label: 'H End',
					id: 'HEnd',
					default: 100,
					min: 1,
					max: 100,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskMaskHEnd, ReqType.Set, [getOptNumber(action, 'HEnd')])
			},
		},
		[ActionId.DskMaskVEnd]: {
			name: 'DSK:Set Mask V End',
			options: [
				{
					type: 'number',
					label: 'V End',
					id: 'VEnd',
					default: 100,
					min: 1,
					max: 100,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskMaskVEnd, ReqType.Set, [getOptNumber(action, 'VEnd')])
			},
		},
		[ActionId.DskControlShapedKey]: {
			name: 'DSK:Set Control Shaped Key',
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
			name: 'DSK:Set Control Clip',
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
			name: 'DSK:Set Control Gain',
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
			name: 'DSK:Set Control Invert',
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
			name: 'DSK:Set Control Rate',
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
