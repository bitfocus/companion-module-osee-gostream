import { ActionId } from './ActionId'
import { getOptNumber } from './index'
import { getChoices } from '../choices'
import { AudioMicChoices, AudioInputSourcesChoices, SwitchChoices } from '../model'
import { ReqType, ActionType } from '../enums'
import { sendCommand } from '../connection'
import { type GoStreamDeckInstance } from '../index'
import { type CompanionActionDefinitions } from '@companion-module/base'

export function createAudioMixerActions(_self: GoStreamDeckInstance): CompanionActionDefinitions {
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
					if (_self.states.AudioMixerPorp.AudioTransition === true) {
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
					choices: getChoices(ActionType.AudioFader),
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
					choices: getChoices(ActionType.AudioEnableSource),
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
					choices: getChoices(ActionType.AudioEnableSource),
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
			name: 'Audio Mixer:Set Mic Audio Enable',
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
				const opt1 = getOptNumber(action, 'ASource')
				const opt2 = getOptNumber(action, 'AudioEnable')
				let paramOpt = 0
				if (opt2 === 2) {
					if (opt1 === 0) {
						if (_self.states.AudioMixerPorp.AudioEnable.mic1 === 1) {
							paramOpt = 0
						} else {
							paramOpt = 1
						}
					} else {
						if (_self.states.AudioMixerPorp.AudioEnable.mic2 === 1) {
							paramOpt = 0
						} else {
							paramOpt = 1
						}
					}
					await sendCommand(ActionId.AudioEnable, ReqType.Set, [opt1, paramOpt])
				} else {
					await sendCommand(ActionId.AudioEnable, ReqType.Set, [opt1, opt2])
				}
			},
		},
		[ActionId.AudioEnable1]: {
			name: 'Audio Mixer:Set Input Audio Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: AudioInputSourcesChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'AudioEnable',
					choices: [
						{ id: 0, label: 'off' },
						{ id: 1, label: 'on' },
						{ id: 2, label: 'afv' },
						{ id: 3, label: 'Toggle' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				const opt1 = getOptNumber(action, 'AudioEnable')
				const opt2 = getOptNumber(action, 'ASource')
				let paramOpt = 0
				if (opt1 === 3) {
					if (opt2 === 2) {
						if (_self.states.AudioMixerPorp.AudioEnable.in1 === 0) {
							paramOpt = 1
						} else if (_self.states.AudioMixerPorp.AudioEnable.in1 === 1) {
							paramOpt = 2
						} else {
							paramOpt = 0
						}
					} else if (opt2 == 3) {
						if (_self.states.AudioMixerPorp.AudioEnable.in2 === 0) {
							paramOpt = 1
						} else if (_self.states.AudioMixerPorp.AudioEnable.in2 === 1) {
							paramOpt = 2
						} else {
							paramOpt = 0
						}
					} else if (opt2 == 4) {
						if (_self.states.AudioMixerPorp.AudioEnable.in3 === 0) {
							paramOpt = 1
						} else if (_self.states.AudioMixerPorp.AudioEnable.in3 === 1) {
							paramOpt = 2
						} else {
							paramOpt = 0
						}
					} else if (opt2 == 5) {
						if (_self.states.AudioMixerPorp.AudioEnable.in4 === 0) {
							paramOpt = 1
						} else if (_self.states.AudioMixerPorp.AudioEnable.in4 === 1) {
							paramOpt = 2
						} else {
							paramOpt = 0
						}
					} else if (opt2 == 6) {
						if (_self.states.AudioMixerPorp.AudioEnable.aux === 0) {
							paramOpt = 1
						} else if (_self.states.AudioMixerPorp.AudioEnable.aux === 1) {
							paramOpt = 2
						} else {
							paramOpt = 0
						}
					}
					await sendCommand(ActionId.AudioEnable, ReqType.Set, [opt2, paramOpt])
				} else {
					await sendCommand(ActionId.AudioEnable, ReqType.Set, [opt2, opt1])
				}
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
					choices: getChoices(ActionType.AudioMonitorSource),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.AudioMonitorSource, ReqType.Set, [getOptNumber(action, 'AudioSource')])
			},
		},
	}
}