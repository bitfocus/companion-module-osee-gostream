import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { Macro } from "../../connection/actionids"
import { FeedbackId } from './feedbackId'
import { MacroFeedbackType } from './feedbacks'
import { StreamDeck } from '../../connection/streamdeck'
const ptzSize = '16'
export function create(_deck: StreamDeck): CompanionPresetDefinitions {
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
							actionId: Macro.ActionId.MacroRunStart,
							options: {
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
