import { ActionId } from './ActionId'
import { getOptNumber } from './index'
import { getChoices } from '../choices'
import { WipeDirectionChoices, TransitionStyleChoice, SwitchChoices } from '../model'
import { ReqType, ActionType, TransitionStyle } from '../enums'
import { sendCommand } from '../connection'
import type { GoStreamInstance } from '../index'
import type { CompanionActionDefinitions } from '@companion-module/base'

/**
 * Returns all implemented transition related actions.
 * @param self reference to the BaseInstance
 * @constructor
 * @returns CompanionActionDefinitions
 */
export function createTransitionActions(_self: GoStreamInstance): CompanionActionDefinitions {
	return {
		[ActionId.CutTransition]: {
			name: 'Perform CUT transition',
			options: [],
			callback: async () => {
				await sendCommand(ActionId.CutTransition, ReqType.Set)
			},
		},
		[ActionId.AutoTransition]: {
			name: 'Perform AUTO transition',
			options: [],
			callback: async () => {
				await sendCommand(ActionId.AutoTransition, ReqType.Set)
			},
		},
		[ActionId.FTB]: {
			name: 'Perform FTB Transition',
			options: [],
			callback: async () => {
				await sendCommand(ActionId.FTB, ReqType.Set)
			},
		},
		[ActionId.FtbAudioAFV]: {
			name: 'Perform FTB Transition,Audio follows video and pops in',
			options: [
				{
					type: 'dropdown',
					label: 'FTB Audio AFV',
					id: 'FtbAudioAFV',
					default: 0,
					choices: SwitchChoices,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'FtbAudioAFV')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.fadeToBlack.AFV === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.FtbAudioAFV, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.FtbAudioAFV, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.FtbRate]: {
			name: 'Fade to black: Change rate',
			options: [
				{
					type: 'number',
					label: 'FTB Rate(s)',
					id: 'FtbRate',
					default: 2,
					min: 0.5,
					max: 8.0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.FtbRate, ReqType.Set, [getOptNumber(action, 'FtbRate')])
			},
		},
		[ActionId.Prev]: {
			name: 'Preview switch',
			options: [
				{
					type: 'dropdown',
					label: 'PREV',
					id: 'prevEnable',
					default: 2,
					choices: SwitchChoices,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'prevEnable')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.selectTransitionStyle.PrevState === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.Prev, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.Prev, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.TransitionIndex]: {
			name: 'Transition: Set style/pattern',
			options: [
				{
					type: 'dropdown',
					label: 'Transition Style',
					id: 'TransitionStyle',
					default: TransitionStyle.MIX,
					choices: TransitionStyleChoice,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionIndex, ReqType.Set, [getOptNumber(action, 'TransitionStyle')])
			},
		},
		[ActionId.TransitionRate]: {
			name: 'Transition: Change rate',
			options: [
				{
					type: 'dropdown',
					label: 'Transition Style',
					id: 'TransitionStyle',
					default: TransitionStyle.MIX,
					choices: TransitionStyleChoice,
				},
				{
					type: 'number',
					label: 'Transition Rate',
					id: 'TransitionRate',
					default: 2,
					min: 0.5,
					max: 8.0,
					step: 0.5,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionRate, ReqType.Set, [
					getOptNumber(action, 'TransitionStyle'),
					getOptNumber(action, 'TransitionRate'),
				])
			},
		},
		[ActionId.TransitionDipSource]: {
			name: 'Transition:Change Dip Source',
			options: [
				{
					type: 'dropdown',
					label: 'Change Dip Source',
					id: 'TransitionDipSource',
					default: 0,
					choices: getChoices(ActionType.TransitionDipSource),
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionDipSource, ReqType.Set, [getOptNumber(action, 'TransitionDipSource')])
			},
		},
		[ActionId.TransitionWipePattern]: {
			name: 'Transition:Change Wipe Pattern',
			options: [
				{
					type: 'number',
					label: 'Wipe Pattern',
					id: 'WipePatternID',
					min: 0,
					max: 17,
					default: 0,
					range: true,
					step: 1,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipePattern, ReqType.Set, [getOptNumber(action, 'WipePatternID')])
			},
		},
		[ActionId.TransitionWipeXPosition]: {
			name: 'Transition:Change Wipe X Position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'XPosition',
					default: 0,
					min: -16.0,
					max: 16.0,
					step: 0.2,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipeXPosition, ReqType.Set, [getOptNumber(action, 'XPosition')])
			},
		},
		[ActionId.TransitionWipeYPosition]: {
			name: 'Transition:Change Wipe Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'YPosition',
					default: 0,
					min: -9.0,
					max: 9.0,
					step: 0.2,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipeYPosition, ReqType.Set, [getOptNumber(action, 'YPosition')])
			},
		},
		[ActionId.TransitionWipeDirection]: {
			name: 'Transition:Change Wipe Style Direction',
			options: [
				{
					type: 'dropdown',
					label: 'Change Wipe Style Direction',
					id: 'WipeDirection',
					default: 0,
					choices: WipeDirectionChoices,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipeDirection, ReqType.Set, [getOptNumber(action, 'WipeDirection')])
			},
		},
		[ActionId.TransitionWipeSymmetry]: {
			name: 'Transition:Change Wipe Style Symmetry',
			options: [
				{
					type: 'number',
					label: 'Symmetry',
					id: 'WipeSymmetry',
					default: 50,
					min: 0,
					max: 100,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipeSymmetry, ReqType.Set, [getOptNumber(action, 'WipeSymmetry')])
			},
		},
		[ActionId.TransitionWipeSoftness]: {
			name: 'Transition:Change Wipe Style Softness',
			options: [
				{
					type: 'number',
					label: 'Softness',
					id: 'WipeSoftness',
					default: 0,
					min: 0,
					max: 100,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipeSoftness, ReqType.Set, [getOptNumber(action, 'WipeSoftness')])
			},
		},
		[ActionId.TransitionWipeBorder]: {
			name: 'Transition:Change Wipe Style Border',
			options: [
				{
					type: 'number',
					label: 'Border',
					id: 'WipeBorder',
					default: 0,
					min: 0,
					max: 100,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipeBorder, ReqType.Set, [getOptNumber(action, 'WipeBorder')])
			},
		},
		[ActionId.TransitionWipeFillSource]: {
			name: 'Transition:Change Wipe Style Fill Source',
			options: [
				{
					type: 'dropdown',
					label: 'Fill Source',
					id: 'WipeFillSource',
					default: 0,
					choices: getChoices(ActionType.TransitionWipeFillSource),
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipeFillSource, ReqType.Set, [getOptNumber(action, 'WipeFillSource')])
			},
		},
	}
}
