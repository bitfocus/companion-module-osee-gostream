import { FeedbackId } from './feedbackId'
import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import {GetPlayerSourceChoices} from '../../model'
import { StreamDeck } from '../../connection/streamdeck';
export function create(deck: StreamDeck): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.PlaybackMode]: {
			type: 'boolean',
			name: 'Playback: Set Playback Mode',
			description: 'If you turn on Playback Mode, change style of the button',
			options: [
				{
					type: 'dropdown',
					label: 'Player',
					id: 'playerID',
					choices: GetPlayerSourceChoices(deck.state),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'ModeID',
					choices:deck.state? deck.state.playBack.modeRanges.map(s => ({ id:s, label: s })):[],
					default:deck.state? deck.state.playBack.modeRanges[0]:'',
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const playerID = Number( feedback.options.playerID);
				return deck.state?.playBack.config[playerID]=== feedback.options.ModeID
			},
		},
		[FeedbackId.PlaybackPause]: {
			type: 'boolean',
			name: 'Playback: Set Playback Pause',
			description: 'If you turn on Playback Pause, change style of the button',
			options: [
				{
					type: 'dropdown',
					label: 'Player',
					id: 'playerID',
					choices: GetPlayerSourceChoices(deck.state),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const playerID = Number(feedback.options.playerID);
				return deck.state?.playBack.config[playerID]?.playStatus === 1
			},
		},
	}
}
