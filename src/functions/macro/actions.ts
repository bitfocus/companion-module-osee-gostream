import { Macro } from "../../connection/actionids"
import { getOptNumber, getOptString } from './../../util'
import { type CompanionActionDefinitions } from '@companion-module/base'
import { StreamDeck } from '../../connection/streamdeck'
import { getChoicesByMacro } from '../../model'

export function create(deck: StreamDeck): CompanionActionDefinitions {
	return {
		[Macro.ActionId.MacroRecordStart]: {
			name: 'macro: set start record',
			options: [
				{
					type: 'dropdown',
					label: 'Macro',
					id: 'MacroIndex',
					choices: getChoicesByMacro(),
					default: 0,
				},
				{
					type: 'textinput',
					label: 'Name',
					id: 'MacroName',
					default: '',
					required: true,
				},
				{
					type: 'textinput',
					label: 'Remark',
					id: 'MacroRemark',
					default: '',
					required: true,
				},
			],
			callback: async (action) => {
				await deck.setMacroRecordStart(
					getOptNumber(action, 'MacroIndex'),
					getOptString(action, 'MacroName'),
					getOptString(action, 'MacroRemark')
				)
			},
		},
		[Macro.ActionId.MacroRecordStop]: {
			name: 'macro: set stop record',
			options: [],
			callback: async () => {
				await deck.setMacroRecordStop();
			},
		},
		[Macro.ActionId.MacroInfo]: {
			name: 'Macro:Change Detail',
			options: [
				{
					type: 'dropdown',
					label: 'Macro',
					id: 'MacroIndex',
					choices: getChoicesByMacro(),
					default: 0,
				},
				{
					type: 'textinput',
					label: 'Name',
					id: 'MacroName',
					default: '',
					required: true,
				},
				{
					type: 'textinput',
					label: 'Remark',
					id: 'MacroRemark',
					default: '',
					required: true,
				},
			],
			callback: async (action) => {
				await deck.setMacroInfo(
					getOptNumber(action, 'MacroIndex'),
					getOptString(action, 'MacroName'),
					getOptString(action, 'MacroRemark')
				)
			},
		},
		[Macro.ActionId.RemoveMacro]: {
			name: 'Macro:Delete Macro',
			options: [
				{
					type: 'dropdown',
					label: 'Macro',
					id: 'MacroIndex',
					choices: getChoicesByMacro(),
					default: 0,
				},
			],
			callback: async (action) => {
				await deck.RemoveMacro(getOptNumber(action, 'MacroIndex'))
			},
		},
		[Macro.ActionId.MacroRunStart]: {
			name: 'Macro:Start Run',
			options: [
				{
					type: 'dropdown',
					label: 'Location',
					id: 'MacroIndex',
					choices: getChoicesByMacro(),
					default: 0,
				},
			],
			callback: async (action) => {
				await deck.setMacroRunStart(getOptNumber(action, 'MacroIndex'))
			},
		},
		[Macro.ActionId.MacroRunStop]: {
			name: 'Macro:Stop Run',
			options: [],
			callback: async () => {
				await deck.setMacroRunStop();
			},
		},
		[Macro.ActionId.MacroAddSleep]: {
			name: 'Macro:Macro Sleep',
			options: [
				{
					type: 'number',
					label: 'Sleep',
					id: 'MacroSleep',
					default: 50,
					min:50,
					max:10000,
					step:50,
					range:true,
					required: true,
				},
			],
			callback: async (action) => {
				await deck.setMacroAddSleep(getOptNumber(action, 'MacroSleep'))
			},
		},
	}
}
