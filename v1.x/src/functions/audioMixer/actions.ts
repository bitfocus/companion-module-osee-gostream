import { ActionId } from './actionId'
import { getOptNumber } from '../../util'
import { ReqType, ActionType } from '../../enums'
import { sendCommand } from '../../connection'
import { AudioMixerStateT, AudioState } from './state'
import { GoStreamModel } from '../../models/types'
import { AudioMicChoices, AudioInputSourcesChoices, SwitchChoices } from '../../model'
import type { CompanionActionDefinitions } from '@companion-module/base'

export function create(model: GoStreamModel, state: AudioMixerStateT): CompanionActionDefinitions {
	return {
		[ActionId.AudioTransition]: {
			name: 'Audio Mixer:Set audio fade in and out switch',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'AudioTrans',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'AudioTrans')
				let paramOpt = 0
				if (opt === 2) {
					if (state.transitionEnabled === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.AudioTransition, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.AudioTransition, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.AudioFader]: {
			name: 'Audio Mixer:Set Audio Fader',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: model.getChoices(ActionType.AudioFader),
					default: 0,
				},
				{
					type: 'number',
					label: 'Fader',
					id: 'AudioFader',
					min: -75.0,
					max: 10.0,
					step: 0.5,
					range: true,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.AudioFader, ReqType.Set, [
					getOptNumber(action, 'ASource'),
					getOptNumber(action, 'AudioFader'),
				])
			},
		},
		[ActionId.AudioBalance]: {
			name: 'Audio Mixer:Set Audio Balance',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: model.getChoices(ActionType.AudioEnableSource),
					default: 0,
				},
				{
					type: 'number',
					label: 'Balance',
					id: 'AudioBalance',
					min: -40.0,
					max: 40.0,
					step: 0.5,
					range: true,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.AudioBalance, ReqType.Set, [
					getOptNumber(action, 'ASource'),
					getOptNumber(action, 'AudioBalance'),
				])
			},
		},
		[ActionId.AudioInput]: {
			name: 'Audio Mixer:Set Audio Input',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: model.getChoices(ActionType.AudioEnableSource),
					default: 0,
				},
				{
					type: 'number',
					label: 'Input',
					id: 'AudioInput',
					min: -75.0,
					max: 6.0,
					step: 0.5,
					range: true,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.AudioInput, ReqType.Set, [
					getOptNumber(action, 'ASource'),
					getOptNumber(action, 'AudioInput'),
				])
			},
		},
		[ActionId.AudioEnable]: {
			name: 'Deprecated (Mic) - Use Audio Mixer: Set Audio Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: AudioMicChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'AudioEnable',
					choices: [
						{ id: 0, label: 'off' },
						{ id: 1, label: 'on' },
						{ id: 2, label: 'Toggle' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				// set audio source to audio state
				const asource = getOptNumber(action, 'ASource')
				let astate = getOptNumber(action, 'AudioEnable')
				if (astate === 2) {
					astate = AudioState.Off
					if (state.state[asource] === AudioState.Off) {
						astate = AudioState.On
					}
				}
				await sendCommand(ActionId.AudioEnable, ReqType.Set, [asource, astate])
			},
		},
		[ActionId.AudioEnable1]: {
			name: 'Audio Mixer:Set Audio Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: AudioMicChoices.concat(AudioInputSourcesChoices),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'MicEnable',
					choices: [
						{ id: 0, label: 'off' },
						{ id: 1, label: 'on' },
						{ id: 4, label: 'Toggle on/off' },
					],
					default: 0,
					isVisibleData: AudioMicChoices.map((choice) => choice.id),
					isVisible: (options, micIDs) => micIDs.includes(Number(options.ASource)),
				},
				{
					type: 'dropdown',
					label: 'Enable',
					// id should be VideoEnable, but is kept "AudioEnable" for backward compatibility
					id: 'AudioEnable',
					choices: [
						{ id: 0, label: 'off' },
						{ id: 1, label: 'on' },
						{ id: 2, label: 'afv' },
						{ id: 3, label: 'Toggle All' },
						{ id: 4, label: 'Toggle on/off' },
					],
					default: 0,
					isVisibleData: AudioMicChoices.map((choice) => choice.id),
					isVisible: (options, micIDs) => !micIDs.includes(Number(options.ASource)),
				},
			],
			callback: async (action) => {
				// set audio source to audio state
				const asource = getOptNumber(action, 'ASource')
				const micIds = AudioMicChoices.map((choice) => choice.id)
				let achoice = 0
				if (micIds.includes(asource)) {
					achoice = getOptNumber(action, 'MicEnable')
				} else {
					achoice = getOptNumber(action, 'AudioEnable')
				}
				let astate = achoice
				// choices 3 and 4 are dynamic, so convert into audio state here:
				if (achoice >= 3) {
					// Toggle: switch between on & off (including AFV if id 3 was selected)
					const includeAFV = achoice === 3
					astate = AudioState.Off
					if (state.state[asource] === AudioState.Off) {
						astate = AudioState.On
					} else if (includeAFV && state.state[asource] === AudioState.On) {
						astate = AudioState.AFV
					}
				}
				await sendCommand(ActionId.AudioEnable, ReqType.Set, [asource, astate])
			},
			learn: async (action) => {
				const micIds = AudioMicChoices.map((choice) => choice.id)
				const asource = Number(action.options['ASource'])
				if (asource == undefined || isNaN(asource)) {
					// source needs to be selected for learn to work.
					return undefined
				}
				if (micIds.includes(asource)) {
					action.options.MicEnable = state.state[asource]
				} else {
					action.options.AudioEnable = state.state[asource]
				}

				return action.options
			},
		},
		[ActionId.AudioDelay]: {
			name: 'Audio Mixer:Set Audio Delay',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: AudioMicChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Delay',
					id: 'AudioDelay',
					min: 0,
					max: 170,
					step: 10,
					range: true,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.AudioDelay, ReqType.Set, [
					getOptNumber(action, 'ASource'),
					getOptNumber(action, 'AudioDelay'),
				])
			},
		},
		[ActionId.AudioMonitorLevel]: {
			name: 'Audio Mixer:Set Monitor Level',
			options: [
				{
					type: 'number',
					label: 'Level',
					id: 'AudioLevel',
					min: -31,
					max: 0,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.AudioMonitorLevel, ReqType.Set, [getOptNumber(action, 'AudioLevel')])
			},
		},
		[ActionId.AudioMonitorSource]: {
			name: 'Audio Mixer:Set Monitor Source',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'AudioSource',
					choices: model.getChoices(ActionType.AudioMonitorSource),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.AudioMonitorSource, ReqType.Set, [getOptNumber(action, 'AudioSource')])
			},
		},
	}
}
