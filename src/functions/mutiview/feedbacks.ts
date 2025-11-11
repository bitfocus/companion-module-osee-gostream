import { FeedbackId } from './feedbackId'
import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { WindowLayoutChoices } from '../../model'
import { StreamDeck } from '../../connection/streamdeck'

export function create(deck: StreamDeck): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.MultiViewLayout]: {
			type: 'boolean',
			name: 'MutiView:set MultiView layout',
			description: 'Update style based on mv layout style',
			options: [
				{
					type: 'dropdown',
					label: 'Sytle:',
					id: 'styleID',
					choices: WindowLayoutChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			callback: (feedback) => {
				return deck.state?.mutiView.layoutStyle === Number(feedback.options.StyleID)
			},
			learn: () => {
				return {
					StyleID: deck.state?.mutiView.layoutStyle,
				}
			},
		},
	}
}
