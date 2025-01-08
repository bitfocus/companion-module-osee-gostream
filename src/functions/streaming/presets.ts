import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'
import { StreamingChoices } from '../../model'

const ptzSize = '18'
export function create(): CompanionPresetDefinitions {
	const presets = {}

	for (const st of StreamingChoices) {
		presets[`StreamingSwitch_${st.id}`] = {
			type: 'button',
			category: 'Streaming',
			name: 'Push Streaming',
			style: {
				text: `${st.label}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.StreamOutput,
							options: {
								StreamID: st.id,
								EnableId: 2,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: FeedbackId.StreamOutput,
					options: {
						StreamID: st.id,
					},
					style: {
						bgcolor: combineRgb(255, 255, 0),
						color: combineRgb(0, 0, 0),
					},
				},
			],
		}
	}

	return presets
}
