import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { getOptNumber, getOptString } from '../../util'
import { TransitionStyle } from '../../enums'
import { FeedbackId } from './feedbackId'
import { TransitionStyleChoice } from '../../model'
import { GoStreamModel } from '../../models/types'
import { MixEffectStateT } from './state'

function createFeedbackName(name: string): string {
	return 'MixEffect: ' + name
}

export function create(model: GoStreamModel, state: MixEffectStateT): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.PreviewBG]: {
			type: 'boolean',
			name: createFeedbackName('Preview (PVW) source'),
			description: 'If the input specified is selected in preview, change style of the button',
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
			name: createFeedbackName('Program (PGM) source'),
			description: 'If the input specified is selected in program (PGM), change style of the button',
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
		[FeedbackId.KeysVisibility]: {
			type: 'boolean',
			name: createFeedbackName('"Next Transition" / "On Air" state (KEY, DSK, BKGD)'),
			description:
				'Change button style based on state of "next transition" (KEY, DSK, BKGD). The first options refers to the button states; the last one refers to the actual visibility PVW, which depends on two button-states',
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
					label: 'Status',
					id: 'LayerState',
					choices: [
						{ id: 0, label: 'Next Transition Button On' },
						{ id: 2, label: 'On Air' },
						{ id: 3, label: 'Showing in PVW' },
					],
					default: 0,
					isVisible: (options) => options.KeyButton != 'BKGD',
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const keyName = getOptString(feedback, 'KeyButton')
				const keystate = getOptNumber(feedback, 'LayerState')

				if (keystate === 1) {
					// for compatibility with previous versions.
					return !state.nextTState[keyName]
				} else if (keystate === 0) {
					return state.nextTState[keyName]
				} else if (keystate === 3) {
					return state.nextTState[keyName] != state.nextTState.getOnAirStatus(keyName)
				} else if (keystate === 2) {
					return state.nextTState.getOnAirStatus(keyName)
				} else {
					console.log('Feedback: Next Transition state received illegal option: ' + keystate)
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
	}
}
