import { ActionId } from './actionId'
import { getOptNumber, getOptString } from './../../util'
import { getChoices } from './../../choices'
import { ReqType, ActionType, PortType } from './../../enums'
import { sendCommand, GoStreamData } from './../../connection'
import type { GoStreamInstance } from './../../index'
import type { CompanionActionDefinitions } from '@companion-module/base'
import {
	SettingsAuxSourceChoices,
	SettingsOutFormatChoices,
	SettingsColorChoices,
	SettingsOutSourceParamChoices,
	SettingsMicInputChoices,
	SettingsMvMeterChoices,
	SettingsMvLayoutChoices,
	SettingsInputWindowLayoutChoices,
	AudioMicChoices,
	SettingsUMDSrcChoices,
	SwitchChoices,
} from './../../model'
import { getOutputChoices, getInputChoices, getColorChoices } from './../../models'

export function create(instance: GoStreamInstance): CompanionActionDefinitions {
	return {
		[ActionId.SrcName]: {
			name: 'Settings:Set SrcName',
			options: [
				{
					type: 'dropdown',
					label: 'Src',
					id: 'SrcID',
					choices: SettingsUMDSrcChoices,
					default: 0,
				},
				{
					type: 'textinput',
					label: 'Src Name',
					id: 'SrcName',
					required: true,
					default: '',
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SrcName, ReqType.Set, [
					getOptNumber(action, 'SrcID'),
					getOptString(action, 'SrcName'),
				])
			},
		},
		[ActionId.MvMeter]: {
			name: 'Settings:Set Mv Meter',
			options: [
				{
					type: 'dropdown',
					label: 'Src',
					id: 'SrcID',
					choices: SettingsMvMeterChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Mv Meter Enable',
					id: 'MvMeterEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				const src = getOptNumber(action, 'SrcID')
				let enable = getOptNumber(action, 'MvMeterEnable')
				if (enable === 2) {
					// Toggle
					enable = instance.states.SettingsProp.MvMeter[src] === 1 ? 0 : 1
				}
				await sendCommand(ActionId.MvMeter, ReqType.Set, [src, enable])
			},
		},
		[ActionId.MvLayout]: {
			name: 'Settings:Set Mv Layout',
			options: [
				{
					type: 'dropdown',
					label: 'Layout',
					id: 'MvLayout',
					choices: SettingsMvLayoutChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.MvLayout, ReqType.Set, [getOptNumber(action, 'MvLayout')])
			},
		},
		[ActionId.InputWindowLayout]: {
			name: ' Settings:Set Input Window Mv Layout',
			options: [
				{
					type: 'dropdown',
					label: 'style',
					id: 'StyleId',
					choices: SettingsInputWindowLayoutChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.InputWindowLayout, ReqType.Set, [getOptNumber(action, 'StyleId')])
			},
		},
		[ActionId.Marker]: {
			name: 'Settings:Set Marker',
			options: [
				{
					type: 'dropdown',
					label: 'marker',
					id: 'Marker',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.Marker, ReqType.Set, [getOptNumber(action, 'Marker')])
			},
		},
		[ActionId.MicInput]: {
			name: 'Settings:Mic Input',
			options: [
				{
					type: 'dropdown',
					label: 'mic',
					id: 'micid',
					choices: AudioMicChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Mic Input',
					id: 'MicInput',
					choices: SettingsMicInputChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.MicInput, ReqType.Set, [
					getOptNumber(action, 'micid'),
					getOptNumber(action, 'MicInput'),
				])
			},
		},
		[ActionId.RecordFileName]: {
			name: 'Settings:Record FileName',
			options: [
				{
					type: 'textinput',
					label: 'FileName',
					id: 'RecordFileName',
					required: true,
					default: '',
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.RecordFileName, ReqType.Set, [getOptString(action, 'RecordFileName')])
			},
		},
		[ActionId.SrcSelection]: {
			name: 'Settings:Src Selection',
			options: [
				{
					type: 'dropdown',
					label: 'Src',
					id: 'Srcid',
					choices: getInputChoices(instance.model, PortType.External),
					default: '0',
				},
				{
					type: 'dropdown',
					label: 'Selection',
					id: 'SrcSelection',
					choices: getColorChoices(instance.model),
					default: '0',
				},
			],
			callback: async (action) => {
				console.log(getOptNumber(action, 'Srcid'), getOptNumber(action, 'SrcSelection'))
				await sendCommand(ActionId.SrcSelection, ReqType.Set, [
					getOptNumber(action, 'Srcid'),
					getOptNumber(action, 'SrcSelection'),
				])
			},
		},
		[ActionId.AuxSource]: {
			name: 'Settings:Aux Source',
			options: [
				{
					type: 'dropdown',
					label: 'Aux Source',
					id: 'auxSourceID',
					choices: SettingsAuxSourceChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.AuxSource, ReqType.Set, [getOptNumber(action, 'auxSourceID')])
			},
		},
		[ActionId.OutFormat]: {
			name: 'Settings:OutFormat',
			options: [
				{
					type: 'dropdown',
					label: 'OutFormat',
					id: 'OutFormat',
					choices: SettingsOutFormatChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.OutFormat, ReqType.Set, [getOptNumber(action, 'OutFormat')])
			},
		},
		[ActionId.OutputColorSpace]: {
			name: 'Settings:Output ColorSpace',
			options: [
				{
					type: 'dropdown',
					label: 'Out',
					id: 'OutId',
					choices: [
						{ id: '0', label: 'out1' },
						{ id: '1', label: 'out2' },
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'ColorSpace',
					id: 'OutputColorSpace',
					choices: SettingsColorChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.OutputColorSpace, ReqType.Set, [
					getOptNumber(action, 'OutId'),
					getOptNumber(action, 'OutputColorSpace'),
				])
			},
		},
		[ActionId.OutSource]: {
			name: 'Settings:Out Source',
			options: [
				{
					type: 'dropdown',
					label: 'Out',
					id: 'OutId',
					choices: SettingsOutSourceParamChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'OutSource',
					id: 'OutSource',
					choices: getChoices(ActionType.SettingsoutSource),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.OutSource, ReqType.Set, [
					getOptNumber(action, 'OutId'),
					getOptNumber(action, 'OutSource'),
				])
			},
		},
		[ActionId.Quality]: {
			name: 'Settings:Quality',
			options: [
				{
					type: 'dropdown',
					label: 'Type',
					id: 'TypeID',
					choices: [
						{ id: '0', label: 'recording' },
						{ id: '1', label: 'streaming' },
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Quality',
					id: 'Quality',
					choices: [
						{ id: '0', label: 'high' },
						{ id: '1', label: 'medium' },
						{ id: '2', label: 'low' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.Quality, ReqType.Set, [
					getOptNumber(action, 'TypeID'),
					getOptNumber(action, 'Quality'),
				])
			},
		},
	}
}
export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.AuxSource:
			if (data.value) instance.states.Settings.auxSource = data.value[0]
			return true
		case ActionId.InputWindowLayout:
			if (data.value) instance.states.Settings.settingsInputWindowLayout = data.value[0]
			return true
		case ActionId.MvMeter:
			if (data.value) instance.states.Settings.mvMeter[data.value[0]] = data.value[1]
			return true
		case ActionId.OutSource: {
			const outType = data.value && data.value[0]
			const outTypeValue = data.value && data.value[1]
			const selectSource = getOutputChoices(instance.model).find((s) => s.id === outTypeValue)
			if (selectSource !== undefined) instance.states.Settings.outSource[outType] = selectSource
			return true
		}
		case ActionId.OutputColorSpace:
			if (data.value) instance.states.Settings.outputColorSpace[data.value[0]] = data.value[1]
			return true
		case ActionId.OutFormat:
			instance.states.Settings.outputFormat = data.value && data.value[0]
			return true
		case ActionId.MicInput:
			if (data.value) instance.states.Settings.micInput[data.value[0]] = data.value[1]
			return true
		case ActionId.MvLayout:
			instance.states.Settings.mvLayout = data.value && data.value[0]
			return true
		case ActionId.SrcSelection:
			if (data.value) instance.states.Settings.sourceSelection[data.value[0]] = data.value[1]
			return true
	}
	return false
}
