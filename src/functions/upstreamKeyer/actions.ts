import { ActionId } from './actionId'
import { getOptNumber, getOptString, makeChoices, sequenceOrderDropdown, nextInSequence } from './../../util'
import { ReqType, ActionType } from './../../enums'
import { sendCommand } from './../../connection'
import { createLumaKeyActions } from './keyTypes/lumaKey'
import { createChromaKeyActions } from './keyTypes/chromaKey'
import { createKeyPatternActions } from './keyTypes/keyPattern'
import { createPIPActions } from './keyTypes/pip'
import type { CompanionActionDefinitions, SomeCompanionActionInputField } from '@companion-module/base'
import { UpstreamKeyerStateT, USKKeySourceType } from './state'
import { GoStreamModel } from '../../models/types'

// for selecting input sequences...
export function setUSKSourceSeqOptions(model: GoStreamModel): SomeCompanionActionInputField[] {
	return [
		{
			id: 'Sources',
			type: 'multidropdown',
			label: 'Sources',
			choices: model.getChoices(ActionType.PipSource),
			// default sequence is all sources:
			default: model.getChoices(ActionType.PipSource).map((val) => val.id),
		},
		sequenceOrderDropdown,
	]
}

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
		[ActionId.UpStreamKeyFillKeySequence]: {
			name: 'UpStream Key:Set a Source Sequence for the current upstream key (USK)',
			description:
				'Choose a set of input sources to cycle through, either sequentially or randomly. Each button press will advance to the next source. "Random sets" will cycle through the whole set before repeating; "Random selection" allows repeats any time.',
			options: setUSKSourceSeqOptions(model),
			callback: async (action) => {
				const srcSequence = action.options.Sources as number[]
				const curSource = state.keyInfo[state.encodeKeyType()].sources[USKKeySourceType.Fill]
				const newSource = nextInSequence(srcSequence, curSource, action)

				await sendCommand(ActionId.UpStreamKeyFillKeyType, ReqType.Set, [state.encodeKeyType(), newSource, newSource])
			},
		},
		[ActionId.UpStreamKeyType]: {
			name: 'UpStream Key:Set Key Type',
			options: [
				{
					type: 'dropdown',
					label: 'Key Type:',
					id: 'USKType',
					...makeChoices(state.keyTypes(), [{ id: 'Toggle', label: 'Toggle' }]),
				},
				{
					type: 'multidropdown',
					label: 'Sequence',
					id: 'KeyTypeSequence',
					...makeChoices(state.keyTypes()),
					default: state.keyTypes(),
					isVisible: (options) => options.USKType === 'Toggle',
				},
			],
			callback: async (action) => {
				let keyType = getOptString(action, 'USKType')
				if (keyType === 'Toggle') {
					// Toggle: cycle through all available choices sequentially:
					const keyTypes = action.options.KeyTypeSequence as string[]
					const curChoice = state.UpStreamKeyType
					keyType = nextInSequence(keyTypes, curChoice) as string // default order is sequential.
				}

				await sendCommand(ActionId.UpStreamKeyType, ReqType.Set, [state.encodeKeyType(keyType)])
			},
		},
		...createLumaKeyActions(model, state),
		...createChromaKeyActions(model, state),
		...createKeyPatternActions(model, state),
		...createPIPActions(model, state),
	}
}
