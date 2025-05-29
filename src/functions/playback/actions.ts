import { ActionId } from './actionId'
import { getOptNumber, getOptString } from '../../util'
import { SwitchChoices } from '../../model'
import { ReqType } from '../../enums'
import { sendCommand } from '../../connection'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { PlaybackStateT } from './state'
import type { GoStreamModel } from '../../models/types'

// dict of existing buttons that use the PlaybackGroup action
//   tech note: one could, more generally, use CompanionOptionValues as the values here
export const pbGroupButtons = new Map<string, string>()

export function create(_model: GoStreamModel, state: PlaybackStateT): CompanionActionDefinitions {
	return {
		[ActionId.PlayModeRepeatPause]: {
			name: 'Playback:Set playback options (play in group/repeat/play)',
			description: 'This is a "convenionce" action combining three other actions.',
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
						{ id: 0, label: 'pause' },
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
					if (state.Pause === true) {
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
			name: 'Playback:Set playback Group Mode (play within or across groups)',
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
					choices: state.FileList.map((s, index) => ({
						id: index,
						label: s,
					})),
					default: 0,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'PlayFileID')
				await sendCommand(ActionId.PlayFile, ReqType.Set, [state.FileList[opt]])
			},
		},
		[ActionId.PlaybackGroup]: {
			name: 'Playback:Set selected file to the first or last video in a group',
			options: [
				{
					id: 'GroupNameID',
					type: 'dropdown',
					label: 'GroupName',
					choices: Array.from(state.Groups.keys()).map((s, _index) => ({
						id: s,
						label: s,
					})),
					allowCustom: true,
					default: Array.from(state.Groups.keys())[0],
				},
				{
					id: 'positionID',
					type: 'dropdown',
					label: 'Position in Group',
					choices: [
						{ id: 0, label: 'first' },
						{ id: -1, label: 'last' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				const groupName = getOptString(action, 'GroupNameID')
				const opt = getOptNumber(action, 'positionID')
				const group = state.Groups.get(groupName)
				if (group !== undefined && group.length > 0) {
					let filename = group.slice(0, 1)
					if (opt == -1) {
						filename = group.slice(-1)
					}
					await sendCommand(ActionId.PlayFile, ReqType.Set, filename)
				}
			},
			subscribe: async (action) => {
				pbGroupButtons.set(action.controlId, <string>action.options.GroupNameID)
				await sendCommand(ActionId.PlayFile, ReqType.Get) // just something to trigger the feedback
			},
			unsubscribe: async (action) => {
				pbGroupButtons.delete(action.controlId) //probably not necessary?
			},
		},
		[ActionId.PlaybackRepeat]: {
			name: 'Playback:Set playback Repeat Single Video',
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
					if (state.Repeat === true) {
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
			name: 'Playback:Start/Pause',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'EnableID',
					choices: [
						{ id: 0, label: 'pause' },
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
					if (state.Pause === true) {
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
			name: 'Playback:Show Progress Bar',
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
					if (state.Bar === true) {
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
		[ActionId.PlaybackPlayhead]: {
			// note, playbackSkip does not appear to work as a "set" command, but this works
			name: 'Playback:Rewind',
			description: 'Reset playhead to the beginning of the video.',
			options: [],
			callback: async (_action) => {
				//await sendCommand(ActionId.PlaybackPlayhead, ReqType.Set, [0]) // nothing; haven't tested in fw 2.20
				await sendCommand(ActionId.PlayFile, ReqType.Set, [state.FileList[state.File]]) // Works!
			},
		},
		[ActionId.PlaybackNext]: {
			name: 'Playback:Next in Group',
			description:
				'Advance to next video in group (if play within groups is selected; otherwise next in the file list).',
			options: [],
			callback: async (_action) => {
				await sendCommand('playbackNext', ReqType.Set) // -- works to advance if not last in group.
			},
		},
		[ActionId.PlaybackPrev]: {
			name: 'Playback:Previous in Group',
			description:
				'Advance to previous video in group (if play within groups is selected; otherwise previous in the file list).',
			options: [],
			callback: async (_action) => {
				await sendCommand('playbackPrev', ReqType.Set) // -- works to go back if not first in group.
			},
		},
	}
}
