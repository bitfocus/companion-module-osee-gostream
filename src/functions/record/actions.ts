import { ActionId } from './actionId'
import { getOptNumber } from '../../actions/index'
import { ReqType } from '../../enums'
import { sendCommand } from '../../connection'
import type { GoStreamInstance } from '../../index'
import type { CompanionActionDefinitions } from '@companion-module/base'

export function create(instance: GoStreamInstance): CompanionActionDefinitions {
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
					if (instance.states.RecordState === true) {
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
