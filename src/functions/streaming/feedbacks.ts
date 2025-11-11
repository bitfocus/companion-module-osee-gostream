import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { FeedbackId } from './feedbackId'
import { StreamingOptionChoices, StreamQualityChoices } from '../../model'
import { StreamDeck } from '../../connection/streamdeck'

export function create(deck: StreamDeck): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.LiveStreamOutputEnable]: {
			type: 'boolean',
			name: 'Streaming: Set Stream Enable',
			description: 'If you turn on Stream Enable, change style of the button',
			options: [
				{
					type: 'dropdown',
					label: 'Stream',
					id: 'StreamID',
					choices: StreamingOptionChoices(deck.state),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				return deck.state?.stream.streamInfos[Number(feedback.options.StreamID)]?.enabled===true
			},
		},
		[FeedbackId.LiveInfo]: {
			type: 'boolean',
			name: 'Live: Set Live Start or Stop',
			description: 'If you turn on Live Start, change style of the button',
			options: [
				{
					type: 'dropdown',
					label: 'states',
					id: 'statesId',
					choices: [
						{ id: 0, label: 'off' },
						{ id: 1, label: 'On' },
						{ id: 2, label: 'abnormal' },
					],
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				return deck.state?.stream.status === Number(feedback.options.statesId)
			},
		},
		[FeedbackId.StreamQuality]: {
			type: 'boolean',
			name: 'Streaming: quality',
			description: 'change style of the button if streaming quality matches feedback',
			options: [
				{
					type: 'dropdown',
					label: 'Quality',
					id: 'quality',
					choices: StreamQualityChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const qualityIndex = Number(feedback.options.quality)
				return deck.state?.stream.quality === Number(StreamQualityChoices[qualityIndex].id)
			},
		},
	}
}
