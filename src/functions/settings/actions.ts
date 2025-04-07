import { ActionId } from './actionId'
import { getOptNumber, getOptString } from './../../util'
import { ReqType, PortType, PortCaps } from './../../enums'
import { sendCommand } from './../../connection'
import { SettingsStateT } from './state'
import { GoStreamModel } from '../../models/types'
import type { CompanionActionDefinitions } from '@companion-module/base'
import {
	SettingsAuxSourceChoices,
	SettingsOutFormatChoices,
	SettingsColorChoices,
	SettingsMic1InputChoices,
	SettingsMic2InputChoices,
	SettingsMvMeterChoices,
	SettingsMvLayoutChoices,
	SettingsInputWindowLayoutChoices,
	AudioMicChoices,
	SettingsUMDSrcChoices,
	SwitchChoices,
} from './../../model'
import { getInputs } from './../../models'
import { EventEmitter } from 'events';

export class SettingsActions extends EventEmitter{
	create(model: GoStreamModel, state: SettingsStateT): CompanionActionDefinitions {
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
						enable = state.mvMeter[src] === 1 ? 0 : 1
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
				name: ' Settings: Set Input Window Mv Layout',
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
				name: 'Settings: Set Marker',
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
				name: 'Settings: Mic Input',
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
						label: 'Input type',
						id: 'MicInput1',
						choices: SettingsMic1InputChoices,
						default: 0,
						isVisible: (options) => options.micid === 0,
					},
					{
						type: 'dropdown',
						label: 'Input type',
						id: 'MicInput2',
						choices: SettingsMic2InputChoices,
						default: 0,
						isVisible: (options) => options.micid === 1,
					},
				],
				callback: async (action) => {
					let type = getOptNumber(action, 'MicInput1')
					if (action.options.micid === 1) type = getOptNumber(action, 'MicInput2')

					await sendCommand(ActionId.MicInput, ReqType.Set, [getOptNumber(action, 'micid'), type])
				},
			},
			[ActionId.SrcSelection]: {
				name: 'Settings: Src Selection',
				options: [
					{
						type: 'dropdown',
						label: 'Src',
						id: 'Srcid',
						choices: getInputs(model, PortType.External).map((item, index) => ({
							id: index,
							label: item.longName,
						})),
						default: '0',
					},
					{
						type: 'dropdown',
						label: 'Selection',
						id: 'SrcSelection',
						choices: state.sourceSelectionList.map((item, index) => ({
							id: index,
							label: item,
						})),
						default: '0',
					},
				],
				callback: async (action) => {
					await sendCommand(ActionId.SrcSelection, ReqType.Set, [
						getOptNumber(action, 'Srcid'),
						getOptNumber(action, 'SrcSelection'),
					])
				},
			},
			[ActionId.AuxSource]: {
				name: 'Settings: Aux Source',
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
				name: 'Settings: Out Format',
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
					state.outputFormat = -1 // mark it as invalid while GSD reboots.
					this.emit("stateUpdated")
					await sendCommand(ActionId.OutFormat, ReqType.Set, [getOptNumber(action, 'OutFormat')])
					setTimeout(() => {
						// this will make Companion realize that the connection was broken.
						// a shorter delay may work as well...
						void sendCommand(ActionId.OutFormat, ReqType.Get)
					}, 2000)
				},
			},
			[ActionId.OutputColorSpace]: {
				name: 'Settings: Output ColorSpace',
				options: [
					{
						type: 'dropdown',
						label: 'Out',
						id: 'OutId',
						choices: model.outputs
							.filter((out) => out.caps & PortCaps.Colorspace)
							.map((item, index) => {
								return { id: index, label: item.longName }
							}),
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
						choices: model.outputPorts.map((item) => ({ id: item.id, label: item.name })),
						default: 0,
					},
					{
						type: 'dropdown',
						label: 'OutSource',
						id: 'OutSource',
						choices: model.OutputSources().map((item) => ({ id: item.id, label: item.name })),
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
			[ActionId.NDIConnect]: {
				name: 'Settings: Select NDI source',
				options: [
					{
						type: 'dropdown',
						label: 'Source name',
						id: 'sourceId',
						choices:
							state.ndiSources.length == 0
								? [{ id: -1, label: 'No sources found' }]
								: state.ndiSources.map((source, index) => ({ id: index, label: source.name })),
						default: 0,
					},
				],
				callback: async (action) => {
					const id = getOptNumber(action, 'sourceId')
					if (id === -1) return
					await sendCommand(ActionId.NDIConnect, ReqType.Set, [state.ndiSources[id].name, state.ndiSources[id].address])
				},
			},
		}
	}
}
