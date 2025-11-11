import { USK } from "../../../connection/actionids"
import { getEnumKeyByValue, getOptNumber } from './../../../util'
import { KeySwitchChoices, GetKeyChoices } from './../../../model'
import type { CompanionActionDefinitions, SomeCompanionActionInputField } from '@companion-module/base'
import { StreamDeck } from '../../../connection/streamdeck'
import { Model, sourceID } from '../../../connection/enums'
export function createLumaKeyActions(deck: StreamDeck): CompanionActionDefinitions {

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
				{ id: 'maskEnable', label: 'MaskEnable' },
				{ id: 'left', label: 'Left' },
				{ id: 'top', label: 'Top' },
				{ id: 'right', label: 'Right' },
				{ id: 'bottom', label: 'Bottom' },

				{ id: 'preMultipliedkey', label: 'preMultipliedkey' },
				{ id: 'clip', label: 'Clip' },
				{ id: 'gain', label: 'Gain' },
				{ id: 'invert', label: 'Invert' },

				{ id: 'sizePositionEnable', label: 'SizePositionEnable' },
				{ id: 'size', label: 'Size' },
				{ id: 'xPosition', label: 'XPosition' },
				{ id: 'yPosition', label: 'YPosition' },
			],
			minSelection: 1,
			default: ['maskEnable', 'left', 'top', 'right', 'bottom',
				'preMultipliedkey', 'clip', 'gain', 'invert',
				'sizePositionEnable', 'size', 'xPosition', 'yPosition'],
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
			label: 'Pre Multiplied key',
			id: 'preMultipliedkey',
			choices: KeySwitchChoices,
			default: 0,
			isVisible: (options) => (<string[]>options.props!).includes('preMultipliedkey'),
		},

		{
			type: 'number',
			label: 'Clip',
			id: 'clip',
			min: 0,
			max: 100,
			default: 15,
			isVisible: (options) => (<string[]>options.props!).includes('clip'),
		},
		{
			type: 'number',
			label: 'Gain',
			id: 'gain',
			min: 0,
			max: 100,
			default: 50,
			isVisible: (options) => (<string[]>options.props!).includes('gain'),
		},
		{
			type: 'dropdown',
			label: 'Invert',
			id: 'invert',
			choices: KeySwitchChoices,
			default: 0,
			isVisible: (options) => (<string[]>options.props!).includes('invert'),
		},
		{
			type: 'dropdown',
			label: 'Size/Position Enable',
			id: 'sizeEnable',
			choices: KeySwitchChoices,
			default: 0,
			isVisible: (options) => (<string[]>options.props!).includes('sizePositionEnable'),
		},
		// {
		// 	type: 'number',
		// 	label: 'Size',
		// 	id: 'size',
		// 	min:  7,
		// 	max: 100,
		// 	default: 33,
		// 	isVisible: (options) => (<string[]>options.props!).includes('size')
		// },
		// {
		// 	type: 'dropdown',
		// 	label: 'Size',
		// 	id: 'size',
		// 	choices: [
		// 		{id:25,label:"0.25"},
		// 		{id:33,label:"0.33"},
		// 		{id:50,label:"0.50"}
		// 	],
		// 	default: 33,
		// 	isVisible: (options) => {
		// 		var m1=(<string[]>options.props!).includes('size');
		// 		var m2=deck.state?.device.deviceModel!==Model.Duet_8ISO
		// 		return m1&&m2
		// 	}
		// },
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
				range:true,
				step:1,
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
		[USK.ActionId.LumaKeySourceProperties]: {
			name: 'Key:Set Luma Source',
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
					label: 'Fill Source',
					id: 'fillSource',
					choices: deck.state ? deck.state.upStreamKey.LumaFillSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : [],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Key Source',
					id: 'KeySource',
					choices: deck.state ? deck.state.upStreamKey.LumaKeySources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : [],
					default: 0,
				},
			],
			callback: async (action) => {

				const keyId = getOptNumber(action, 'keyId')
				const fillSource = getOptNumber(action, 'fillSource')
				const KeySource = getOptNumber(action, 'KeySource')
				await deck.setLumaFillSource(keyId, fillSource);
				await deck.setLumaKeySource(keyId, KeySource);
			},
		},
		[USK.ActionId.LumaKeySetProperties]: {
			name: 'Key: set Luma properties',
			options: _options,
			callback: async (action) => {
				const props = <string[]>action.options.props
				const keyId = getOptNumber(action, 'keyId')
				if (props.includes('maskEnable')) {
					let paramOpt = getOptNumber(action, 'maskEnable')
					if (paramOpt === 2) paramOpt = deck.state?.upStreamKey.USKS[keyId]?.Luma.maskInfo.enabled ? 0 : 1
					await deck.setLumaMaskEnable(keyId, paramOpt);
				}
				if (props.includes('left')) {
					await deck.setLumaMaskHStart(keyId, getOptNumber(action, 'maskHStart'))
				}
				if (props.includes('right')) {
					await deck.setLumaMaskHEnd(keyId, getOptNumber(action, 'maskHEnd'))
				}
				if (props.includes('top')) {
					await deck.setLumaMaskVStart(keyId, getOptNumber(action, 'maskVStart'))
				}
				if (props.includes('bottom')) {
					await deck.setLumaMaskVEnd(keyId, getOptNumber(action, 'maskVEnd'))
				}

				if (props.includes('preMultipliedkey')) {
					let paramOpt = getOptNumber(action, 'preMultipliedkey')
					if (paramOpt === 2) paramOpt = deck.state?.upStreamKey.USKS[keyId]?.Luma.keyControl.lumaPreMultipliedKey ? 0 : 1
					await deck.setLumaPreMultipliedKey(keyId, paramOpt)
				}
				if (props.includes('clip')) {
					await deck.setLumaClip(keyId, getOptNumber(action, 'clip'))
				}
				if (props.includes('gain')) {
					await deck.setLumaGain(keyId, getOptNumber(action, 'gain'))
				}

				if (props.includes('invert')) {
					let paramOpt = getOptNumber(action, 'invert')
					if (paramOpt === 2) paramOpt = deck.state?.upStreamKey.USKS[keyId]?.Luma.keyControl.invert ? 0 : 1
					await deck.setLumaInvert(keyId, paramOpt)
				}

				if (props.includes('sizePositionEnable')) {
					let paramOpt = getOptNumber(action, 'sizeEnable');
					if (paramOpt === 2) paramOpt = deck.state?.upStreamKey.USKS[keyId]?.Luma.size.enable ? 0 : 1
					await deck.setLumaResize(keyId, paramOpt)
				}

				if (props.includes('size')) {
					await deck.setLumaSize(keyId, getOptNumber(action, 'size'))
				}
				if (props.includes('xPosition')) {
					await deck.setLumaXPosition(keyId, getOptNumber(action, 'xPosition'))
				}
				if (props.includes('yPosition')) {
					await deck.setLumaYPosition(keyId, getOptNumber(action, 'yPosition'))
				}
			},
		},
	}
}
