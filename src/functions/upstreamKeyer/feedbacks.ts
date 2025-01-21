import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { ActionType } from './../../enums'
import { getChoices } from './../../choices'
import { FeedbackId } from './feedbackId'
import { UpStreamKeyTypeChoices, SwitchChoices, KeyResizeSizeChoices } from './../../model'
import type { GoStreamInstance } from './../../index'
import { USKKeySourceType, USKKeyTypes } from './state'

export function create(instance: GoStreamInstance): CompanionFeedbackDefinitions {
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
				if (instance.states.UpstreamKeyer.Tied === (feedback.options.KeyTied === 0 ? true : false)) {
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
				if (instance.states.UpstreamKeyer.transitionKey.KeyOnAir && feedback.options.KeyOnAir === 1) {
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
				if (instance.states.UpstreamKeyer.PvwOnAir && feedback.options.KeyOnAir === 1) {
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
					choices: getChoices(ActionType.KeyPatternSourceKey),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeId = Number(feedback.options.USKKeyType)
				console.log(
					'KeySourceFill feedback',
					instance.states.UpstreamKeyer.keyInfo[typeId].sources,
					instance.states.UpstreamKeyer.keyInfo[typeId].sources[USKKeySourceType.Fill],
					Number(feedback.options.USKSourceFill),
				)
				return (
					instance.states.UpstreamKeyer.keyInfo[typeId].sources[USKKeySourceType.Fill] ===
					Number(feedback.options.USKSourceFill)
				)
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
				return instance.states.UpstreamKeyer.UpStreamKeyType === typeid
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
				return instance.states.UpstreamKeyer.keyInfo[USKKeyTypes.Pip].xPosition === typeid
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
				return instance.states.UpstreamKeyer.keyInfo[USKKeyTypes.Pip].yPosition === typeid
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
				return instance.states.UpstreamKeyer.keyInfo[USKKeyTypes.KeyPattern].xPosition === typeid
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
				return instance.states.UpstreamKeyer.keyInfo[USKKeyTypes.KeyPattern].yPosition === typeid
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
				return instance.states.UpstreamKeyer.keyInfo[USKKeyTypes.KeyPattern].size === typeid
			},
		},
	}
}
