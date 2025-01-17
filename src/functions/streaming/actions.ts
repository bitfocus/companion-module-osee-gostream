import { ActionId } from './actionId'
import { getOptNumber, getOptString } from '../../util'
import { StreamingChoices, SwitchChoices } from '../../model'
import { ReqType } from '../../enums'
import { sendCommand } from '../../connection'
import type { GoStreamInstance } from '../../index'
import type { CompanionActionDefinitions, SomeCompanionActionInputField } from '@companion-module/base'
import type { StreamPlatform } from './state'

export enum LiveStatus {
	Off,
	OnAir,
	Abnormal,
}

function getPlatformOptions(platforms: StreamPlatform[]): SomeCompanionActionInputField[] {
	return platforms.map((platform) => {
		return {
			type: 'dropdown',
			label: 'Server',
			id: 'ServerId_' + platform.name,
			choices: platform.servers.map((server) => {
				return { id: server, label: server }
			}),
			default: platform.servers[0],
			isVisible: (options, data) => options.PlatformId === data.PlatformId,
			isVisibleData: { PlatformId: platform.name },
		}
	})
}

export function create(instance: GoStreamInstance): CompanionActionDefinitions {
	return {
		[ActionId.StreamOutput]: {
			name: 'Streaming: Enable stream',
			options: [
				{
					type: 'dropdown',
					label: 'Stream',
					id: 'StreamID',
					choices: StreamingChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'EnableId',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				const opt1 = getOptNumber(action, 'StreamID')
				const opt2 = getOptNumber(action, 'EnableId')
				if (opt2 === 2) {
					const paramOpt = instance.states.Streaming.enabled[opt1] ? 0 : 1
					await sendCommand(ActionId.StreamOutput, ReqType.Set, [opt1, paramOpt])
				} else {
					await sendCommand(ActionId.StreamOutput, ReqType.Set, [opt1, opt2])
				}
			},
		},
		[ActionId.StreamPlatform]: {
			name: 'Streaming: Set platform',
			options: [
				{
					type: 'dropdown',
					label: 'Stream',
					id: 'StreamID',
					choices: StreamingChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Platform',
					id: 'PlatformId',
					choices: instance.states.Streaming.platforms.map((platform) => ({ id: platform.name, label: platform.name })),
					default: instance.states.Streaming.platforms[0]?.name,
				},
				...getPlatformOptions(instance.states.Streaming.platforms),
			],
			callback: async (action) => {
				const opt1 = getOptNumber(action, 'StreamID')
				const opt2 = getOptString(action, 'PlatformId')
				await sendCommand(ActionId.StreamPlatform, ReqType.Set, [opt1, opt2])
				await sendCommand(ActionId.StreamServer, ReqType.Set, [opt1, action.options['ServerId_' + opt2]])
			},
		},
		[ActionId.StreamKey]: {
			name: 'Streaming: Set stream Key',
			options: [
				{
					type: 'dropdown',
					label: 'Stream',
					id: 'StreamID',
					choices: StreamingChoices,
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
				const opt1 = getOptNumber(action, 'StreamID')
				const opt2 = getOptString(action, 'KeyId')
				await sendCommand(ActionId.StreamKey, ReqType.Set, [opt1, opt2])
			},
		},
		[ActionId.Live]: {
			name: 'Live:Set Start or Stop Live',
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
				const opt = getOptNumber(action, 'LiveEnable')
				let paramOpt = 0
				if (opt === 2) {
					if (instance.states.Streaming.status === LiveStatus.Off) {
						paramOpt = 1
					} else {
						paramOpt = 0
					}
					await sendCommand(ActionId.Live, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.Live, ReqType.Set, [opt])
				}
			},
		},
	}
}
