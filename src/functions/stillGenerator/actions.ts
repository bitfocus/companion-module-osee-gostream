import { ActionId } from './actionId'
import { getOptNumber } from '../../actions'
import { getChoicesByStill } from '../../choices'
import { ReqType } from '../../enums'
import { sendCommand, GoStreamData } from '../../connection'
import type { GoStreamInstance } from '../../index'
import type { CompanionActionDefinitions } from '@companion-module/base'

export function create(_instance: GoStreamInstance): CompanionActionDefinitions {
	return {
		[ActionId.StillSelection]: {
			name: 'Still:Select pic index',
			options: [
				{
					type: 'dropdown',
					label: 'Still',
					id: 'Stillindex',
					choices: [
						{ id: 0, label: 'Still1' },
						{ id: 1, label: 'Still2' },
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Pic index (0-31)',
					id: 'PicIndex',
					choices: getChoicesByStill(),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.StillSelection, ReqType.Set, [
					getOptNumber(action, 'Stillindex'),
					getOptNumber(action, 'PicIndex'),
				])
			},
		},
	}
}
export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.StillSelection: {
			const stype = data.value[0]
			const stypeValue = data.value[1]
			if (stype === 0) {
				instance.states.StillGenerator.Still1 = stypeValue
			} else {
				instance.states.StillGenerator.Still2 = stypeValue
			}
			return true
		}
	}
	return false
}
