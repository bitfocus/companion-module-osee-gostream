import { ActionId } from './actionId'
import { getOptNumber } from '../../actions/index'
import { SwitchChoices } from '../../model'
import { ReqType } from '../../enums'
import { sendCommand } from '../../connection'
import type { GoStreamInstance } from '../../index'
import type { CompanionActionDefinitions } from '@companion-module/base'

export function create(instance: GoStreamInstance): CompanionActionDefinitions {
	return {
		[ActionId.PlayModeRepeatPause]: {
			name: 'Playback:Set playback Info',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'ModeID',
					choices: [
						{ id: 0, label: 'play in one group' },
						{ id: 1, label: 'play cross groups' },
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'repeat',
					id: 'repeatId',
					choices: [
						{ id: 0, label: 'Off' },
						{ id: 1, label: 'On' },
					],
					default: 2,
				},
				{
					type: 'dropdown',
					label: 'pause',
					id: 'pauseId',
					choices: [
						{ id: 0, label: 'stop' },
						{ id: 1, label: 'start' },
						{ id: 2, label: 'Toggle' },
					],
					default: 2,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'pauseId')
				let paramOpt = 0
				if (opt === 2) {
					if (instance.states.PlayBackState.PlaybackPause === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.PlayModeRepeatPause, ReqType.Set, [
						getOptNumber(action, 'ModeID'),
						getOptNumber(action, 'repeatId'),
						paramOpt,
					])
				} else {
					await sendCommand(ActionId.PlayModeRepeatPause, ReqType.Set, [
						getOptNumber(action, 'ModeID'),
						getOptNumber(action, 'repeatId'),
						opt,
					])
				}
			},
		},
		[ActionId.PlaybackMode]: {
			name: 'Playback:Set playback Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'ModeID',
					choices: [
						{ id: 0, label: 'play in one group' },
						{ id: 1, label: 'play cross groups' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PlaybackMode, ReqType.Set, [getOptNumber(action, 'ModeID')])
			},
		},
		[ActionId.PlayFile]: {
			name: 'Playback:Set selected file',
			options: [
				{
					type: 'dropdown',
					label: 'PlayFile',
					id: 'PlayFileID',
					choices: instance.states.Playback.FileList.map((s, index) => ({
						id: index,
						label: s,
					})),
					default: 0,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'PlayFileID')
				await sendCommand(ActionId.PlayFile, ReqType.Set, [instance.states.Playback.FileList[opt]])
			},
		},
		[ActionId.PlaybackRepeat]: {
			name: 'Playback:Set playback Repeat',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'EnableID',
					choices: SwitchChoices,
					default: 2,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'EnableID')
				let paramOpt = 0
				if (opt === 2) {
					if (instance.states.Playback.Repeat === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.PlaybackRepeat, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.PlaybackRepeat, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.PlaybackPause]: {
			name: 'Playback:Set playback Pause',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'EnableID',
					choices: [
						{ id: 0, label: 'stop' },
						{ id: 1, label: 'start' },
						{ id: 2, label: 'Toggle' },
					],
					default: 2,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'EnableID')
				let paramOpt = 0
				if (opt === 2) {
					if (instance.states.Playback.Pause === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.PlaybackPause, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.PlaybackPause, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.PlaybackBar]: {
			name: 'Playback:Set playback Bar',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'EnableID',
					choices: SwitchChoices,
					default: 2,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'EnableID')
				let paramOpt = 0
				if (opt === 2) {
					if (instance.states.Playback.Bar === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.PlaybackBar, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.PlaybackBar, ReqType.Set, [opt])
				}
			},
		},
	}
}