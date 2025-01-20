import { FeedbackId } from './feedbackId'
import type { GoStreamInstance } from '../../index'
import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import {
	SettingsInputWindowLayoutChoices,
	SettingsOutSourceParamChoices,
	SettingsOutFormatChoices,
	SettingsAuxSourceChoices,
	SettingsColorChoices,
	SettingsMvLayoutChoices,
	AudioMicChoices,
	SettingsMicInputChoices,
} from './../../model'
import { PortType } from './../../enums'
import { getOutputChoices, getInputChoices } from './../../models'

export function create(instance: GoStreamInstance): CompanionFeedbackDefinitions {
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
				return instance.states.Settings.inputWindowLayout === feedback.options.StyleID
			},
			learn: () => {
				return {
					StyleID: instance.states.Settings.InputWindowLayout,
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
					choices: getOutputChoices(instance.model),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				//const outSource = instance.states.Settings.OutSource
				const OutTypeID = feedback.options.OutId
				const SelectSource = feedback.options.OutSource
				return OutTypeID === SelectSource
			},
			learn: (feedback) => {
				//const outSource = instance.states.Settings.OutSource
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
					choices: [
						{ id: '0', label: 'out1' },
						{ id: '1', label: 'out2' },
					],
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
				return (
					instance.states.Settings.OutputColorSpace[Number(feedback.options.OutputId)] ===
					feedback.options.OutputColorSpaceId
				)
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					OutputColorSpaceId: instance.states.Settings.OutputColorSpace[Number(feedback.options.OutputId)],
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
				return instance.states.Settings.OutputFormat === feedback.options.OutputFormatId
			},
			learn: () => {
				return {
					OutputFormatId: instance.states.Settings.OutputFormat,
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
				return instance.states.Settings.MvLayout === feedback.options.MvLayoutId
			},
			learn: () => {
				return {
					MvLayoutId: instance.states.Settings.MvLayoutId,
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
					choices: getInputChoices(instance.model, PortType.External),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Selection',
					id: 'srcSelectionId',
					choices: SettingsColorChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			callback: (feedback) => {
				return (
					instance.states.Settings.SourceSelection[Number(feedback.options.srcId)] === feedback.options.srcSelectionId
				)
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					srcSelectionId: instance.states.Settings.SourceSelection,
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
					label: 'Mic Input',
					id: 'micInputId',
					choices: SettingsMicInputChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			callback: (feedback) => {
				return instance.states.Settings.MicInput[Number(feedback.options.micId)] === feedback.options.micInputId
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					micInputId: instance.states.Settings.MicInput[Number(feedback.options.micId)],
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
				return instance.states.Settings.AuxSource === Number(feedback.options.auxSourceID)
			},
			learn: (feedback) => {
				const auxSource = instance.states.Settings.AuxSource
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
	}
}
