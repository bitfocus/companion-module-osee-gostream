import { Regex, SomeCompanionConfigField } from '@companion-module/base'
export const portDefault = 19010

export interface Config {
	host: string
	port: number
	reconnect: boolean
	reconnectInterval: number
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			label: 'Information',
			id: 'info',
			type: 'static-text',
			value: 'This module controls GoSteamDeck over IP protocol',
			width: 12,
		},
		{
			label: 'GoSteamDeck target IP',
			id: 'host',
			type: 'textinput',
			default: '192.168.1.80',
			width: 6,
			required: true,
			regex: Regex.IP,
			tooltip: 'GoSteamDeck address',
		},
		{
			label: 'GoSteamDeck target port ',
			id: 'port',
			type: 'number',
			default: exports.portDefault,
			width: 6,
			min: 1,
			max: 0xffff,
			step: 1,
			tooltip: 'Usually 19010 by default',
		},
		{
			label: 'Reconnect',
			id: 'reconnect',
			type: 'checkbox',
			default: true,
			width: 4,
			tooltip: 'Chose if you want Companion to try to reconnect to GoSteamDeck when the connection is lost.',
		},
		{
			label: 'Reconnect interval (seconds)',
			id: 'reconnectInterval',
			type: 'number',
			min: 1,
			max: 60,
			default: 5,
			width: 4,
			isVisible: (config) => config.reconnect === true,
			tooltip: 'The interval in seconds between each reconnect attempt.',
		},
	]
}
