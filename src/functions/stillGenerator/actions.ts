import { ActionId } from './actionId'
import { getOptNumber } from '../../util'
import { ReqType } from '../../enums'
import { sendCommand } from '../../connection'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { StillGeneratorStateT } from './state'
import { GoStreamModel } from '../../models/types'
export function create(model: GoStreamModel, _state: StillGeneratorStateT): CompanionActionDefinitions {
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
					choices: model.getChoicesByStill(),
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
