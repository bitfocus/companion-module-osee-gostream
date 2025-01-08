import { ActionId } from './actionId'
import { getOptNumber } from '../../util'
import { ReqType } from '../../enums'
import { sendCommand, GoStreamData } from '../../connection'
import type { GoStreamInstance } from '../../index'
import type { CompanionActionDefinitions } from '@companion-module/base'

/**
 * Returns all implemented live related actions.
 * @param self reference to the BaseInstance
 * @constructor
 * @returns CompanionActionDefinitions
 */
export function create(instance: GoStreamInstance): CompanionActionDefinitions {
	return {
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
					if (instance.states.LiveState === 0) {
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

export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.Live: {
			instance.states.Live.State = data.value[0]
			return true
		}
	}
	return false
}
