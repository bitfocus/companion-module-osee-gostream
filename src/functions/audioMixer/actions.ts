
import { getEnumKeyByValue, getOptNumber } from '../../util'
import {
	AudioMixHeadphoneChoices,
	AudioMixSwitchTypeChoices,
	AudioMixSwichEnableChoices,
	AudioMixAFVChoices
} from '../../model'
import type { CompanionActionDefinitions, SomeCompanionActionInputField } from '@companion-module/base'
import { StreamDeck } from '../../connection/streamdeck'
import { Model, sourceID } from '../../connection/enums'
import { MicProp } from '../../connection/state/audiomixer'
import { StreamModelSpec } from '../../models/types'
import { AudioMixer } from "../../connection/actionids"


function getMicTypeRangeOptions(ids: sourceID[], channel: { [id: number]: MicProp | undefined }): SomeCompanionActionInputField[] {
	return ids.map((micID) => {
		var info = channel[micID]?.micTypeRange;
		return {
			type: 'dropdown',
			label: 'MicType',
			id: 'TypeId_' + micID,
			choices: info ? info.map((id,index) => {
				return { id: index, label: id }
			}) : [],
			default:  0,
			isVisible: (options, data) => options.micId === data.micId,
			isVisibleData: { micId: micID },
		}
	})
}

