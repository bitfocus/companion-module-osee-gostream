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
					id: 'StillIndex',
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
					getOptNumber(action, 'StillIndex'),
					getOptNumber(action, 'PicIndex'),
				])
			},
		},
		[ActionId.StillXPosition]: {
			name: 'Still:Set still X position',
			options: [
				{
					type: 'dropdown',
					label: 'Still',
					id: 'StillIndex',
					choices: [
						{ id: 0, label: 'Still1' },
						{ id: 1, label: 'Still2' },
					],
					default: 0,
				},
				{
					type: 'number',
					label: 'Position',
					id: 'StillXPosition',
					min: -32,
					max: 32,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.StillXPosition, ReqType.Set, [
					getOptNumber(action, 'StillIndex'),
					getOptNumber(action, 'StillXPosition'),
				])
			},
		},
		[ActionId.StillYPosition]: {
			name: 'Still:Set still Y position',
			options: [
				{
					type: 'dropdown',
					label: 'Still',
					id: 'StillIndex',
					choices: [
						{ id: 0, label: 'Still1' },
						{ id: 1, label: 'Still2' },
					],
					default: 0,
				},
				{
					type: 'number',
					label: 'Position',
					id: 'StillYPosition',
					min: -18,
					max: 18,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.StillYPosition, ReqType.Set, [
					getOptNumber(action, 'StillIndex'),
					getOptNumber(action, 'StillYPosition'),
				])
			},
		},
	}
}
