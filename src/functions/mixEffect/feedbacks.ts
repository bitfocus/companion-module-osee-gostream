import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { ActionType, TransitionStyle, SourceType } from '../../enums'
import { getChoices } from '../../choices'
import type { GoStreamInstance } from '../../index'
import { FeedbackId } from './feedbackId'
import { KeySwitchChoices, TransitionStyleChoice } from '../../model'

export function create(instance: GoStreamInstance): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.PreviewBG]: {
			type: 'boolean',
			name: 'preview source',
			description: 'If the input specified is selected in preview, change style of the bank',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'Source',
					default: SourceType.Input1,
					choices: getChoices(ActionType.Preview),
				},
			],
			callback: (feedback) => {
				if (instance.states.MixEffect.PvwSrc?.id === feedback.options.Source) {
					return true
				} else {
					return false
				}
			},
		},
		[FeedbackId.ProgramBG]: {
			type: 'boolean',
			name: 'program source',
			description: 'If the input specified is selected in program, change style of the bank',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'Source',
					default: SourceType.Input1,
					choices: getChoices(ActionType.Program),
				},
			],
			callback: (feedback) => {
				if (instance.states.MixEffect.PgmSrc?.id === feedback.options.Source) {
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
				return !!instance.states.transitionPosition.inTransition
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
				return instance.states.selectTransitionStyle.PrevState
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
				if (instance.states.selectTransitionStyle?.style.id === feedback.options.TransitionStyle) {
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
				const me = instance.states.selectTransitionStyle
				if (me?.style.id === feedback.options.TransitionStyle) {
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
				const me = instance.states.selectTransitionStyle
				if (me?.style.id === feedback.options.TransitionStyle) {
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
						if ((BG && instance.states.TKeyeState.BKGD) || (Key && instance.states.TKeyeState.M_Key)) {
							return true
						} else if (BG && Key) {
							return instance.states.TKeyeState.M_Key && instance.states.TKeyeState.BKGD
						} else {
							return false
						}
					case 1:
						if (BG && Key) {
							return instance.states.TKeyeState.M_Key || instance.states.TKeyeState.BKGD
						} else {
							if (BG) {
								return instance.states.TKeyeState.BKGD
							} else if (Key) {
								return instance.states.TKeyeState.M_Key
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
					if (arratOptions.includes(0) && instance.states.TKeyeState.M_Key) {
						return true
					}
					if (arratOptions.includes(1) && instance.states.TKeyeState.DSK) {
						return true
					}
					if (arratOptions.includes(2) && instance.states.TKeyeState.BKGD) {
						return true
					}
					return false
				} else return false
			},
		},
	}
}
