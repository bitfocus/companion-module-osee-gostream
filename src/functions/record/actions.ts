import { Record } from "../../connection/actionids"
import { getOptNumber } from '../../util'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { StreamDeck } from '../../connection/streamdeck'
import { Model } from '../../connection/enums'
import { StreamModelSpec } from '../../models/types'

export function create(deck: StreamDeck, _model: StreamModelSpec): CompanionActionDefinitions {
	let actions: CompanionActionDefinitions = {
		[Record.ActionId.PGMStartRecord]: {
			name: 'Record: start or stop PGM recording',
			options: [
				{
					type: 'dropdown',
					label: 'Record',
					id: 'record',
					choices: [
						{ id: '0', label: 'Stop' },
						{ id: '1', label: 'Start' },
						{ id: '2', label: 'Toggle' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				let record = getOptNumber(action, 'record')
				if (record === 2) {
					record = deck.state?.record.isRecording === 1 ? 0 : 1;
				}
				if (record === 1) {
					if (deck.state?.record.isRecording !== 0) {
						await deck.stopRecord();
					}
					await deck.startRecord(0);
				} else {
					await deck.stopRecord();
				}

			},
		},
		[Record.ActionId.RecordBitrate]: {
			name: 'Record: set recording quality',
			options: [
				{
					type: 'dropdown',
					label: 'Quality',
					id: 'quality',
					choices: [
						{ id: 0, label: 'low' },
						{ id: 1, label: 'mid' },
						{ id: 2, label: 'good' },
						{ id: 3, label: 'hight' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				await deck.setRecordBitrate(getOptNumber(action, 'quality'))
			},
		},
	}
	if (deck.state?.device.deviceModel === Model.Duet_8ISO) {
		actions[Record.ActionId.ISOStartRecord] = {
			name: 'Record: start or stop  ISO recording',
			options: [
				{
					type: 'dropdown',
					label: 'Record',
					id: 'record',
					choices: [
						{ id: '0', label: 'Stop' },
						{ id: '1', label: 'Start' },
						{ id: '2', label: 'Toggle' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				let record = getOptNumber(action, 'record')
				if (record === 2) {
					record = deck.state?.record.isRecording === 2 ? 0 : 2;
				}

				if (record === 2) {
					if (deck.state?.record.isRecording !== 0) {
						await deck.stopRecord();
					}
					await deck.startRecord(1);
				} else {
					await deck.stopRecord();
				}

			},
		}
		actions[Record.ActionId.RecordFormat] = {
			name: 'Record: set encoding format',
			options: [
				{
					type: 'dropdown',
					label: 'Format',
					id: 'format',
					choices: [
						{ id: '0', label: 'H.264' },
						{ id: '1', label: 'H.265' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'format')
				let format = '';
				if (opt === 0) {
					format = 'H.264'
				}
				else {
					format = 'H.265'
				}
				await deck.setRecordFormat(format)
			},
		}

		// actions[Record.ActionId.RecordISOChannel] = {
		// 	name: 'Record: set ISO recording Channel Enable',
		// 	options: [
		// 		{
		// 			type: 'dropdown',
		// 			label: 'Source',
		// 			id: 'source',
		// 			choices: deck.state ? Object.keys(deck.state.record.channels).map(s => ({ id: Number(s), label: String(getEnumKeyByValue(sourceID, s)) })) : [],
		// 			default: sourceID.IN1,
		// 		},
		// 		{
		// 			type: 'dropdown',
		// 			label: 'Enable',
		// 			id: 'enable',
		// 			choices: [
		// 				{ id: '0', label: 'off' },
		// 				{ id: '1', label: 'on' }
		// 			],
		// 			default: 0,
		// 		},
		// 	],
		// 	callback: async (action) => {
		// 		await deck.setRecordISOChannel(getOptNumber(action, 'source'), getOptNumber(action, 'enable'))
		// 	},
		// }
	} else {

	}
	return actions
}
