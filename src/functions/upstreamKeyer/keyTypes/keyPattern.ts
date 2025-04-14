import { ActionId } from '../actionId'
import { getOptNumber, getOptString } from './../../../util'
import { SwitchChoices, KeyResizeSizeChoices } from './../../../model'
import { ReqType, ActionType } from './../../../enums'
import { sendCommand, sendCommands, GoStreamCmd } from './../../../connection'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { UpstreamKeyerStateT, USKKeyTypes } from '../state'
import { GoStreamModel } from '../../../models/types'

export function createKeyPatternActions(model: GoStreamModel, state: UpstreamKeyerStateT): CompanionActionDefinitions {
	// Osee[X/Y]Radius: Osee's units for positioning: -9..+9 vertically, -16 - 16 horizontally
	const [OseeWidth, OseeHeight] = model.OutputDimensions()
	const OseeHalfWidth = Number(OseeWidth) / 2
	const OseeHalfHeight = Number(OseeHeight) / 2
	const imagePixelHeight = model.PixelResolution()
	const pixel = Number(OseeHeight) / Number(imagePixelHeight) // convert pixels to Osee's -9..+9 units (this is the same whether calculated for x or y)
	const edgeBuffer = pixel * 5 // when using left/right/up/down, stay this far away from the edge.

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
					id: 'KeyPatternWipeXPosition',
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
					id: 'KeyPatternWipeXPositionRel',
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
					newpos = getOptNumber(action, 'KeyPatternWipeXPosition')
				} else {
					let valueStr: string
					const curPos = state.keyInfo[USKKeyTypes.KeyPattern].xPosition
					const sizePct = state.keyInfo[USKKeyTypes.KeyPattern].size
					if (operation === 2) {
						valueStr = 'LEFT'
					} else if (operation === 3) {
						valueStr = 'RIGHT'
					} else {
						// operation === 1
						valueStr = await context.parseVariablesInString(getOptString(action, 'KeyPatternWipeXPositionRel'))
					}
					let value = 0
					switch (valueStr.toUpperCase()) {
						case 'LEFT':
							// place the center of the window such that the left edge is edgeBuffer pixels from the left.
							newpos = -OseeHalfWidth * (1 - sizePct) + edgeBuffer
							break
						case 'RIGHT':
							newpos = OseeHalfWidth * (1 - sizePct) - edgeBuffer
							break
						default:
							value = Number(valueStr)
							newpos = Math.min(OseeHalfWidth, Math.max(-OseeHalfWidth, value + curPos))
					}
				}
				await sendCommand(ActionId.KeyPatternWipeXPosition, ReqType.Set, [newpos])
			},
			learn: (action) => {
				return {
					...action.options,
					operation: 0,
					KeyPatternWipeXPosition: state.keyInfo[USKKeyTypes.KeyPattern].xPosition,
				}
			},
		},
		[ActionId.KeyPatternWipeYPosition]: {
			name: 'UpStream Key:Set Key Pattern wipe Y Position',
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
					id: 'KeyPatternWipeYPosition',
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
					id: 'KeyPatternWipeYPositionRel',
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
					newpos = getOptNumber(action, 'KeyPatternWipeYPosition')
				} else {
					let valueStr: string
					const curPos = state.keyInfo[USKKeyTypes.KeyPattern].yPosition
					const sizePct = state.keyInfo[USKKeyTypes.KeyPattern].size
					let value = 0
					if (operation === 2) {
						valueStr = 'TOP'
					} else if (operation === 3) {
						valueStr = 'BOTTOM'
					} else {
						// operation === 1
						valueStr = await context.parseVariablesInString(getOptString(action, 'KeyPatternWipeYPositionRel'))
					}
					switch (valueStr.toUpperCase()) {
						case 'TOP':
							// place the center of the window such that the top edge is edgeBuffer pixels from the top.
							newpos = -OseeHalfHeight * (1 - sizePct) + edgeBuffer
							break
						case 'BOTTOM':
							newpos = OseeHalfHeight * (1 - sizePct) - edgeBuffer
							break
						default:
							value = Number(valueStr)
							newpos = Math.min(9, Math.max(-9, value + curPos))
					}
				}
				await sendCommand(ActionId.KeyPatternWipeYPosition, ReqType.Set, [newpos])
			},
			learn: (action) => {
				return {
					...action.options,
					operation: 0,
					KeyPatternWipeYPosition: state.keyInfo[USKKeyTypes.KeyPattern].yPosition,
				}
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
