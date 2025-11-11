import { ActionId } from './actionId'
import { getOptNumber, getOptString, makeChoices } from './../../util'
import { ReqType, ActionType } from './../../enums'
import { sendCommand } from './../../connection'
import { createLumaKeyActions } from './keyTypes/lumaKey'
import { createChromaKeyActions } from './keyTypes/chromaKey'
import { createKeyPatternActions } from './keyTypes/keyPattern'
import { createPIPActions } from './keyTypes/pip'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { UpstreamKeyerStateT } from './state'
import { GoStreamModel } from '../../models/types'

export function create(model: GoStreamModel, state: UpstreamKeyerStateT): CompanionActionDefinitions {
	return {
		[ActionId.UpStreamKeyFillKeyType]: {
			name: 'UpStream Key:Set inputs',
			options: [
				{
					type: 'dropdown',
					label: 'Fill Source',
					id: 'FillSource',
					choices: model.getChoices(ActionType.LumaKeySourceKey),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Key Source',
					id: 'KeySource',
					choices: model.getChoices(ActionType.LumaKeySourceKey),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.UpStreamKeyFillKeyType, ReqType.Set, [
					state.encodeKeyType(),
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
					...makeChoices(state.keyTypes()),
				},
			],
			callback: async (action) => {
				const keyType = getOptString(action, 'USKType')
				// --> the following is for backwards compatibility before upgrade scripts are written
				let encoded = Number(keyType)
				if (isNaN(encoded)) {
					encoded = state.encodeKeyType(keyType)
				}
				//<--

				await sendCommand(ActionId.UpStreamKeyType, ReqType.Set, [encoded])
			},
		},
		...createLumaKeyActions(model, state),
		...createChromaKeyActions(model, state),
		...createKeyPatternActions(model, state),
		...createPIPActions(model, state),
	}
}
