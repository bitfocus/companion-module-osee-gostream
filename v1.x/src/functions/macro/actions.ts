import { ActionId } from './actionId'
import { ReqType } from './../../enums'
import { sendCommand } from './../../connection'
import { GoStreamModel } from '../../models/types'
import { getOptNumber, getOptString } from './../../util'
import { type CompanionActionDefinitions, Regex } from '@companion-module/base'
import { MacroStateT } from './state'

export function create(model: GoStreamModel, _state: MacroStateT): CompanionActionDefinitions {
	return {
		[ActionId.MacroRecord]: {
			name: 'Macro:Set Start Record',
			options: [
				{
					type: 'dropdown',
					label: 'Status',
					id: 'StatusId',
					choices: [
						{ id: 0, label: 'start' },
						{ id: 1, label: 'stop' },
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Macro',
					id: 'MacroIndex',
					choices: model.getChoicesByMacro(),
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
				await sendCommand(ActionId.MacroRecord, ReqType.Set, [
					getOptNumber(action, 'StatusId'),
					getOptNumber(action, 'MacroIndex'),
					getOptString(action, 'MacroName'),
					getOptString(action, 'MacroRemark'),
				])
			},
		},
		[ActionId.MacroInfo]: {
			name: 'Macro:Change Detail',
			options: [
				{
					type: 'dropdown',
					label: 'Macro',
					id: 'MacroIndex',
					choices: model.getChoicesByMacro(),
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
				await sendCommand(ActionId.MacroInfo, ReqType.Set, [
					getOptNumber(action, 'MacroIndex'),
					getOptString(action, 'MacroName'),
					getOptString(action, 'MacroRemark'),
				])
			},
		},
		[ActionId.RemoveMacro]: {
			name: 'Macro:Delete Macro',
			options: [
				{
					type: 'dropdown',
					label: 'Macro',
					id: 'MacroIndex',
					choices: model.getChoicesByMacro(),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.RemoveMacro, ReqType.Set, [getOptNumber(action, 'MacroIndex')])
			},
		},
		[ActionId.MacroRun]: {
			name: 'Macro:Start Run',
			options: [
				{
					type: 'dropdown',
					label: 'Status',
					id: 'StatusID',
					choices: [
						{ id: 1, label: 'start' },
						{ id: 0, label: 'stop' },
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Location',
					id: 'MacroIndex',
					choices: model.getChoicesByMacro(),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.MacroRun, ReqType.Set, [
					getOptNumber(action, 'StatusID'),
					getOptNumber(action, 'MacroIndex'),
				])
			},
		},
		[ActionId.MacroSleep]: {
			name: 'Macro:Macro Sleep',
			options: [
				{
					type: 'textinput',
					label: 'Sleep',
					id: 'MacroSleep',
					default: '500',
					regex: Regex.NUMBER,
					required: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.MacroSleep, ReqType.Set, [getOptNumber(action, 'MacroSleep')])
			},
		},
	}
}
