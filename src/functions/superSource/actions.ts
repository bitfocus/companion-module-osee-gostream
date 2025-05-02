import { ActionId } from './actionId'
import { getOptNumber, sequenceOrderDropdown, nextInSequence } from '../../util'
import {
	SwitchChoices,
	SuperSourceBorderChoices,
	SuperSourceMaskChoices,
	SuperSourceStyleChoices,
	SuperSourceChoices,
} from '../../model'
import { ReqType, ActionType } from '../../enums'
import { sendCommand, sendCommands, GoStreamCmd } from '../../connection'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { SuperSourceStateT } from './state'
import { GoStreamModel } from '../../models/types'

export function create(model: GoStreamModel, state: SuperSourceStateT): CompanionActionDefinitions {
	return {
		[ActionId.SuperSourceEnable]: {
			name: 'Super Source:Super Source Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable:',
					id: 'SuperSourceEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'SuperSourceEnable')
				let paramOpt = 0
				if (opt === 2) {
					if (state.enable === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.SuperSourceEnable, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.SuperSourceEnable, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.SuperSourceSource]: {
			name: 'Super Source: Set SuperSource Source',
			options: [
				{
					type: 'dropdown',
					label: 'Super Source',
					id: 'typeid',
					choices: SuperSourceChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'SourceID',
					choices: model.getChoices(ActionType.SuperSourceSource),
					default: 0,
				},
			],
			callback: async (action) => {
				const type = Number(action.options.typeid)
				const sourceID = Number(action.options.SourceID)
				if (type === 0) {
					await sendCommand(ActionId.SuperSourceSource1, ReqType.Set, [sourceID])
				} else if (type === 1) {
					await sendCommand(ActionId.SuperSourceSource2, ReqType.Set, [sourceID])
				} else if (type === 2) {
					await sendCommand(ActionId.SuperSourceBackground, ReqType.Set, [sourceID])
				}
			},
		},
		[ActionId.SuperSourceSourceSequence]: {
			name: 'Super Source: Set SuperSource Source Sequence',
			description:
				'Choose a set of input sources to cycle through, either sequentially or randomly. Each button press will advance to the next source. "Random sets" will cycle through the whole set before repeating; "Random selection" allows repeats any time. To automate a sequence add this action to a "Time Interval" Trigger.',
			options: [
				{
					type: 'dropdown',
					label: 'Super Source',
					id: 'typeid',
					choices: SuperSourceChoices, // 0, 1, 2: source1, source2, background
					default: 0,
				},
				{
					id: 'Sources',
					type: 'multidropdown',
					label: 'Sources',
					choices: model.getChoices(ActionType.SuperSourceSource),
					// default sequence is all sources:
					default: model.getChoices(ActionType.SuperSourceSource).map((val) => val.id),
				},
				sequenceOrderDropdown,
			],
			callback: async (action) => {
				const window = Number(action.options.typeid)
				const srcSequence = action.options.Sources as number[]
				let curSource = state.source1
				if (window === 1) {
					curSource = state.source2
				} else if (window === 2) {
					curSource = state.background
				}
				const sourceID = nextInSequence(srcSequence, curSource, action)

				if (window === 0) {
					await sendCommand(ActionId.SuperSourceSource1, ReqType.Set, [sourceID])
				} else if (window === 1) {
					await sendCommand(ActionId.SuperSourceSource2, ReqType.Set, [sourceID])
				} else if (window === 2) {
					await sendCommand(ActionId.SuperSourceBackground, ReqType.Set, [sourceID])
				}
			},
		},
		[ActionId.SuperSourceControlStyle]: {
			name: 'Super Source:Super Source Style',
			options: [
				{
					type: 'dropdown',
					label: 'SuperSource Style:',
					id: 'SuperSourceStyle',
					choices: SuperSourceStyleChoices.concat([{ id: -1, label: 'Toggle' }]),
					default: 0,
				},
				{
					type: 'multidropdown',
					label: 'Sequence',
					id: 'StyleSequence',
					choices: SuperSourceStyleChoices,
					default: SuperSourceStyleChoices.map((item) => item.id),
					isVisible: (options) => options.SuperSourceStyle === -1,
				},
			],
			callback: async (action) => {
				let choice = getOptNumber(action, 'SuperSourceStyle')
				if (choice === -1) {
					// Toggle: cycle through all available choices sequentially:
					const sizes = action.options.StyleSequence as number[]
					const curStyle = state.controlStyle
					choice = nextInSequence(sizes, curStyle) as number
				}
				await sendCommand(ActionId.SuperSourceControlStyle, ReqType.Set, [choice])
			},
		},
		[ActionId.SuperSourceControlYPosition]: {
			name: 'Super Source:Super Source Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position:',
					id: 'superSourceYPosition',
					min: 0,
					max: 100,
					default: 50,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceControlYPosition, ReqType.Set, [
					getOptNumber(action, 'superSourceYPosition'),
				])
			},
		},
		[ActionId.SuperSourceSetMaskProperties]: {
			name: 'Super Source: set mask properties',
			options: [
				{
					type: 'dropdown',
					label: 'Mask',
					id: 'SuperSourceMask',
					choices: SuperSourceMaskChoices,
					default: 0,
				},
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
					id: 'SuperSourceMaskEnable',
					choices: SwitchChoices,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('enable'),
				},
				{
					type: 'number',
					label: 'H Start',
					id: 'SuperSourceMaskHStart',
					min: 0,
					max: 100,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('hMaskStart'),
				},
				{
					type: 'number',
					label: 'H End',
					id: 'SuperSourceMaskHEnd',
					min: 0,
					max: 100,
					default: 100,
					isVisible: (options) => (<string[]>options.props!).includes('hMaskEnd'),
				},
				{
					type: 'number',
					label: 'V Start',
					id: 'SuperSourceMaskVStart',
					min: 0,
					max: 100,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('vMaskStart'),
				},
				{
					type: 'number',
					label: 'V End',
					id: 'SuperSourceMaskVEnd',
					min: 0,
					max: 100,
					default: 100,
					isVisible: (options) => (<string[]>options.props!).includes('vMaskEnd'),
				},
			],
			callback: async (action) => {
				const props = <string[]>action.options.props
				const commands: GoStreamCmd[] = []
				const maskId = getOptNumber(action, 'SuperSourceMask')
				if (props.includes('enable')) {
					let paramOpt = getOptNumber(action, 'SuperSourceMaskEnable')
					if (paramOpt === 2) paramOpt = state.maskEnable[maskId] ? 0 : 1
					commands.push({
						id: ActionId.SuperSourceMaskEnable,
						type: ReqType.Set,
						value: [maskId, paramOpt],
					})
				}
				if (props.includes('hMaskStart')) {
					commands.push({
						id: ActionId.SuperSourceMaskHStart,
						type: ReqType.Set,
						value: [maskId, getOptNumber(action, 'SuperSourceMaskHStart')],
					})
				}
				if (props.includes('hMaskEnd')) {
					commands.push({
						id: ActionId.SuperSourceMaskHEnd,
						type: ReqType.Set,
						value: [maskId, getOptNumber(action, 'SuperSourceMaskHEnd')],
					})
				}
				if (props.includes('vMaskStart')) {
					commands.push({
						id: ActionId.SuperSourceMaskVStart,
						type: ReqType.Set,
						value: [maskId, getOptNumber(action, 'SuperSourceMaskVStart')],
					})
				}
				if (props.includes('vMaskEnd')) {
					commands.push({
						id: ActionId.SuperSourceMaskVEnd,
						type: ReqType.Set,
						value: [maskId, getOptNumber(action, 'SuperSourceMaskVEnd')],
					})
				}

				if (commands.length > 0) await sendCommands(commands)
			},
		},
		[ActionId.SuperSourceBorderWidth]: {
			name: 'Super Source:Super Source Border Width',
			options: [
				{
					type: 'dropdown',
					label: 'Border',
					id: 'SuperSourceBorder',
					choices: SuperSourceBorderChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Border Width',
					id: 'SuperSourceBorderWidth',
					min: 0,
					max: 10,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceBorderWidth, ReqType.Set, [
					getOptNumber(action, 'SuperSourceBorder'),
					getOptNumber(action, 'SuperSourceBorderWidth'),
				])
			},
		},
		[ActionId.SuperSourceBorderHue]: {
			name: 'Super Source:Super Source Border Hue',
			options: [
				{
					type: 'dropdown',
					label: 'Border',
					id: 'SuperSourceBorder',
					choices: SuperSourceBorderChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Border Hue',
					id: 'SuperSourceBorderHue',
					min: 0,
					max: 359,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceBorderHue, ReqType.Set, [
					getOptNumber(action, 'SuperSourceBorder'),
					getOptNumber(action, 'SuperSourceBorderHue'),
				])
			},
		},
		[ActionId.SuperSourceBorderSaturation]: {
			name: 'Super Source:Super Source Border Saturation',
			options: [
				{
					type: 'dropdown',
					label: 'Border',
					id: 'SuperSourceBorder',
					choices: SuperSourceBorderChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Border Saturation',
					id: 'SuperSourceBorderSaturation',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceBorderSaturation, ReqType.Set, [
					getOptNumber(action, 'SuperSourceBorder'),
					getOptNumber(action, 'SuperSourceBorderSaturation'),
				])
			},
		},
		[ActionId.SuperSourceBorderBrightness]: {
			name: 'Super Source:Super Source Border Brightness',
			options: [
				{
					type: 'dropdown',
					label: 'Border',
					id: 'SuperSourceBorder',
					choices: SuperSourceBorderChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Border Brightness',
					id: 'SuperSourceBrightness',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceBorderBrightness, ReqType.Set, [
					getOptNumber(action, 'SuperSourceBorder'),
					getOptNumber(action, 'SuperSourceBrightness'),
				])
			},
		},
	}
}
