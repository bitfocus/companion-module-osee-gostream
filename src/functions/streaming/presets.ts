import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { Stream } from "../../connection/actionids"
import { FeedbackId } from './feedbackId'
import { StreamingOptionChoices } from '../../model'
import { StreamDeck } from '../../connection/streamdeck'

const ptzSize = '18'
export function create(deck: StreamDeck): CompanionPresetDefinitions {
	let streams = StreamingOptionChoices(deck.state);
	const presets = {}
	for (const st of streams) {
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
							actionId: Stream.ActionId.LiveStreamOutputEnable,
							options: {
								streamID: st.id,
								enableId: 2,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: FeedbackId.LiveStreamOutputEnable,
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

	presets[`Live_0`] = {
		type: 'button',
		category: 'Streaming',
		name: 'Live',
		style: {
			text: `Live`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: Stream.ActionId.Live,
						options: {
							LiveEnable: 2,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: FeedbackId.LiveInfo,
				options: {
					statesId: 1,
				},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	}

	return presets
}
