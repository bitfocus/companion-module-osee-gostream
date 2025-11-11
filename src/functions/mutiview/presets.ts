import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { MutiView } from "../../connection/actionids"
import { FeedbackId } from './feedbackId'
import { StreamDeck } from '../../connection/streamdeck'

const ptzSize = '18'
export function create(_deck: StreamDeck): CompanionPresetDefinitions {
	const presets = {}
	presets[`Mutiview_layout`] = {
		category: `Mutiview`,
		name: `set MultiView layout`,
		type: 'button',
		style: {
			text: `MV/Layout`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		feedbacks: [
			{
				feedbackId: FeedbackId.MultiViewLayout,
				options: {
					styleID: 1,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 255, 0),
				},
			},
		],
		steps: [
			{
				down: [
					{
						actionId: MutiView.ActionId.MultiViewLayout,
						options: {},
					},
				],
				up: [],
			},
		],
	}

	return presets
}
