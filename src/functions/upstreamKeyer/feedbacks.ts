import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { ActionType } from './../../enums'
import { FeedbackId } from './feedbackId'
import { KeySwitchChoices, UpStreamKeyTypeChoices, SwitchChoices, KeyResizeSizeChoices } from './../../model'
import { USKKeySourceType, USKKeyTypes } from './state'
import { UpstreamKeyerStateT } from './state'
import { GoStreamModel } from '../../models/types'
export function create(model: GoStreamModel, state: UpstreamKeyerStateT): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.TransitionSource]: {
			type: 'boolean',
			name: 'USK: Tied',
			description: 'Indicate if USK is tied to next transition',
			options: [
				{
					type: 'dropdown',
					label: 'Key Tied',
					id: 'KeyTied',
					choices: [
						{ id: 0, label: 'on' },
						{ id: 1, label: 'off' },
					],
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				if (state.Tied === (feedback.options.KeyTied === 0 ? true : false)) {
					return true
				} else {
					return false
				}
			},
		},
		[FeedbackId.KeyOnAir]: {
			type: 'boolean',
			name: 'USK: Key OnAir Switch',
			description: 'Set the special effect Transition key switch',
			options: [
				{
					type: 'dropdown',
					label: 'Key OnAir',
					id: 'KeyOnAir',
					choices: SwitchChoices,
					default: 1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				if (state.transitionKey.KeyOnAir && feedback.options.KeyOnAir === 1) {
					return true
				} else {
					return false
				}
			},
		},
		[FeedbackId.KeyOnPvw]: {
			type: 'boolean',
			name: 'USK: Key on preview',
			description: 'Indicates if USK on on air on the preview bus',
			options: [
				{
					type: 'dropdown',
					label: 'Key OnAir',
					id: 'KeyOnAir',
					choices: SwitchChoices,
					default: 1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			callback: (feedback) => {
				if (state.PvwOnAir && feedback.options.KeyOnAir === 1) {
					return true
				} else {
					return false
				}
			},
		},
		[FeedbackId.KeySourceFill]: {
			type: 'boolean',
			name: 'USK: Source Fill',
			description: 'Set the special effect UpStream Key Source Fill',
			options: [
				{
					type: 'dropdown',
					label: 'Key Type:',
					id: 'USKKeyType',
					choices: UpStreamKeyTypeChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source Fill:',
					id: 'USKSourceFill',
					choices: model.getChoices(ActionType.KeyPatternSourceKey),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeId = Number(feedback.options.USKKeyType)
				return state.keyInfo[typeId].sources[USKKeySourceType.Fill] === Number(feedback.options.USKSourceFill)
			},
		},
		[FeedbackId.UpStreamKeyType]: {
			type: 'boolean',
			name: 'USK: Set type',
			description: 'If you Select UpStream Key, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Type',
					id: 'USKType',
					choices: UpStreamKeyTypeChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeid = Number(feedback.options.USKType)
				return state.UpStreamKeyType === typeid
			},
		},
		[FeedbackId.PipXPosition]: {
			type: 'boolean',
			name: 'USK: PIP X position',
			description: 'Change style of bank based on pip x position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'pipXPosId',
					min: -16,
					max: 16,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeid = Number(feedback.options.pipXPosId)
				return state.keyInfo[USKKeyTypes.Pip].xPosition === typeid
			},
		},
		[FeedbackId.PipYPosition]: {
			type: 'boolean',
			name: 'USK: PIP Y position',
			description: 'Change style of bank based on pip y position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'pipYPosId',
					min: -9,
					max: 9,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeid = Number(feedback.options.pipYPosId)
				return state.keyInfo[USKKeyTypes.Pip].yPosition === typeid
			},
		},
		[FeedbackId.KeyPatternResizeXPosition]: {
			type: 'boolean',
			name: 'USK: Key Pattern X position',
			description: 'Change style of bank based on key pattern x position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'keyPatternResizeXId',
					min: -16,
					max: 16,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeid = Number(feedback.options.keyPatternResizeXId)
				return state.keyInfo[USKKeyTypes.KeyPattern].xPosition === typeid
			},
		},
		[FeedbackId.KeyPatternResizeYPosition]: {
			type: 'boolean',
			name: 'USK: Key Pattern Y position',
			description: 'Change style of bank based on key pattern y position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'keyPatternResizeYId',
					min: -9,
					max: 9,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeid = Number(feedback.options.keyPatternResizeYId)
				return state.keyInfo[USKKeyTypes.KeyPattern].yPosition === typeid
			},
		},
		[FeedbackId.KeyPatternResizeSize]: {
			type: 'boolean',
			name: 'USK: Key Pattern Resize Size',
			description: 'Change style of bank based on key pattern resize size',
			options: [
				{
					type: 'dropdown',
					label: 'Size',
					id: 'keyPatternResizeSizeId',
					choices: KeyResizeSizeChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeid = Number(feedback.options.keyPatternResizeSizeId)
				return state.keyInfo[USKKeyTypes.KeyPattern].size === typeid
			},
		},
		[FeedbackId.TransitionSelection]: {
			type: 'boolean',
			name: 'Transition: Selection',
			description: 'If the specified transition selection is active, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Match method',
					id: 'MatchState',
					choices: [
						{ id: 0, label: 'Exact' },
						{ id: 1, label: 'Contains' },
					],
					default: 2,
				},
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
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const seleOptions = feedback.options.MatchState
				const BG = feedback.options.Background
				const Key = feedback.options.Key
				switch (seleOptions) {
					case 0:
						if ((BG && state.transitionKey.BKGD) || (Key && state.transitionKey.M_Key)) {
							return true
						} else if (BG && Key) {
							return state.transitionKey.M_Key && state.transitionKey.BKGD
						} else {
							return false
						}
					case 1:
						if (BG && Key) {
							return state.transitionKey.M_Key || state.transitionKey.BKGD
						} else {
							if (BG) {
								return state.transitionKey.BKGD
							} else if (Key) {
								return state.transitionKey.M_Key
							} else {
								return false
							}
						}
					default:
						return false
				}
			},
		},
		[FeedbackId.TransitionKeySwitch]: {
			type: 'boolean',
			name: 'Next Transition:Key Switch',
			description: 'Set the special effect Transition key switch',
			options: [
				{
					type: 'dropdown',
					label: 'Switch',
					id: 'KeySwitch',
					choices: KeySwitchChoices,
					default: 2,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const seleOptions = feedback.options.KeySwitch
				if (seleOptions && Array.isArray(seleOptions)) {
					const arratOptions = Array.from(seleOptions)
					if (arratOptions.includes(0) && state.transitionKey.M_Key) {
						return true
					}
					if (arratOptions.includes(1) && state.transitionKey.DSK) {
						return true
					}
					if (arratOptions.includes(2) && state.transitionKey.BKGD) {
						return true
					}
					return false
				} else return false
			},
		},
	}
}
