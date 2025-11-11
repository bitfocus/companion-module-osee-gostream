import { DSK } from "../../connection/actionids"
import { getEnumKeyByValue, getOptNumber } from './../../util'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { GetDSKChoices, DSKSwitchChoices } from '../../model'
import { StreamDeck } from '../../connection/streamdeck'
import { Model, sourceID } from '../../connection/enums'

export function create(deck: StreamDeck): CompanionActionDefinitions {
	let actions: CompanionActionDefinitions =
	{
		[DSK.ActionId.DskOnAir]: {
			name: 'DSK: set DSK On Air',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetDSKChoices(deck.state),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'enable',
					choices: DSKSwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				let keyId = getOptNumber(action, 'keyId')
				let paramOpt = getOptNumber(action, 'enable')
				if (paramOpt === 2) paramOpt = deck.state?.downStreamKey.DSKS[keyId]?.keyOnAir ? 0 : 1
				await deck.setDskOnAir(keyId, paramOpt)
			},
		},
		[DSK.ActionId.DskEnable]: {
			name: 'DSK: set DSK enable',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetDSKChoices(deck.state),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'enable',
					choices: DSKSwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				let keyId = getOptNumber(action, 'keyId')
				let paramOpt = getOptNumber(action, 'enable')
				if (paramOpt === 2) paramOpt = deck.state?.downStreamKey.DSKS[keyId]?.keyEnable ? 0 : 1
				await deck.setDskEnable(keyId, paramOpt)
			},
		},
		[DSK.ActionId.DSKSourceProperties]: {
			name: 'DSK: set DSK Source',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetDSKChoices(deck.state),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Key Source',
					id: 'keySource',
					choices: deck.state ? deck.state.downStreamKey.KeySources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : [],
					default: sourceID.IN1,
				},
				{
					type: 'dropdown',
					label: 'Fill Source',
					id: 'fillSource',
					choices: deck.state ? deck.state.downStreamKey.FillSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : [],
					default: sourceID.IN1,
				},
			],
			callback: async (action) => {
				const keyId = getOptNumber(action, 'keyId')
				const fillSource = getOptNumber(action, 'fillSource')
				const KeySource = getOptNumber(action, 'keySource')
				await deck.setDskFillSource(keyId, fillSource);
				await deck.setDskKeySource(keyId, KeySource);
			},
		},
		[DSK.ActionId.DSKSetAllProperties]: {
			name: 'DSK: set DSK properties',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetDSKChoices(deck.state),
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
					],
					minSelection: 1,
					default: ['maskEnable', 'left', 'top', 'right', 'bottom',
						'preMultipliedkey', 'clip', 'gain', 'invert'],
				},
				{
					type: 'dropdown',
					label: 'Mask Enable',
					id: 'maskEnable',
					choices: DSKSwitchChoices,
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
					choices: DSKSwitchChoices,
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
					choices: DSKSwitchChoices,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('invert'),
				},
			],
			callback: async (action) => {
				const props = <string[]>action.options.props
				const keyId = getOptNumber(action, 'keyId')
				// const commands: GoStreamCmd[] = []
				if (props.includes('maskEnable')) {
					let paramOpt = getOptNumber(action, 'maskEnable')
					if (paramOpt === 2) paramOpt = deck.state?.downStreamKey.DSKS[keyId]?.mask.enabled ? 0 : 1
					await deck.setDskMaskEnable(keyId, paramOpt)
				}
				if (props.includes('left')) {
					await deck.setDskMaskHStart(keyId, getOptNumber(action, 'maskHStart'))
				}
				if (props.includes('right')) {
					await deck.setDskMaskHEnd(keyId, getOptNumber(action, 'maskHEnd'))
				}
				if (props.includes('top')) {
					await deck.setDskMaskVStart(keyId, getOptNumber(action, 'maskVStart'))
				}
				if (props.includes('bottom')) {
					await deck.setDskMaskVEnd(keyId, getOptNumber(action, 'maskVEnd'))
				}

				if (props.includes('preMultipliedkey')) {
					let paramOpt = getOptNumber(action, 'preMultipliedkey')
					if (paramOpt === 2) paramOpt = deck.state?.downStreamKey.DSKS[keyId]?.control.preMultipliedKey ? 0 : 1
					await deck.setDskPreMultipliedKey(keyId, paramOpt)
				}
				if (props.includes('clip')) {
					await deck.setDskClip(keyId, getOptNumber(action, 'clip'));
				}
				if (props.includes('gain')) {
					await deck.setDskGain(keyId, getOptNumber(action, 'gain'))
				}
				if (props.includes('invert')) {
					let paramOpt = getOptNumber(action, 'invert')
					if (paramOpt === 2) paramOpt = deck.state?.downStreamKey.DSKS[keyId]?.control.invert ? 0 : 1
					await deck.setDskInvert(keyId, paramOpt)
				}
			},
		},
	}
	if (deck.state?.device.deviceModel === Model.Duet_8ISO) {
		actions[DSK.ActionId.DSKSetAllProperties] = {
			name: 'DSK: set DSK properties',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetDSKChoices(deck.state),
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
					choices: DSKSwitchChoices,
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
					choices: DSKSwitchChoices,
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
					choices: DSKSwitchChoices,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('invert'),
				},
				{
					type: 'dropdown',
					label: 'Size/Position Enable',
					id: 'sizeEnable',
					choices: DSKSwitchChoices,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('sizePositionEnable'),
				},
				{
					type: 'number',
					label: 'Size',
					id: 'size',
					min: 7,
					max: 100,
					default: 33,
					isVisible: (options) => (<string[]>options.props!).includes('size'),
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
			],
			callback: async (action) => {
				const props = <string[]>action.options.props
				const keyId = getOptNumber(action, 'keyId')
				// const commands: GoStreamCmd[] = []
				if (props.includes('maskEnable')) {
					let paramOpt = getOptNumber(action, 'maskEnable')
					if (paramOpt === 2) paramOpt = deck.state?.downStreamKey.DSKS[keyId]?.mask.enabled ? 0 : 1
					await deck.setDskMaskEnable(keyId, paramOpt)
				}
				if (props.includes('left')) {
					await deck.setDskMaskHStart(keyId, getOptNumber(action, 'maskHStart'))
				}
				if (props.includes('right')) {
					await deck.setDskMaskHEnd(keyId, getOptNumber(action, 'maskHEnd'))
				}
				if (props.includes('top')) {
					await deck.setDskMaskVStart(keyId, getOptNumber(action, 'maskVStart'))
				}
				if (props.includes('bottom')) {
					await deck.setDskMaskVEnd(keyId, getOptNumber(action, 'maskVEnd'))
				}

				if (props.includes('preMultipliedkey')) {
					let paramOpt = getOptNumber(action, 'preMultipliedkey')
					if (paramOpt === 2) paramOpt = deck.state?.downStreamKey.DSKS[keyId]?.control.preMultipliedKey ? 0 : 1
					await deck.setDskPreMultipliedKey(keyId, paramOpt)
				}
				if (props.includes('clip')) {
					await deck.setDskClip(keyId, getOptNumber(action, 'clip'));
				}
				if (props.includes('gain')) {
					await deck.setDskGain(keyId, getOptNumber(action, 'gain'))
				}
				if (props.includes('invert')) {
					let paramOpt = getOptNumber(action, 'invert')
					if (paramOpt === 2) paramOpt = deck.state?.downStreamKey.DSKS[keyId]?.control.invert ? 0 : 1
					await deck.setDskInvert(keyId, paramOpt)
				}

				if (props.includes('sizePositionEnable')) {
					let paramOpt = getOptNumber(action, 'sizeEnable');
					if (paramOpt === 2) paramOpt = deck.state?.downStreamKey.DSKS[keyId]?.sizePosition.enable ? 0 : 1
					await deck.setDskResize(keyId, paramOpt)
				}

				if (props.includes('size')) {
					await deck.setDskSize(keyId, getOptNumber(action, 'size'))
				}
				if (props.includes('xPosition')) {
					await deck.setDskXPosition(keyId, getOptNumber(action, 'xPosition'))
				}
				if (props.includes('yPosition')) {
					await deck.setDskYPosition(keyId, getOptNumber(action, 'yPosition'))
				}
			},
		}
	}
	return actions;
}
