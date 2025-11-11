import { USK } from "../../../connection/actionids"
import { getEnumKeyByValue, getOptNumber } from '../../../util'
import { KeySwitchChoices, GetKeyChoices } from './../../../model'
import type { CompanionActionDefinitions, SomeCompanionActionInputField } from '@companion-module/base'
import { StreamDeck } from '../../../connection/streamdeck'
import { Model, sourceID } from '../../../connection/enums'

export function createPipActions(deck: StreamDeck): CompanionActionDefinitions {
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
				{ id: 'pipSize', label: 'pipSize' },
				{ id: 'pipXPosition', label: 'PipXPosition' },
				{ id: 'pipYPosition', label: 'pipYPosition' },
				{ id: 'maskEnable', label: 'MaskEnable' },
				{ id: 'left', label: 'Left' },
				{ id: 'top', label: 'Top' },
				{ id: 'right', label: 'Right' },
				{ id: 'bottom', label: 'Bottom' },
				{ id: 'borderEnable', label: 'BorderEnable' },
				{ id: 'borderWidth', label: 'BorderWidth' },
				{ id: 'borderHue', label: 'BorderHue' },
				{ id: 'borderSaturation', label: 'BorderSaturation' },
				{ id: 'borderBrightness', label: 'BorderBrightness' },
			],
			minSelection: 1,
			default: ['pipXPosition', 'pipYPosition', 'pipSize', 'maskEnable',
				'left', 'top', 'right', 'bottom', 'borderEnable', 'borderWidth', 'borderHue',
				'borderSaturation', 'borderBrightness'],
		},
		{
			type: 'number',
			label: 'XPosition',
			id: 'pipXPosition',
			min: -16.0,
			max: 16.0,
			range: true,
			step: 0.1,
			default: 0,
			isVisible: (options) => (<string[]>options.props!).includes('pipXPosition'),
		},
		{
			type: 'number',
			label: 'YPosition',
			id: 'pipYPosition',
			min: deck.state?.device.deviceModel === Model.Duet_8ISO ? -16.0 : -9.0,
			max: deck.state?.device.deviceModel === Model.Duet_8ISO ? 16.0 : 9.0,
			range: true,
			step: 0.1,
			default: 0,
			isVisible: (options) => (<string[]>options.props!).includes('pipYPosition'),
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
			label: 'Border Enable',
			id: 'borderEnable',
			choices: KeySwitchChoices,
			default: 0,
			isVisible: (options) => (<string[]>options.props!).includes('borderEnable'),
		},

		{
			type: 'number',
			label: 'Border Width',
			id: 'borderWidth',
			min: 0,
			max: 31,
			default: 0,
			isVisible: (options) => (<string[]>options.props!).includes('borderWidth'),
		},
		{
			type: 'number',
			label: 'Border Hue',
			id: 'borderHue',
			min: 0,
			max: 359,
			default: 0,
			isVisible: (options) => (<string[]>options.props!).includes('borderHue'),
		},
		{
			type: 'number',
			label: 'Border Saturation',
			id: 'borderSaturation',
			min: 0,
			max: 100,
			default: 0,
			isVisible: (options) => (<string[]>options.props!).includes('borderSaturation'),
		},
		{
			type: 'number',
			label: 'Border Brightness',
			id: 'borderBrightness',
			min: 0,
			max: 100,
			default: 0,
			isVisible: (options) => (<string[]>options.props!).includes('borderBrightness'),
		},
	]

	if (deck.state?.device.deviceModel === Model.Duet_8ISO) {
		_options.push(
			{
				type: 'number',
				label: 'PipSize',
				id: 'pipSize',
				min: 7,
				max: 100,
				range: true,
				step: 1,
				default: 50,
				isVisible: (options) => (<string[]>options.props!).includes('pipSize'),
			},
		);
	} else {
		_options.push(
			{
				type: 'dropdown',
				label: 'PipSize',
				id: 'pipSize',
				choices: [
					{ id: 25, label: "0.25" },
					{ id: 33, label: "0.33" },
					{ id: 50, label: "0.50" }
				],
				default: 33,
				isVisible: (options) => (<string[]>options.props!).includes('pipSize')
			}
		)
	}
	return {
		[USK.ActionId.PipFillSource]: {
			name: 'Key: set PIP source',
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
					choices: deck.state ? deck.state.upStreamKey.PipFileSource.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : [],
					default: 0,
				},
			],
			callback: async (action) => {
				let keyId = getOptNumber(action, 'keyId')
				let sourceid = getOptNumber(action, 'keyFill')
				await deck.setPipFillSource(keyId, sourceid)
			},
		},
		[USK.ActionId.PipKeySetMaskProperties]: {
			name: 'Key: Set Pip properties',
			options: _options,
			callback: async (action) => {
				const props = <string[]>action.options.props
				const keyId = getOptNumber(action, 'keyId')
				if (props.includes('pipSize')) {
					await deck.setPipSize(keyId, getOptNumber(action, 'pipSize'))
				}
				if (props.includes('pipXPosition')) {
					await deck.setPipXPosition(keyId, getOptNumber(action, 'pipXPosition'))
				}
				if (props.includes('pipYPosition')) {
					await deck.setPipYPosition(keyId, getOptNumber(action, 'pipYPosition'))
				}
				if (props.includes('maskEnable')) {
					let paramOpt = getOptNumber(action, 'maskEnable')
					if (paramOpt === 2) paramOpt = deck.state?.upStreamKey.USKS[keyId]?.pip.maskInfo.enabled ? 0 : 1
					await deck.setPipMaskEnable(keyId, paramOpt)
				}
				if (props.includes('left')) {
					await deck.setPipMaskHStart(keyId, getOptNumber(action, 'maskHStart'));
				}
				if (props.includes('right')) {
					await deck.setPipMaskHEnd(keyId, getOptNumber(action, 'maskHEnd'));
				}
				if (props.includes('top')) {
					await deck.setPipMaskVStart(keyId, getOptNumber(action, 'maskVStart'));
				}
				if (props.includes('bottom')) {
					await deck.setPipMaskVEnd(keyId, getOptNumber(action, 'maskVEnd'))
				}

				if (props.includes('borderEnable')) {
					let paramOpt = getOptNumber(action, 'borderEnable')
					if (paramOpt === 2) paramOpt = deck.state?.upStreamKey.USKS[keyId]?.pip.border.enable ? 0 : 1
					await deck.setPipBorderEnable(keyId, paramOpt)
				}
				if (props.includes('borderWidth')) {
					await deck.setPipBorderWidth(keyId, getOptNumber(action, 'borderWidth'))
				}
				if (props.includes('borderHue')) {
					await deck.setPipBorderColorHue(keyId, getOptNumber(action, 'borderHue'))
				}
				if (props.includes('borderSaturation')) {
					await deck.setPipBorderColorSaturation(keyId, getOptNumber(action, 'borderSaturation'))
				}
				if (props.includes('borderBrightness')) {
					await deck.setPipBorderColorBrightness(keyId, getOptNumber(action, 'borderBrightness'))
				}
			},
		},
	}
}
