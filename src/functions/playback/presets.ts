import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { PlayBack } from "../../connection/actionids"
import { FeedbackId } from './feedbackId'
import { GetPlayerSourceChoices } from '../../model'
import { StreamDeck } from '../../connection/streamdeck'

const ptzSize = '18'
export function create(deck: StreamDeck): CompanionPresetDefinitions {
	const presets = {}

	const players = GetPlayerSourceChoices(deck.state)

	for (let index = 0; index < players.length; index++) {
		presets[`PlayMode_${index}`] = {
			type: 'button',
			category: 'Playback',
			name: 'Set Playback mode',
			style: {
				text: `${players[index].label} Mode`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: PlayBack.ActionId.PlaybackMode,
							options: {
								playerID: players[index].id,
								ModeID: players[index].id,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: FeedbackId.PlaybackMode,
					options: {
						ModeID: players[index].id,
						playerID: players[index].id
					},
					style: {
						bgcolor: combineRgb(255, 255, 0),
						color: combineRgb(0, 0, 0),
					},
				},
			],
		}

		presets[`PlayMode_Play_Pause_Toggle_${index}`] = {
		type: 'button',
		category: 'Playback',
		name: 'Play/Pause video',
		style: {
			text: `Play ${players[index].label}`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: PlayBack.ActionId.PlayPause,
						options: {
							enableID: 2,
							playerID:players[index].id,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: FeedbackId.PlaybackPause,
				options: {
					playerID:players[index].id,
				},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
					text: 'Pause',
				},
			},
			{
				feedbackId: FeedbackId.PlaybackPause,
				options: {
					playerID:players[index].id,
				},
				isInverted: true,
				style: {
					bgcolor: combineRgb(0, 0, 0),
					color: combineRgb(255, 255, 255),
					text: 'Play',
				},
			},
		],
	}

	}
	return presets
}
