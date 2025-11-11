import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { FeedbackId } from './feedbackId'
import { StreamDeck } from '../../connection/streamdeck'
import { getChoicesByMacro } from '../../model'
export const MacroFeedbackType = {
	IsRunning: 'isRunning',
	IsWaiting: 'isWaiting',
	IsRecording: 'isRecording',
	IsUsed: 'isUsed',
}
export function create(deck: StreamDeck): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.Macro]: {
			type: 'boolean',
			name: 'Macro: State',
			description: 'If the specified macro is running, change style of the button',
			options: [
				{
					type: 'dropdown',
					label: 'Macro Number (1-100)',
					id: 'MacroIndex',
					default: 1,
					choices: getChoicesByMacro(),
				},
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: MacroFeedbackType.IsWaiting,
					choices: [
						{ id: MacroFeedbackType.IsRunning, label: 'Is Running' },
						{ id: MacroFeedbackType.IsWaiting, label: 'Is Waiting' },
						{ id: MacroFeedbackType.IsRecording, label: 'Is Recording' },
						{ id: MacroFeedbackType.IsUsed, label: 'Is Used' },
					],
				},
			],
			defaultStyle: {
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(238, 238, 0),
			},
			callback: (feedback) => {
				const macroIndex = Number(feedback.options.MacroIndex)
				if (!isNaN(macroIndex)) {
					const type = feedback.options.state
					const macro = deck.state?.macro.macros[macroIndex]
					switch (type) {
						case MacroFeedbackType.IsUsed: {
							return !!macro?.used
						}
						case MacroFeedbackType.IsRecording:
							return !!macro?.recording
						case MacroFeedbackType.IsRunning:
							return !!macro?.running
						case MacroFeedbackType.IsWaiting:
							return !!macro?.waiting
					}
				}
				return false
			},
		},
	}
}
