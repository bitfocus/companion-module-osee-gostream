import { ActionId } from './../actionId'
import { getOptNumber, getOptString, makeChoices } from './../../../util'
import { SwitchChoices, KeyResizeSizeChoices } from './../../../model'
import { ReqType, ActionType } from './../../../enums'
import { sendCommand, sendCommands, GoStreamCmd } from './../../../connection'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { UpstreamKeyerStateT, USKKeyTypes } from '../state'
import { GoStreamModel } from '../../../models/types'

// #TODO: these constants should probably be embedded in the model
// Osee[X/Y]Radius: Osee's units for positioning: -9..+9 vertically, -16 - 16 horizontally
const OseeHalfWidth = 16.0
const OseeHalfHeight = 9.0
const imagePixelHeight = 1080
const pixel = (2 * OseeHalfHeight) / imagePixelHeight // convert pixels to Osee's -9..+9 units (this is the same whether calculated for x or y)
// #TODO: make edgeBuffer settable?
const edgeBuffer = pixel * 5 // when using left/right/up/down, stay this far away from the edge.

export function createPIPActions(model: GoStreamModel, state: UpstreamKeyerStateT): CompanionActionDefinitions {
	return {
		[ActionId.PipSource]: {
			name: 'UpStream Key:Set Pip Source',
			options: [
				{
					type: 'dropdown',
					label: 'PIP Source',
					id: 'KeyFill',
					choices: model.getChoices(ActionType.PipSource),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipSource, ReqType.Set, [getOptNumber(action, 'KeyFill')])
			},
		},
		[ActionId.PipSize]: {
			name: 'UpStream Key:Set PIP Size',
			options: [
				{
					type: 'dropdown',
					label: 'Size',
					id: 'PipSize',
					...makeChoices(state.keyScalingSizes()),
				},
			],
			callback: async (action) => {
				const choice = getOptNumber(action, 'PipSize')
				if (Number.isInteger(choice)) {
					// backward compatibility: choice is 0, 1, 2...
					const info = KeyResizeSizeChoices.find((s) => s.id === action.options.PipSize)
					if (info !== null && info !== undefined) {
						const value = Number(info.id)
						await sendCommand(ActionId.PipSize, ReqType.Set, [value])
					}
				} else {
					await sendCommand(ActionId.PipSize, ReqType.Set, [state.encodeKeyScalingSize(choice)])
				}
			},
		},
		[ActionId.PipXPosition]: {
			name: 'UpStream Key:Set PIP X Position',
			options: [
				{
					type: 'dropdown',
					label: 'Type',
					id: 'operation',
					choices: [
						{ id: 0, label: 'Absolute' },
						{ id: 1, label: 'Relative' },
						{ id: 2, label: 'Snap to Left Edge' },
						{ id: 3, label: 'Snap to Right Edge' },
					],
					default: 0,
				},
				{
					type: 'number',
					label: 'X Position',
					id: 'PipXPosition',
					min: -OseeHalfWidth,
					max: OseeHalfWidth,
					step: 0.2,
					default: 0,
					range: true,
					isVisible: (options) => !Object.keys(options).includes('operation') || options.operation === 0,
				},
				{
					type: 'textinput',
					label: 'X Position',
					id: 'PipXPositionRel',
					useVariables: true,
					isVisible: (options) => options.operation === 1,
				},
			],
			callback: async (action, context) => {
				let newpos = 0
				let operation = 0
				// a little extra work for backwards compatibility (so can be used before or w/o upgrade script)
				if (Object.keys(action.options).includes('operation')) {
					operation = getOptNumber(action, 'operation')
				}
				if (operation == 0) {
					//absolute
					newpos = getOptNumber(action, 'PipXPosition')
				} else {
					let valueStr = await context.parseVariablesInString(getOptString(action, 'PipXPositionRel'))
					const curPos = state.keyInfo[USKKeyTypes.Pip].xPosition
					const pipSizePct = state.keyInfo[USKKeyTypes.Pip].size
					if (operation === 2) {
						valueStr = 'LEFT'
					} else if (operation === 3) {
						valueStr = 'RIGHT'
					}
					let value = 0
					switch (valueStr.toUpperCase()) {
						case 'LEFT':
							// place the center of the window such that the left edge is edgeBuffer pixels from the left.
							newpos = -OseeHalfWidth * (1 - pipSizePct) + edgeBuffer
							break
						case 'RIGHT':
							newpos = OseeHalfWidth * (1 - pipSizePct) - edgeBuffer
							break
						default:
							value = Number(valueStr)
							newpos = Math.min(OseeHalfWidth, Math.max(-OseeHalfWidth, value + curPos))
					}
				}
				await sendCommand(ActionId.PipXPosition, ReqType.Set, [newpos])
			},
			learn: (action) => {
				return {
					...action.options,
					operation: 0,
					PipXPosition: state.keyInfo[USKKeyTypes.Pip].xPosition,
				}
			},
		},
		[ActionId.PipYPosition]: {
			name: 'UpStream Key:Set PIP Y Position',
			options: [
				{
					type: 'dropdown',
					label: 'Type',
					id: 'operation',
					choices: [
						{ id: 0, label: 'Absolute' },
						{ id: 1, label: 'Relative' },
						{ id: 2, label: 'Snap to Top Edge' },
						{ id: 3, label: 'Snap to Bottom Edge' },
					],
					default: 0,
				},
				{
					type: 'number',
					label: 'Y Position',
					id: 'PipYPosition',
					min: -OseeHalfHeight,
					max: OseeHalfHeight,
					step: 0.2,
					default: 0,
					range: true,
					isVisible: (options) => !Object.keys(options).includes('operation') || options.operation === 0,
				},
				{
					type: 'textinput',
					label: 'Y Position',
					id: 'PipYPositionRel',
					useVariables: true,
					isVisible: (options) => options.operation === 1,
				},
			],
			callback: async (action, context) => {
				let newpos = 0
				let operation = 0
				// a little extra work for backwards compatibility (so can be used before or w/o upgrade script)
				if (Object.keys(action.options).includes('operation')) {
					operation = getOptNumber(action, 'operation')
				}
				if (operation === 0) {
					//absolute
					newpos = getOptNumber(action, 'PipYPosition')
				} else {
					let valueStr = await context.parseVariablesInString(getOptString(action, 'PipYPositionRel'))
					const curPos = state.keyInfo[USKKeyTypes.Pip].yPosition
					const pipSizePct = state.keyInfo[USKKeyTypes.Pip].size
					let value = 0
					if (operation === 2) {
						valueStr = 'TOP'
					} else if (operation === 3) {
						valueStr = 'BOTTOM'
					}
					switch (valueStr.toUpperCase()) {
						case 'TOP':
							// place the center of the window such that the top edge is edgeBuffer pixels from the top.
							newpos = -OseeHalfHeight * (1 - pipSizePct) + edgeBuffer
							break
						case 'BOTTOM':
							newpos = OseeHalfHeight * (1 - pipSizePct) - edgeBuffer
							break
						default:
							value = Number(valueStr)
							newpos = Math.min(9, Math.max(-9, value + curPos))
					}
				}
				await sendCommand(ActionId.PipYPosition, ReqType.Set, [newpos])
			},
			learn: (action) => {
				return {
					...action.options,
					operation: 0,
					PipYPosition: state.keyInfo[USKKeyTypes.Pip].yPosition,
				}
			},
		},
		[ActionId.PipSetMaskProperties]: {
			name: 'UpStream Key: Set PIP mask properties',
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
					id: 'MaskEnable',
					choices: SwitchChoices,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('enable'),
				},
				{
					type: 'number',
					label: 'H Start',
					id: 'MaskHStart',
					min: 0,
					max: 100,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('hMaskStart'),
				},
				{
					type: 'number',
					label: 'H End',
					id: 'MaskHEnd',
					min: 0,
					max: 100,
					default: 100,
					isVisible: (options) => (<string[]>options.props!).includes('hMaskEnd'),
				},
				{
					type: 'number',
					label: 'V Start',
					id: 'MaskVStart',
					min: 0,
					max: 100,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('vMaskStart'),
				},
				{
					type: 'number',
					label: 'V End',
					id: 'MaskVEnd',
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
					let paramOpt = getOptNumber(action, 'MaskEnable')
					if (paramOpt === 2) paramOpt = state.keyInfo[USKKeyTypes.Pip].mask.enabled ? 0 : 1
					commands.push({
						id: ActionId.PipMaskEnable,
						type: ReqType.Set,
						value: [paramOpt],
					})
				}
				if (props.includes('hMaskStart')) {
					commands.push({
						id: ActionId.PipMaskHStart,
						type: ReqType.Set,
						value: [getOptNumber(action, 'MaskHStart')],
					})
				}
				if (props.includes('hMaskEnd')) {
					commands.push({
						id: ActionId.PipMaskHEnd,
						type: ReqType.Set,
						value: [getOptNumber(action, 'MaskHEnd')],
					})
				}
				if (props.includes('vMaskStart')) {
					commands.push({
						id: ActionId.PipMaskVStart,
						type: ReqType.Set,
						value: [getOptNumber(action, 'MaskVStart')],
					})
				}
				if (props.includes('vMaskEnd')) {
					commands.push({
						id: ActionId.PipMaskVEnd,
						type: ReqType.Set,
						value: [getOptNumber(action, 'MaskVEnd')],
					})
				}

				if (commands.length > 0) await sendCommands(commands)
			},
		},
		/*
		[ActionId.PipMaskEnable]: {
			name: 'UpStream Key:Set PIP Mask Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Mask Enable',
					id: 'PipMaskEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipMaskEnable, ReqType.Set, [getOptNumber(action, 'PipMaskEnable')])
			},
		},
		[ActionId.PipMaskHStart]: {
			name: 'UpStream Key:Set PIP Mask H Start',
			options: [
				{
					type: 'number',
					label: 'H Start',
					id: 'PipMaskHStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipMaskHStart, ReqType.Set, [getOptNumber(action, 'PipMaskHStart')])
			},
		},
		[ActionId.PipMaskVStart]: {
			name: 'UpStream Key:Set Pip Mask V Start',
			options: [
				{
					type: 'number',
					label: 'V Start',
					id: 'PipMaskVStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipMaskVStart, ReqType.Set, [getOptNumber(action, 'PipMaskVStart')])
			},
		},
		[ActionId.PipMaskHEnd]: {
			name: 'UpStream Key:Set Pip Mask H End',
			options: [
				{
					type: 'number',
					label: 'H End',
					id: 'PipMaskHEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipMaskHEnd, ReqType.Set, [getOptNumber(action, 'PipMaskHEnd')])
			},
		},
		[ActionId.PipMaskVEnd]: {
			name: 'UpStream Key:Set Pip Mask V End',
			options: [
				{
					type: 'number',
					label: 'V End',
					id: 'PipMaskVEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipMaskVEnd, ReqType.Set, [getOptNumber(action, 'PipMaskVEnd')])
			},
		},
		*/
		[ActionId.PipBorderEnable]: {
			name: 'UpStream Key:Set Pip Border Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'PipBorderEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipBorderEnable, ReqType.Set, [getOptNumber(action, 'PipBorderEnable')])
			},
		},
		[ActionId.PipBorderWidth]: {
			name: 'UpStream Key:Set Pip Border Width',
			options: [
				{
					type: 'number',
					label: 'Width',
					id: 'PipBorderWidth',
					min: 0,
					max: 31,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipBorderWidth, ReqType.Set, [getOptNumber(action, 'PipBorderWidth')])
			},
		},
		[ActionId.PipBorderHue]: {
			name: 'UpStream Key:Set Pip Color Hue',
			options: [
				{
					type: 'number',
					label: 'Hue',
					id: 'PipBorderHue',
					min: 0,
					max: 359,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipBorderHue, ReqType.Set, [getOptNumber(action, 'PipBorderHue')])
			},
		},
		[ActionId.PipBorderSaturation]: {
			name: 'UpStream Key:Set Pip Color Saturation',
			options: [
				{
					type: 'number',
					label: 'Saturation',
					id: 'PipBorderSaturation',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipBorderSaturation, ReqType.Set, [getOptNumber(action, 'PipBorderSaturation')])
			},
		},
		[ActionId.PipBorderBrightness]: {
			name: 'UpStream Key:Set Pip Color Brightness',
			options: [
				{
					type: 'number',
					label: 'Brightness',
					id: 'PipBorderBrightness',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipBorderBrightness, ReqType.Set, [getOptNumber(action, 'PipBorderBrightness')])
			},
		},
	}
}
