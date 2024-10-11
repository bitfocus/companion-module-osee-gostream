import { ActionId } from './ActionId'
import { getOptNumber } from './index'
import { getChoices } from '../choices'
import { UpStreamKeyTypeChoices } from '../model'
import { ReqType, ActionType } from '../enums'
import { sendCommand } from '../connection'
import { createLumaKeyActions } from './upstreamKeyActions/lumaKey'
import { createChromaKeyActions } from './upstreamKeyActions/chromaKey'
import { createKeyPatternActions } from './upstreamKeyActions/keyPattern'
import { createPIPActions } from './upstreamKeyActions/pip'
import { type GoStreamDeckInstance } from '../index'
import { type CompanionActionDefinitions } from '@companion-module/base'

export function createUSKActions(_self: GoStreamDeckInstance): CompanionActionDefinitions {
	return {
		[ActionId.UpStreamKeyFillKeyType]: {
			name: 'UpStream Key:Set inputs',
			options: [
				{
					type: 'dropdown',
					label: 'Fill Source',
					id: 'FillSource',
					choices: getChoices(ActionType.LumaKeySourceKey),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Key Source',
					id: 'KeySource',
					choices: getChoices(ActionType.LumaKeySourceKey),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.UpStreamKeyFillKeyType, ReqType.Set, [
					0,
					getOptNumber(action, 'FillSource'),
					getOptNumber(action, 'KeySource'),
				])
			},
		},
		[ActionId.UpStreamKeyType]: {
			name: 'UpStream Key:Set Key Type',
			options: [
				{
					type: 'dropdown',
					label: 'Key Type:',
					id: 'USKType',
					choices: UpStreamKeyTypeChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.UpStreamKeyType, ReqType.Set, [getOptNumber(action, 'USKType')])
			},
		},
		...createLumaKeyActions(_self),
		...createChromaKeyActions(_self),
		...createKeyPatternActions(_self),
		...createPIPActions(_self),
	}
}
