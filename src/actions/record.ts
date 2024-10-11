import { ActionId } from './ActionId'
import { getOptNumber } from './index'
import { ReqType } from '../enums'
import { sendCommand } from '../connection'
import { type GoStreamDeckInstance } from '../index'
import { type CompanionActionDefinitions } from '@companion-module/base'

export function createRecordActions(_self: GoStreamDeckInstance): CompanionActionDefinitions {
	return {
		[ActionId.Record]: {
			name: 'Record:Set Start or Stop Record',
			options: [
				{
					type: 'dropdown',
					label: 'Record',
					id: 'Record',
					choices: [
						{ id: '0', label: 'Stop' },
						{ id: '1', label: 'Start' },
						{ id: '2', label: 'Toggle' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'Record')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.RecordState === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.Record, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.Record, ReqType.Set, [opt])
				}
			},
		},
	}
}