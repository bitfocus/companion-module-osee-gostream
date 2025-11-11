import { FeedbackId } from './feedbackId'
import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { ActionType } from '../../enums'
import { GoStreamModel } from '../../models/types'
import { DownstreamKeyerStateT } from './state'

function createFeedbackName(name: string): string {
	return 'DownstreamKeyer: ' + name
}
export function create(model: GoStreamModel, state: DownstreamKeyerStateT): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.DskSourceFillKey]: {
			type: 'boolean',
			name: createFeedbackName('fill or key source'),
			description: 'Change style of button depending on DSK fill or key source',
			options: [
				{
					type: 'dropdown',
					label: 'Type',
					id: 'TypeID',
					choices: [
						{ id: 0, label: 'Key' },
						{ id: 1, label: 'Fill' },
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'DSKSource',
					choices: model.getChoices(ActionType.DskSourceFill),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeId = Number(feedback.options.TypeID)
				const dsk_source = Number(feedback.options.DSKSource)
				if (typeId === 0) {
					return state.source.key === dsk_source
				} else {
					return state.source.fill === dsk_source
				}
			},
			learn: (feedback) => {
				const typeId = Number(feedback.options.TypeID)
				return {
					...feedback.options,
					DSKSource: typeId === 0 ? state.source.key : state.source.fill,
				}
			},
		},
		[FeedbackId.DskMaskEnable]: {
			type: 'boolean',
			name: createFeedbackName('mask enabled'),
			description: 'Change style of button when mask is enabled',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return state.mask.enabled
			},
		},
		[FeedbackId.DskMaskHStart]: {
			type: 'boolean',
			name: createFeedbackName('mask horizontal start'),
			description: 'Change style of button depending on horizontal start value of mask',
			options: [
				{
					type: 'number',
					label: 'H Start',
					id: 'HStart',
					default: 0,
					min: 0,
					max: 100,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const hStart = Number(feedback.options.HStart)
				return state.mask.hStart === hStart
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					HStart: state.mask.hStart,
				}
			},
		},
		[FeedbackId.DskMaskVStart]: {
			type: 'boolean',
			name: createFeedbackName('mask vertical start'),
			description: 'Change style of button depending on vertical start value of mask',
			options: [
				{
					type: 'number',
					label: 'V Start',
					id: 'VStart',
					default: 0,
					min: 0,
					max: 100,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const vStart = Number(feedback.options.VStart)
				return state.mask.vStart === vStart
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					VStart: state.mask.vStart,
				}
			},
		},
		[FeedbackId.DskMaskHEnd]: {
			type: 'boolean',
			name: createFeedbackName('mask horizontal end'),
			description: 'Change style of button depending on horizontal end value of mask',
			options: [
				{
					type: 'number',
					label: 'H End',
					id: 'HEnd',
					default: 100,
					min: 0,
					max: 100,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const hEnd = Number(feedback.options.HEnd)
				return state.mask.hEnd === hEnd
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					HEnd: state.mask.hEnd,
				}
			},
		},
		[FeedbackId.DskMaskVEnd]: {
			type: 'boolean',
			name: createFeedbackName('mask vertical end'),
			description: 'Change style of button depending on vertical end value of mask',
			options: [
				{
					type: 'number',
					label: 'V End',
					id: 'VEnd',
					default: 100,
					min: 0,
					max: 100,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const vEnd = Number(feedback.options.VEnd)
				return state.mask.vEnd === vEnd
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					VEnd: state.mask.vEnd,
				}
			},
		},
		[FeedbackId.DskControlShapedKey]: {
			type: 'boolean',
			name: createFeedbackName('shaped key enabled'),
			description: 'Change style of button if shaped key is enabled',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return state.control.shapedKey
			},
		},
		[FeedbackId.DskControlInvert]: {
			type: 'boolean',
			name: createFeedbackName('shaped key invert'),
			description: 'Change style of button depending on status of shaped key invert',
			options: [
				{
					type: 'dropdown',
					label: 'Shaped key invert status',
					id: 'skeyinvEnabled',
					choices: [
						{ id: 0, label: 'disabled' },
						{ id: 1, label: 'enabled' },
					],
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const skeyinvEnabledChoice = Boolean(feedback.options.skeyinvEnabled)
				return state.control.invert === skeyinvEnabledChoice
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					skeyinvEnabled: state.control.invert,
				}
			},
		},
		[FeedbackId.DskControlClip]: {
			type: 'boolean',
			name: createFeedbackName('shaped key clip'),
			description: 'Change style of button depending on clip value of shaped key',
			options: [
				{
					type: 'number',
					label: 'Clip',
					id: 'Clip',
					default: 15,
					min: 0,
					max: 100,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const clip = Number(feedback.options.Clip)
				return state.control.clip === clip
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					Clip: state.control.clip,
				}
			},
		},
		[FeedbackId.DskControlGain]: {
			type: 'boolean',
			name: createFeedbackName('shaped key gain'),
			description: 'Change style of button depending on gain value of shaped key',
			options: [
				{
					type: 'number',
					label: 'Gain',
					id: 'Gain',
					default: 50,
					min: 0,
					max: 100,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const gain = Number(feedback.options.Gain)
				return state.control.gain === gain
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					Gain: state.control.gain,
				}
			},
		},
		[FeedbackId.DskRate]: {
			type: 'boolean',
			name: createFeedbackName('rate'),
			description: 'Change style of button depending on rate value',
			options: [
				{
					type: 'number',
					label: 'Rate',
					id: 'Rate',
					default: 1.0,
					min: 0.5,
					max: 8.0,
					step: 0.5,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const rate = Number(feedback.options.Rate)
				return state.rate.rate === rate
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					Rate: state.rate.rate,
				}
			},
		},
	}
}
