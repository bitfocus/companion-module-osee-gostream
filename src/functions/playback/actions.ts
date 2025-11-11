import { PlayBack } from "../../connection/actionids"
import { getOptNumber, getOptString } from '../../util'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { StreamDeck } from '../../connection/streamdeck'
import { GetPlayerSourceChoices, PlayBackEnableChoices } from '../../model'
import { Model } from "../../connection/enums"

export function create(deck: StreamDeck): CompanionActionDefinitions {
	let actions: CompanionActionDefinitions = {
		[PlayBack.ActionId.PlaybackMode]: {
			name: 'Playback:Set playback Mode',
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
					choices: deck.state ? deck.state.playBack.modeRanges.map((s) => ({ id: s, label: s })) : [],
					default: deck.state ? deck.state.playBack.modeRanges[0] : '',
				},
			],
			callback: async (action) => {
				await deck.setPlaybackMode(getOptNumber(action, 'playerID'), getOptString(action, 'ModeID'))
			},
		},
	}
	if (deck.state?.device.deviceModel === Model.Duet_8ISO) {
		actions[PlayBack.ActionId.PlayPause]= {
			name: 'Playback:Set playback Pause',
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
					label: 'Enable',
					id: 'enableID',
					choices: [
						{ id: 0, label: 'stop' },
						{ id: 1, label: 'start' },
						{ id: 2, label: 'Toggle' },
					],
					default: 2,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'enableID')
				let id = getOptNumber(action, 'playerID')
				if (opt === 2) opt = deck.state?.playBack.config[id]?.playStatus === 1 ? 0 : 1;
				await deck.setPlayPause(id, opt);
			},
		}
	}else{
		actions[PlayBack.ActionId.PlayRepeat] = {
			name: 'Playback:set playback repeat single video',
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
					label: 'Enable',
					id: 'enable',
					choices: PlayBackEnableChoices,
					default: 2,
				},
			],
			callback: async (action) => {
				let paramOpt = getOptNumber(action, 'enable')
				let id = getOptNumber(action, 'playerID')
				if (paramOpt === 2) paramOpt =deck.state?.playBack.config[id]?.repeatEnable ? 0 : 1
				await deck.setPlayRepeat(id, paramOpt)
			},
		}
	}
	return actions
}
