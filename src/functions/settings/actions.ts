import { ActionId } from './actionId'
import { getOptNumber, getOptString, nextInSequence } from './../../util'
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

export function create(model: GoStreamModel, state: SettingsStateT): CompanionActionDefinitions {
	return {
		[ActionId.SrcName]: {
			name: 'Settings:Set Source name in Multiview windows',
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
			description: 'Enable/Disable audio meter in each Multiview window',
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
			description: 'Swap the position of the multiview program and preview views.',
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
			name: ' Settings: Set Input Window Layout in Multiview',
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
			name: 'Settings: Set Marker in Multiview PVW',
			description:
				'Enable/Disable the safe area marker inside the preview view. The outer marker represents the 16:9 safe area and the inner represents the 4:3 safe area.',
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
			name: 'Settings: Mic Input Type (Line/Mic/Mic+Power)',
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
			name: 'Settings: Input Source Selection',
			description: 'Select input sources (SDI/HDMI Colorspace)',
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
			name: 'Settings: Aux Input Source',
			description: 'Select the input source for Aux (Player/UVC/NDI)',
			options: [
				{
					type: 'dropdown',
					label: 'Aux Source',
					id: 'auxSourceID',
					choices: SettingsAuxSourceChoices.concat([{ id: -1, label: 'Toggle' }]),
					default: 0,
				},
				{
					type: 'multidropdown',
					label: 'Sequence',
					id: 'SourceSequence',
					choices: SettingsAuxSourceChoices,
					default: SettingsAuxSourceChoices.map((item) => item.id),
					isVisible: (options) => options.auxSourceID === -1,
				},
			],
			callback: async (action) => {
				let choice = getOptNumber(action, 'auxSourceID')
				if (choice === -1) {
					// Toggle: cycle through all selected choices sequentially:
					const sources = action.options.SourceSequence as number[]
					const curSource = state.auxSource
					choice = nextInSequence(sources, curSource) as number // use default order: sequential.
				}
				// note: if you switch too quickly, the choice may not 'take'
				await sendCommand(ActionId.AuxSource, ReqType.Set, [choice])
			},
		},
		[ActionId.OutFormat]: {
			name: 'Settings: Output Format',
			description: 'Choose the frame rate.',
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
				state.outputFormat = -1 // mark it as invalid while GSD reboots. (this probably won't have an immediate effect)
				await sendCommand(ActionId.OutFormat, ReqType.Set, [getOptNumber(action, 'OutFormat')])
				setTimeout(() => {
					// this will make Companion realize that the connection was broken.
					// a shorter delay may work as well, but regardless,
					// neither Companion nor Osee's control software detect the error in less than 10s
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
			name: 'Settings:Set Output (HDMI1/HDMI2/UVC) Source',
			options: [
				{
					type: 'dropdown',
					label: 'Out',
					id: 'OutId',
					choices: model.outputPorts,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'OutSource',
					id: 'OutSource',
					choices: model.OutputSources().concat([{ id: -1, label: 'Toggle' }]),
					default: 0,
				},
				{
					type: 'multidropdown',
					label: 'Sequence',
					id: 'SourceSequence',
					choices: model.OutputSources(),
					default: model.OutputSources().map((item) => item.id),
					isVisible: (options) => options.OutSource === -1,
				},
			],
			callback: async (action) => {
				const outputPort = getOptNumber(action, 'OutId')
				let choice = getOptNumber(action, 'OutSource')
				if (choice === -1) {
					// Toggle: cycle through all selected choices sequentially:
					const sources = action.options.SourceSequence as number[]
					const curSource = state.outSource[outputPort]
					choice = nextInSequence(sources, curSource) as number // use default order: sequential.
				}
				await sendCommand(ActionId.OutSource, ReqType.Set, [outputPort, choice])
			},
		},
		[ActionId.NDIConnect]: {
			name: 'Settings: Select NDI input source',
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
		[ActionId.Panel]: {
			name: 'Settings: Set Button Brightness',
			options: [
				{
					type: 'number',
					label: 'Button Brightness',
					id: 'brightness',
					required: true,
					range: true,
					min: 0,
					max: 15,
					step: 1,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.Panel, ReqType.Set, [getOptNumber(action, 'brightness')])
			},
			learn: async (action) => {
				return {
					...action.options,
					brightness: state.buttonBrightness,
				}
			},
		},
	}
}
