import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'
import { MacroFeedbackType } from './feedbacks'

const ptzSize = '18'
export function create(): CompanionPresetDefinitions {
	const presets = {}
	for (let macro = 0; macro < 100; macro++) {
		presets[`macro_run_${macro}`] = {
			category: 'MACROS',
			name: `Run button for macro ${macro + 1}`,
			type: 'button',
			style: {
				text: `macro${macro + 1}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				// {
				// 	feedbackId: feedbackId.Macro,
				// 	options: {
				// 		macroIndex: macro,
				// 	},
				// 	style: {
				// 		bgcolor: combineRgb(0, 0, 238),
				// 		color: combineRgb(255, 255, 255),
				// 	},
				// },
				{
					feedbackId: FeedbackId.Macro,
					options: {
						MacroIndex: macro,
						state: MacroFeedbackType.IsUsed,
					},
					style: {
						bgcolor: combineRgb(0, 0, 238),
						color: combineRgb(255, 255, 255),
					},
				},
				{
					feedbackId: FeedbackId.Macro,
					options: {
						MacroIndex: macro,
						state: MacroFeedbackType.IsRunning,
					},
					style: {
						bgcolor: combineRgb(0, 238, 0),
						color: combineRgb(255, 255, 255),
					},
				},
				{
					feedbackId: FeedbackId.Macro,
					options: {
						MacroIndex: macro,
						state: MacroFeedbackType.IsWaiting,
					},
					style: {
						bgcolor: combineRgb(238, 238, 0),
						color: combineRgb(255, 255, 255),
					},
				},
				{
					feedbackId: FeedbackId.Macro,
					options: {
						MacroIndex: macro,
						state: MacroFeedbackType.IsRecording,
					},
					style: {
						bgcolor: combineRgb(238, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
			],
			steps: [
				{
					down: [
						{
							actionId: ActionId.MacroRun,
							options: {
								StatusID: 1,
								MacroIndex: macro,
							},
						},
					],
					up: [],
				},
			],
		}
	}
	return presets
}
