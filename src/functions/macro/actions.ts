import { ActionId } from './actionId'
import { getChoicesByMacro } from './../../choices'
import { ReqType } from './../../enums'
import { sendCommand, GoStreamData } from './../../connection'
import type { GoStreamInstance } from './../../index'
import { getOptNumber, getOptString } from './../../actions'
import { type CompanionActionDefinitions, Regex } from '@companion-module/base'

export function create(_instance: GoStreamInstance): CompanionActionDefinitions {
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
					choices: getChoicesByMacro(),
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
					choices: getChoicesByMacro(),
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
export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.MacroInfo: {
			const obj = {
				index: Number(data.value[0]),
				name: data.value[1],
				description: data.value[2],
				used: true,
				waiting: false,
				recording: false,
				running: false,
			}
			instance.states.Macro.props.push(obj)
			return true
		}
		case ActionId.MacroRun: {
			const macroIndex = Number(data.value[1])
			const macrostate = data.value[0]
			const macro = instance.states.Macro.props.find((s) => s?.index === macroIndex)
			if (macro !== undefined) {
				macro.running = macrostate === 1 ? true : false
			}
			return true
		}
		case ActionId.MacroRecord: {
			const r_index = Number(data.value[1])
			const r_state = data.value[0]
			const r_macro = instance.states.Macro.props.find((s) => s?.index === r_index)
			if (r_macro !== undefined) {
				r_macro.recording = r_state === 1 ? true : false
			} else {
				instance.states.Macro.props.push({
					name: '',
					description: '',
					recording: r_state,
					used: true,
					running: false,
					waiting: false,
					index: r_index,
				})
			}
			return true
		}
	}
	return false
}
