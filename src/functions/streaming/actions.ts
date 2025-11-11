import { Stream } from "../../connection/actionids"
import { getOptNumber, getOptString } from '../../util'
import { StreamingOptionChoices, StreamingEnableChoices, StreamQualityChoices } from '../../model'
import type { CompanionActionDefinitions, SomeCompanionActionInputField } from '@companion-module/base'
import { StreamDeck } from '../../connection/streamdeck'
import { StreamPlatform } from '../../connection/state/stream'
export enum LiveStatus {
	Off,
	On,
	Abnormal,
}

function getPlatformOptions(platforms: StreamPlatform[]): SomeCompanionActionInputField[] {
	return platforms.map((platform) => {
		return {
			type: 'dropdown',
			label: 'Server',
			id: 'ServerId_' + platform.name,
			choices: platform.servers.map((server) => {
				return { id: server.serName, label: server.serName }
			}),
			default: platform.servers[0].serName,
			isVisible: (options, data) => options.platformId === data.PlatformId,
			isVisibleData: { PlatformId: platform.name },
		}
	})
}

export function create(deck: StreamDeck): CompanionActionDefinitions {
	return {
		[Stream.ActionId.LiveStreamOutputEnable]: {
			name: 'Streaming: set Live Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Stream',
					id: 'streamID',
					choices: StreamingOptionChoices(deck.state),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'enableId',
					choices: StreamingEnableChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				const streamID = getOptNumber(action, 'streamID')
				let opt2 = getOptNumber(action, 'enableId')
				if (opt2 === 2) opt2 = deck.state?.stream.streamInfos[streamID]?.enabled ? 0 : 1
				await deck.setLiveStreamOutputEnable(streamID,opt2);
			},
		},
		[Stream.ActionId.LiveStreamPlatform]: {
			name: 'Streaming: Set platform',
			options: [
				{
					type: 'dropdown',
					label: 'Stream',
					id: 'streamID',
					choices: StreamingOptionChoices(deck.state),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Platform',
					id: 'platformId',
					choices: deck.state?deck.state?.stream.platforms.map((platform) => ({ id: platform.name, label: platform.name })):[],
					default: deck.state?deck.state?.stream.platforms[0].name:''
				},
				...getPlatformOptions(deck.state?deck.state?.stream.platforms:[]),
			],
			callback: async (action) => {
				const opt1 = getOptNumber(action, 'streamID')
				const opt2 = getOptString(action, 'platformId')
				const opt3 = getOptString(action,'ServerId_' + opt2)
                await deck.setLiveStreamOutputServiceName(opt1,opt2);
				let platinfo= deck.state?.stream.platforms.find(s=>s.name===opt2)
				let serInfo= platinfo?.servers.find(s=>s.serName===opt3);
                await deck.setLiveStreamOutputUrl(opt1, serInfo?serInfo?.url:'');
			},
		},
		[Stream.ActionId.LiveStreamOutputKey]: {
			name: 'Streaming: Set stream Key',
			options: [
				{
					type: 'dropdown',
					label: 'Stream',
					id: 'streamID',
					choices: StreamingOptionChoices(deck.state),
					default: 0,
				},
				{
					type: 'textinput',
					label: 'Stream key',
					id: 'KeyId',
					default: '',
					required: true,
				},
			],
			callback: async (action) => {
				const opt1 = getOptNumber(action, 'streamID')
				const opt2 = getOptString(action, 'KeyId')
                await deck.setLiveStreamOutputKey(opt1,opt2);
			},
		},
		[Stream.ActionId.Live]: {
			name: 'Streaming:Set Start or Stop Live',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'LiveEnable',
					choices: [
						{ id: 0, label: 'Stop' },
						{ id: 1, label: 'Start' },
						{ id: 2, label: 'Toggle' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'LiveEnable')
				if (opt === 2) opt=deck.state?.stream.status === LiveStatus.Off ?1:0
                await deck.startOrStopLive(opt);
			},
		},
		[Stream.ActionId.LiveStreamOutputBitrate]: {
			name: 'Streaming: set streaming quality',
			options: [
				{
					type: 'dropdown',
					label: 'Quality',
					id: 'quality',
					choices: StreamQualityChoices,
					default: 0,
				},
			],
			callback: async (action) => {
                await deck.setLiveStreamOutputBitrate(getOptNumber(action, 'quality'))
			},
		},
	}
}