export function create(deck: StreamDeck, _model: StreamModelSpec): CompanionActionDefinitions {
	let actions: CompanionActionDefinitions =
	{
		[AudioMixer.ActionId.AudioMixerEnable]: {
			name: 'Audio Mixer: set audio enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'audioMixerEnable',
					choices: AudioMixAFVChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'audioMixerSourceID',
					choices: deck.state ? Object.keys(deck.state.audioMixer.commonChannels).map(s => ({ id: Number(s), label: String(getEnumKeyByValue(sourceID, Number(s))) })) : [],
					default: sourceID.IN1,
				},
			],
			callback: async (action) => {
				const source_id = getOptNumber(action, 'audioMixerSourceID')
				let paramOpt = getOptNumber(action, 'audioMixerEnable')
				await deck.setAudioMixerEnable(source_id, paramOpt);
			},
		},
		[AudioMixer.ActionId.AudioMixerDelay]: {
			name: 'Audio Mixer: set audio delay',
			options: [
				{
					type: 'dropdown',
					label: 'Mic',
					id: 'micId',
					choices: deck.state ? deck.state.device.micSources.map(s => ({ id: Number(s), label: String(getEnumKeyByValue(sourceID, Number(s))) })) : [],
					default: sourceID.MIC1,
				},
				{
					type: 'number',
					label: 'Delay',
					id: 'delay',
					default: 0,
					min: 0,
					max: 500,
					step: 10,
					range: true,
				},
			],
			callback: async (action) => {
				const source_id = getOptNumber(action, 'micId')
				const opt = getOptNumber(action, 'delay')
				await deck.setAudioMixerDelay(source_id, opt);
			},
		},
		[AudioMixer.ActionId.AudioMixerPanning]: {
			name: 'Audio Mixer: set audio panning',
			options: [
				{
					type: 'number',
					label: 'Panning',
					id: 'audioMixPanning',
					default: 0,
					min: -100,
					max: 100,
					range: false,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'audioMixerSourceID',
					choices: deck.state ? Object.keys(deck.state.audioMixer.commonChannels).map(s => ({ id: Number(s), label: String(getEnumKeyByValue(sourceID, Number(s))) })) : [],
					default: sourceID.IN1,
				},
			],
			callback: async (action) => {
				const source_id = getOptNumber(action, 'audioMixerSourceID')
				const opt = getOptNumber(action, 'audioMixPanning')
				await deck.setAudioMixerPanning(source_id, opt);
			},
		},
		[AudioMixer.ActionId.AudioMixerFader]: {
			name: 'Audio Mixer: set audio fader',
			options: [
				{
					type: 'number',
					label: 'Fader',
					id: 'audioMixerFader',
					default: 0,
					min: -75,
					max: 10,
					step: 0.5,
					range: true,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'audioMixerSourceID',
					choices: deck.state ? Object.keys(deck.state.audioMixer.commonChannels).map(s => ({ id: Number(s), label: String(getEnumKeyByValue(sourceID, Number(s))) })) : [],
					default: sourceID.IN1,
				},
			],
			callback: async (action) => {
				const source_id = getOptNumber(action, 'audioMixerSourceID')
				const opt = getOptNumber(action, 'audioMixerFader')
				await deck.setAudioMixerFader(source_id, opt);
			},
		},
		[AudioMixer.ActionId.AudioMixerHPFEnable]: {
			name: 'Audio Mixer: set Low Cut enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'audioMixerHPF',
					choices: AudioMixSwichEnableChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'audioMixerSourceID',
					choices: deck.state ? Object.keys(deck.state.audioMixer.commonChannels).map(s => ({ id: Number(s), label: String(getEnumKeyByValue(sourceID, Number(s))) })) : [],
					default: sourceID.IN1,
				},
			],
			callback: async (action) => {
				const source_id = getOptNumber(action, 'audioMixerSourceID')
				let paramOpt = getOptNumber(action, 'audioMixerHPF')
				if (paramOpt === 2) {
					paramOpt = deck.state?.audioMixer.commonChannels[source_id]?.lowCutEnable === true ? 0 : 1
				}
				await deck.setAudioMixerHPFEnable(source_id, paramOpt);
			},
		},
		[AudioMixer.ActionId.AudioMixerNoiseGateEnable]: {
			name: 'Audio Mixer: set Noise Gate enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'audioMixerNoiseGate',
					choices: AudioMixSwichEnableChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'audioMixerSourceID',
					choices: deck.state ? Object.keys(deck.state.audioMixer.commonChannels).map(s => ({ id: Number(s), label: String(getEnumKeyByValue(sourceID, Number(s))) })) : [],
					default: sourceID.IN1,
				},
			],
			callback: async (action) => {
				const source_id = getOptNumber(action, 'audioMixerSourceID')
				let paramOpt = getOptNumber(action, 'audioMixerNoiseGate')
				if (paramOpt === 2) {
					paramOpt = deck.state?.audioMixer.commonChannels[source_id]?.noiseGateEnable === true ? 0 : 1
				}
				await deck.setAudioMixerNoiseGateEnable(source_id, paramOpt)
			},
		},
		[AudioMixer.ActionId.AudioMixerCompressorEnable]: {
			name: 'Audio Mixer: set Compressor enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'audioMixerCompressor',
					choices: AudioMixSwichEnableChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'audioMixerSourceID',
					choices: deck.state ? Object.keys(deck.state.audioMixer.commonChannels).map(s => ({ id: Number(s), label: String(getEnumKeyByValue(sourceID, Number(s))) })) : [],
					default: sourceID.IN1,
				},
			],
			callback: async (action) => {
				const source_id = getOptNumber(action, 'audioMixerSourceID')
				let paramOpt = getOptNumber(action, 'audioMixerCompressor')
				if (paramOpt === 2) {
					paramOpt = deck.state?.audioMixer.commonChannels[source_id]?.compressorEnable === true ? 0 : 1
				}
				await deck.setAudioMixerCompressorEnable(source_id, paramOpt)
			},
		},
		[AudioMixer.ActionId.AudioMixerEQEnable]: {
			name: 'Audio Mixer: set Equalizer enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'audioMixerEQEnable',
					choices: AudioMixSwichEnableChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'audioMixerSourceID',
					choices: deck.state ? Object.keys(deck.state.audioMixer.commonChannels).map(s => ({ id: Number(s), label: String(getEnumKeyByValue(sourceID, Number(s))) })) : [],
					default: sourceID.IN1,
				},
			],
			callback: async (action) => {
				const source_id = getOptNumber(action, 'audioMixerSourceID')
				let paramOpt = getOptNumber(action, 'audioMixerEQEnable')
				if (paramOpt === 2) {
					paramOpt = deck.state?.audioMixer.commonChannels[source_id]?.EQEnable === true ? 0 : 1
				}
				await deck.setAudioMixerEQEnable(source_id, paramOpt)
			},
		},
		[AudioMixer.ActionId.AudioMixerHeadphone]: {
			name: 'Audio Mixer: set headphone level & source',
			options: [
				{
					type: 'number',
					label: 'Level',
					id: 'audioMixerLevel',
					default: 0,
					min: -31,
					max: 0,
					step: 1,
					range: true,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'audioMixHeadphoneSource',
					default: sourceID.PGM,
					choices: (deck.state) ? deck.state.audioMixer.HeadphoneSources.map(s => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : [],
				},
				{
					type: 'dropdown',
					label: 'Headphone',
					id: 'audioMixerSourceID',
					choices: AudioMixHeadphoneChoices,
					default: AudioMixHeadphoneChoices[0].id,
				},
			],
			callback: async (action) => {
				const source_id = getOptNumber(action, 'audioMixerSourceID')
				const opt_level = getOptNumber(action, 'audioMixerLevel')
				const opt_source = getOptNumber(action, 'audioMixHeadphoneSource')
				await deck.setAudioMixerHeadphone(source_id, opt_level, opt_source);
			},
		},
		[AudioMixer.ActionId.AudioMixerSwitchType]: {
			name: 'Audio Mixer: set audio fade in and out switch',
			options: [
				{
					type: 'dropdown',
					label: 'SwitchType',
					id: 'audioMixSwitchType',
					default: 0,
					choices: AudioMixSwitchTypeChoices,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'audioMixSwitchType')
				await deck.setAudioMixerSwitchType(opt);
			},
		},
		[AudioMixer.ActionId.AudioMixerMicType]: {
			name: 'Audio Mixer: set Mic Type',
			options: [
				{
					type: 'dropdown',
					label: 'Mic',
					id: 'micId',
					choices: deck.state ? deck.state.device.micSources.map(s => ({ id: Number(s), label: String(getEnumKeyByValue(sourceID, Number(s))) })) : [],
					default: sourceID.MIC1,
				},
				...getMicTypeRangeOptions(deck.state ? deck.state.device.micSources : [], deck.state ? deck.state.audioMixer.micChannels : []),
			],
			callback: async (action) => {
				const mic_id = getOptNumber(action, 'micId')
				let paramOpt = getOptNumber(action, 'TypeId_' + mic_id)
				await deck.setAudioMixerMicType(mic_id, paramOpt);
			},
		}
	}
	if (deck.state?.device.deviceModel===Model.Duet_8ISO) {
		actions[AudioMixer.ActionId.AudioMixerEffectEnable] = {
			name: 'Audio Mixer: set audio effects enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'AudioMixerEffectEnable',
					choices: AudioMixSwichEnableChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'audioMixerSourceID',
					choices: deck.state ? Object.keys(deck.state.audioMixer.commonChannels).map(s => ({
						id: Number(s),
						label: String(getEnumKeyByValue(sourceID, Number(s)))
					})) : [],
					default: sourceID.IN1,
				},
			],
			callback: async (action) => {
				const source_id = getOptNumber(action, 'audioMixerSourceID')
				let paramOpt = getOptNumber(action, 'AudioMixerEffectEnable')
				if (paramOpt === 2)
					paramOpt = deck.state?.audioMixer.commonChannels[source_id]?.audioMixerEffectEnable === true ? 0 : 1
				await deck.setAudioMixerEffectEnable(source_id, paramOpt);
			},
		}
		
		actions[AudioMixer.ActionId.AudioMixerLimiterEnable]= {
			name: 'Audio Mixer: set PGM Limiter enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'audioMixerLimiterEnable',
					choices: AudioMixSwichEnableChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'audioMixerSourceID',
					choices: [{ id: 10010, label: "PGM" }],
					default: 10010,
				},
			],
			callback: async (action) => {
				const source_id = getOptNumber(action, 'audioMixerSourceID')
				let paramOpt = getOptNumber(action, 'audioMixerLimiterEnable')
				if (paramOpt === 2) {
					paramOpt = deck.state?.audioMixer.commonChannels[source_id]?.PGMLimiterEnable === true ? 0 : 1
				}
				await deck.setAudioMixerLimiterEnable(source_id, paramOpt)
			},
		}
	}else{
		actions[AudioMixer.ActionId.AudioMixerInput]= {
			name: 'Audio Mixer: set audio Input',
			options: [
				{
					type: 'dropdown',
					label: 'Mic',
					id: 'micId',
					choices: deck.state ? deck.state.device.micSources.map(s => ({ id: Number(s), label: String(getEnumKeyByValue(sourceID, Number(s))) })) : [],
					default: sourceID.MIC1,
				},
				{
					type: 'number',
					label: 'Input',
					id: 'input',
					default: 0,
					min: -75,
					max: 6,
					step: 0.5,
					range: true,
				},
			],
			callback: async (action) => {
				const source_id = getOptNumber(action, 'micId')
				const opt = getOptNumber(action, 'input')
				await deck.setAudioMixerInput(source_id, opt);
			},
		}
	}
	return actions
}
