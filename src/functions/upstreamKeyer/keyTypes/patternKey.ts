import { USK } from "../../../connection/actionids"
import { getEnumKeyByValue, getOptNumber } from '../../../util'
import { KeySwitchChoices, GetKeyChoices, } from './../../../model'
import type { CompanionActionDefinitions, SomeCompanionActionInputField } from '@companion-module/base'
import { StreamDeck } from '../../../connection/streamdeck'
import { Model, sourceID } from '../../../connection/enums'

export function createPatternKeyActions(deck: StreamDeck): CompanionActionDefinitions {
	const _options: SomeCompanionActionInputField[] = [
		{
			type: 'dropdown',
			label: 'Key',
			id: 'keyId',
			choices: GetKeyChoices(deck.state),
			default: 0,
		},
		{
			id: 'props',
			type: 'multidropdown',
			label: 'Select properties',
			choices: [
				{ id: 'wipeSize', label: 'WipeSize' },
				{ id: 'maskEnable', label: 'MaskEnable' },
				{ id: 'left', label: 'Left' },
				{ id: 'top', label: 'Top' },
				{ id: 'right', label: 'Right' },
				{ id: 'bottom', label: 'Bottom' },
				{ id: 'sizePositionEnable', label: 'SizePositionEnable' },
				{ id: 'size', label: 'Size' },
				{ id: 'xPosition', label: 'XPosition' },
				{ id: 'yPosition', label: 'YPosition' },
			],
			minSelection: 1,
			default: ['wipeSize', 'maskEnable', 'left', 'top', 'right', 'bottom', 'sizePositionEnable', 'size', 'xPosition', 'yPosition'],
		},
		{
			type: 'number',
			label: 'WipeSize',
			id: 'wipeSize',
			min: 0,
			max: 100,
			default: 50,
			isVisible: (options) => (<string[]>options.props!).includes('wipeSize'),
		},
		{
			type: 'dropdown',
			label: 'Mask Enable',
			id: 'maskEnable',
			choices: KeySwitchChoices,
			default: 0,
			isVisible: (options) => (<string[]>options.props!).includes('maskEnable'),
		},
		{
			type: 'number',
			label: 'Left',
			id: 'maskHStart',
			min: 0,
			max: 100,
			default: 0,
			isVisible: (options) => (<string[]>options.props!).includes('left'),
		},
		{
			type: 'number',
			label: 'Right',
			id: 'maskHEnd',
			min: 0,
			max: 100,
			default: 100,
			isVisible: (options) => (<string[]>options.props!).includes('right'),
		},
		{
			type: 'number',
			label: 'Top',
			id: 'maskVStart',
			min: 0,
			max: 100,
			default: 0,
			isVisible: (options) => (<string[]>options.props!).includes('top'),
		},
		{
			type: 'number',
			label: 'Bottom',
			id: 'maskVEnd',
			min: 0,
			max: 100,
			default: 100,
			isVisible: (options) => (<string[]>options.props!).includes('bottom'),
		},
		{
			type: 'dropdown',
			label: 'Size/Position Enable',
			id: 'sizeEnable',
			choices: KeySwitchChoices,
			default: 0,
			isVisible: (options) => (<string[]>options.props!).includes('sizePositionEnable'),
		},
		{
			type: 'number',
			label: 'X Position',
			id: 'xPosition',
			min: -16.0,
			max: 16.0,
			default: 10.6,
			step: 0.1,
			range: true,
			isVisible: (options) => (<string[]>options.props!).includes('xPosition'),
		},
		{
			type: 'number',
			label: 'Y Position',
			id: 'yPosition',
			min: -9.0,
			max: 9.0,
			default: 7.0,
			step: 0.1,
			range: true,
			isVisible: (options) => (<string[]>options.props!).includes('yPosition'),
		},
	]
	if (deck.state?.device.deviceModel === Model.Duet_8ISO) {
		_options.push(
			{
				type: 'number',
				label: 'Size',
				id: 'size',
				min: 7,
				max: 100,
				default: 33,
				range: true,
				step: 1,
				isVisible: (options) => (<string[]>options.props!).includes('size')
			}
		);
	} else {
		_options.push(
			{
				type: 'dropdown',
				label: 'Size',
				id: 'size',
				choices: [
					{ id: 25, label: "0.25" },
					{ id: 33, label: "0.33" },
					{ id: 50, label: "0.50" }
				],
				default: 33,
				isVisible: (options) => (<string[]>options.props!).includes('size')
			}
		)
	}
	return {
		[USK.ActionId.PatternFillSource]: {
			name: 'Key: set Pattern source',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetKeyChoices(deck.state),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source Fill',
					id: 'keyFill',
					choices: deck.state ? deck.state.upStreamKey.PatternFillSource.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : [],
					default: 0,
				},
			],
			callback: async (action) => {
				let keyId = getOptNumber(action, 'keyId')
				let sourceid = getOptNumber(action, 'keyFill')
				await deck.setPatternFillSource(keyId, sourceid)
			},
		},
		[USK.ActionId.PatternKeySetMaskProperties]: {
			name: 'Key: Set pattern properties',
			options: _options,
			callback: async (action) => {
				const props = <string[]>action.options.props
				const keyId = getOptNumber(action, 'keyId')
				if (props.includes('wipeSize')) {
					await deck.setPatternWipeSize(keyId, getOptNumber(action, 'wipeSize'))
				}
				if (props.includes('maskEnable')) {
					let paramOpt = getOptNumber(action, 'maskEnable')
					if (paramOpt === 2) paramOpt = deck.state?.upStreamKey.USKS[keyId]?.Pattern.maskInfo.enabled ? 0 : 1
					await deck.setPatternMaskEnable(keyId, paramOpt)
				}
				if (props.includes('left')) {
					await deck.setPatternMaskHStart(keyId, getOptNumber(action, 'maskHStart'))
				}
				if (props.includes('right')) {
					await deck.setPatternMaskHEnd(keyId, getOptNumber(action, 'maskHEnd'))
				}
				if (props.includes('top')) {
					await deck.setPatternMaskVStart(keyId, getOptNumber(action, 'maskVStart'))
				}
				if (props.includes('bottom')) {
					await deck.setPatternMaskVEnd(keyId, getOptNumber(action, 'maskVEnd'))
				}
				if (props.includes('sizePositionEnable')) {
					let paramOpt = getOptNumber(action, 'sizeEnable');
					if (paramOpt === 2) paramOpt = deck.state?.upStreamKey.USKS[keyId]?.Pattern.size.enable ? 0 : 1
					await deck.setPatternResize(keyId, paramOpt)
				}
				if (props.includes('size')) {
					await deck.setPatternSize(keyId, getOptNumber(action, 'size'))
				}
				if (props.includes('xPosition')) {
					await deck.setPatternXPosition(keyId, getOptNumber(action, 'xPosition'))
				}
				if (props.includes('yPosition')) {
					await deck.setPatternYPosition(keyId, getOptNumber(action, 'yPosition'))
				}
			},
		},
	}
}
