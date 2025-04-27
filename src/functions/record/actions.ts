import { ActionId } from './actionId'
import { getOptNumber, getOptString, makeChoices } from '../../util'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { RecordStateT } from './state'
import { GoStreamModel } from '../../models/types'

export function create(_model: GoStreamModel, state: RecordStateT): CompanionActionDefinitions {
	return {
		[ActionId.Record]: {
			name: 'Record:Start or Stop Recording',
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
				let newState = getOptNumber(action, 'Record')
				if (newState === 2) {
					// newState is dyanamic: toggle the current state
					newState = state.isRecording === true ? 0 : 1
				}
				await state.setRecordState(Boolean(newState))
			},
		},
		[ActionId.RecordFileName]: {
			name: 'Record:Set FileName',
			options: [
				{
					type: 'textinput',
					label: 'FileName',
					id: 'RecordFileName',
					required: true,
					default: '',
					useVariables: true,
				},
				{
					type: 'checkbox',
					label: 'Update ONLY IF not recording',
					id: 'SafeMode',
					default: true,
				},
			],
			callback: async (action, context) => {
				if (action.options.SafeMode && state.isRecording) {
					return
				}

				const rawString = getOptString(action, 'RecordFileName')
				const newName = await context.parseVariablesInString(rawString)
				await state.setRecordFilename(newName)
			},
		},
		[ActionId.RecordQuality]: {
			name: 'Record:Set Quality',
			options: [
				{
					type: 'dropdown',
					label: 'Quality',
					id: 'Quality',
					...makeChoices(state.qualityValues()),
				},
			],
			callback: async (action) => {
				await state.setRecordingQuality(getOptString(action, 'Quality'))
			},
		},
	}
}
