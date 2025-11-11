import { AudioSwitch } from "../../connection/actionids"
import { getOptNumber, getEnumKeyByValue } from './../../util'
import type { CompanionActionDefinitions } from '@companion-module/base'
import {
	PeriodChoice,
	AutoSwitchingChoices,
	PriorityChoice
} from '../../model'
import { StreamDeck } from '../../connection/streamdeck'
import { sourceID } from '../../connection/enums'

// function createActionName(name: string): string {
// 	return 'DownstreamKeyer: ' + name
// }
export function create(deck: StreamDeck): CompanionActionDefinitions {
	return {
		[AudioSwitch.ActionId.AutoSwitchingEnable]: {
			name: 'AutoSwitching: set Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'enable',
					choices: AutoSwitchingChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				let paramOpt = getOptNumber(action, 'enable')
				if (paramOpt === 2) paramOpt = deck.state?.audioSwitching?.enable ? 0 : 1
				await deck.setAudioSwitchingEnabled(paramOpt)
			},
		},
		[AudioSwitch.ActionId.AutoSwitchingSetAProperties]: {
			name: 'AutoSwitching: set Audio A properties',
			options: [
				{
					id: 'props',
					type: 'multidropdown',
					label: 'Select properties',
					choices: [
						{ id: 'audioSource', label: 'AudioSource' },
						{ id: 'threshold', label: 'Threshold' },
					],
					minSelection: 1,
					default: ['audioSource', 'threshold'],
				},
				{
					type: 'dropdown',
					label: 'Audio Source',
					id: 'audioSource',
					choices: (deck.state !== undefined && deck.state.audioSwitching !== undefined) ? deck.state?.audioSwitching?.ASources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : [],
					default: sourceID.IN1,
					isVisible: (options) => (<string[]>options.props!).includes('audioSource'),
				},
				{
					type: 'number',
					label: 'Threshold',
					id: 'threshold',
					min: -50,
					max: 0,
					default: 0,
					range:true,
					step:1,
					isVisible: (options) => (<string[]>options.props!).includes('threshold'),
				},
			],
			callback: async (action) => {
				const props = <string[]>action.options.props
				if (props.includes('audioSource')) {
					await deck.setAudioSwitchingAudioSource(0, getOptNumber(action, 'audioSource'))
				}
				if (props.includes('threshold')) {
					await deck.setAudioSwitchingAudioThreshold(0, getOptNumber(action, 'threshold'))
				}
			},
		},
		[AudioSwitch.ActionId.AutoSwitchingSetBProperties]: {
			name: 'AutoSwitching: set Audio B properties',
			options: [
				{
					id: 'props',
					type: 'multidropdown',
					label: 'Select properties',
					choices: [
						{ id: 'audioSource', label: 'AudioSource' },
						{ id: 'threshold', label: 'Threshold' },
					],
					minSelection: 1,
					default: ['audioSource', 'threshold'],
				},
				{
					type: 'dropdown',
					label: 'Audio Source',
					id: 'audioSource',
					choices: (deck.state !== undefined && deck.state.audioSwitching !== undefined) ? deck.state.audioSwitching.BSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : [],
					default: sourceID.IN1,
					isVisible: (options) => (<string[]>options.props!).includes('audioSource'),
				},
				{
					type: 'number',
					label: 'Threshold',
					id: 'threshold',
					min: -50,
					max: 0,
					default: 0,
					range:true,
					step:1,
					isVisible: (options) => (<string[]>options.props!).includes('threshold'),
				},
			],
			callback: async (action) => {
				const props = <string[]>action.options.props
				if (props.includes('audioSource')) {
					await deck.setAudioSwitchingAudioSource(1, getOptNumber(action, 'audioSource'))

				}
				if (props.includes('threshold')) {
					await deck.setAudioSwitchingAudioThreshold(1, getOptNumber(action, 'threshold'))
				}
			},
		},
		[AudioSwitch.ActionId.AutoSwitchingVideoProperties]: {
			name: 'AutoSwitching: set video mapping propertie',
			options: [
				{
					id: 'props',
					type: 'multidropdown',
					label: 'Select properties',
					choices: [
						{ id: 'aMapping', label: 'A Mapping' },
						{ id: 'bMapping', label: 'B Mapping' },
						{ id: 'abMapping', label: 'A+B Mapping' },
						{ id: 'period', label: 'Period' },
						{ id: 'priority', label: 'AB Priority' },
					],
					minSelection: 1,
					default: ['aMapping', 'bMapping', 'abMapping', 'period', 'priority'],
				},
				{
					type: 'dropdown',
					label: 'A Mapping',
					id: 'aMapping',
					choices: (deck.state && deck.state.audioSwitching) ? deck.state.audioSwitching.AMapSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : [],
					default: sourceID.IN1,
					isVisible: (options) => (<string[]>options.props!).includes('aMapping'),
				},
				{
					type: 'dropdown',
					label: 'B Mapping',
					id: 'bMapping',
					choices: (deck.state && deck.state.audioSwitching) ? deck.state.audioSwitching.BMapSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : [],
					default: sourceID.IN1,
					isVisible: (options) => (<string[]>options.props!).includes('bMapping'),
				},
				{
					type: 'dropdown',
					label: 'A+B Mapping',
					id: 'abMapping',
					choices: (deck.state && deck.state.audioSwitching) ? deck.state.audioSwitching.ABMapSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : [],
					default: sourceID.IN1,
					isVisible: (options) => (<string[]>options.props!).includes('abMapping'),
				},
				{
					type: 'dropdown',
					label: 'Period',
					id: 'period',
					choices: PeriodChoice,
					default: sourceID.IN1,
					isVisible: (options) => (<string[]>options.props!).includes('period'),
				},
				{
					type: 'dropdown',
					label: 'AB Priority',
					id: 'priority',
					choices: PriorityChoice,
					default: sourceID.IN1,
					isVisible: (options) => (<string[]>options.props!).includes('priority'),
				},
			],
			callback: async (action) => {
				const props = <string[]>action.options.props
				if (props.includes('aMapping')) {
					await deck.setAudioSwitchingVideoAMapping(getOptNumber(action, 'aMapping'))
				}
				if (props.includes('bMapping')) {
					await deck.setAudioSwitchingVideoBMapping(getOptNumber(action, 'bMapping'))
				}
				if (props.includes('abMapping')) {
					await deck.setAudioSwitchingVideoABMapping(getOptNumber(action, 'abMapping'))
				}
				if (props.includes('period')) {
					let type = ""
					switch (getOptNumber(action, 'period')) {
						case 0:
						default:
							type = "Fast"
							break;
						case 1:
							type = "Normal"
							break;
						case 2:
							type = "Slow"
							break;
					}
					await deck.setAutoSwitchingVideoSwitchingPeriod(type);
				}
				if (props.includes('priority')) {
					let type = ""
					switch (getOptNumber(action, 'priority')) {
						case 0:
						default:
							type = "Low"
							break;
						case 1:
							type = "Balance"
							break;
						case 2:
							type = "High"
							break;
					}
					await deck.setAutoSwitchingVideoABPriority(type);
				}
			},
		},
	}
}
