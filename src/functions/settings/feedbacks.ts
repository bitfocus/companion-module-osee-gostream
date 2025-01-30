import { FeedbackId } from './feedbackId'
import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import {
	SettingsInputWindowLayoutChoices,
	SettingsOutSourceParamChoices,
	SettingsOutFormatChoices,
	SettingsAuxSourceChoices,
	SettingsColorChoices,
	SettingsMvLayoutChoices,
	AudioMicChoices,
	SettingsMic1InputChoices,
	SettingsMic2InputChoices,
} from './../../model'
import { PortType, PortCaps } from './../../enums'
import { getOutputChoices, getInputs } from './../../models'
import { SettingsStateT } from './state'
import { GoStreamModel } from '../../models/types'

export function create(model: GoStreamModel, state: SettingsStateT): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.InputWindowLayout]: {
			type: 'boolean',
			name: 'Settings:Input Window Mv Layout',
			description: 'Update style based on input window mv layout style',
			options: [
				{
					type: 'dropdown',
					label: 'Type:',
					id: 'StyleID',
					choices: SettingsInputWindowLayoutChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			callback: (feedback) => {
				return state.inputWindowLayout === feedback.options.StyleID
			},
			learn: () => {
				return {
					StyleID: state.inputWindowLayout,
				}
			},
		},
		[FeedbackId.SettingOutSource]: {
			type: 'boolean',
			name: 'Setting: Set Out Source',
			description: 'If the input specified is selected in the OutSource specified, change style of the bank',
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
					choices: getOutputChoices(model),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const OutTypeID = feedback.options.OutId
				const SelectSource = feedback.options.OutSource
				return OutTypeID === SelectSource
			},
			learn: (feedback) => {
				const OutTypeID = feedback.options.OutId
				if (OutTypeID === 0) {
					return {
						...feedback.options,
						OutSource: 0,
					}
				} else if (OutTypeID === 1) {
					return {
						...feedback.options,
						OutSource: 1,
					}
				} else {
					return {
						...feedback.options,
						OutSource: 2,
					}
				}
			},
		},
		[FeedbackId.OutputColorSpace]: {
			type: 'boolean',
			name: 'Setting: Output color space',
			description: 'If the colorspace of specified output is the selected, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Output',
					id: 'OutputId',
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
					id: 'OutputColorSpaceId',
					choices: SettingsColorChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			callback: (feedback) => {
				return state.outputColorSpace[Number(feedback.options.OutputId)] === feedback.options.OutputColorSpaceId
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					OutputColorSpaceId: state.outputColorSpace[Number(feedback.options.OutputId)],
				}
			},
		},
		[FeedbackId.OutputFormat]: {
			type: 'boolean',
			name: 'Setting: Out format',
			description: 'If the out format is matching, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Format',
					id: 'OutputFormatId',
					choices: SettingsOutFormatChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			callback: (feedback) => {
				return state.outputFormat === feedback.options.OutputFormatId
			},
			learn: () => {
				return {
					OutputFormatId: state.outputFormat,
				}
			},
		},
		[FeedbackId.MvLayout]: {
			type: 'boolean',
			name: 'Setting: Mv layout',
			description: 'If the mv layout is matching, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Layout',
					id: 'MvLayoutId',
					choices: SettingsMvLayoutChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			callback: (feedback) => {
				return state.mvLayout === feedback.options.MvLayoutId
			},
			learn: () => {
				return {
					MvLayoutId: state.mvLayout,
				}
			},
		},
		[FeedbackId.SrcSelection]: {
			type: 'boolean',
			name: 'Setting: Src selection',
			description: 'If the source selection format is matching, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Src',
					id: 'srcId',
					choices: getInputs(model, PortType.External).map((item, index) => ({
						id: index,
						label: item.longName,
					})),
					default: '0',
				},
				{
					type: 'dropdown',
					label: 'Selection',
					id: 'srcSelectionId',
					choices: state.sourceSelectionList.map((item, index) => ({
						id: index,
						label: item,
					})),
					default: '0',
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			callback: (feedback) => {
				return state.sourceSelection[Number(feedback.options.srcId)] === feedback.options.srcSelectionId
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					srcSelectionId: state.sourceSelection,
				}
			},
		},
		[FeedbackId.MicInput]: {
			type: 'boolean',
			name: 'Setting: Mic input',
			description: 'If the mic input for selected mic is matching, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'mic',
					id: 'micId',
					choices: AudioMicChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Input type',
					id: 'MicInput1',
					choices: SettingsMic1InputChoices,
					default: 0,
					isVisible: (options) => options.micId === 0,
				},
				{
					type: 'dropdown',
					label: 'Input type',
					id: 'MicInput2',
					choices: SettingsMic2InputChoices,
					default: 0,
					isVisible: (options) => options.micId === 1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			callback: (feedback) => {
				const micid = Number(feedback.options.micId)
				let type = Number(feedback.options.MicInput1)
				if (micid === 1) type = Number(feedback.options.MicInput2)
				return state.micInput[micid] === type
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					micInputId: state.micInput[Number(feedback.options.micId)],
				}
			},
		},
		[FeedbackId.AuxBG]: {
			type: 'boolean',
			name: 'Aux: Source',
			description: 'If the input specified is selected in the aux bus specified, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Aux Source',
					id: 'auxSourceID',
					choices: SettingsAuxSourceChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				return state.auxSource === Number(feedback.options.auxSourceID)
			},
			learn: (feedback) => {
				const auxSource = state.auxSource
				if (auxSource !== undefined) {
					return {
						...feedback.options,
						auxSourceID: auxSource,
					}
				} else {
					return undefined
				}
			},
		},
		[FeedbackId.NDIConnect]: {
			type: 'boolean',
			name: 'Aux: Connected NDI source',
			description: 'If the input specified is connected to NDI, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'NDI Source',
					id: 'ndiSourceName',
					choices:
						state.ndiSources.length == 0
							? [{ id: -1, label: 'No sources found' }]
							: state.ndiSources.map((source) => ({
									id: source.name,
									label: source.name + ' [' + source.address + ']',
								})),
					default: state.ndiSources.length == 0 ? -1 : state.ndiSources[0].name,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const name = feedback.options.ndiSourceName
				if (name === -1) return false
				const selectedNdiSource = state.ndiSources.find((source) => source.name === name)
				if (!selectedNdiSource) return false
				return (
					state.connectedNdiSource.name === selectedNdiSource.name &&
					state.connectedNdiSource.address === selectedNdiSource.address
				)
			},
			learn: (feedback) => {
				const ndiSource = state.connectedNdiSource
				if (ndiSource !== undefined) {
					return {
						...feedback.options,
						ndiSourceName: ndiSource.name,
					}
				} else {
					return undefined
				}
			},
		},
	}
}
