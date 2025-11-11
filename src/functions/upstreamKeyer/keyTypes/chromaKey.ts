import { USK } from "../../../connection/actionids"
import { getEnumKeyByValue, getOptNumber } from './../../../util'
import { KeySwitchChoices, GetKeyChoices } from './../../../model'
import type { CompanionActionDefinitions, SomeCompanionActionInputField } from '@companion-module/base'
import { StreamDeck } from '../../../connection/streamdeck'
import { Model, sourceID } from '../../../connection/enums'
export function createChromaKeyActions(deck: StreamDeck): CompanionActionDefinitions {
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
				{ id: 'maskEnable', label: 'maskEnable' },
				{ id: 'left', label: 'left' },
				{ id: 'top', label: 'top' },
				{ id: 'right', label: 'right' },
				{ id: 'bottom', label: 'bottom' },
				{ id: 'Size/Position Enable', label: 'Size/Position Enable' },
				{ id: 'Size', label: 'Size' },
				{ id: 'XPosition', label: 'XPosition' },
				{ id: 'YPosition', label: 'YPosition' },
			],
			minSelection: 1,
			default: ['maskEnable', 'left', 'top', 'right', 'bottom', 'Size/Position Enable', 'Size', 'XPosition', 'YPosition'],
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
			isVisible: (options) => (<string[]>options.props!).includes('Size/Position Enable'),
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
			isVisible: (options) => (<string[]>options.props!).includes('XPosition'),
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
			isVisible: (options) => (<string[]>options.props!).includes('YPosition'),
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
				isVisible: (options) => (<string[]>options.props!).includes('Size'),
			},
		)
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
				isVisible: (options) => (<string[]>options.props!).includes('Size')
			}
		)
	}
	return {
		[USK.ActionId.ChromaFillSource]: {
			name: 'Key: set Chroma source',
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
					choices: deck.state ? deck.state.upStreamKey.ChromaFillSource.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : [],
					default: sourceID.IN1,
				},
			],
			callback: async (action) => {
				let keyId = getOptNumber(action, 'keyId')
				let sourceid = getOptNumber(action, 'keyFill')
				await deck.setChromaFillSource(keyId, sourceid);
			},
		},
		[USK.ActionId.ChromaKeySetMaskProperties]: {
			name: 'Key:set Chroma properties',
			options: _options,
			callback: async (action) => {
				const props = <string[]>action.options.props
				const keyId = getOptNumber(action, 'keyId')
				if (props.includes('maskEnable')) {
					let paramOpt = getOptNumber(action, 'maskEnable')
					if (paramOpt === 2) paramOpt = deck.state?.upStreamKey.USKS[keyId]?.Chroma.maskInfo.enabled ? 0 : 1
					await deck.setChromaMaskEnable(keyId, paramOpt)
				}
				if (props.includes('left')) {
					await deck.setChromaMaskHStart(keyId, getOptNumber(action, 'maskHStart'))
				}
				if (props.includes('right')) {
					await deck.setChromaMaskHEnd(keyId, getOptNumber(action, 'maskHEnd'))
				}
				if (props.includes('top')) {
					await deck.setChromaMaskVStart(keyId, getOptNumber(action, 'maskVStart'))
				}
				if (props.includes('bottom')) {
					await deck.setChromaMaskVEnd(keyId, getOptNumber(action, 'maskVEnd'))
				}
				if (props.includes('Size/Position Enable')) {
					let paramOpt = getOptNumber(action, 'sizeEnable');
					if (paramOpt === 2) paramOpt = deck.state?.upStreamKey.USKS[keyId]?.Chroma.size.enable ? 0 : 1
					await deck.setChromaResize(keyId, paramOpt)

				}
				if (props.includes('Size')) {
					await deck.setChromaSize(keyId, getOptNumber(action, 'size'))
				}
				if (props.includes('XPosition')) {
					deck.setChromaXPosition(keyId, getOptNumber(action, 'xPosition'))
				}
				if (props.includes('YPosition')) {
					deck.setChromaYPosition(keyId, getOptNumber(action, 'yPosition'))
				}
			},
		},
		[USK.ActionId.ChromaKeySetControlProperties]: {
			name: 'Key: set Chroma control properties',
			options: [
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
						{ id: 'sMPXPosition', label: 'SMPXPosition' },
						{ id: 'sMPYPosition', label: 'SMPYPosition' },
						{ id: 'sample', label: 'Sample' },
						{ id: 'foreground', label: 'Foreground' },
						{ id: 'background', label: 'Background' },
						{ id: 'keyEdge', label: 'KeyEdge' },
					],
					minSelection: 1,
					default: ['sMPXPosition', 'sMPYPosition', 'sample', 'foreground', 'background', 'keyEdge'],
				},
				{
					type: 'number',
					label: 'SMPXPosition',
					id: 'sMPXPosition',
					min: -16.0,
					max: 16.0,
					default: -14.0,
					range: true,
					step: 0.1,
					isVisible: (options) => (<string[]>options.props!).includes('sMPXPosition'),
				},
				{
					type: 'number',
					label: 'SMPYPosition',
					id: 'sMPYPosition',
					min: -9.0,
					max: 9.0,
					default: -7.0,
					range: true,
					step: 0.1,
					isVisible: (options) => (<string[]>options.props!).includes('sMPYPosition'),
				},
				{
					type: 'dropdown',
					label: 'Sample',
					id: 'sample',
					choices: KeySwitchChoices,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('sample'),
				},
				{
					type: 'number',
					label: 'Foreground',
					id: 'foreground',
					min: 0,
					max: 100,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('foreground'),
				},
				{
					type: 'number',
					label: 'Background',
					id: 'background',
					min: 0,
					max: 100,
					default: 100,
					isVisible: (options) => (<string[]>options.props!).includes('background'),
				},
				{
					type: 'number',
					label: 'KeyEdge',
					id: 'keyEdge',
					min: 0,
					max: 100,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('keyEdge'),
				},
			],
			callback: async (action) => {
				const props = <string[]>action.options.props
				const keyId = getOptNumber(action, 'keyId')
				if (props.includes('sMPXPosition')) {
					deck.setChromaSMPXPosition(keyId, getOptNumber(action, 'sMPXPosition'))
				}
				if (props.includes('sMPYPosition')) {
					deck.setChromaSMPYPosition(keyId, getOptNumber(action, 'sMPYPosition'))
				}
				if (props.includes('sample')) {
					let paramOpt = getOptNumber(action, 'sample')
					if (paramOpt === 2) paramOpt = deck.state?.upStreamKey.USKS[keyId]?.Chroma.control.sample ? 0 : 1
					await deck.setChromaSample(keyId, paramOpt)
				}
				if (props.includes('foreground')) {
					deck.setChromaForeground(keyId, getOptNumber(action, 'foreground'))
				}
				if (props.includes('background')) {
					deck.setChromaBackground(keyId, getOptNumber(action, 'background'))
				}
				if (props.includes('keyEdge')) {
					deck.setKeyEdge(keyId, getOptNumber(action, 'keyEdge'))
				}
			},
		},
	}
}
