import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { getOptNumber, getOptString } from '../../util'
import { TransitionStyle } from '../../enums'
import { FeedbackId } from './feedbackId'
import { TransitionStyleChoice, SwitchChoices, KeySwitchChoices } from '../../model'
import { GoStreamModel } from '../../models/types'
import { MixEffectStateT, TransitionKey } from './state'

function createFeedbackName(name: string): string {
	return 'MixEffect: ' + name
}

export function create(model: GoStreamModel, state: MixEffectStateT): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.PreviewBG]: {
			type: 'boolean',
			name: createFeedbackName('Preview source'),
			description: 'If the input specified is selected in preview, change style of the bank',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 204, 0),
			},
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'Source',
					default: 0,
					choices: model.InputSources().map((item) => ({ id: item.id, label: item.name })),
				},
			],
			callback: (feedback) => {
				if (state.PvwSrc === feedback.options.Source) {
					return true
				} else {
					return false
				}
			},
		},
		[FeedbackId.ProgramBG]: {
			type: 'boolean',
			name: createFeedbackName('Program source'),
			description: 'If the input specified is selected in program, change style of the bank',
			defaultStyle: {
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(204, 0, 0),
			},
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'Source',
					default: 0,
					choices: model.InputSources().map((item) => ({ id: item.id, label: item.name })),
				},
			],
			callback: (feedback) => {
				if (state.PgmSrc === feedback.options.Source) {
					return true
				} else {
					return false
				}
			},
		},
		[FeedbackId.NextTransitionState]: {
			type: 'boolean',
			name: createFeedbackName('State of Next Transition buttons'),
			description: 'Change button style based on state of a "next transition" button (KEY, DSK, BKGD)',
			options: [
				{
					type: 'dropdown',
					label: 'Layer',
					id: 'KeyButton',
					choices: state.nextTState.getChoices(true),
					default: state.nextTState.getDefaultChoice(),
				},
				{
					type: 'dropdown',
					label: 'State',
					id: 'ButtonAction',
					choices: [
						{ id: 0, label: 'On' },
						{ id: 1, label: 'Off' },
					],
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const keyName = getOptString(feedback, 'KeyButton')
				const keystate = getOptNumber(feedback, 'ButtonAction')

				return keystate == 0 ? state.nextTState[keyName] : !state.nextTState[keyName]
			},
		},
		[FeedbackId.KeyOnAir]: {
			type: 'boolean',
			name: createFeedbackName('Key OnAir state'),
			description: 'Change bank style based on key OnAir state',
			options: [
				{
					type: 'dropdown',
					label: 'Key OnAir',
					id: 'KeyOnAir',
					choices: [
						{ id: 0, label: 'Off' },
						{ id: 1, label: 'On' },
					],
					default: 1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				return feedback.options.KeyOnAir === 1 ? state.nextTState.keyOnAir : !state.nextTState.keyOnAir
			},
		},
		[FeedbackId.DskOnAir]: {
			type: 'boolean',
			name: createFeedbackName('DSK OnAir state'),
			description: 'Change bank style based on DSK OnAir state',
			options: [
				{
					type: 'dropdown',
					label: 'DSK OnAir',
					id: 'DSKOnAir',
					choices: [
						{ id: 0, label: 'Off' },
						{ id: 1, label: 'On' },
					],
					default: 1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				return feedback.options.DSKOnAir === 1 ? state.nextTState.dskOnAir : !state.nextTState.dskOnAir
			},
		},
		[FeedbackId.KeyOnPvw]: {
			type: 'boolean',
			name: createFeedbackName('Key on preview'),
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
				if (state.pvwOnAir && feedback.options.KeyOnAir === 1) {
					return true
				} else {
					return false
				}
			},
		},
		[FeedbackId.InTransition]: {
			type: 'boolean',
			name: createFeedbackName('Transition is Active/Running'),
			description: 'If the specified transition is active, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return !!state.transitionPosition.inTransition
			},
		},
		[FeedbackId.Prev]: {
			type: 'boolean',
			name: createFeedbackName('Prev transition Active/Running'),
			description: 'If the PREV is active, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return state.selectTransitionStyle.PrevState
			},
		},
		[FeedbackId.TransitionStyle]: {
			type: 'boolean',
			name: createFeedbackName('Transition style'),
			description: 'If the specified transition style is active, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'TransitionStyle',
					id: 'TransitionStyle',
					default: TransitionStyle.MIX,
					choices: TransitionStyleChoice,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				if (state.selectTransitionStyle?.style === feedback.options.TransitionStyle) {
					return true
				} else {
					return false
				}
			},
		},
		[FeedbackId.TransitionRate]: {
			type: 'boolean',
			name: createFeedbackName('Transition rate'),
			description: 'If the specified transition rate is active, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Transition Style',
					id: 'TransitionStyle',
					default: TransitionStyle.MIX,
					choices: TransitionStyleChoice,
				},
				{
					type: 'number',
					label: 'Transition Rate',
					id: 'TransitionRate',
					default: 2,
					min: 0.5,
					max: 8.0,
					step: 0.5,
					range: true,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const me = state.selectTransitionStyle
				if (me?.style === feedback.options.TransitionStyle) {
					const style = Number(feedback.options.TransitionStyle)
					const rate = Number(feedback.options.TransitionRate)
					switch (style) {
						case 0:
							return me?.mixrate === rate
						case 1:
							return me?.diprate === rate
						case 2:
							return me?.wiperate === rate
						default:
							return false
							break
					}
				}
				return false
			},
			learn: (feedback) => {
				const me = state.selectTransitionStyle
				if (me?.style === feedback.options.TransitionStyle) {
					const style = Number(feedback.options.TransitionStyle)
					switch (style) {
						case 0:
							return {
								...feedback.options,
								TransitionRate: me?.mixrate,
							}
						case 1:
							return {
								...feedback.options,
								TransitionRate: me?.diprate,
							}
						case 2:
							return {
								...feedback.options,
								TransitionRate: me?.wiperate,
							}
						default:
							return undefined
					}
				} else {
					return undefined
				}
			},
		},
		[FeedbackId.TransitionSelection]: {
			type: 'boolean',
			name: createFeedbackName('Transition selection'),
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
				const BKGDArmed = (state.transitionKeys & TransitionKey.BKGD) > 0
				const USKArmed = (state.transitionKeys & TransitionKey.USK) > 0
				switch (seleOptions) {
					case 0:
						if ((BG && BKGDArmed) || (Key && USKArmed)) {
							return true
						} else if (BG && Key) {
							return BKGDArmed && USKArmed
						} else {
							return false
						}
					case 1:
						if (BG && Key) {
							return BKGDArmed || USKArmed
						} else {
							if (BG) {
								return BKGDArmed
							} else if (Key) {
								return USKArmed
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
			name: createFeedbackName('Transition key switch'),
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
					if (arratOptions.includes(0) && state.transitionKeys & TransitionKey.USK) {
						return true
					}
					if (arratOptions.includes(1) && state.transitionKeys & TransitionKey.DSK) {
						return true
					}
					if (arratOptions.includes(2) && state.transitionKeys & TransitionKey.BKGD) {
						return true
					}
					return false
				} else return false
			},
		},
	}
}
