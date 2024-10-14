import { ActionId } from './ActionId'
import { getOptNumber } from './index'
import { ReqType } from '../enums'
import { sendCommand } from '../connection'
import type { GoStreamInstance } from '../index'
import type { CompanionActionDefinitions } from '@companion-module/base'

/**
 * Returns all implemented live related actions.
 * @param self reference to the BaseInstance
 * @constructor
 * @returns CompanionActionDefinitions
 */
export function createLiveActions(_self: GoStreamInstance): CompanionActionDefinitions {
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
					if (_self.states.LiveState === 0) {
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
