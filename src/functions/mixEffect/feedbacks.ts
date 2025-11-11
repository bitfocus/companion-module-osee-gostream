import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { getEnumKeyByValue } from '../../util'
import { FeedbackId } from './feedbackId'
import { TransitionStyleChoice } from '../../model'
import { StreamDeck } from '../../connection/streamdeck'
import { EffectStyle, sourceID } from '../../connection/enums'

function createFeedbackName(name: string): string {
	return 'MixEffect: ' + name
}

export function create(deck: StreamDeck): CompanionFeedbackDefinitions {
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
					choices: deck.state?deck.state.device.inputSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s))})):[],
				},
			],
			callback: (feedback) => {
				if (deck.state?.effect.PvwSrc === feedback.options.Source) {
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
					choices: deck.state?deck.state.device.inputSources?.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s))})):[],
				},
			],
			callback: (feedback) => {
				if (deck.state?.effect.PgmSrc === feedback.options.Source) {
					return true
				} else {
					return false
				}
			},
		},
		[FeedbackId.InTransition]: {
			type: 'boolean',
			name: createFeedbackName('Transition is Active/Running'),
			description: 'If the specified transition is active, change style of the button',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return !!deck.state?.effect.transitionPosition.inTransition
			},
		},
		[FeedbackId.Prev]: {
			type: 'boolean',
			name: createFeedbackName('Prev transition Active/Running'),
			description: 'If the PREV is active, change style of the button',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return deck.state?.effect.selectTransitionStyle.PrevState===true
			},
		},
		[FeedbackId.TransitionStyle]: {
			type: 'boolean',
			name: createFeedbackName('Transition style'),
			description: 'If the specified transition style is active, change style of the button',
			options: [
				{
					type: 'dropdown',
					label: 'TransitionStyle',
					id: 'transitionStyle',
					default: EffectStyle.Mix,
					choices: TransitionStyleChoice,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				return deck.state?.effect.selectTransitionStyle.style === Number(feedback.options.transitionStyle)
			},
		},
		[FeedbackId.TransitionRate]: {
			type: 'boolean',
			name: createFeedbackName('Transition rate'),
			description: 'If the specified transition rate is active, change style of the button',
			options: [
				{
					type: 'dropdown',
					label: 'Transition Style',
					id: 'transitionStyle',
					default: EffectStyle.Mix,
					choices: TransitionStyleChoice,
				},
				{
					type: 'number',
					label: 'Transition Rate',
					id: 'transitionRate',
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
				const me = deck.state?.effect.selectTransitionStyle
				const opt_rate= Number(feedback.options.transitionRate)
				const opt_style = Number(feedback.options.transitionStyle)
				if (me?.style === opt_style) {
					switch (opt_style) {
						case 0:
							return me.mix.rate === opt_rate
						case 1:
							return me.dip.rate === opt_rate
						case 2:
							return me.wipe.rate === opt_rate
						default:
							return false
					}
				}
				return false
			},
			learn: (feedback) => {
				const me = deck.state?.effect.selectTransitionStyle
				const opt_style = Number(feedback.options.transitionStyle)
				if (me?.style === opt_style) {
					switch (opt_style) {
						case 0:
							return {
								...feedback.options,
								TransitionRate: me?.mix.rate,
							}
						case 1:
							return {
								...feedback.options,
								TransitionRate: me.dip.rate,
							}
						case 2:
							return {
								...feedback.options,
								TransitionRate: me?.wipe.rate,
							}
						default:
							return undefined
					}
				} else {
					return undefined
				}
			},
		},
		[FeedbackId.FTBRate]:{
			type: 'boolean',
			name: createFeedbackName('FTB rate'),
			description: 'If the specified transition rate is active, change style of the button',
			options: [
				{
					type: 'number',
					label: 'ftb Rate',
					id: 'ftbRate',
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
				const rate = Number(feedback.options.ftbRate)
					return rate===deck.state?.effect.fadeToBlack.rate
			},
			learn: (feedback) => {
				const rate = deck.state?.effect.fadeToBlack.rate
				return {
					...feedback.options,
					ftbRate: rate
				}
			},
		}
	}
}
