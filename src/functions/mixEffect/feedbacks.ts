import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { TransitionStyle } from '../../enums'
import { FeedbackId } from './feedbackId'
import { TransitionStyleChoice } from '../../model'
import { GoStreamModel } from '../../models/types'
import { MixEffectStateT } from './state'
export function create(model: GoStreamModel, state: MixEffectStateT): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.PreviewBG]: {
			type: 'boolean',
			name: 'Preview source',
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
					choices: model.InputChoices().map((item) => ({ id: item.id, label: item.name })),
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
			name: 'Program source',
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
					choices: model.InputChoices().map((item) => ({ id: item.id, label: item.name })),
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
		[FeedbackId.InTransition]: {
			type: 'boolean',
			name: 'Transition: Active/Running',
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
		[FeedbackId.Cut]: {
			type: 'boolean',
			name: 'Transition: Active/Running',
			description: 'If the specified transition is active, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return false
			},
		},
		[FeedbackId.Prev]: {
			type: 'boolean',
			name: 'Transition: Active/Running',
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
			name: 'Transition: Style',
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
			name: 'Transition: Rate',
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
