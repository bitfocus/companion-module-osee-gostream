import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { FeedbackId } from './feedbackId'
import { getEnumKeyByValue } from '../../util'
import { AudioMixAFVChoices, AudioMixSwichEnableChoices } from '../../model'
import { StreamDeck } from '../../connection/streamdeck'
import { sourceID } from '../../connection/enums'

export function create(deck: StreamDeck): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.AudioMixerEffectEnable]: {
			type: 'boolean',
			name: 'Audio Mixer: set audio effects enable',
			description: 'If audio effects is enabled change style of button',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'audioMixSource',
					choices: deck.state?Object.keys(deck.state.audioMixer.commonChannels).map(s=>({id:Number(s),label:String(getEnumKeyByValue(sourceID,Number(s)))})):[],
					default: 0,
				},
				{ 
					type: 'dropdown',
					label: 'Enable',
					id: 'audioMixEnable',
					choices: AudioMixSwichEnableChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const sourceid = Number(feedback.options.audioMixSource)
				const t_enable = feedback.options.audioMixEnable
				return deck.state?.audioMixer.commonChannels[sourceid]?.audioMixerEffectEnable === t_enable
			},
		},
		[FeedbackId.AudioMixerEnable]:{
			type: 'boolean',
			name: 'Audio Mixer: set audio mix enable',
			description: 'If audio mix is enabled change style of button',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'audioMixSource',
					choices: deck.state?Object.keys(deck.state.audioMixer.commonChannels).map(s=>({id:Number(s),label:String(getEnumKeyByValue(sourceID,Number(s)))})):[],
					default: 0,
				},
				{ 
					type: 'dropdown',
					label: 'Enable',
					id: 'audioMixEnable',
					choices: AudioMixAFVChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const sourceid = Number(feedback.options.audioMixSource)
				const t_enable = feedback.options.audioMixEnable
				return deck.state?.audioMixer.commonChannels[sourceid]?.audioMixerEnable === t_enable
			},
		},
	}
}
