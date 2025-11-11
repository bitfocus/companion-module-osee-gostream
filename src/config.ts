import { Regex, SomeCompanionConfigField } from '@companion-module/base'
import { ALL_MODEL_CHOICES } from './models/index'
import { Model } from './connection/enums'

export interface DeckConfig {
	bonjourHost?: string
	host?: string
	modelID?: string
	autoModelName?: string
	port?:number
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			label: 'Information',
			id: 'info',
			type: 'static-text',
			value: 'This module controls a GoStream device over IP protocol',
			width: 12,
		},
		{
			id: 'bonjourDevices',
			type: 'bonjour-device',
			label: 'Device',
			width: 6,
		},
		{
			type: 'dropdown',
			id: 'modelId',
			label: 'Model',
			width: 6,
			choices: ALL_MODEL_CHOICES,
			default: Model.Unknown,
			isVisible: (options) => !options['bonjourDevices'],
		},
		{
			label: 'Target IP',
			id: 'host',
			type: 'textinput',
			default: '192.168.1.80',
			width: 6,
			required: true,
			regex: Regex.IP,
			tooltip: 'GoSteamDeck address',
			isVisible: (options) => !options['bonjourDevices'],
		},
	]
}
