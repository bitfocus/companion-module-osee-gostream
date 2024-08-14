import { CompanionFeedbackDefinition, CompanionFeedbackDefinitions, combineRgb } from '@companion-module/base'
import { GoSteamDeckInstance } from './index'
import { ActionType, SourceType, TransitionStyle, feedbackId } from './enums'
import { getChoices, getChoicesByMacro } from './choices'
import { KeySwitchChoices, SettingsAuxSourceChoices, SettingsOutSourceParamChoices, SwitchChoices, TransitionStyleChoice, UpStreamKeyTypeChoices } from './model'

export function feedbacks(self: GoSteamDeckInstance): CompanionFeedbackDefinitions {
	const feedbacks: { [id: string]: CompanionFeedbackDefinition | undefined } = {}

	feedbacks[feedbackId.PreviewBG] = {
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
			}
		],
		callback: (_feedback) => {
			if (self.states.selectPrevInput?.id === _feedback.options.Source) {
				return true
			} else {
				return false
			}
		},
	},
	feedbacks[feedbackId.ProgramBG] = {
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
			}
		],
		callback: (_feedback) => {
			if (self.states.selectPgmInput?.id === _feedback.options.Source) {
				return true
			} else {
				return false
			}
		},
	},
	feedbacks[feedbackId.InTransition] = {
		type: 'boolean',
		name: 'Transition: Active/Running',
		description: 'If the specified transition is active, change style of the bank',
		options: [],
		defaultStyle: {
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(255, 255, 0),
		},
		callback: (_feedback): boolean => {
			return true;
		},
	},
	feedbacks[feedbackId.TransitionRate] = {
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
			}
		],
		defaultStyle: {
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(255, 255, 0),
		},
		callback: (_feedback): boolean => {
			const me = self.states.selectTransitionStyle;
			if (me?.style.id === _feedback.options.TransitionStyle) {
				const style = Number(_feedback.options.TransitionStyle);
				const rate = Number(_feedback.options.TransitionRate);
				switch (style) {
					case 0:
						return me?.mixrate === rate
					case 1:
						return me?.diprate === rate
					case 2:
						return me?.wiperate === rate
					default:
						return false;
						break
				}
			}
			return false
		},
		learn: (_feedback) => {
			const me = self.states.selectTransitionStyle;
			if (me?.style === _feedback.options.TransitionStyle) {
				const style = Number(_feedback.options.TransitionStyle);
				switch (style) {
					case 0:
						return {
							..._feedback.options,
							TransitionRate: me?.mixrate,
						}
					case 1:
						return {
							..._feedback.options,
							TransitionRate: me?.diprate,
						}
					case 2:
						return {
							..._feedback.options,
							TransitionRate: me?.wiperate,
						}
					default:
						return undefined
				}
			} else {
				return undefined
			}
		},
	}
	feedbacks[feedbackId.TransitionStyle] = {
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
			}
		],
		defaultStyle: {
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(255, 255, 0),
		},
		callback: (_feedback): boolean => {
			if (self.states.selectTransitionStyle?.style.id === _feedback.options.TransitionStyle) {
				return true
			} else {
				return false
			}
		},
	},
	feedbacks[feedbackId.TransitionKeySwitch] = {
		type: 'boolean',
		name: 'Next Transition:Key Switch',
		description: 'Set the special effect Transition key switch',
		options: [
			{
				type: 'multidropdown',
				label: 'Switch',
				id: 'KeySwitch',
				choices: KeySwitchChoices,
				minSelection: 1,
				default: ["2"],
			}
		],
		defaultStyle: {
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(255, 255, 0),
		},
		callback: (_feedback): boolean => {
			let seleOptions = _feedback.options.KeySwitch;
			if (seleOptions && Array.isArray(seleOptions)) {
				let arratOptions = Array.from(seleOptions);
				if (arratOptions.includes('0') && self.states.TKeyeState.M_Key) {
					return true;
				}
				if (arratOptions.includes('1') && self.states.TKeyeState.DSK) {
					return true;
				}
				if (arratOptions.includes('2') && self.states.TKeyeState.BKGD) {
					return true;
				}
				return false;
			}
			else
				return false;
		},
	},
	feedbacks[feedbackId.DskOnAir] = {
		type: 'boolean',
		name: 'Next Transition:DSK OnAir',
		description: 'Set the special effect Transition DSK OnAir',
		options: [
			{
				type: 'dropdown',
				label: 'DSK OnAir',
				id: 'DSKOnAir',
				choices: SwitchChoices,
				default: 0,
			}
		],
		defaultStyle: {
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(255, 255, 0),
		},
		callback: (_feedback): boolean => {
			if (self.states.dskOnAir && _feedback.options.DSKOnAir === '1') {
				return true
			} else {
				return false
			}
		}

	},
	feedbacks[feedbackId.KeyOnAir] = {
			type: 'boolean',
			name: 'Next Transition:Key OnAir Switch',
			description: 'Set the special effect Transition key switch',
			options: [
				{
					type: 'dropdown',
					label: 'Key OnAir',
					id: 'KeyOnAir',
					choices: SwitchChoices,
					default: 0,
				}
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (_feedback): boolean => {
				if (self.states.keyOnAir && _feedback.options.KeyOnAir === '1') {
					return true
				} else {
					return false
				}
			}
	}

	feedbacks[feedbackId.UpStreamKeyType]={
		type: 'boolean',
		name: 'UpStreamKey:UpStream Key Type',
		description: 'Set the special effect UpStream Key Type',
		options: [
			{
				type: 'dropdown',
				label: 'Key Type:',
				id: 'USKType',
				choices: UpStreamKeyTypeChoices,
				default: 0,
			},
		],
		defaultStyle: {
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(255, 255, 0),
		},
		callback: (_feedback): boolean => {
			return self.states.upStreamKeyType===_feedback.options.USKType;
		}
	}

	feedbacks[feedbackId.KeySourceFill]={
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
		callback: (_feedback): boolean => {
			let typeId=Number(_feedback.options.USKKeyType);
			return self.states.arrayKeySourceFill[typeId]===Number(_feedback.options.USKSourceFill);
		}
	}

	feedbacks[feedbackId.SettingOutSource] =
	{
		type: 'boolean',
		name: 'Aux/Output: Source',
		description: 'If the input specified is selected in the aux bus specified, change style of the bank',
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
		callback: (_feedback): boolean => {
			var outSources = self.states.OutPutInfos;
			for (const source of outSources) {
				if (source.OutPutType === Number(_feedback.options.OutId)) {
					return source.OutPutSource?.id === Number(_feedback.options.OutSource)
				}
			}
			return false;
		},
		learn: (_feedback) => {
			var outSources = self.states.OutPutInfos;

			if (outSources !== undefined) {
				for (const source of outSources) {
					if (source.OutPutType === Number(_feedback.options.OutId)) {
						return {
							..._feedback.options,
							OutId: source.OutPutType,
							OutSource: source.OutPutSource?.id,
						}
					}
				}
				return undefined

			} else {
				return undefined
			}
		},
	}

	feedbacks[feedbackId.Macro]={
		type: 'boolean',
		name: 'Macro: State',
		description: 'If the specified macro is running, change style of the bank',
		options: [
			{
				type: 'dropdown',
				label: 'Macro Number (1-100)',
				id: 'MacroIndex',
				default: 1,
				choices:  getChoicesByMacro(),
			}
		],
		defaultStyle: {
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(238, 238, 0),
		},
		callback: (_feedback): boolean => {
			let macroIndex = Number(_feedback.options.MacroIndex)
			if (!isNaN(macroIndex)) {
				macroIndex -= 1
			}
			return false
		},
	}

	feedbacks[feedbackId.FadeToBlackRate]={
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
			}
		],
		defaultStyle: {
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(255, 255, 0),
		},
		callback: (_feedback): boolean => {
			const rate = Number(_feedback.options.rate)
			return self.states.fadeToBlack?.rate === rate
		},
		learn: (feedback) => {
			if (self.states.fadeToBlack) {
				return {
					...feedback.options,
					FtbRate: self.states.fadeToBlack?.rate,
				}
			} else {
				return undefined
			}
		},
	}

	feedbacks[feedbackId.FadeToBlackIsBlack]={
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
			}
		],
		defaultStyle: {
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(255, 255, 0),
		},
		callback: (_feedback): boolean => {
			if (self.states.fadeToBlack) {
				switch (_feedback.options.state) {
					case 'off':
						return !self.states.fadeToBlack.isFullyBlack && !self.states.fadeToBlack.inTransition
					case 'fading':
						return self.states.fadeToBlack.inTransition
					default:
						// on
						return !self.states.fadeToBlack.inTransition && self.states.fadeToBlack.isFullyBlack
				}
			}
			return false
		},
	}

	feedbacks[feedbackId.AuxBG]={
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
			}
		],
		defaultStyle: {
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(255, 255, 0),
		},
		callback: (_feedback): boolean => {
			return self.states.auxSource===Number(_feedback.options.aux);
		},
		learn: (feedback) => {
			const auxSource = self.states.auxSource;

			if (auxSource !== undefined) {
				return {
					...feedback.options,
					auxSourceID: auxSource,
				}
			} else {
				return undefined
			}
		},
	}
	return feedbacks
}
