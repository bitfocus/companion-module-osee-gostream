import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { ActionType, feedbackId } from './enums'
import { getChoices, SourcesToChoices, getChoicesByMacro } from './choices'
import type { GoStreamInstance } from './index'
import { SuperSourceFeedbacks } from './functions/superSource'
import { MixEffectFeedbacks } from './functions/mixEffect'
import { StreamingFeedbacks } from './functions/streaming'
import { LiveFeedbacks } from './functions/live'
import { RecordFeedbacks } from './functions/record'
import { StillGeneratorFeedbacks } from './functions/stillGenerator'
import {
	UpStreamKeyTypeChoices,
	SettingsInputWindowLayoutChoices,
	SettingsOutSourceParamChoices,
	SettingsOutFormatChoices,
	SourceModels,
	SettingsAuxSourceChoices,
	SettingsColorChoices,
	SettingsMvLayoutChoices,
	AudioMicChoices,
	SettingsMicInputChoices,
	SwitchChoices,
} from './model'

export const MacroFeedbackType = {
	IsRunning: 'isRunning',
	IsWaiting: 'isWaiting',
	IsRecording: 'isRecording',
	IsUsed: 'isUsed',
}

export function feedbacks(instance: GoStreamInstance): CompanionFeedbackDefinitions {
	return {
		[feedbackId.DskOnAir]: {
			type: 'boolean',
			name: 'Next Transition:DSK OnAir',
			description: 'Set the special effect Transition DSK OnAir',
			options: [
				{
					type: 'dropdown',
					label: 'DSK OnAir',
					id: 'DSKOnAir',
					choices: SwitchChoices,
					default: 1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				if (instance.states.TKeyeState.DSKOnAir && feedback.options.DSKOnAir === 1) {
					return true
				} else {
					return false
				}
			},
		},
		[feedbackId.TransitionSource]: {
			type: 'boolean',
			name: 'USK: Tied',
			description: 'Indicate if USK is tied to next transition',
			options: [
				{
					type: 'dropdown',
					label: 'Key Tied',
					id: 'KeyTied',
					choices: [
						{ id: 0, label: 'on' },
						{ id: 1, label: 'off' },
					],
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				if (instance.states.upStreamKeyState.Tied === (feedback.options.KeyTied === 0 ? true : false)) {
					return true
				} else {
					return false
				}
			},
		},
		[feedbackId.KeyOnAir]: {
			type: 'boolean',
			name: 'Next Transition:Key OnAir Switch',
			description: 'Set the special effect Transition key switch',
			options: [
				{
					type: 'dropdown',
					label: 'Key OnAir',
					id: 'KeyOnAir',
					choices: SwitchChoices,
					default: 1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				if (instance.states.TKeyeState.KeyOnAir && feedback.options.KeyOnAir === 1) {
					return true
				} else {
					return false
				}
			},
		},
		[feedbackId.KeyOnPvw]: {
			type: 'boolean',
			name: 'USK: Key on preview',
			description: 'Indicates if USK on on air on the preview bus',
			options: [
				{
					type: 'dropdown',
					label: 'Key OnAir',
					id: 'KeyOnAir',
					choices: SwitchChoices,
					default: 1,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			callback: (feedback) => {
				if (instance.states.upStreamKeyState.PvwOnAir && feedback.options.KeyOnAir === 1) {
					return true
				} else {
					return false
				}
			},
		},
		[feedbackId.KeySourceFill]: {
			type: 'boolean',
			name: 'UpStreamKey:UpStream Key Source Fill',
			description: 'Set the special effect UpStream Key Source Fill',
			options: [
				{
					type: 'dropdown',
					label: 'Key Type:',
					id: 'USKKeyType',
					choices: UpStreamKeyTypeChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source Fill:',
					id: 'USKSourceFill',
					choices: getChoices(ActionType.KeyPatternSourceKey),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeId = Number(feedback.options.USKKeyType)
				return instance.states.upStreamKeyState.ArrayKeySourceFill[typeId] === Number(feedback.options.USKSourceFill)
			},
		},
		[feedbackId.DskSourceFill]: {
			type: 'boolean',
			name: 'DSK:DSK source fill or key fill',
			description: 'Set the special effect DSK source fill or key fill',
			options: [
				{
					type: 'dropdown',
					label: 'Type:',
					id: 'TypeID',
					choices: [
						{ id: 0, label: 'Key Fill' },
						{ id: 1, label: 'Source Fill' },
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Fill:',
					id: 'DSKFill',
					choices: getChoices(ActionType.KeyPatternSourceKey),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeId = Number(feedback.options.TypeID)
				const dsk_source = Number(feedback.options.DSKFill)
				if (typeId === 0) {
					return instance.states.DSKState.DSKSourceKeyFill.id === dsk_source
				} else {
					return instance.states.DSKState.DSKSourceFill.id === dsk_source
				}
			},
		},
		[feedbackId.InputWindowLayout]: {
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
				return instance.states.SettingsProp.SettingsInputWindowLayout === feedback.options.StyleID
			},
			learn: () => {
				return {
					StyleID: instance.states.SettingsProp.SettingsInputWindowLayout,
				}
			},
		},
		[feedbackId.SettingOutSource]: {
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
					choices: getChoices(ActionType.SettingsoutSource),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const outSource = instance.states.SettingsProp.OutSource
				const OutTypeID = feedback.options.OutId
				const SelectSource = feedback.options.OutSource
				if (OutTypeID === 0) {
					return SelectSource === outSource.hdmi1.id
				} else if (OutTypeID === 1) {
					return SelectSource === outSource.hdmi2.id
				} else {
					return SelectSource === outSource.uvc.id
				}
			},
			learn: (feedback) => {
				const outSource = instance.states.SettingsProp.OutSource
				const OutTypeID = feedback.options.OutId
				if (OutTypeID === 0) {
					return {
						...feedback.options,
						OutSource: outSource.hdmi1.id,
					}
				} else if (OutTypeID === 1) {
					return {
						...feedback.options,
						OutSource: outSource.hdmi2.id,
					}
				} else {
					return {
						...feedback.options,
						OutSource: outSource.uvc.id,
					}
				}
			},
		},
		[feedbackId.OutputColorSpace]: {
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
					instance.states.SettingsProp.OutputColorSpace[Number(feedback.options.OutputId)] ===
					feedback.options.OutputColorSpaceId
				)
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					OutputColorSpaceId: instance.states.SettingsProp.OutputColorSpace[Number(feedback.options.OutputId)],
				}
			},
		},
		[feedbackId.OutputFormat]: {
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
				return instance.states.SettingsProp.OutputFormat === feedback.options.OutputFormatId
			},
			learn: () => {
				return {
					OutputFormatId: instance.states.SettingsProp.OutputFormat,
				}
			},
		},
		[feedbackId.MvLayout]: {
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
				return instance.states.SettingsProp.MvLayout === feedback.options.MvLayoutId
			},
			learn: () => {
				return {
					MvLayoutId: instance.states.SettingsProp.MvLayoutId,
				}
			},
		},
		[feedbackId.SrcSelection]: {
			type: 'boolean',
			name: 'Setting: Src selection',
			description: 'If the source selection format is matching, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Src',
					id: 'srcId',
					choices: SourcesToChoices(SourceModels),
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
					instance.states.SettingsProp.SourceSelection[Number(feedback.options.srcId)] ===
					feedback.options.srcSelectionId
				)
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					srcSelectionId: instance.states.SettingsProp.SourceSelection,
				}
			},
		},
		[feedbackId.MicInput]: {
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
				return instance.states.SettingsProp.MicInput[Number(feedback.options.micId)] === feedback.options.micInputId
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					micInputId: instance.states.SettingsProp.MicInput[Number(feedback.options.micId)],
				}
			},
		},
		[feedbackId.Macro]: {
			type: 'boolean',
			name: 'Macro: State',
			description: 'If the specified macro is running, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Macro Number (1-100)',
					id: 'MacroIndex',
					default: 1,
					choices: getChoicesByMacro(),
				},
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: MacroFeedbackType.IsWaiting,
					choices: [
						{ id: MacroFeedbackType.IsRunning, label: 'Is Running' },
						{ id: MacroFeedbackType.IsWaiting, label: 'Is Waiting' },
						{ id: MacroFeedbackType.IsRecording, label: 'Is Recording' },
						{ id: MacroFeedbackType.IsUsed, label: 'Is Used' },
					],
				},
			],
			defaultStyle: {
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(238, 238, 0),
			},
			callback: (feedback) => {
				// const macroIndex = Number(feedback.options.MacroIndex)
				// if (!isNaN(macroIndex)) {
				// 	macroIndex -= 1
				// }
				// return false
				const macroIndex = Number(feedback.options.MacroIndex)
				if (!isNaN(macroIndex)) {
					const type = feedback.options.state
					//console.log(instance.states.MacroProp.macroProperties);
					const macro = instance.states.MacroProp.macroProperties.find((item) => item?.MacroIndex === macroIndex)
					//console.log(macro);
					switch (type) {
						case MacroFeedbackType.IsUsed: {
							return !!macro?.isUsed
						}
						case MacroFeedbackType.IsRecording:
							return !!macro?.isRecording
						case MacroFeedbackType.IsRunning:
							return !!macro?.isRunning
						case MacroFeedbackType.IsWaiting:
							return !!macro?.isWaiting
					}
				}
				return false
			},
		},
		[feedbackId.AuxBG]: {
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
				return instance.states.SettingsProp.AuxSource === Number(feedback.options.auxSourceID)
			},
			learn: (feedback) => {
				const auxSource = instance.states.SettingsProp.AuxSource
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
		//upStreamKeyType
		[feedbackId.UpStreamKeyType]: {
			type: 'boolean',
			name: 'UpStream Key: Set UpStream Key Type',
			description: 'If you Select UpStream Key, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Type',
					id: 'USKType',
					choices: UpStreamKeyTypeChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeid = Number(feedback.options.USKType)
				return instance.states.upStreamKeyState.UpStreamKeyType === typeid
			},
		},
		//AUdio Mixer
		
		//Playback
		[feedbackId.PlaybackMode]: {
			type: 'boolean',
			name: 'Playback: Set Playback Mode',
			description: 'If you turn on Playback Mode, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'ModeID',
					choices: [
						{ id: 0, label: 'play in one group' },
						{ id: 1, label: 'play cross groups' },
					],
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				return feedback.options.ModeID === instance.states.PlaybackState.Mode
			},
		},
		[feedbackId.PlaybackRepeat]: {
			type: 'boolean',
			name: 'Playback: Set Playback Repeat',
			description: 'If you turn on Playback Repeat, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return instance.states.PlaybackState.Repeat
			},
		},
		[feedbackId.PlaybackPause]: {
			type: 'boolean',
			name: 'Playback: Set Playback Pause',
			description: 'If you turn on Playback Pause, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return instance.states.PlaybackState.Pause
			},
		},
		[feedbackId.PlaybackBar]: {
			type: 'boolean',
			name: 'Playback: Set Playback Bar',
			description: 'If you turn on Playback Bar, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return instance.states.PlaybackState.Bar
			},
		},
		/*[feedbackId.PlayFile]: {
			type: 'boolean',
			name: 'PlayFile: feedback based on current loaded video file',
			description: 'Change style of bank if video file is loaded',
			options: [
				{
					type: 'dropdown',
					label: 'Video file',
					id: 'PlayFileID',
					choices: instance.states.PlaybackState.FileList.map((s, index) => ({
						id: index,
						label: s,
					})),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				return feedback.options.PlayFileID === instance.states.PlaybackState.PlayFile
			},
		},*/
		...RecordFeedbacks.create(instance),
		...LiveFeedbacks.create(instance),
		...SuperSourceFeedbacks.create(instance),
		...MixEffectFeedbacks.create(instance),
		...StreamingFeedbacks.create(instance),
		...StillGeneratorFeedbacks.create(instance),
	}
}
