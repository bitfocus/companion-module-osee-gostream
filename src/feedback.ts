import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { ActionType, SourceType, feedbackId, TransitionStyle } from './enums'
import { getChoices, SourcesToChoices, getChoicesByMacro, getChoicesByStill } from './choices'
import type { GoStreamInstance } from './index'
import {
	TransitionStyleChoice,
	StreamingChoices,
	UpStreamKeyTypeChoices,
	SettingsInputWindowLayoutChoices,
	SettingsOutSourceParamChoices,
	SettingsOutFormatChoices,
	SourceModels,
	SettingsAuxSourceChoices,
	SettingsColorChoices,
	SuperSourceStyleChoices,
	SettingsMvLayoutChoices,
	AudioMicChoices,
	SettingsMicInputChoices,
	KeySwitchChoices,
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
		[feedbackId.PreviewBG]: {
			type: 'boolean',
			name: 'preview source',
			description: 'If the input specified is selected in preview, change style of the bank',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'Source',
					default: SourceType.Input1,
					choices: getChoices(ActionType.Preview),
				},
			],
			callback: (feedback) => {
				if (instance.states.selectPrevInput?.id === feedback.options.Source) {
					return true
				} else {
					return false
				}
			},
		},
		[feedbackId.ProgramBG]: {
			type: 'boolean',
			name: 'program source',
			description: 'If the input specified is selected in program, change style of the bank',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'Source',
					default: SourceType.Input1,
					choices: getChoices(ActionType.Program),
				},
			],
			callback: (feedback) => {
				if (instance.states.selectPgmInput?.id === feedback.options.Source) {
					return true
				} else {
					return false
				}
			},
		},
		[feedbackId.InTransition]: {
			type: 'boolean',
			name: 'Transition: Active/Running',
			description: 'If the specified transition is active, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return !!instance.states.transitionPosition.inTransition
			},
		},
		[feedbackId.Cut]: {
			type: 'boolean',
			name: 'Transition: Active/Running',
			description: 'If the specified transition is active, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return false
			},
		},
		[feedbackId.Prev]: {
			type: 'boolean',
			name: 'Transition: Active/Running',
			description: 'If the PREV is active, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return instance.states.selectTransitionStyle.PrevState
			},
		},
		[feedbackId.TransitionStyle]: {
			type: 'boolean',
			name: 'Transition: Style',
			description: 'If the specified transition style is active, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'TransitionStyle',
					id: 'TransitionStyle',
					default: TransitionStyle.MIX,
					choices: TransitionStyleChoice,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				if (instance.states.selectTransitionStyle?.style.id === feedback.options.TransitionStyle) {
					return true
				} else {
					return false
				}
			},
		},
		[feedbackId.TransitionRate]: {
			type: 'boolean',
			name: 'Transition: Rate',
			description: 'If the specified transition rate is active, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Transition Style',
					id: 'TransitionStyle',
					default: TransitionStyle.MIX,
					choices: TransitionStyleChoice,
				},
				{
					type: 'number',
					label: 'Transition Rate',
					id: 'TransitionRate',
					default: 2,
					min: 0.5,
					max: 8.0,
					step: 0.5,
					range: true,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const me = instance.states.selectTransitionStyle
				if (me?.style.id === feedback.options.TransitionStyle) {
					const style = Number(feedback.options.TransitionStyle)
					const rate = Number(feedback.options.TransitionRate)
					switch (style) {
						case 0:
							return me?.mixrate === rate
						case 1:
							return me?.diprate === rate
						case 2:
							return me?.wiperate === rate
						default:
							return false
							break
					}
				}
				return false
			},
			learn: (feedback) => {
				const me = instance.states.selectTransitionStyle
				if (me?.style.id === feedback.options.TransitionStyle) {
					const style = Number(feedback.options.TransitionStyle)
					switch (style) {
						case 0:
							return {
								...feedback.options,
								TransitionRate: me?.mixrate,
							}
						case 1:
							return {
								...feedback.options,
								TransitionRate: me?.diprate,
							}
						case 2:
							return {
								...feedback.options,
								TransitionRate: me?.wiperate,
							}
						default:
							return undefined
					}
				} else {
					return undefined
				}
			},
		},
		[feedbackId.TransitionSelection]: {
			type: 'boolean',
			name: 'Transition: Selection',
			description: 'If the specified transition selection is active, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Match method',
					id: 'MatchState',
					choices: [
						{ id: 0, label: 'Exact' },
						{ id: 1, label: 'Contains' },
					],
					default: 2,
				},
				{
					type: 'checkbox',
					label: 'Background',
					id: 'Background',
					default: false,
				},
				{
					type: 'checkbox',
					label: 'Key',
					id: 'Key',
					default: false,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const seleOptions = feedback.options.MatchState
				const BG = feedback.options.Background
				const Key = feedback.options.Key
				switch (seleOptions) {
					case 0:
						if ((BG && instance.states.TKeyeState.BKGD) || (Key && instance.states.TKeyeState.M_Key)) {
							return true
						} else if (BG && Key) {
							return instance.states.TKeyeState.M_Key && instance.states.TKeyeState.BKGD
						} else {
							return false
						}
					case 1:
						if (BG && Key) {
							return instance.states.TKeyeState.M_Key || instance.states.TKeyeState.BKGD
						} else {
							if (BG) {
								return instance.states.TKeyeState.BKGD
							} else if (Key) {
								return instance.states.TKeyeState.M_Key
							} else {
								return false
							}
						}
					default:
						return false
				}
			},
		},
		[feedbackId.TransitionKeySwitch]: {
			type: 'boolean',
			name: 'Next Transition:Key Switch',
			description: 'Set the special effect Transition key switch',
			options: [
				{
					type: 'dropdown',
					label: 'Switch',
					id: 'KeySwitch',
					choices: KeySwitchChoices,
					default: 2,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const seleOptions = feedback.options.KeySwitch
				if (seleOptions && Array.isArray(seleOptions)) {
					const arratOptions = Array.from(seleOptions)
					if (arratOptions.includes(0) && instance.states.TKeyeState.M_Key) {
						return true
					}
					if (arratOptions.includes(1) && instance.states.TKeyeState.DSK) {
						return true
					}
					if (arratOptions.includes(2) && instance.states.TKeyeState.BKGD) {
						return true
					}
					return false
				} else return false
			},
		},
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
		[feedbackId.Still]: {
			type: 'boolean',
			name: 'Still: Select pic index',
			description: '',
			options: [
				{
					type: 'dropdown',
					label: 'Still',
					id: 'StillIndex',
					choices: [
						{ id: 0, label: 'Still1' },
						{ id: 1, label: 'Still2' },
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Pic index (0-32)',
					id: 'PicIndex',
					default: 0,
					choices: getChoicesByStill(),
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const stillIndex = Number(feedback.options.StillIndex)
				const picIndex = Number(feedback.options.PicIndex)
				if (stillIndex === 0) return instance.states.StillProp.Still1 === picIndex
				else return instance.states.StillProp.Still2 === picIndex
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
		[feedbackId.FadeToBlackRate]: {
			type: 'boolean',
			name: 'Fade to black: Rate',
			description: 'If the specified fade to black rate matches, change style of the bank',
			options: [
				{
					type: 'number',
					label: 'FTB Rate',
					id: 'FtbRate',
					default: 2,
					min: 0.5,
					max: 8.0,
					range: true,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const rate = Number(feedback.options.FtbRate)
				//console.log(rate);
				return instance.states.fadeToBlack?.rate === rate
			},
			learn: (feedback) => {
				if (instance.states.fadeToBlack) {
					return {
						...feedback.options,
						FtbRate: instance.states.fadeToBlack?.rate,
					}
				} else {
					return undefined
				}
			},
		},
		[feedbackId.FadeToBlackIsBlack]: {
			type: 'boolean',
			name: 'Fade to black: Active',
			description: 'If the specified fade to black is active, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'on',
					choices: [
						{
							id: 'on',
							label: 'On',
						},
						{
							id: 'off',
							label: 'Off',
						},
						{
							id: 'fading',
							label: 'Fading',
						},
					],
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				if (instance.states.fadeToBlack) {
					switch (feedback.options.state) {
						case 'off':
							return !instance.states.fadeToBlack.isFullyBlack && !instance.states.fadeToBlack.inTransition
						case 'fading':
							return instance.states.fadeToBlack.inTransition
						default:
							// on
							return !instance.states.fadeToBlack.inTransition && instance.states.fadeToBlack.isFullyBlack
					}
				}
				return false
			},
		},
		[feedbackId.FTBAFV]: {
			type: 'boolean',
			name: 'Fade to black: Audio follow video',
			description: 'If the specified fade to black is active, Audio follow video',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 1,
					choices: [
						{
							id: 1,
							label: 'On',
						},
						{
							id: 0,
							label: 'Off',
						},
					],
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				if (instance.states.fadeToBlack) {
					switch (feedback.options.state) {
						case 0:
							return false
						default:
							// on
							return instance.states.fadeToBlack.AFV
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
		//superSource
		[feedbackId.SuperSourceEnable]: {
			type: 'boolean',
			name: 'SuperSource: Set Super Source Enable',
			description: 'If you turn on Super Source, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return instance.states.SuperSourcePorp.SSEnable
			},
		},
		[feedbackId.SuperSourceSelect]: {
			type: 'boolean',
			name: 'SuperSource: Set SuperSource Source',
			description: 'If you Select SuperSource, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'type',
					id: 'typeid',
					choices: [
						{ id: 0, label: 'superSourceSource1' },
						{ id: 1, label: 'superSourceSource2' },
						{ id: 2, label: 'superSourceBackgroud' },
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'SourceID',
					choices: getChoices(ActionType.SuperSourceSource),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const type = Number(feedback.options.typeid)
				const SourceID = Number(feedback.options.SourceID)
				if (type === 0) {
					return instance.states.SuperSourcePorp.SuperSourceSource1.id === SourceID
				} else if (type === 1) {
					return instance.states.SuperSourcePorp.SuperSourceSource2.id === SourceID
				} else if (type === 2) {
					return instance.states.SuperSourcePorp.SuperSourceBackground.id === SourceID
				}
				return false
			},
		},
		[feedbackId.SuperSourceControlStyle]: {
			type: 'boolean',
			name: 'SuperSource: Set SuperSource ControlStyle',
			description: 'If you Select SuperSource, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'style',
					id: 'styleid',
					choices: SuperSourceStyleChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				return instance.states.SuperSourcePorp.SuperSourceControlStyle.id === feedback.options.styleid
			},
		},
		[feedbackId.SuperSourceMask]: {
			type: 'boolean',
			name: 'SuperSource: Set SuperSource Mask',
			description: 'If you Select SuperSource, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Type',
					id: 'typeid',
					choices: [
						{ id: 0, label: 'mask1' },
						{ id: 1, label: 'mask2' },
					],
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const type = Number(feedback.options.typeid)
				if (type === 0) {
					return instance.states.SuperSourcePorp.SuperSourceMaskEnable.mask1
				} else {
					return instance.states.SuperSourcePorp.SuperSourceMaskEnable.mask2
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
		[feedbackId.AudioEnable]: {
			type: 'boolean',
			name: 'UpStream Key: Set UpStream Key Type',
			description: 'If you Select UpStream Key, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: getChoices(ActionType.AudioEnableSource),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'AudioEnable',
					choices: getChoices(ActionType.AudioEnable),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeid = Number(feedback.options.ASource)
				const t_enable = Number(feedback.options.AudioEnable)
				if (typeid === 0) {
					return instance.states.AudioMixerPorp.AudioEnable.mic1 === t_enable
				} else if (typeid === 1) {
					return instance.states.AudioMixerPorp.AudioEnable.mic2 === t_enable
				} else if (typeid === 2) {
					return instance.states.AudioMixerPorp.AudioEnable.in1 === t_enable
				} else if (typeid === 3) {
					return instance.states.AudioMixerPorp.AudioEnable.in2 === t_enable
				} else if (typeid === 4) {
					return instance.states.AudioMixerPorp.AudioEnable.in3 === t_enable
				} else if (typeid === 5) {
					return instance.states.AudioMixerPorp.AudioEnable.in4 === t_enable
				} else {
					return instance.states.AudioMixerPorp.AudioEnable.aux === t_enable
				}
			},
		},
		[feedbackId.AudioTransition]: {
			type: 'boolean',
			name: 'Audio Mixer: Set AudioTransition	Enable',
			description: 'If you turn on AudioTransition, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return instance.states.AudioMixerPorp.AudioTransition
			},
		},
		//Streamming
		[feedbackId.StreamOutput]: {
			type: 'boolean',
			name: 'Streamming: Set Stream Enable',
			description: 'If you turn on Stream Enable, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Stream',
					id: 'StreamID',
					choices: StreamingChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				if (feedback.options.StreamID === 0) {
					return instance.states.StreamingProp.stream1
				} else if (feedback.options.StreamID === 1) {
					return instance.states.StreamingProp.stream2
				} else if (feedback.options.StreamID === 2) {
					return instance.states.StreamingProp.stream3
				}
				return false
			},
		},
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
				return feedback.options.ModeID === instance.states.PlayBackState.PlaybackMode
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
				return instance.states.PlayBackState.PlaybackRepeat
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
				return instance.states.PlayBackState.PlaybackPause
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
				return instance.states.PlayBackState.PlaybackBar
			},
		},
		[feedbackId.PlayFile]: {
			type: 'boolean',
			name: 'PlayFile: feedback based on current loaded video file',
			description: 'Change style of bank if video file is loaded',
			options: [
				{
					type: 'dropdown',
					label: 'Video file',
					id: 'PlayFileID',
					choices: instance.states.PlayBackState.PlayFileList.map((s, index) => ({
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
				return feedback.options.PlayFileID === instance.states.PlayBackState.PlayFile
			},
		},
		//Record
		[feedbackId.Record]: {
			type: 'boolean',
			name: 'Record: Set Record Start or Stop',
			description: 'If you turn on Record Start, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return instance.states.RecordState
			},
		},
		//Live
		[feedbackId.Live]: {
			type: 'boolean',
			name: 'Live: Set Live Start or Stop',
			description: 'If you turn on Live Start, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'states',
					id: 'statesId',
					choices: [
						{ id: 0, label: 'off' },
						{ id: 1, label: 'on' },
						{ id: 2, label: 'abnormal' },
					],
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				return instance.states.LiveState === feedback.options.statesId
			},
		},
	}
}
