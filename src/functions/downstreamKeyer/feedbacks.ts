import { FeedbackId } from './feedbackId'
import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import {GetDSKChoices,DSKSwitchChoices} from '../../model'
import { StreamDeck } from '../../connection/streamdeck'
import { getEnumKeyByValue } from '../../util'
import { sourceID } from '../../connection/enums'

function createFeedbackName(name: string): string {
	return 'DownstreamKeyer: ' + name
}
export function create(deck: StreamDeck): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.DskSourceFillKey]: {
			type: 'boolean',
			name: createFeedbackName('fill or key source'),
			description: 'Change style of button depending on DSK fill or key source',
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
					choices: deck.state?deck.state.downStreamKey.FillSources.map(s=>({id:s,label:String(getEnumKeyByValue(sourceID,s))})):[],
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const keyId=Number(feedback.options.keyId)
				const typeId = Number(feedback.options.TypeID)
				const dsk_source = Number(feedback.options.DSKSource)
				
				if (typeId === 0) {
					return deck.state?.downStreamKey.DSKS[keyId]?.source.key===dsk_source
				} else {
					return  deck.state?.downStreamKey.DSKS[keyId]?.source.fill===dsk_source
				}
			},
			learn: (feedback) => {
				const typeId = Number(feedback.options.TypeID)
				const keyId=Number(feedback.options.keyId)
				return {
					...feedback.options,
					DSKSource: typeId === 0 ?  deck.state?.downStreamKey.DSKS[keyId]?.source.key :  deck.state?.downStreamKey.DSKS[keyId]?.source.key
				}
			},
		},
		[FeedbackId.DskMaskEnable]: {
			type: 'boolean',
			name: createFeedbackName('mask enabled'),
			description: 'Change style of button when mask is enabled',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetDSKChoices(deck.state),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const keyId=Number(feedback.options.keyId)
				return  deck.state?.downStreamKey.DSKS[keyId]?.mask.enabled ===true
			},
		},
		[FeedbackId.DskMaskHStart]: {
			type: 'boolean',
			name: createFeedbackName('mask horizontal start'),
			description: 'Change style of button depending on horizontal start value of mask',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetDSKChoices(deck.state),
					default: 0,
				},
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
				const keyId=Number(feedback.options.keyId)
				const hStart = Number(feedback.options.HStart)
				return  deck.state?.downStreamKey.DSKS[keyId]?.mask.hStart === hStart
			},
			learn: (feedback) => {
				const keyId=Number(feedback.options.keyId)
				return {
					...feedback.options,
					HStart:  deck.state?.downStreamKey.DSKS[keyId]?.mask.hStart,
				}
			},
		},
		[FeedbackId.DskMaskVStart]: {
			type: 'boolean',
			name: createFeedbackName('mask vertical start'),
			description: 'Change style of button depending on vertical start value of mask',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetDSKChoices(deck.state),
					default: 0,
				},
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
				const keyId=Number(feedback.options.keyId)
				const vStart = Number(feedback.options.VStart)
				return deck.state?.downStreamKey.DSKS[keyId]?.mask.vStart === vStart
			},
			learn: (feedback) => {
				const keyId=Number(feedback.options.keyId)
				return {
					...feedback.options,
					VStart:deck.state?.downStreamKey.DSKS[keyId]?.mask.vStart,
				}
			},
		},
		[FeedbackId.DskMaskHEnd]: {
			type: 'boolean',
			name: createFeedbackName('mask horizontal end'),
			description: 'Change style of button depending on horizontal end value of mask',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetDSKChoices(deck.state),
					default: 0,
				},
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
				const keyId=Number(feedback.options.keyId)
				const hEnd = Number(feedback.options.HEnd)
				return  deck.state?.downStreamKey.DSKS[keyId]?.mask.hEnd === hEnd
			},
			learn: (feedback) => {
				const keyId=Number(feedback.options.keyId)
				return {
					...feedback.options,
					HEnd:  deck.state?.downStreamKey.DSKS[keyId]?.mask.hEnd,
				}
			},
		},
		[FeedbackId.DskMaskVEnd]: {
			type: 'boolean',
			name: createFeedbackName('mask vertical end'),
			description: 'Change style of button depending on vertical end value of mask',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetDSKChoices(deck.state),
					default: 0,
				},
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
				const keyId=Number(feedback.options.keyId)
				const vEnd = Number(feedback.options.VEnd)
				return  deck.state?.downStreamKey.DSKS[keyId]?.mask.vEnd === vEnd
			},
			learn: (feedback) => {
				const keyId=Number(feedback.options.keyId)
				return {
					...feedback.options,
					VEnd:  deck.state?.downStreamKey.DSKS[keyId]?.mask.vEnd,
				}
			},
		},
		[FeedbackId.DskControlShapedKey]: {
			type: 'boolean',
			name: createFeedbackName('shaped key enabled'),
			description: 'Change style of button if shaped key is enabled',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetDSKChoices(deck.state),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const keyId=Number(feedback.options.keyId)
				return  deck.state?.downStreamKey.DSKS[keyId]?.control.preMultipliedKey===true
			},
		},
		[FeedbackId.DskControlInvert]: {
			type: 'boolean',
			name: createFeedbackName('shaped key invert'),
			description: 'Change style of button depending on status of shaped key invert',
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
				const keyId=Number(feedback.options.keyId)
				const skeyinvEnabledChoice = Boolean(feedback.options.skeyinvEnabled)
				return   deck.state?.downStreamKey.DSKS[keyId]?.control.invert === skeyinvEnabledChoice
			},
			learn: (feedback) => {
				const keyId=Number(feedback.options.keyId)
				return {
					...feedback.options,
					skeyinvEnabled:  deck.state?.downStreamKey.DSKS[keyId]?.control.invert,
				}
			},
		},
		[FeedbackId.DskControlClip]: {
			type: 'boolean',
			name: createFeedbackName('shaped key clip'),
			description: 'Change style of button depending on clip value of shaped key',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetDSKChoices(deck.state),
					default: 0,
				},
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
				const keyId=Number(feedback.options.keyId)
				const clip = Number(feedback.options.Clip)
				return   deck.state?.downStreamKey.DSKS[keyId]?.control.clip === clip
			},
			learn: (feedback) => {
				const keyId=Number(feedback.options.keyId)
				return {
					...feedback.options,
					Clip:   deck.state?.downStreamKey.DSKS[keyId]?.control.clip,
				}
			},
		},
		[FeedbackId.DskControlGain]: {
			type: 'boolean',
			name: createFeedbackName('shaped key gain'),
			description: 'Change style of button depending on gain value of shaped key',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetDSKChoices(deck.state),
					default: 0,
				},
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
				const keyId=Number(feedback.options.keyId)
				const gain = Number(feedback.options.Gain)
				return  deck.state?.downStreamKey.DSKS[keyId]?.control.gain === gain
			},
			learn: (feedback) => {
				const keyId=Number(feedback.options.keyId)
				return {
					...feedback.options,
					Gain:   deck.state?.downStreamKey.DSKS[keyId]?.control.gain,
				}
			},
		},
		[FeedbackId.DskEnable]: {
			type: 'boolean',
			name: 'DSK:Enable',
			description: 'Set the special effect DSK Enable',
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
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const keyId = Number(feedback.options.keyId)
				const enable = Boolean(feedback.options.enable)
				return  deck.state?.downStreamKey.DSKS[keyId]?.keyEnable === enable
			},
		},
		[FeedbackId.DskOnAir]: {
			type: 'boolean',
			name: 'DSK:On Air',
			description: 'Set the special effect DSK On Air',
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
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const keyId = Number(feedback.options.keyId)
				const enable = Boolean(feedback.options.enable)
				return  deck.state?.downStreamKey.DSKS[keyId]?.keyOnAir === enable
			},
		},
	}
}
