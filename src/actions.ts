import { GoSteamDeckInstance } from './index'
import { CompanionActionDefinition, CompanionActionDefinitions, CompanionActionEvent, } from '@companion-module/base'
import { sendCommand } from './connection'
import { SourcesToChoices, getChoices, getChoicesByMacro } from './choices'
import { ActionId, ActionType, SourceType, ReqType, TransitionStyle } from './enums'
import {
	ColorSwitchChoices,
	KeySwitchChoices,
	SuperSourceBorderChoices,
	SuperSourceMaskChoices,
	SuperSourceStyleChoices,
	SwitchChoices,
	TransitionStyleChoice,
	UpStreamKeyTypeChoices,
	WipeDirectionChoices,
	KeyResizeSizeChoices,
	AudioSourcesChoices,
	AudioSourcesEnableChoices,
	AudioMicChoices,
	StreamingChoices,
	SettingsUMDSrcChoices,
	SettingsMvMeterChoices,
	SettingsMvLayoutChoices,
	SettingsMicInputChoices,
	SourceModels,
	SettingsColorChoices,
	SettingsAuxSourceChoices,
	SettingsOutFormatChoices,
	SettingsOutSourceParamChoices
} from './model'
import { TransitionKeyeState } from './state'

/**
 * Returns all implemented actions.
 * @param self reference to the BaseInstance
 * @constructor
 * @returns CompanionActions
 */
export function actions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
		[ActionId.PgmIndex]: {
			name: 'Set PGM Source',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'Source',
					default: SourceType.Input1,
					choices: getChoices(ActionType.Program),
				}
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.PgmIndex, ReqType.Set, [getOptNumber(action, 'Source')]);
			},
		},
		[ActionId.PvwIndex]: {
			name: 'Set PVW Source',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'Source',
					default: SourceType.Input1,
					choices: getChoices(ActionType.Program),
				}
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.PvwIndex, ReqType.Set, [getOptNumber(action, 'Source')])
			},
		},
		//Transition Style
		...TransitionActions(_self),
		...DSKActions(_self),
		...ColorBackActions(_self),
		...SuperSourceActions(_self),
		...UpStreamKeyActions(_self),
		...AudioMixerActions(_self),
		...StillGeneratorActions(_self),
		...MacroActions(_self),
		...StreamingActions(_self),
		...SettingsActions(_self),
		...RecordActions(_self),
		...LiveActions(_self),
	}
	return actions
}

function TransitionActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
		[ActionId.CutTransition]: {
			name: 'Perform CUT transition',
			options: [],
			callback: async () => {
				await sendCommand(_self, ActionId.CutTransition, ReqType.Set);
				//_self.states.
				await sendCommand(_self, ActionId.PgmIndex, ReqType.Get);
				await sendCommand(_self, ActionId.PvwIndex, ReqType.Get);
			},
		},
		[ActionId.AutoTransition]: {
			name: 'Perform AUTO transition',
			options: [],
			callback: async () => {
				await sendCommand(_self, ActionId.AutoTransition, ReqType.Set);
				await sendCommand(_self, ActionId.PgmIndex, ReqType.Get);
				await sendCommand(_self, ActionId.PvwIndex, ReqType.Get);
			},
		},
		[ActionId.FTB]: {
			name: 'Perform FTB Transition',
			options: [],
			callback: async () => {
				await sendCommand(_self, ActionId.FTB, ReqType.Set);
				await sendCommand(_self, ActionId.FTB, ReqType.Get);
			},
		},
		[ActionId.FtbAudioAFV]: {
			name: 'Perform FTB Transition,Audio follows video and pops in',
			options: [
				{
					type: 'dropdown',
					label: 'FTB Audio AFV',
					id: 'FtbAudioAFV',
					default: 0,
					choices: SwitchChoices,
				}
			],
			callback: (action) => {
				sendCommand(_self, ActionId.FtbAudioAFV, ReqType.Set, [getOptNumber(action, 'FtbAudioAFV')]);
			},
		},
		[ActionId.FtbRate]: {
			name: 'Fade to black: Change rate',
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
			callback: (action) => {
				sendCommand(_self, ActionId.FtbRate, ReqType.Set, [getOptNumber(action, 'FtbRate')]);
			},
		},
		[ActionId.Prev]: {
			name: 'Preview switch',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'prevEnable',
					default: 0,
					choices: SwitchChoices,
				}
			],
			callback: (action) => {
				sendCommand(_self, ActionId.Prev, ReqType.Set, [getOptNumber(action, 'prevEnable')]);
			},
		},
		[ActionId.TransitionIndex]: {
			name: 'Transition: Set style/pattern',
			options: [
				{
					type: 'dropdown',
					label: 'Transition Style',
					id: 'TransitionStyle',
					default: TransitionStyle.MIX,
					choices: TransitionStyleChoice,
				}
			],
			callback: (action) => {
				sendCommand(_self, ActionId.TransitionIndex, ReqType.Set, [getOptNumber(action, 'TransitionStyle')]);
				sendCommand(_self, ActionId.TransitionIndex, ReqType.Get);
			},
		},
		[ActionId.TransitionRate]: {
			name: 'Transition: Change rate',
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
			callback: (action) => {
				sendCommand(_self, ActionId.TransitionRate, ReqType.Set, [getOptNumber(action, 'TransitionStyle'), getOptNumber(action, 'TransitionRate')]);
			},
		},
		[ActionId.TransitionDipSource]: {
			name: 'Transition:Change Dip Source',
			options: [
				{
					type: 'dropdown',
					label: 'Change Dip Source',
					id: 'TransitionDipSource',
					default: 0,
					choices: getChoices(ActionType.TransitionDipSource),
				}
			],
			callback: (action) => {
				sendCommand(_self, ActionId.TransitionDipSource, ReqType.Set, [getOptNumber(action, 'TransitionDipSource')]);
			},
		},
		[ActionId.TransitionWipeXPosition]: {
			name: 'Transition:Change Wipe X Position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'XPosition',
					default: 0,
					min: -16.0,
					max: 16.0,
					step: 0.2,
					range: true,
				}
			],
			callback: (action) => {
				sendCommand(_self, ActionId.TransitionWipeXPosition, ReqType.Set, [getOptNumber(action, 'XPosition')]);
			},
		},
		[ActionId.TransitionWipeYPosition]: {
			name: 'Transition:Change Wipe Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'YPosition',
					default: 0,
					min: -9.0,
					max: 9.0,
					step: 0.2,
					range: true,
				}
			],
			callback: (action) => {
				sendCommand(_self, ActionId.TransitionWipeYPosition, ReqType.Set, [getOptNumber(action, 'YPosition')]);
			},
		},
		[ActionId.TransitionWipeDirection]: {
			name: 'Transition:Change Wipe Style Direction',
			options: [
				{
					type: 'dropdown',
					label: 'Change Wipe Style Direction',
					id: 'WipeDirection',
					default: 0,
					choices: WipeDirectionChoices,
				}
			],
			callback: (action) => {
				sendCommand(_self, ActionId.TransitionWipeDirection, ReqType.Set, [getOptNumber(action, 'WipeDirection')]);
			},
		},
		[ActionId.TransitionWipeSymmetry]: {
			name: 'Transition:Change Wipe Style Symmetry',
			options: [
				{
					type: 'number',
					label: 'Symmetry',
					id: 'WipeSymmetry',
					default: 50,
					min: 0,
					max: 100,
					range: true,
				}
			],
			callback: (action) => {
				sendCommand(_self, ActionId.TransitionWipeSymmetry, ReqType.Set, [getOptNumber(action, 'WipeSymmetry')]);
			},
		},
		[ActionId.TransitionWipeSoftness]: {
			name: 'Transition:Change Wipe Style Softness',
			options: [
				{
					type: 'number',
					label: 'Symmetry',
					id: 'WipeSoftness',
					default: 0,
					min: 0,
					max: 100,
					range: true,
				}
			],
			callback: (action) => {
				sendCommand(_self, ActionId.TransitionWipeSoftness, ReqType.Set, [getOptNumber(action, 'WipeSoftness')]);
			},
		},
		[ActionId.TransitionWipeBorder]: {
			name: 'Transition:Change Wipe Style Border',
			options: [
				{
					type: 'number',
					label: 'Symmetry',
					id: 'WipeBorder',
					default: 0,
					min: 0,
					max: 100,
					range: true,
				}
			],
			callback: (action) => {
				sendCommand(_self, ActionId.TransitionWipeBorder, ReqType.Set, [getOptNumber(action, 'WipeBorder')]);
			},
		},
		[ActionId.TransitionWipeFillSource]: {
			name: 'Transition:Change Wipe Style Fill Source',
			options: [
				{
					type: 'dropdown',
					label: 'Fill Source',
					id: 'WipeFillSource',
					default: 0,
					choices: getChoices(ActionType.TransitionWipeFillSource),
				}
			],
			callback: (action) => {
				sendCommand(_self, ActionId.TransitionWipeFillSource, ReqType.Set, [getOptNumber(action, 'WipeFillSource')]);
			},
		},
		[ActionId.TransitionPosition]: {
			name: 'Transition:Change push bar position',
			options: [
				{
					type: 'number',
					label: 'Position',
					id: 'BarPosition',
					default: 0,
					min: 0,
					max: 256,
					range: true,
				}
			],
			callback: (action) => {
				sendCommand(_self, ActionId.TransitionPosition, ReqType.Set, [getOptNumber(action, 'BarPosition')]);
			},
		},
	}
	return actions;
}

function DSKActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
		[ActionId.TransitionSource]: {
			name: 'Next Transition:Set Transition Key Switch',
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
			callback: async (action) => {
				let seleOptions = action.options.KeySwitch;
				if (seleOptions && Array.isArray(seleOptions)) {
					let arratOptions = Array.from(seleOptions);
					const newProps: TransitionKeyeState = { M_Key: false, DSK: false, BKGD: false };
					let num = 0;
					if (arratOptions.includes('0')) {
						newProps.M_Key = true;
						num += 1;
					}
					if (arratOptions.includes('1')) {
						newProps.DSK = true;
						num += (1 << 1);
					}
					if (arratOptions.includes('2')) {
						newProps.BKGD = true;
						num += (1 << 2);
					}
					_self.states.TKeyeState = newProps;
					await sendCommand(_self, ActionId.TransitionSource, ReqType.Set, [num]);
				}
			},
		},
		[ActionId.KeyOnAir]: {
			name: 'Next Transition:Set KeyOnAir',
			options: [
				{
					type: 'dropdown',
					label: 'Key OnAir',
					id: 'KeyOnAir',
					choices: SwitchChoices,
					default: 0,
				}
			],
			callback: async (action) => {
				_self.states.keyOnAir = true;
				await sendCommand(_self, ActionId.TransitionSource, ReqType.Set, [getOptNumber(action, 'KeyOnAir')]);
			},
		},
		[ActionId.DskOnAir]: {
			name: 'Next Transition:Set DSKOnAir',
			options: [
				{
					type: 'dropdown',
					label: 'DSK OnAir',
					id: 'DSKOnAir',
					choices: SwitchChoices,
					default: 0,
				}
			],
			callback: async (action) => {
				_self.states.dskOnAir = true;
				await sendCommand(_self, ActionId.TransitionSource, ReqType.Set, [getOptNumber(action, 'DSKOnAir')]);
			},
		},
		[ActionId.DskSourceFill]: {
			name: 'DSK:Set Source',
			options: [
				{
					type: 'dropdown',
					label: 'DSK Fill',
					id: 'DSKFill',
					choices: getChoices(ActionType.DskSourceFill),
					default: 0,
				}
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.DskSourceFill, ReqType.Set, [getOptNumber(action, 'DSKFill')]);
			},
		},
		[ActionId.DskSourceKey]: {
			name: 'DSK:Set Source',
			options: [
				{
					type: 'dropdown',
					label: 'DSK Key',
					id: 'DSKKey',
					choices: getChoices(ActionType.DskSourceFill),
					default: 0,
				}
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.DskSourceKey, ReqType.Set, [getOptNumber(action, 'DSKKey')]);
			},
		},

		[ActionId.DskMaskEnable]: {
			name: 'DSK:Set Mask',
			options: [
				{
					type: 'dropdown',
					label: 'Dsk Mask Enable',
					id: 'DskMaskEnable',
					default: 0,
					choices: SwitchChoices,
				}
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.DskMaskEnable, ReqType.Set, [getOptNumber(action, 'DSKFill')]);

			},
		},
		[ActionId.DskMaskHStart]: {
			name: 'DSK:Set Mask H Start',
			options: [
				{
					type: 'number',
					label: 'H Start',
					id: 'HStart',
					default: 0,
					min: 0,
					max: 100,
				},
			],
			callback: async (action) => {
				//_self.states.dskOnAir=true;
				await sendCommand(_self, ActionId.DskMaskHStart, ReqType.Set, [getOptNumber(action, 'HStart')]);

			},
		},
		[ActionId.DskMaskVStart]: {
			name: 'DSK:Set Mask V Start',
			options: [
				{
					type: 'number',
					label: 'V Start',
					id: 'VStart',
					default: 0,
					min: 0,
					max: 100,
				},
			],
			callback: async (action) => {
				//_self.states.dskOnAir=true;
				await sendCommand(_self, ActionId.DskMaskVStart, ReqType.Set, [getOptNumber(action, 'VStart')]);

			},
		},
		[ActionId.DskMaskHEnd]: {
			name: 'DSK:Set Mask H End',
			options: [
				{
					type: 'number',
					label: 'H End',
					id: 'HEnd',
					default: 100,
					min: 1,
					max: 100,
				},
			],
			callback: async (action) => {
				//_self.states.dskOnAir=true;
				await sendCommand(_self, ActionId.DskMaskHEnd, ReqType.Set, [getOptNumber(action, 'HEnd')]);

			},
		},
		[ActionId.DskMaskVEnd]: {
			name: 'DSK:Set Mask',
			options: [
				{
					type: 'number',
					label: 'V End',
					id: 'VEnd',
					default: 100,
					min: 1,
					max: 100,
				}
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.DskMaskVEnd, ReqType.Set, [getOptNumber(action, 'VEnd')]);
			},
		},

		[ActionId.DskControlShapedKey]: {
			name: 'DSK:Set Control Shaped Key',
			options: [
				{
					type: 'dropdown',
					label: 'Shaped Key',
					id: 'ShapedKey',
					default: 0,
					choices: SwitchChoices,
				}
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.DskControlShapedKey, ReqType.Set, [getOptNumber(action, 'ShapedKey')]);
			},
		},
		[ActionId.DskControlClip]: {
			name: 'DSK:Set Control Clip',
			options: [
				{
					type: 'number',
					label: 'Clip',
					id: 'Clip',
					default: 15,
					min: 0,
					max: 100,
				}
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.DskControlClip, ReqType.Set, [getOptNumber(action, 'Clip')]);
			},
		},
		[ActionId.DskControlGain]: {
			name: 'DSK:Set Control Gain',
			options: [
				{
					type: 'number',
					label: 'Gain',
					id: 'Gain',
					default: 50,
					min: 0,
					max: 100,
				}
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.DskControlGain, ReqType.Set, [getOptNumber(action, 'Gain')]);
			},
		},
		[ActionId.DskControlInvert]: {
			name: 'DSK:Set Control Invert',
			options: [
				{
					type: 'dropdown',
					label: 'Invert',
					id: 'Invert',
					default: 0,
					choices: SwitchChoices
				}
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.DskControlInvert, ReqType.Set, [getOptNumber(action, 'Invert')]);
			},
		},
		[ActionId.DskRate]: {
			name: 'DSK:Set Control Rate',
			options: [
				{
					type: 'number',
					label: 'dskRate',
					id: 'dskRate',
					default: 0,
					min: 0.5,
					max: 8.0,
					range: true,
					step: 0.5,
				}
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.DskRate, ReqType.Set, [getOptNumber(action, 'dskRate')]);
			},
		},
	}
	return actions;
}
function ColorBackActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
		[ActionId.ColorHue]: {
			name: 'Color Back:Set Color Hue',
			options: [
				{
					type: 'dropdown',
					label: 'Color:',
					id: 'ColorHub1',
					choices: ColorSwitchChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Hue',
					id: 'ColorHub2',
					default: 82,
					min: 0,
					max: 359,
				}
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ColorHue, ReqType.Set, [getOptNumber(action, 'ColorHub1'), getOptNumber(action, 'ColorHub2')]);
			},
		},
		[ActionId.ColorSaturation]: {
			name: 'Color Back:Set Color Saturation',
			options: [
				{
					type: 'dropdown',
					label: 'Color:',
					id: 'ColorSaturation1',
					choices: ColorSwitchChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Saturation',
					id: 'ColorSaturation2',
					default: 100,
					min: 0,
					max: 100,
				}
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ColorSaturation, ReqType.Set, [getOptNumber(action, 'ColorSaturation1'), getOptNumber(action, 'ColorSaturation2')]);
			},
		},
		[ActionId.ColorBrightness]: {
			name: 'Color Back:Set Color Brightness',
			options: [
				{
					type: 'dropdown',
					label: 'Color:',
					id: 'ColorBrightness1',
					choices: ColorSwitchChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Brightness',
					id: 'ColorBrightness2',
					default: 70,
					min: 0,
					max: 100,
				}
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ColorSaturation, ReqType.Set, [getOptNumber(action, 'ColorBrightness1'), getOptNumber(action, 'ColorBrightness2')]);
			},
		},
	}
	return actions;
}

function SuperSourceActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
		[ActionId.SuperSourceEnable]: {
			name: 'Super Source:Super Source Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable:',
					id: 'SuperSourceEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SuperSourceEnable, ReqType.Set, [getOptNumber(action, 'SuperSourceEnable')]);
			},
		},
		[ActionId.SuperSourceSource1]: {
			name: 'Super Source:Super Source Source1',
			options: [
				{
					type: 'dropdown',
					label: 'SuperSource Source1:',
					id: 'SuperSourceSource1',
					choices: getChoices(ActionType.SuperSourceSource),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SuperSourceSource1, ReqType.Set, [getOptNumber(action, 'SuperSourceSource1')]);
			},
		},
		[ActionId.SuperSourceSource2]: {
			name: 'Super Source:Super Source Source2',
			options: [
				{
					type: 'dropdown',
					label: 'SuperSource Source2:',
					id: 'SuperSourceSource2',
					choices: getChoices(ActionType.SuperSourceSource),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SuperSourceSource2, ReqType.Set, [getOptNumber(action, 'SuperSourceSource2')]);
			},
		},
		[ActionId.SuperSourceBackground]: {
			name: 'Super Source:Super Source Background',
			options: [
				{
					type: 'dropdown',
					label: 'SuperSource Background:',
					id: 'SuperSourceBackground',
					choices: getChoices(ActionType.SuperSourceSource),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SuperSourceBackground, ReqType.Set, [getOptNumber(action, 'SuperSourceBackground')]);
			},
		},
		[ActionId.SuperSourceControlStyle]: {
			name: 'Super Source:Super Source Background',
			options: [
				{
					type: 'dropdown',
					label: 'SuperSource Style:',
					id: 'SuperSourceStyle',
					choices: SuperSourceStyleChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SuperSourceControlStyle, ReqType.Set, [getOptNumber(action, 'SuperSourceStyle')]);
			},
		},
		[ActionId.SuperSourceControlYPosition]: {
			name: 'Super Source:Super Source Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position:',
					id: 'SuperSourceYPosition',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SuperSourceControlYPosition, ReqType.Set, [getOptNumber(action, 'SuperSourceYPosition')]);
			},
		},
		[ActionId.SuperSourceMaskEnable]: {
			name: 'Super Source:Super Source Mask Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Mask',
					id: 'SuperSourceMask',
					choices: SuperSourceMaskChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Mask Enable',
					id: 'SuperSourceMaskEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SuperSourceMaskEnable, ReqType.Set, [getOptNumber(action, 'SuperSourceMask'), getOptNumber(action, 'SuperSourceMaskEnable')]);
			},
		},
		[ActionId.SuperSourceMaskHStart]: {
			name: 'Super Source:Super Source H Start',
			options: [
				{
					type: 'dropdown',
					label: 'Mask',
					id: 'SuperSourceMask',
					choices: SuperSourceMaskChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'H Start',
					id: 'SuperSourceMaskHStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SuperSourceMaskHStart, ReqType.Set, [getOptNumber(action, 'SuperSourceMask'), getOptNumber(action, 'SuperSourceMaskHStart')]);
			},
		},
		[ActionId.SuperSourceMaskVStart]: {
			name: 'Super Source:Super Source V Start',
			options: [
				{
					type: 'dropdown',
					label: 'Mask',
					id: 'SuperSourceMask',
					choices: SuperSourceMaskChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'V Start',
					id: 'SuperSourceMaskVStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SuperSourceMaskVStart, ReqType.Set, [getOptNumber(action, 'SuperSourceMask'), getOptNumber(action, 'SuperSourceMaskVStart')]);
			},
		},
		[ActionId.SuperSourceMaskHEnd]: {
			name: 'Super Source:Super Source H End',
			options: [
				{
					type: 'dropdown',
					label: 'Mask',
					id: 'SuperSourceMask',
					choices: SuperSourceMaskChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'H End',
					id: 'SuperSourceMaskHEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SuperSourceMaskHEnd, ReqType.Set, [getOptNumber(action, 'SuperSourceMask'), getOptNumber(action, 'SuperSourceMaskHEnd')]);
			},
		},
		[ActionId.SuperSourceMaskVEnd]: {
			name: 'Super Source:Super Source V End',
			options: [
				{
					type: 'dropdown',
					label: 'Mask',
					id: 'SuperSourceMask',
					choices: SuperSourceMaskChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'V End',
					id: 'SuperSourceMaskVEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SuperSourceMaskVEnd, ReqType.Set, [getOptNumber(action, 'SuperSourceMask'), getOptNumber(action, 'SuperSourceMaskVEnd')]);
			},
		},
		[ActionId.SuperSourceBorderWidth]: {
			name: 'Super Source:Super Source Border Width',
			options: [
				{
					type: 'dropdown',
					label: 'Border',
					id: 'SuperSourceBorder',
					choices: SuperSourceBorderChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Border Width',
					id: 'SuperSourceBorderWidth',
					min: 0,
					max: 10,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SuperSourceBorderWidth, ReqType.Set, [getOptNumber(action, 'SuperSourceBorder'), getOptNumber(action, 'SuperSourceBorderWidth')]);
			},
		},
		[ActionId.SuperSourceBorderHue]: {
			name: 'Super Source:Super Source Border Hue',
			options: [
				{
					type: 'dropdown',
					label: 'Border',
					id: 'SuperSourceBorder',
					choices: SuperSourceBorderChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Border Hue',
					id: 'SuperSourceBorderHue',
					min: 0,
					max: 359,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SuperSourceBorderHue, ReqType.Set, [getOptNumber(action, 'SuperSourceBorder'), getOptNumber(action, 'SuperSourceBorderHue')]);
			},
		},
		[ActionId.SuperSourceBorderSaturation]: {
			name: 'Super Source:Super Source Border Saturation',
			options: [
				{
					type: 'dropdown',
					label: 'Border',
					id: 'SuperSourceBorder',
					choices: SuperSourceBorderChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Border Saturation',
					id: 'SuperSourceBorderSaturation',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SuperSourceBorderSaturation, ReqType.Set, [getOptNumber(action, 'SuperSourceBorder'), getOptNumber(action, 'SuperSourceBorderSaturation')]);
			},
		},
		[ActionId.SuperSourceBorderBrightness]: {
			name: 'Super Source:Super Source Border Brightness',
			options: [
				{
					type: 'dropdown',
					label: 'Border',
					id: 'SuperSourceBorder',
					choices: SuperSourceBorderChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Border Saturation',
					id: 'SuperSourceBorderSaturation',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SuperSourceBorderSaturation, ReqType.Set, [getOptNumber(action, 'SuperSourceBorder'), getOptNumber(action, 'SuperSourceBorderSaturation')]);
			},
		},
	}
	return actions;
}

function UpStreamKeyActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
		[ActionId.UpStreamKeyType]: {
			name: 'UpStream Key:Set Key Type',
			options: [
				{
					type: 'dropdown',
					label: 'Key Type:',
					id: 'USKType',
					choices: UpStreamKeyTypeChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.UpStreamKeyType, ReqType.Set, [getOptNumber(action, 'USKType')]);
			},
		},
		...LumaKeyActions(_self),
		...ChromaKeyActions(_self),
		...KeyPatternActions(_self),
		...PIPActions(_self),
	}
	return actions;
}

function LumaKeyActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
		[ActionId.LumaKeySourceFill]: {
			name: 'UpStream Key:Set Luma Key Source Fill',
			options: [
				{
					type: 'dropdown',
					label: 'Source Fill',
					id: 'KeyFill',
					choices: getChoices(ActionType.LumaKeySourceKey),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.LumaKeySourceFill, ReqType.Set, [getOptNumber(action, 'KeyFill')]);
			},
		},
		[ActionId.LumaKeySourceKey]: {
			name: 'UpStream Key:Set Luma Key Source Key',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'LumaKeySourceKey',
					choices: getChoices(ActionType.LumaKeySourceKey),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.LumaKeySourceKey, ReqType.Set, [getOptNumber(action, 'LumaKeySourceKey')]);
			},
		},
		[ActionId.LumaKeyMaskEnable]: {
			name: 'UpStream Key:Set Luma Key Mask Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Mask Enable',
					id: 'LumaKeyMaskEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.LumaKeyMaskEnable, ReqType.Set, [getOptNumber(action, 'LumaKeyMaskEnable')]);
			},
		},
		[ActionId.LumaKeyMaskHStart]: {
			name: 'UpStream Key:Set Luma Key Mask H Start',
			options: [
				{
					type: 'number',
					label: 'H Start',
					id: 'LumaKeyMaskHStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.LumaKeyMaskHStart, ReqType.Set, [getOptNumber(action, 'LumaKeyMaskHStart')]);
			},
		},
		[ActionId.LumaKeyMaskVStart]: {
			name: 'UpStream Key:Set Luma Key Mask V Start',
			options: [
				{
					type: 'number',
					label: 'V Start',
					id: 'LumaKeyMaskVStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.LumaKeyMaskVStart, ReqType.Set, [getOptNumber(action, 'LumaKeyMaskVStart')]);
			},
		},
		[ActionId.LumaKeyMaskHEnd]: {
			name: 'UpStream Key:Set Luma Key Mask H End',
			options: [
				{
					type: 'number',
					label: 'H End',
					id: 'LumaKeyMaskHEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.LumaKeyMaskHEnd, ReqType.Set, [getOptNumber(action, 'LumaKeyMaskHEnd')]);
			},
		},
		[ActionId.LumaKeyMaskVEnd]: {
			name: 'UpStream Key:Set Luma Key Mask V End',
			options: [
				{
					type: 'number',
					label: 'V End',
					id: 'LumaKeyMaskVEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.LumaKeyMaskVEnd, ReqType.Set, [getOptNumber(action, 'LumaKeyMaskVEnd')]);
			},
		},
		[ActionId.LumaKeyControlShapedKey]: {
			name: 'UpStream Key:Set Luma Key Control ShapedKey',
			options: [
				{
					type: 'dropdown',
					label: 'ShapedKey',
					id: 'LumaKeyControlShapedKey',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.LumaKeyControlShapedKey, ReqType.Set, [getOptNumber(action, 'LumaKeyControlShapedKey')]);
			},
		},
		[ActionId.LumaKeyControlClip]: {
			name: 'UpStream Key:Set Luma Key Control Clip',
			options: [
				{
					type: 'number',
					label: 'Clip',
					id: 'LumaKeyControlClip',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.LumaKeyControlClip, ReqType.Set, [getOptNumber(action, 'LumaKeyControlClip')]);
			},
		},
		[ActionId.LumaKeyControlGain]: {
			name: 'UpStream Key:Set Luma Key Control Gain',
			options: [
				{
					type: 'number',
					label: 'Gain',
					id: 'LumaKeyControlGain',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.LumaKeyControlGain, ReqType.Set, [getOptNumber(action, 'LumaKeyControlGain')]);
			},
		},
		[ActionId.LumaKeyControlInvert]: {
			name: 'UpStream Key:Set Luma Key Control Invert',
			options: [
				{
					type: 'dropdown',
					label: 'Invert',
					id: 'LumaKeyControlInvert',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.LumaKeyControlInvert, ReqType.Set, [getOptNumber(action, 'LumaKeyControlInvert')]);
			},
		},
		[ActionId.LumaKeyResizeEnable]: {
			name: 'UpStream Key:Set Luma Key Resize Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'LumaKeyResizeEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.LumaKeyResizeEnable, ReqType.Set, [getOptNumber(action, 'LumaKeyResizeEnable')]);
			},
		},
		[ActionId.LumaKeyResizeSize]: {
			name: 'UpStream Key:Set Luma Key Resize Size',
			options: [
				{
					type: 'dropdown',
					label: 'Size',
					id: 'LumaKeyResizeSize',
					choices: KeyResizeSizeChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				let value = 0.25;
				let info = KeyResizeSizeChoices.find(s => s.id === action.options.LumaKeyResizeSize);
				if (info !== null && info !== undefined) {
					value = Number(info.label);
				}
				await sendCommand(_self, ActionId.LumaKeyResizeSize, ReqType.Set, [value]);
			},
		},
		[ActionId.LumaKeyResizeXPosition]: {
			name: 'UpStream Key:Set Luma Key X Position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'LumaKeyResizeXPosition',
					min: -16,
					max: 16,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.LumaKeyResizeXPosition, ReqType.Set, [getOptNumber(action, 'LumaKeyResizeXPosition')]);
			},
		},
		[ActionId.LumaKeyResizeYPosition]: {
			name: 'UpStream Key:Set Luma Key Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'LumaKeyResizeYPosition',
					min: -9.0,
					max: 9.0,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.LumaKeyResizeYPosition, ReqType.Set, [getOptNumber(action, 'LumaKeyResizeYPosition')]);
			},
		},
	}
	return actions;
}

function ChromaKeyActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
		[ActionId.ChromaKeyFill]: {
			name: 'UpStream Key:Set Chroma Key Source Fill',
			options: [
				{
					type: 'dropdown',
					label: 'Source Fill',
					id: 'KeyFill',
					choices: getChoices(ActionType.ChromaKeySourceKey),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyFill, ReqType.Set, [getOptNumber(action, 'KeyFill')]);
			},
		},
		[ActionId.ChromaKeyMaskEnable]: {
			name: 'UpStream Key:Set Chroma Key Mask Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Mask Enable',
					id: 'ChromaKeyMaskEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyMaskEnable, ReqType.Set, [getOptNumber(action, 'ChromaKeyMaskEnable')]);
			},
		},
		[ActionId.ChromaKeyMaskHStart]: {
			name: 'UpStream Key:Set Chroma Key Mask H Start',
			options: [
				{
					type: 'number',
					label: 'H Start',
					id: 'ChromaKeyMaskHStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyMaskHStart, ReqType.Set, [getOptNumber(action, 'ChromaKeyMaskHStart')]);
			},
		},
		[ActionId.ChromaKeyMaskVStart]: {
			name: 'UpStream Key:Set Chroma Key Mask V Start',
			options: [
				{
					type: 'number',
					label: 'V Start',
					id: 'ChromaKeyMaskVStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyMaskVStart, ReqType.Set, [getOptNumber(action, 'ChromaKeyMaskVStart')]);
			},
		},
		[ActionId.ChromaKeyMaskHEnd]: {
			name: 'UpStream Key:Set Chroma Key Mask H End',
			options: [
				{
					type: 'number',
					label: 'H End',
					id: 'ChromaKeyMaskHEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyMaskHEnd, ReqType.Set, [getOptNumber(action, 'ChromaKeyMaskHEnd')]);
			},
		},
		[ActionId.ChromaKeyMaskVEnd]: {
			name: 'UpStream Key:Set Chroma Key Mask V End',
			options: [
				{
					type: 'number',
					label: 'V End',
					id: 'ChromaKeyMaskVEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyMaskVEnd, ReqType.Set, [getOptNumber(action, 'ChromaKeyMaskVEnd')]);
			},
		},
		[ActionId.ChromaKeyResizeEnable]: {
			name: 'UpStream Key:Set Chroma Key Resize Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'ChromaKeyResizeEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyResizeEnable, ReqType.Set, [getOptNumber(action, 'ChromaKeyResizeEnable')]);
			},
		},
		[ActionId.ChromaKeyResizeSize]: {
			name: 'UpStream Key:Set Chroma Key Resize Size',
			options: [
				{
					type: 'dropdown',
					label: 'Size',
					id: 'ChromaKeyResizeSize',
					choices: KeyResizeSizeChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				let value = 0.25;
				let info = KeyResizeSizeChoices.find(s => s.id === action.options.ChromaKeyResizeSize);
				if (info !== null && info !== undefined) {
					value = Number(info.label);
				}
				await sendCommand(_self, ActionId.ChromaKeyResizeSize, ReqType.Set, [value]);
			},
		},
		[ActionId.ChromaKeyResizeXPosition]: {
			name: 'UpStream Key:Set Chroma Key X Position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'ChromaKeyResizeXPosition',
					min: -16,
					max: 16,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyResizeXPosition, ReqType.Set, [getOptNumber(action, 'ChromaKeyResizeXPosition')]);
			},
		},
		[ActionId.ChromaKeyResizeYPosition]: {
			name: 'UpStream Key:Set Chroma Key Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'ChromaKeyResizeYPosition',
					min: -9.0,
					max: 9.0,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyResizeYPosition, ReqType.Set, [getOptNumber(action, 'ChromaKeyResizeYPosition')]);
			},
		},
		[ActionId.ChromaKeyControlSMPXPosition]: {
			name: 'UpStream Key:Set Chroma Key SMP X Position',
			options: [
				{
					type: 'number',
					label: 'SMP X Position',
					id: 'ChromaKeyControlSMPXPosition',
					min: -16.0,
					max: 16.0,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyControlSMPXPosition, ReqType.Set, [getOptNumber(action, 'ChromaKeyControlSMPXPosition')]);
			},
		},
		[ActionId.ChromaKeyControlSMPYPosition]: {
			name: 'UpStream Key:Set Chroma Key SMP Y Position',
			options: [
				{
					type: 'number',
					label: 'SMP Y Position',
					id: 'ChromaKeyControlSMPYPosition',
					min: -9.0,
					max: 9.0,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyControlSMPYPosition, ReqType.Set, [getOptNumber(action, 'ChromaKeyControlSMPYPosition')]);
			},
		},
		[ActionId.ChromaKeyControlSample]: {
			name: 'UpStream Key:Set Chroma Key Control Sample Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Sample Enable',
					id: 'ChromaKeyControlSample',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyControlSample, ReqType.Set, [getOptNumber(action, 'ChromaKeyControlSample')]);
			},
		},
		[ActionId.ChromaKeyControlColor]: {
			name: 'UpStream Key:Set Chroma Key Control Color',
			options: [
				{
					type: 'colorpicker',
					label: 'Control Color',
					id: 'ChromaKeyControlColor',
					default: 0,
				},
			],
			/* callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyControlSample, ReqType.Set, [getOptNumber(action, 'ChromaKeyControlSample')]);
			}, */
			callback: async () => {
				//await sendCommand(_self, ActionId.ChromaKeyControlSample, ReqType.Set, [getOptNumber(action, 'ChromaKeyControlSample')]);
			},
		},
		[ActionId.ChromaKeyControlForeground]: {
			name: 'UpStream Key:Set Chroma Key Foreground',
			options: [
				{
					type: 'number',
					label: 'Foreground',
					id: 'ChromaKeyControlForeground',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyControlForeground, ReqType.Set, [getOptNumber(action, 'ChromaKeyControlForeground')]);
			},
		},
		[ActionId.ChromaKeyControlBackground]: {
			name: 'UpStream Key:Set Chroma Key Background',
			options: [
				{
					type: 'number',
					label: 'Background',
					id: 'ChromaKeyControlBackground',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyControlBackground, ReqType.Set, [getOptNumber(action, 'ChromaKeyControlBackground')]);
			},
		},
		[ActionId.ChromaKeyControlKeyEdge]: {
			name: 'UpStream Key:Set Chroma Key Background',
			options: [
				{
					type: 'number',
					label: 'Key Background',
					id: 'ChromaKeyControlKeyEdge',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.ChromaKeyControlKeyEdge, ReqType.Set, [getOptNumber(action, 'ChromaKeyControlKeyEdge')]);
			},
		},
	}
	return actions;
}

function KeyPatternActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
		[ActionId.KeyPatternSourceFill]: {
			name: 'UpStream Key:Set Key Pattern Source Fill',
			options: [
				{
					type: 'dropdown',
					label: 'Source Fill',
					id: 'KeyFill',
					choices: getChoices(ActionType.KeyPatternSourceKey),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.KeyPatternSourceFill, ReqType.Set, [getOptNumber(action, 'KeyFill')]);
			},
		},
		[ActionId.KeyPatternWipePattern]: {
			name: 'UpStream Key:Set Key Pattern Wipe Pattern',
			options: [
				{
					type: 'number',
					label: 'Wipe Pattern',
					id: 'KeyPatternWipePattern',
					min: 0,
					max: 17,
					default: 0,
					range: true,
					step: 1,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.KeyPatternWipePattern, ReqType.Set, [getOptNumber(action, 'KeyPatternWipePattern')]);
			},
		},
		[ActionId.KeyPatternWipeSize]: {
			name: 'UpStream Key:Set Key Pattern Wipe Size',
			options: [
				{
					type: 'number',
					label: 'Wipe Size',
					id: 'KeyPatternWipeSize',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.KeyPatternWipeSize, ReqType.Set, [getOptNumber(action, 'KeyPatternWipeSize')]);
			},
		},
		[ActionId.KeyPatternWipeXPosition]: {
			name: 'UpStream Key:Set Key Pattern X Position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'KeyPatternWipeXPosition',
					min: -16.0,
					max: 16.0,
					step: 0.2,
					range: true,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.KeyPatternWipeXPosition, ReqType.Set, [getOptNumber(action, 'KeyPatternWipeXPosition')]);
			},
		},
		[ActionId.KeyPatternWipeYPosition]: {
			name: 'UpStream Key:Set Key Pattern Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'KeyPatternWipeYPosition',
					min: -9.0,
					max: 9.0,
					step: 0.2,
					range: true,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.KeyPatternWipeYPosition, ReqType.Set, [getOptNumber(action, 'KeyPatternWipeYPosition')]);
			},
		},
		[ActionId.KeyPatternWipeSymmetry]: {
			name: 'UpStream Key:Set Key Pattern Symmetry',
			options: [
				{
					type: 'number',
					label: 'Symmetry',
					id: 'KeyPatternWipeSymmetry',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.KeyPatternWipeSymmetry, ReqType.Set, [getOptNumber(action, 'KeyPatternWipeSymmetry')]);
			},
		},
		[ActionId.KeyPatternWipeSoftness]: {
			name: 'UpStream Key:Set Key Pattern Softness',
			options: [
				{
					type: 'number',
					label: 'Softness',
					id: 'KeyPatternWipeSoftness',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.KeyPatternWipeSoftness, ReqType.Set, [getOptNumber(action, 'KeyPatternWipeSoftness')]);
			},
		},
		[ActionId.KeyPatternMaskEnable]: {
			name: 'UpStream Key:Set KeyPattern Mask Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Mask Enable',
					id: 'KeyPatternMaskEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.KeyPatternMaskEnable, ReqType.Set, [getOptNumber(action, 'KeyPatternMaskEnable')]);
			},
		},
		[ActionId.KeyPatternMaskHStart]: {
			name: 'UpStream Key:Set Key Pattern Mask H Start',
			options: [
				{
					type: 'number',
					label: 'H Start',
					id: 'KeyPatternMaskHStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.KeyPatternMaskHStart, ReqType.Set, [getOptNumber(action, 'KeyPatternMaskHStart')]);
			},
		},
		[ActionId.KeyPatternMaskVStart]: {
			name: 'UpStream Key:Set Key Pattern Mask V Start',
			options: [
				{
					type: 'number',
					label: 'V Start',
					id: 'KeyPatternMaskVStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.KeyPatternMaskVStart, ReqType.Set, [getOptNumber(action, 'KeyPatternMaskVStart')]);
			},
		},
		[ActionId.KeyPatternMaskHEnd]: {
			name: 'UpStream Key:Set Key Pattern Mask H End',
			options: [
				{
					type: 'number',
					label: 'H End',
					id: 'KeyPatternMaskHEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.KeyPatternMaskHEnd, ReqType.Set, [getOptNumber(action, 'KeyPatternMaskHEnd')]);
			},
		},
		[ActionId.KeyPatternMaskVEnd]: {
			name: 'UpStream Key:Set Key Pattern Mask V End',
			options: [
				{
					type: 'number',
					label: 'V End',
					id: 'KeyPatternMaskVEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.KeyPatternMaskVEnd, ReqType.Set, [getOptNumber(action, 'KeyPatternMaskVEnd')]);
			},
		},
		[ActionId.KeyPatternResizeEnable]: {
			name: 'UpStream Key:Set Key Pattern Resize Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'KeyPatternResizeEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.KeyPatternResizeEnable, ReqType.Set, [getOptNumber(action, 'KeyPatternResizeEnable')]);
			},
		},
		[ActionId.KeyPatternResizeSize]: {
			name: 'UpStream Key:Set Key Pattern Resize Size',
			options: [
				{
					type: 'dropdown',
					label: 'Size',
					id: 'KeyPatternResizeSize',
					choices: KeyResizeSizeChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				let value = 0.25;
				let info = KeyResizeSizeChoices.find(s => s.id === action.options.KeyPatternResizeSize);
				if (info !== null && info !== undefined) {
					value = Number(info.label);
				}
				await sendCommand(_self, ActionId.KeyPatternResizeSize, ReqType.Set, [value]);
			},
		},
		[ActionId.KeyPatternResizeXPosition]: {
			name: 'UpStream Key:Set Key Pattern X Position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'KeyPatternResizeXPosition',
					min: -16,
					max: 16,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.KeyPatternResizeXPosition, ReqType.Set, [getOptNumber(action, 'KeyPatternResizeXPosition')]);
			},
		},
		[ActionId.KeyPatternResizeYPosition]: {
			name: 'UpStream Key:Set Key Pattern Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'KeyPatternResizeYPosition',
					min: -9.0,
					max: 9.0,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.KeyPatternResizeYPosition, ReqType.Set, [getOptNumber(action, 'KeyPatternResizeYPosition')]);
			},
		},
	}
	return actions;
}

function PIPActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
		[ActionId.PipSource]: {
			name: 'UpStream Key:Set Pip Source',
			options: [
				{
					type: 'dropdown',
					label: 'PIP Source',
					id: 'KeyFill',
					choices: getChoices(ActionType.PipSource),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.PipSource, ReqType.Set, [getOptNumber(action, 'KeyFill')]);
			},
		},
		[ActionId.PipSize]: {
			name: 'UpStream Key:Set PIP Size',
			options: [
				{
					type: 'dropdown',
					label: 'Size',
					id: 'PipSize',
					choices: KeyResizeSizeChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				let value = 0.25;
				let info = KeyResizeSizeChoices.find(s => s.id === action.options.PipSize);
				if (info !== null && info !== undefined) {
					value = Number(info.label);
				}
				await sendCommand(_self, ActionId.PipSize, ReqType.Set, [value]);
			},
		},
		[ActionId.PipXPosition]: {
			name: 'UpStream Key:Set PIP X Position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'PipXPosition',
					min: -16,
					max: 16,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.PipXPosition, ReqType.Set, [getOptNumber(action, 'PipXPosition')]);
			},
		},
		[ActionId.PipYPosition]: {
			name: 'UpStream Key:Set PIP Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'PipYPosition',
					min: -9.0,
					max: 9.0,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.PipYPosition, ReqType.Set, [getOptNumber(action, 'PipYPosition')]);
			},
		},
		[ActionId.PipMaskEnable]: {
			name: 'UpStream Key:Set PIP Mask Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Mask Enable',
					id: 'PipMaskEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.PipMaskEnable, ReqType.Set, [getOptNumber(action, 'PipMaskEnable')]);
			},
		},
		[ActionId.PipMaskHStart]: {
			name: 'UpStream Key:Set PIP Mask H Start',
			options: [
				{
					type: 'number',
					label: 'H Start',
					id: 'PipMaskHStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.PipMaskHStart, ReqType.Set, [getOptNumber(action, 'PipMaskHStart')]);
			},
		},
		[ActionId.PipMaskVStart]: {
			name: 'UpStream Key:Set Pip Mask V Start',
			options: [
				{
					type: 'number',
					label: 'V Start',
					id: 'PipMaskVStart',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.PipMaskVStart, ReqType.Set, [getOptNumber(action, 'PipMaskVStart')]);
			},
		},
		[ActionId.PipMaskHEnd]: {
			name: 'UpStream Key:Set Pip Mask H End',
			options: [
				{
					type: 'number',
					label: 'H End',
					id: 'PipMaskHEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.PipMaskHEnd, ReqType.Set, [getOptNumber(action, 'PipMaskHEnd')]);
			},
		},
		[ActionId.PipMaskVEnd]: {
			name: 'UpStream Key:Set Pip Mask V End',
			options: [
				{
					type: 'number',
					label: 'V End',
					id: 'PipMaskVEnd',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.PipMaskVEnd, ReqType.Set, [getOptNumber(action, 'PipMaskVEnd')]);
			},
		},
		[ActionId.PipBorderEnable]: {
			name: 'UpStream Key:Set Pip Border Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'KeyPatternResizeEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.PipBorderEnable, ReqType.Set, [getOptNumber(action, 'PipBorderEnable')]);
			},
		},
		[ActionId.PipBorderWidth]: {
			name: 'UpStream Key:Set Pip Border Width',
			options: [
				{
					type: 'number',
					label: 'Width',
					id: 'PipBorderWidth',
					min: 0,
					max: 31,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.PipBorderWidth, ReqType.Set, [getOptNumber(action, 'PipBorderWidth')]);
			},
		},
		[ActionId.PipBorderHue]: {
			name: 'UpStream Key:Set Pip Color Hue',
			options: [
				{
					type: 'number',
					label: 'Hue',
					id: 'PipBorderHue',
					min: 0,
					max: 359,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.PipBorderHue, ReqType.Set, [getOptNumber(action, 'PipBorderHue')]);
			},
		},
		[ActionId.PipBorderSaturation]: {
			name: 'UpStream Key:Set Pip Color Saturation',
			options: [
				{
					type: 'number',
					label: 'Saturation',
					id: 'PipBorderSaturation',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.PipBorderSaturation, ReqType.Set, [getOptNumber(action, 'PipBorderSaturation')]);
			},
		},
		[ActionId.PipBorderBrightness]: {
			name: 'UpStream Key:Set Pip Color Brightness',
			options: [
				{
					type: 'number',
					label: 'Brightness',
					id: 'PipBorderBrightness',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.PipBorderBrightness, ReqType.Set, [getOptNumber(action, 'PipBorderBrightness')]);
			},
		},
	}
	return actions;
}

function AudioMixerActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
		[ActionId.AudioFader]: {
			name: 'Audio Mixer:Set Audio Fader',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: getChoices(ActionType.AudioFader),
					default: 0,
				},
				{
					type: 'number',
					label: 'Fader',
					id: 'AudioFader',
					min: -75.0,
					max: 10.0,
					step: 0.5,
					range: true,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.AudioFader, ReqType.Set, [getOptNumber(action, 'ASource'), getOptNumber(action, 'AudioFader')]);
			},
		},
		[ActionId.AudioBalance]: {
			name: 'Audio Mixer:Set Audio Balance',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: AudioSourcesChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Balance',
					id: 'AudioBalance',
					min: -40.0,
					max: 40.0,
					step: 0.5,
					range: true,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.AudioFader, ReqType.Set, [getOptNumber(action, 'ASource'), getOptNumber(action, 'AudioBalance')]);
			},
		},
		[ActionId.AudioInput]: {
			name: 'Audio Mixer:Set Audio Input',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: AudioSourcesChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Input',
					id: 'AudioInput',
					min: -75.0,
					max: 6.0,
					step: 0.5,
					range: true,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.AudioFader, ReqType.Set, [getOptNumber(action, 'ASource'), getOptNumber(action, 'AudioInput')]);
			},
		},
		[ActionId.AudioEnable]: {
			name: 'Audio Mixer:Set Audio Input',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: AudioSourcesChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'AudioEnable',
					choices: AudioSourcesEnableChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.AudioEnable, ReqType.Set, [getOptNumber(action, 'ASource'), getOptNumber(action, 'AudioEnable')]);
			},
		},
		[ActionId.AudioDelay]: {
			name: 'Audio Mixer:Set Audio Delay',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: AudioMicChoices,
					default: 0,
				},
				{
					type: 'number',
					label: 'Delay',
					id: 'AudioDelay',
					min: 0,
					max: 170,
					step: 10,
					range: true,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.AudioDelay, ReqType.Set, [getOptNumber(action, 'ASource'), getOptNumber(action, 'AudioDelay')]);
			},
		},
		[ActionId.AudioMonitorLevel]: {
			name: 'Audio Mixer:Set Monitor Level',
			options: [
				{
					type: 'number',
					label: 'Level',
					id: 'AudioLevel',
					min: -31,
					max: 0,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.AudioMonitorLevel, ReqType.Set, [getOptNumber(action, 'AudioLevel')]);
			},
		},
		[ActionId.AudioMonitorSource]: {
			name: 'Audio Mixer:Set Monitor Source',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'AudioSource',
					choices: getChoices(ActionType.AudioMonitorSource),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.AudioMonitorSource, ReqType.Set, [getOptNumber(action, 'AudioSource')]);
			},
		},
	}
	return actions;
}

function StillGeneratorActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {

	}
	return actions;
}
function MacroActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
		[ActionId.MacroStartRecord]: {
			name: 'Macro:Set Start Record',
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
				await sendCommand(_self, ActionId.MacroStartRecord, ReqType.Set, [getOptNumber(action, 'MacroIndex'), getOptString(action, 'MacroName'), getOptString(action, 'MacroRemark')]);
			},
		},
		[ActionId.MacroStopRecord]: {
			name: 'Macro:Set Stop Record',
			options: [],
			callback: async () => {
				await sendCommand(_self, ActionId.MacroStopRecord, ReqType.Set);
			},
		},
		[ActionId.MacroChangeDetail]: {
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
				await sendCommand(_self, ActionId.MacroChangeDetail, ReqType.Set, [getOptNumber(action, 'MacroIndex'), getOptString(action, 'MacroName'), getOptString(action, 'MacroRemark')]);
			},
		},

		[ActionId.MacroDelete]: {
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
				await sendCommand(_self, ActionId.MacroDelete, ReqType.Set, [getOptNumber(action, 'MacroIndex')]);
			},
		},

		[ActionId.MacroLocationSwap]: {
			name: 'Macro:Location Swap',
			options: [
				{
					type: 'dropdown',
					label: 'Src Location',
					id: 'MacroIndex1',
					choices: getChoicesByMacro(),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Dst Location',
					id: 'MacroIndex2',
					choices: getChoicesByMacro(),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.MacroLocationSwap, ReqType.Set, [getOptNumber(action, 'MacroIndex1'), getOptNumber(action, 'MacroIndex2')]);
			},
		},

		[ActionId.MacroStartRun]: {
			name: 'Macro:Start Run',
			options: [
				{
					type: 'dropdown',
					label: 'Src Location',
					id: 'MacroIndex',
					choices: getChoicesByMacro(),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.MacroStartRun, ReqType.Set, [getOptNumber(action, 'MacroIndex')]);
			},
		},

		[ActionId.MacroStopRun]: {
			name: 'Macro:Stop Run',
			options: [],
			callback: async () => {
				await sendCommand(_self, ActionId.MacroStopRun, ReqType.Set);
			},
		},
		[ActionId.MacroLoop]: {
			name: 'Macro:Loop',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'MacroLoopEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.MacroStopRun, ReqType.Set, [getOptNumber(action, 'MacroLoopEnable')]);
			},
		},
	}
	return actions;
}
function StreamingActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
		[ActionId.StreamOutput]: {
			name: 'Streaming:Set Output',
			options: [
				{
					type: 'dropdown',
					label: 'Stream',
					id: 'StreamID',
					choices: StreamingChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Output',
					id: 'Output',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.StreamOutput, ReqType.Set, [getOptNumber(action, 'StreamID'), getOptNumber(action, 'Output')]);
			},
		},
		[ActionId.StreamUrl]: {
			name: 'Streaming:Set Stream Url',
			options: [
				{
					type: 'dropdown',
					label: 'Stream',
					id: 'StreamID',
					choices: StreamingChoices,
					default: 0,
				},
				{
					type: 'textinput',
					label: 'Url',
					id: 'StreamUrl',
					default: '',
					required: true,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.StreamOutput, ReqType.Set, [getOptNumber(action, 'StreamID'), getOptString(action, 'StreamUrl')]);
			},
		},
	}
	return actions;
}

function SettingsActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
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
				await sendCommand(_self, ActionId.SrcName, ReqType.Set, [getOptNumber(action, 'SrcID'), getOptString(action, 'SrcName')]);
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
				await sendCommand(_self, ActionId.SrcName, ReqType.Set, [getOptNumber(action, 'SrcID'), getOptNumber(action, 'MvMeterEnable')]);
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
				await sendCommand(_self, ActionId.MvLayout, ReqType.Set, [getOptNumber(action, 'MvLayout')]);
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
				await sendCommand(_self, ActionId.Marker, ReqType.Set, [getOptNumber(action, 'Marker')]);
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
				await sendCommand(_self, ActionId.MicInput, ReqType.Set, [getOptNumber(action, 'micid'), getOptNumber(action, 'MicInput')]);
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
				await sendCommand(_self, ActionId.RecordFileName, ReqType.Set, [getOptString(action, 'RecordFileName')]);
			},
		},
		[ActionId.SrcSelection]: {
			name: 'Settings:Src Selection',
			options: [
				{
					type: 'dropdown',
					label: 'Src',
					id: 'Srcid',
					choices: SourcesToChoices(SourceModels),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Selection',
					id: 'SrcSelection',
					choices: SettingsColorChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.SrcSelection, ReqType.Set, [getOptNumber(action, 'Srcid'), getOptNumber(action, 'SrcSelection')]);
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
				await sendCommand(_self, ActionId.AuxSource, ReqType.Set, [getOptNumber(action, 'auxSourceID')]);
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
				await sendCommand(_self, ActionId.OutFormat, ReqType.Set, [getOptNumber(action, 'OutFormat')]);
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
						{ id: '1', label: 'out2' }
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
				await sendCommand(_self, ActionId.OutputColorSpace, ReqType.Set, [getOptNumber(action, 'OutId'), getOptNumber(action, 'OutputColorSpace')]);
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
				await sendCommand(_self, ActionId.OutSource, ReqType.Set, [getOptNumber(action, 'OutId'), getOptNumber(action, 'OutSource')]);
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
						{ id: '1', label: 'streaming' }
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Quality',
					id: 'Quality',
					choices: [
						{ id: '0', label: 'hight' },
						{ id: '1', label: 'mid' },
						{ id: '2', label: 'low' }
					],
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.Quality, ReqType.Set, [getOptNumber(action, 'TypeID'), getOptNumber(action, 'Quality')]);
			},
		}
	}
	return actions;
}

function RecordActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
		[ActionId.Record]: {
			name: 'Record:Set Start or Stop Record',
			options: [
				{
					type: 'dropdown',
					label: 'Record',
					id: 'Record',
					choices: [
						{ id: '0', label: 'Stop' },
						{ id: '1', label: 'Start' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.Record, ReqType.Set, [getOptNumber(action, 'Record')]);
			},
		},

	}
	return actions;
}

function LiveActions(_self: GoSteamDeckInstance): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition | undefined } = {
		[ActionId.Live]: {
			name: 'Live:Set Start or Stop Live',
			options: [
				{
					type: 'dropdown',
					label: 'Live Enable',
					id: 'LiveEnable',
					choices: [
						{ id: '0', label: 'Stop' },
						{ id: '1', label: 'Start' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(_self, ActionId.Live, ReqType.Set, [getOptNumber(action, 'LiveEnable')]);
			},
		},
	}
	return actions;
}



function getOptNumber(action: CompanionActionEvent, key: string, defVal?: number): number {
	const rawVal = action.options[key]
	if (defVal !== undefined && rawVal === undefined) return defVal
	const val = Number(rawVal)
	if (isNaN(val)) {
		throw new Error(`Invalid option '${key}'`)
	}
	return val
}

function getOptString(action: CompanionActionEvent, key: string, defVal?: string): string {
	const rawVal = action.options[key]
	if (defVal !== undefined && rawVal === undefined) return defVal
	const val = String(rawVal)
	if (typeof (rawVal) !== 'string') {
		throw new Error(`Invalid option '${key}'`)
	}
	return val
}
