import { ActionId } from './ActionId'
import { getOptNumber } from './index'
import { getChoices } from '../choices'
import { ReqType, SourceType, ActionType } from '../enums'
import { sendCommand } from '../connection'
import type { GoStreamInstance } from '../index'
import type { CompanionActionDefinitions } from '@companion-module/base'
import type { IModelSpec } from '../models/types'

export function createProgramPreviewActions(_self: GoStreamInstance, model: IModelSpec): CompanionActionDefinitions {
	if (model) {
		console.log('MODEL', model)
	}
	return {
		[ActionId.PgmIndex]: {
			name: 'Set PGM Source',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'Source',
					default: SourceType.Input1,
					choices: getChoices(ActionType.Program),
				},
			],
			callback: async (action) => {
				const id = getOptNumber(action, 'Source')
				await sendCommand(ActionId.PgmIndex, ReqType.Set, [id])
			},
		},
		[ActionId.PvwIndex]: {
			name: 'Set PVW Source',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'Source',
					default: SourceType.Input1,
					choices: getChoices(ActionType.Preview),
				},
			],
			callback: async (action) => {
				const id = getOptNumber(action, 'Source')
				await sendCommand(ActionId.PvwIndex, ReqType.Set, [id])
			},
		},
	}
}
