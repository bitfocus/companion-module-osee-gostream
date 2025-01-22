import { ActionId } from './actionId'
import { getOptNumber } from '../../util'
import { ReqType } from '../../enums'
import { sendCommand } from '../../connection'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { RecordStateT } from './state'
import { GoStreamModel } from '../../models/types'

export function create(_model: GoStreamModel, state: RecordStateT): CompanionActionDefinitions {
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
					paramOpt = state.isRecording === true ? 1 : 0
					await sendCommand(ActionId.Record, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.Record, ReqType.Set, [opt])
				}
			},
		},
	}
}
