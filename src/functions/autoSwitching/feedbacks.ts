import { FeedbackId } from './feedbackId'
import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { getEnumKeyByValue} from './../../util'
import { StreamDeck } from '../../connection/streamdeck'
import { sourceID } from '../../connection/enums'

function createFeedbackName(name: string): string {
	return 'AutoSwitching: ' + name
}
export function create(deck: StreamDeck): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.AutoSwitchEnable]: {
			type: 'boolean',
			name: createFeedbackName('AutoSwitching Enable'),
			description: 'Change style of button depending on AutoSwitching Enable',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return deck.state?.audioSwitching?.enable===true
			},
		},
		[FeedbackId.AutoSwitchASource]: {
			type: 'boolean',
			name: createFeedbackName('A Source'),
			description: 'Change style of button when A Source Changed',
			options: [
				{
					type: 'dropdown',
					label: 'Audio Source',
					id: 'audioSource',
					choices:(deck.state&&deck.state.audioSwitching)?deck.state.audioSwitching.ASources.map((s)=>({id:s,label:String(getEnumKeyByValue(sourceID, s))})):[],
					default: sourceID.IN1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const source=Number(feedback.options.audioSource)
				return deck.state?.audioSwitching?.A.selectSource===source
			},
		},
		[FeedbackId.AutoSwitchBSource]: {
			type: 'boolean',
			name: createFeedbackName('B Source'),
			description: 'Change style of button when B Source Changed',
			options: [
				{
					type: 'dropdown',
					label: 'Audio Source',
					id: 'audioSource',
					choices: (deck.state&&deck.state.audioSwitching)?deck.state.audioSwitching.BSources.map((s)=>({id:s,label:String(getEnumKeyByValue(sourceID, s))})):[],
					default: sourceID.IN1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const source=Number(feedback.options.audioSource)
				return deck.state?.audioSwitching?.B.selectSource===source
			},
		},
		[FeedbackId.AutoSwitchAMapSource]: {
			type: 'boolean',
			name: createFeedbackName('A Map Source'),
			description: 'Change style of button when A Map Source Changed',
			options: [
				{
					type: 'dropdown',
					label: 'Audio Source',
					id: 'audioSource',
					choices: (deck.state&&deck.state.audioSwitching)?deck.state.audioSwitching.AMapSources.map((s)=>({id:s,label:String(getEnumKeyByValue(sourceID, s))})):[],
					default: sourceID.IN1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const source=Number(feedback.options.audioSource)
				return deck.state?.audioSwitching.video.AMapSelectSource===source
			},
		},
		[FeedbackId.AutoSwitchBMapSource]: {
			type: 'boolean',
			name: createFeedbackName('B Map Source'),
			description: 'Change style of button when B Map Source Changed',
			options: [
				{
					type: 'dropdown',
					label: 'Audio Source',
					id: 'audioSource',
					choices: (deck.state&&deck.state.audioSwitching)?deck.state.audioSwitching.BMapSources.map((s)=>({id:s,label:String(getEnumKeyByValue(sourceID, s))})):[],
					default: sourceID.IN1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const source=Number(feedback.options.audioSource)
				return deck.state?.audioSwitching.video.BMapSelectSource===source
			},
		},
		[FeedbackId.AutoSwitchABMapSource]: {
			type: 'boolean',
			name: createFeedbackName('A+B Map Source'),
			description: 'Change style of button when A+B Map Source Changed',
			options: [
				{
					type: 'dropdown',
					label: 'Audio Source',
					id: 'audioSource',
					choices: (deck.state&&deck.state.audioSwitching)?deck.state.audioSwitching.ABMapSources.map((s)=>({id:s,label:String(getEnumKeyByValue(sourceID, s))})):[],
					default: sourceID.IN1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const source=Number(feedback.options.audioSource)
				return deck.state?.audioSwitching.video.ABMapSelectSource===source
			},
		}
	}
}
