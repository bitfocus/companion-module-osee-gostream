import { ActionId } from './ActionId'
import { getOptNumber } from './index'
import { getChoices } from '../choices'
import { SwitchChoices, KeySwitchChoices } from '../model'
import { ReqType, ActionType } from '../enums'
import { sendCommand } from '../connection'
import type { GoStreamDeckInstance } from '../index'
import type { CompanionActionDefinitions } from '@companion-module/base'

export function createDSKActions(_self: GoStreamDeckInstance): CompanionActionDefinitions {
	return {
		[ActionId.TransitionSourceBG]: {
			name: 'Transition: Change selection',
			options: [
				{
					type: 'checkbox',
					label: 'Background',
					id: 'Background',
					default: false,
				},
				{
					type: 'checkbox',
					label: 'Key',
					id: 'Key',
					default: false,
				},
			],
			callback: async (action) => {
				let num = 0
				const bg = action.options.Background
				const key = action.options.Key
				if (key === true) {
					num += 1
				}
				if (bg === true) {
					num += 1 << 2
				}
				await sendCommand(ActionId.TransitionSource, ReqType.Set, [num])
			},
		},
		[ActionId.TransitionSource]: {
			name: 'Next Transition:Set Transition Key Switch',
			options: [
				{
					type: 'dropdown',
					label: 'Switch',
					id: 'KeySwitch',
					choices: KeySwitchChoices,
					default: 2,
				},
			],
			callback: async (action) => {
				const seleOptions = action.options.KeySwitch
				if (seleOptions && Array.isArray(seleOptions)) {
					const arrayOptions = Array.from(seleOptions)
					const keyState = _self.states.TKeyeState
					let num = 0
					if (keyState.M_Key === true) {
						num += 1
					}
					if (keyState.DSK === true) {
						num += 1 << 1
					}
					if (keyState.BKGD === true) {
						num += 1 << 2
					}
					//console.log(num);
					if (arrayOptions.includes(0)) {
						if (keyState.M_Key === true) {
							num -= 1
						} else {
							num += 1
						}
					}
					if (arrayOptions.includes(1)) {
						if (keyState.DSK === true) {
							num -= 1 << 1
						} else {
							num += 1 << 1
						}
					}
					if (arrayOptions.includes(2)) {
						if (keyState.BKGD === true) {
							num -= 1 << 2
						} else {
							num += 1 << 2
						}
					}
					await sendCommand(ActionId.TransitionSource, ReqType.Set, [num])
				}
			},
		},
		[ActionId.KeyOnAir]: {
			name: 'Next Transition:Set KeyOnAir',
			options: [
				{
					type: 'dropdown',
					label: 'Key OnAir',
					id: 'KeyOnAir',
					choices: [
						{ id: 0, label: 'Off' },
						{ id: 1, label: 'On Air' },
						{ id: 2, label: 'Toggle' },
					],
					default: 2,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'KeyOnAir')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.TKeyeState.KeyOnAir === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.KeyOnAir, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.KeyOnAir, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.DskOnAir]: {
			name: 'Next Transition:Set DSKOnAir',
			options: [
				{
					type: 'dropdown',
					label: 'DSK OnAir',
					id: 'DSKOnAir',
					choices: [
						{ id: 0, label: 'Off' },
						{ id: 1, label: 'On Air' },
						{ id: 2, label: 'Toggle' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'DSKOnAir')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.TKeyeState.DSKOnAir === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.DskOnAir, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.DskOnAir, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.DskSourceFillKey]: {
			name: 'DSK:Set Source And Key',
			options: [
				{
					type: 'dropdown',
					label: 'Fill',
					id: 'DSKFill',
					choices: getChoices(ActionType.DskSourceFill),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Key',
					id: 'DSKKey',
					choices: getChoices(ActionType.DskSourceFill),
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
					choices: getChoices(ActionType.DskSourceFill),
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
					choices: getChoices(ActionType.DskSourceFill),
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
					if (_self.states.DSKState.DskMask === true) {
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
				//_self.states.dskOnAir=true;
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
				//_self.states.dskOnAir=true;
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
				//_self.states.dskOnAir=true;
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
					if (_self.states.DSKState.DskControlShapedKey === true) {
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
					if (_self.states.DSKState.DskControlInvert === true) {
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
