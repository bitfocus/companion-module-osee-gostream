import { ActionId } from './actionId'
import { getOptNumber } from '../../util'
import { ReqType } from '../../enums'
import { sendCommand, GoStreamData } from '../../connection'
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

export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.Record:
			instance.states.Record.State = data.value[0] === 1 ? true : false
			return true
		case ActionId.RecordTime:
			instance.states.Record.RecordTime = data.value[0].toString()
			return true
	}
	return false
}
