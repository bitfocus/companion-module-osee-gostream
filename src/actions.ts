import { Regex } from '@companion-module/base'
import { sendCommand } from './connection'
import { ActionId, ActionType, SourceType, ReqType, TransitionStyle } from './enums'
import { getChoices, getChoicesByMacro, getChoicesByStill, SourcesToChoices } from './choices'
import {
    SettingsAuxSourceChoices,
    SettingsOutFormatChoices,
    SettingsColorChoices,
    SettingsOutSourceParamChoices,
    SettingsMicInputChoices,
    SettingsMvMeterChoices,
    SettingsMvLayoutChoices,
    SettingsInputWindowLayoutChoices,
    SwitchChoices,
    AudioMicChoices,
    SettingsUMDSrcChoices,
    StreamingChoices,
    AudioInputSourcesChoices,
    KeyResizeSizeChoices,
    SuperSourceBorderChoices,
    SuperSourceMaskChoices,
    UpStreamKeyTypeChoices,
    SuperSourceStyleChoices,
    WipeDirectionChoices,
    KeySwitchChoices,
    ColorSwitchChoices,
    TransitionStyleChoice,
    SourceModels
} from './model'

/**
 * Returns all implemented actions.
 * @param self reference to the BaseInstance
 * @constructor
* @returns CompanionActions
 */
function actions(_self) {
	const actions = {
		[ActionId.PgmIndex]: {
			name: 'Set PGM Source',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'Source',
					default: SourceType.Input1,
					choices: getChoices(ActionType.Program),
				},
			],
			callback: async (action) => {
				//var source = getChoices(ActionType.Program);
				var id = getOptNumber(action, 'Source')
				// var select = source.find(s => s.id === id);
				// if (select !== undefined) {
				// 	_self.states.selectPgmInput = select;
				// }
				await sendCommand(ActionId.PgmIndex, ReqType.Set, [id])
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
					choices: getChoices(ActionType.Preview),
				},
			],
			callback: async (action) => {
				//var source = getChoices(ActionType.Preview);
				var id = getOptNumber(action, 'Source')
				// var select = source.find(s => s.id === id);
				// _self.log('info', id.toString());
				// if (select !== undefined) {
				// 	_self.states.selectPrevInput = select;
				// }
				await sendCommand(ActionId.PvwIndex, ReqType.Set, [id])
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
		...PlaybackActions(_self),
		...SettingsActions(_self),
		...RecordActions(_self),
		...LiveActions(_self),
	}
	return actions
}
exports.actions = actions
function TransitionActions(_self) {
	const actions = {
		[ActionId.CutTransition]: {
			name: 'Perform CUT transition',
			options: [],
			callback: async () => {
				await sendCommand(ActionId.CutTransition, ReqType.Set)
				//_self.states.
				//await sendCommand(ActionId.PgmIndex, ReqType.Get);
				//await sendCommand(ActionId.PvwIndex, ReqType.Get);
			},
		},
		[ActionId.AutoTransition]: {
			name: 'Perform AUTO transition',
			options: [],
			callback: async () => {
				await sendCommand(ActionId.AutoTransition, ReqType.Set)
				//await sendCommand(ActionId.PgmIndex, ReqType.Get);
				//await sendCommand(ActionId.PvwIndex, ReqType.Get);
			},
		},
		[ActionId.FTB]: {
			name: 'Perform FTB Transition',
			options: [],
			callback: async () => {
				await sendCommand(ActionId.FTB, ReqType.Set)
				//await sendCommand(ActionId.FTB, ReqType.Get);
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
				},
			],
			callback: (action) => {
				let opt = getOptNumber(action, 'FtbAudioAFV')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.fadeToBlack.AFV === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					;sendCommand(ActionId.FtbAudioAFV, ReqType.Set, [paramOpt])
				} else {
					;sendCommand(ActionId.FtbAudioAFV, ReqType.Set, [opt])
				}
				//sendCommand(ActionId.FtbAudioAFV, ReqType.Set, [getOptNumber(action, 'FtbAudioAFV')]);
			},
		},
		[ActionId.FtbRate]: {
			name: 'Fade to black: Change rate',
			options: [
				{
					type: 'number',
					label: 'FTB Rate(s)',
					id: 'FtbRate',
					default: 2,
					min: 0.5,
					max: 8.0,
					range: true,
				},
			],
			callback: (action) => {
				;sendCommand(ActionId.FtbRate, ReqType.Set, [getOptNumber(action, 'FtbRate')])
			},
		},
		[ActionId.Prev]: {
			name: 'Preview switch',
			options: [
				{
					type: 'dropdown',
					label: 'PREV',
					id: 'prevEnable',
					default: 2,
					choices: SwitchChoices,
				},
			],
			callback: (action) => {
				let opt = getOptNumber(action, 'prevEnable')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.selectTransitionStyle.PrevState === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					;sendCommand(ActionId.Prev, ReqType.Set, [paramOpt])
				} else {
					;sendCommand(ActionId.Prev, ReqType.Set, [opt])
				}
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
				},
			],
			callback: (action) => {
				;sendCommand(ActionId.TransitionIndex, ReqType.Set, [
					getOptNumber(action, 'TransitionStyle'),
				])
				//sendCommand(ActionId.TransitionIndex, ReqType.Get);
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
				},
			],
			callback: (action) => {
				;sendCommand(ActionId.TransitionRate, ReqType.Set, [
					getOptNumber(action, 'TransitionStyle'),
					getOptNumber(action, 'TransitionRate'),
				])
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
				},
			],
			callback: (action) => {
				;sendCommand(ActionId.TransitionDipSource, ReqType.Set, [
					getOptNumber(action, 'TransitionDipSource'),
				])
			},
		},
		[ActionId.TransitionWipePattern]: {
			name: 'Transition:Change Wipe Pattern',
			options: [
				{
					type: 'number',
					label: 'Wipe Pattern',
					id: 'WipePatternID',
					min: 0,
					max: 17,
					default: 0,
					range: true,
					step: 1,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipePattern, ReqType.Set, [
					getOptNumber(action, 'WipePatternID'),
				])
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
				},
			],
			callback: (action) => {
				;sendCommand(ActionId.TransitionWipeXPosition, ReqType.Set, [
					getOptNumber(action, 'XPosition'),
				])
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
				},
			],
			callback: (action) => {
				;sendCommand(ActionId.TransitionWipeYPosition, ReqType.Set, [
					getOptNumber(action, 'YPosition'),
				])
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
				},
			],
			callback: (action) => {
				;sendCommand(ActionId.TransitionWipeDirection, ReqType.Set, [
					getOptNumber(action, 'WipeDirection'),
				])
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
				},
			],
			callback: (action) => {
				;sendCommand(ActionId.TransitionWipeSymmetry, ReqType.Set, [
					getOptNumber(action, 'WipeSymmetry'),
				])
			},
		},
		[ActionId.TransitionWipeSoftness]: {
			name: 'Transition:Change Wipe Style Softness',
			options: [
				{
					type: 'number',
					label: 'Softness',
					id: 'WipeSoftness',
					default: 0,
					min: 0,
					max: 100,
					range: true,
				},
			],
			callback: (action) => {
				;sendCommand(ActionId.TransitionWipeSoftness, ReqType.Set, [
					getOptNumber(action, 'WipeSoftness'),
				])
			},
		},
		[ActionId.TransitionWipeBorder]: {
			name: 'Transition:Change Wipe Style Border',
			options: [
				{
					type: 'number',
					label: 'Border',
					id: 'WipeBorder',
					default: 0,
					min: 0,
					max: 100,
					range: true,
				},
			],
			callback: (action) => {
				;sendCommand(ActionId.TransitionWipeBorder, ReqType.Set, [
					getOptNumber(action, 'WipeBorder'),
				])
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
				},
			],
			callback: (action) => {
				;sendCommand(ActionId.TransitionWipeFillSource, ReqType.Set, [
					getOptNumber(action, 'WipeFillSource'),
				])
			},
		},
	}
	return actions
}
function DSKActions(_self) {
	const actions = {
		[ActionId.TransitionSourceBG]: {
			name: 'Transition: Change selection',
			options: [
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
			callback: async (action) => {
				let num = 0
				let bg = action.options.Background
				let key = action.options.Key
				if (key === true) {
					num += 1
				}
				if (bg === true) {
					num += 1 << 2
				}
				await sendCommand(ActionId.TransitionSource, ReqType.Set, [num])
			},
		},
		[ActionId.TransitionSource]: {
			name: 'Next Transition:Set Transition Key Switch',
			options: [
				{
					type: 'dropdown',
					label: 'Switch',
					id: 'KeySwitch',
					choices: KeySwitchChoices,
					default: 2,
				},
			],
			callback: async (action) => {
				let seleOptions = action.options.KeySwitch
				if (seleOptions && Array.isArray(seleOptions)) {
					let arratOptions = Array.from(seleOptions)
					//console.log(arratOptions);
					//const newProps: TransitionKeyeState = { M_Key: false, DSK: false, BKGD: false };
					let keyState = _self.states.TKeyeState
					let num = 0
					if (keyState.M_Key === true) {
						num += 1
					}
					if (keyState.DSK === true) {
						num += 1 << 1
					}
					if (keyState.BKGD === true) {
						num += 1 << 2
					}
					//console.log(num);
					if (arratOptions.includes(0)) {
						if (keyState.M_Key === true) {
							num -= 1
						} else {
							num += 1
						}
					}
					if (arratOptions.includes(1)) {
						if (keyState.DSK === true) {
							num -= 1 << 1
						} else {
							num += 1 << 1
						}
					}
					if (arratOptions.includes(2)) {
						if (keyState.BKGD === true) {
							num -= 1 << 2
						} else {
							num += 1 << 2
						}
					}
					//console.log(num);
					await sendCommand(ActionId.TransitionSource, ReqType.Set, [num])
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
					choices: [
						{ id: 0, label: 'Off' },
						{ id: 1, label: 'On Air' },
						{ id: 2, label: 'Toggle' },
					],
					default: 2,
				},
			],
			callback: async (action) => {
				//_self.states.keyOnAir = true;
				let opt = getOptNumber(action, 'KeyOnAir')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.TKeyeState.KeyOnAir === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.KeyOnAir, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.KeyOnAir, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.DskOnAir]: {
			name: 'Next Transition:Set DSKOnAir',
			options: [
				{
					type: 'dropdown',
					label: 'DSK OnAir',
					id: 'DSKOnAir',
					choices: [
						{ id: 0, label: 'Off' },
						{ id: 1, label: 'On Air' },
						{ id: 2, label: 'Toggle' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'DSKOnAir')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.TKeyeState.DSKOnAir === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.DskOnAir, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.DskOnAir, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.DskSourceFillKey]: {
			name: 'DSK:Set Source And Key',
			options: [
				{
					type: 'dropdown',
					label: 'Fill',
					id: 'DSKFill',
					choices: getChoices(ActionType.DskSourceFill),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Key',
					id: 'DSKKey',
					choices: getChoices(ActionType.DskSourceFill),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskSourceFillKey, ReqType.Set, [
					getOptNumber(action, 'DSKFill'),
					getOptNumber(action, 'DSKKey'),
				])
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
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskSourceFill, ReqType.Set, [
					getOptNumber(action, 'DSKFill'),
				])
			},
		},
		[ActionId.DskSourceKey]: {
			name: 'DSK:Set Source Key',
			options: [
				{
					type: 'dropdown',
					label: 'DSK Key',
					id: 'DSKKey',
					choices: getChoices(ActionType.DskSourceFill),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskSourceKey, ReqType.Set, [
					getOptNumber(action, 'DSKKey'),
				])
			},
		},
		[ActionId.DskMaskEnable]: {
			name: 'DSK:Set Mask Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Dsk Mask Enable',
					id: 'DskMaskEnable',
					default: 2,
					choices: SwitchChoices,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'DskMaskEnable')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.DSKState.DskMask === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.DskMaskEnable, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.DskMaskEnable, ReqType.Set, [opt])
				}
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
				await sendCommand(ActionId.DskMaskHStart, ReqType.Set, [
					getOptNumber(action, 'HStart'),
				])
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
				await sendCommand(ActionId.DskMaskVStart, ReqType.Set, [
					getOptNumber(action, 'VStart'),
				])
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
				await sendCommand(ActionId.DskMaskHEnd, ReqType.Set, [
					getOptNumber(action, 'HEnd'),
				])
			},
		},
		[ActionId.DskMaskVEnd]: {
			name: 'DSK:Set Mask V End',
			options: [
				{
					type: 'number',
					label: 'V End',
					id: 'VEnd',
					default: 100,
					min: 1,
					max: 100,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskMaskVEnd, ReqType.Set, [
					getOptNumber(action, 'VEnd'),
				])
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
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'ShapedKey')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.DSKState.DskControlShapedKey === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.DskControlShapedKey, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.DskControlShapedKey, ReqType.Set, [opt])
				}
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
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskControlClip, ReqType.Set, [
					getOptNumber(action, 'Clip'),
				])
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
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskControlGain, ReqType.Set, [
					getOptNumber(action, 'Gain'),
				])
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
					choices: SwitchChoices,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'Invert')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.DSKState.DskControlInvert === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.DskControlInvert, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.DskControlInvert, ReqType.Set, [opt])
				}
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
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.DskRate, ReqType.Set, [
					getOptNumber(action, 'dskRate'),
				])
			},
		},
	}
	return actions
}
function ColorBackActions(_self) {
	const actions = {
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
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ColorHue, ReqType.Set, [
					getOptNumber(action, 'ColorHub1'),
					getOptNumber(action, 'ColorHub2'),
				])
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
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ColorSaturation, ReqType.Set, [
					getOptNumber(action, 'ColorSaturation1'),
					getOptNumber(action, 'ColorSaturation2'),
				])
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
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ColorBrightness, ReqType.Set, [
					getOptNumber(action, 'ColorBrightness1'),
					getOptNumber(action, 'ColorBrightness2'),
				])
			},
		},
	}
	return actions
}
function SuperSourceActions(_self) {
	const actions = {
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
				let opt = getOptNumber(action, 'SuperSourceEnable')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.SuperSourcePorp.SSEnable === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.SuperSourceEnable, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.SuperSourceEnable, ReqType.Set, [opt])
				}
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
				await sendCommand(ActionId.SuperSourceSource1, ReqType.Set, [
					getOptNumber(action, 'SuperSourceSource1'),
				])
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
				await sendCommand(ActionId.SuperSourceSource2, ReqType.Set, [
					getOptNumber(action, 'SuperSourceSource2'),
				])
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
				await sendCommand(ActionId.SuperSourceBackground, ReqType.Set, [
					getOptNumber(action, 'SuperSourceBackground'),
				])
			},
		},
		[ActionId.SuperSourceControlStyle]: {
			name: 'Super Source:Super Source Style',
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
				await sendCommand(ActionId.SuperSourceControlStyle, ReqType.Set, [
					getOptNumber(action, 'SuperSourceStyle'),
				])
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
				await sendCommand(ActionId.SuperSourceControlYPosition, ReqType.Set, [
					getOptNumber(action, 'SuperSourceYPosition'),
				])
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
				await sendCommand(ActionId.SuperSourceMaskEnable, ReqType.Set, [
					getOptNumber(action, 'SuperSourceMask'),
					getOptNumber(action, 'SuperSourceMaskEnable'),
				])
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
				await sendCommand(ActionId.SuperSourceMaskHStart, ReqType.Set, [
					getOptNumber(action, 'SuperSourceMask'),
					getOptNumber(action, 'SuperSourceMaskHStart'),
				])
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
				await sendCommand(ActionId.SuperSourceMaskVStart, ReqType.Set, [
					getOptNumber(action, 'SuperSourceMask'),
					getOptNumber(action, 'SuperSourceMaskVStart'),
				])
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
				await sendCommand(ActionId.SuperSourceMaskHEnd, ReqType.Set, [
					getOptNumber(action, 'SuperSourceMask'),
					getOptNumber(action, 'SuperSourceMaskHEnd'),
				])
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
				await sendCommand(ActionId.SuperSourceMaskVEnd, ReqType.Set, [
					getOptNumber(action, 'SuperSourceMask'),
					getOptNumber(action, 'SuperSourceMaskVEnd'),
				])
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
				await sendCommand(ActionId.SuperSourceBorderWidth, ReqType.Set, [
					getOptNumber(action, 'SuperSourceBorder'),
					getOptNumber(action, 'SuperSourceBorderWidth'),
				])
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
				await sendCommand(ActionId.SuperSourceBorderHue, ReqType.Set, [
					getOptNumber(action, 'SuperSourceBorder'),
					getOptNumber(action, 'SuperSourceBorderHue'),
				])
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
				await sendCommand(ActionId.SuperSourceBorderSaturation, ReqType.Set, [
					getOptNumber(action, 'SuperSourceBorder'),
					getOptNumber(action, 'SuperSourceBorderSaturation'),
				])
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
					label: 'Border Brightness',
					id: 'SuperSourceBrightness',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.SuperSourceBorderBrightness, ReqType.Set, [
					getOptNumber(action, 'SuperSourceBorder'),
					getOptNumber(action, 'SuperSourceBrightness'),
				])
			},
		},
	}
	return actions
}
function UpStreamKeyActions(_self) {
	const actions = {
		[ActionId.UpStreamKeyFillKeyType]: {
			name: 'UpStream Key:Set inputs',
			options: [
				// {
				// 	type: 'dropdown',
				// 	label: 'Key Type:',
				// 	id: 'USKType',
				// 	choices: UpStreamKeyTypeChoices,
				// 	default: 0,
				// },
				{
					type: 'dropdown',
					label: 'Fill Source',
					id: 'FillSource',
					choices: getChoices(ActionType.LumaKeySourceKey),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Key Source',
					id: 'KeySource',
					choices: getChoices(ActionType.LumaKeySourceKey),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.UpStreamKeyFillKeyType, ReqType.Set, [
					0,
					getOptNumber(action, 'FillSource'),
					getOptNumber(action, 'KeySource'),
				])
			},
		},
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
				await sendCommand(ActionId.UpStreamKeyType, ReqType.Set, [
					getOptNumber(action, 'USKType'),
				])
			},
		},
		...LumaKeyActions(_self),
		...ChromaKeyActions(_self),
		...KeyPatternActions(_self),
		...PIPActions(_self),
	}
	return actions
}
function LumaKeyActions(_self) {
	const actions = {
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
				await sendCommand(ActionId.LumaKeySourceFill, ReqType.Set, [
					getOptNumber(action, 'KeyFill'),
				])
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
				await sendCommand(ActionId.LumaKeySourceKey, ReqType.Set, [
					getOptNumber(action, 'LumaKeySourceKey'),
				])
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
				await sendCommand(ActionId.LumaKeyMaskEnable, ReqType.Set, [
					getOptNumber(action, 'LumaKeyMaskEnable'),
				])
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
				await sendCommand(ActionId.LumaKeyMaskHStart, ReqType.Set, [
					getOptNumber(action, 'LumaKeyMaskHStart'),
				])
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
				await sendCommand(ActionId.LumaKeyMaskVStart, ReqType.Set, [
					getOptNumber(action, 'LumaKeyMaskVStart'),
				])
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
				await sendCommand(ActionId.LumaKeyMaskHEnd, ReqType.Set, [
					getOptNumber(action, 'LumaKeyMaskHEnd'),
				])
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
				await sendCommand(ActionId.LumaKeyMaskVEnd, ReqType.Set, [
					getOptNumber(action, 'LumaKeyMaskVEnd'),
				])
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
				await sendCommand(ActionId.LumaKeyControlShapedKey, ReqType.Set, [
					getOptNumber(action, 'LumaKeyControlShapedKey'),
				])
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
				await sendCommand(ActionId.LumaKeyControlClip, ReqType.Set, [
					getOptNumber(action, 'LumaKeyControlClip'),
				])
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
				await sendCommand(ActionId.LumaKeyControlGain, ReqType.Set, [
					getOptNumber(action, 'LumaKeyControlGain'),
				])
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
				await sendCommand(ActionId.LumaKeyControlInvert, ReqType.Set, [
					getOptNumber(action, 'LumaKeyControlInvert'),
				])
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
				await sendCommand(ActionId.LumaKeyResizeEnable, ReqType.Set, [
					getOptNumber(action, 'LumaKeyResizeEnable'),
				])
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
				let value = 0.25
				let info = KeyResizeSizeChoices.find((s) => s.id === action.options.LumaKeyResizeSize)
				if (info !== null && info !== undefined) {
					value = Number(info.label)
				}
				await sendCommand(ActionId.LumaKeyResizeSize, ReqType.Set, [value])
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
				await sendCommand(ActionId.LumaKeyResizeXPosition, ReqType.Set, [
					getOptNumber(action, 'LumaKeyResizeXPosition'),
				])
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
				await sendCommand(ActionId.LumaKeyResizeYPosition, ReqType.Set, [
					getOptNumber(action, 'LumaKeyResizeYPosition'),
				])
			},
		},
	}
	return actions
}
function ChromaKeyActions(_self) {
	const actions = {
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
				await sendCommand(ActionId.ChromaKeyFill, ReqType.Set, [
					getOptNumber(action, 'KeyFill'),
				])
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
				await sendCommand(ActionId.ChromaKeyMaskEnable, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyMaskEnable'),
				])
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
				await sendCommand(ActionId.ChromaKeyMaskHStart, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyMaskHStart'),
				])
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
				await sendCommand(ActionId.ChromaKeyMaskVStart, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyMaskVStart'),
				])
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
				await sendCommand(ActionId.ChromaKeyMaskHEnd, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyMaskHEnd'),
				])
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
				await sendCommand(ActionId.ChromaKeyMaskVEnd, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyMaskVEnd'),
				])
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
				await sendCommand(ActionId.ChromaKeyResizeEnable, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyResizeEnable'),
				])
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
				let value = 0.25
				let info = KeyResizeSizeChoices.find((s) => s.id === action.options.ChromaKeyResizeSize)
				if (info !== null && info !== undefined) {
					value = Number(info.label)
				}
				await sendCommand(ActionId.ChromaKeyResizeSize, ReqType.Set, [value])
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
				await sendCommand(ActionId.ChromaKeyResizeXPosition, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyResizeXPosition'),
				])
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
				await sendCommand(ActionId.ChromaKeyResizeYPosition, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyResizeYPosition'),
				])
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
				await sendCommand(ActionId.ChromaKeyControlSMPXPosition, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyControlSMPXPosition'),
				])
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
				await sendCommand(ActionId.ChromaKeyControlSMPYPosition, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyControlSMPYPosition'),
				])
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
				await sendCommand(ActionId.ChromaKeyControlSample, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyControlSample'),
				])
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
                await sendCommand( ActionId.ChromaKeyControlSample, ReqType.Set, [getOptNumber(action, 'ChromaKeyControlSample')]);
            }, */
			callback: async () => {
				//await sendCommand( ActionId.ChromaKeyControlSample, ReqType.Set, [getOptNumber(action, 'ChromaKeyControlSample')]);
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
				await sendCommand(ActionId.ChromaKeyControlForeground, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyControlForeground'),
				])
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
				await sendCommand(ActionId.ChromaKeyControlBackground, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyControlBackground'),
				])
			},
		},
		[ActionId.ChromaKeyControlKeyEdge]: {
			name: 'UpStream Key:Set Chroma Key Edge',
			options: [
				{
					type: 'number',
					label: 'Key Edge',
					id: 'ChromaKeyControlKeyEdge',
					min: 0,
					max: 100,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.ChromaKeyControlKeyEdge, ReqType.Set, [
					getOptNumber(action, 'ChromaKeyControlKeyEdge'),
				])
			},
		},
	}
	return actions
}
function KeyPatternActions(_self) {
	const actions = {
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
				await sendCommand(ActionId.KeyPatternSourceFill, ReqType.Set, [
					getOptNumber(action, 'KeyFill'),
				])
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
				await sendCommand(ActionId.KeyPatternWipePattern, ReqType.Set, [
					getOptNumber(action, 'KeyPatternWipePattern'),
				])
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
				await sendCommand(ActionId.KeyPatternWipeSize, ReqType.Set, [
					getOptNumber(action, 'KeyPatternWipeSize'),
				])
			},
		},
		[ActionId.KeyPatternWipeXPosition]: {
			name: 'UpStream Key:Set Key Pattern wipe X Position',
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
				await sendCommand(ActionId.KeyPatternWipeXPosition, ReqType.Set, [
					getOptNumber(action, 'KeyPatternWipeXPosition'),
				])
			},
		},
		[ActionId.KeyPatternWipeYPosition]: {
			name: 'UpStream Key:Set Key Pattern wipe Y Position',
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
				await sendCommand(ActionId.KeyPatternWipeYPosition, ReqType.Set, [
					getOptNumber(action, 'KeyPatternWipeYPosition'),
				])
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
				await sendCommand(ActionId.KeyPatternWipeSymmetry, ReqType.Set, [
					getOptNumber(action, 'KeyPatternWipeSymmetry'),
				])
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
				await sendCommand(ActionId.KeyPatternWipeSoftness, ReqType.Set, [
					getOptNumber(action, 'KeyPatternWipeSoftness'),
				])
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
				await sendCommand(ActionId.KeyPatternMaskEnable, ReqType.Set, [
					getOptNumber(action, 'KeyPatternMaskEnable'),
				])
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
				await sendCommand(ActionId.KeyPatternMaskHStart, ReqType.Set, [
					getOptNumber(action, 'KeyPatternMaskHStart'),
				])
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
				await sendCommand(ActionId.KeyPatternMaskVStart, ReqType.Set, [
					getOptNumber(action, 'KeyPatternMaskVStart'),
				])
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
				await sendCommand(ActionId.KeyPatternMaskHEnd, ReqType.Set, [
					getOptNumber(action, 'KeyPatternMaskHEnd'),
				])
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
				await sendCommand(ActionId.KeyPatternMaskVEnd, ReqType.Set, [
					getOptNumber(action, 'KeyPatternMaskVEnd'),
				])
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
				await sendCommand(ActionId.KeyPatternResizeEnable, ReqType.Set, [
					getOptNumber(action, 'KeyPatternResizeEnable'),
				])
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
				let value = 0.25
				let info = KeyResizeSizeChoices.find((s) => s.id === action.options.KeyPatternResizeSize)
				if (info !== null && info !== undefined) {
					value = Number(info.label)
				}
				await sendCommand(ActionId.KeyPatternResizeSize, ReqType.Set, [value])
			},
		},
		[ActionId.KeyPatternResizeXPosition]: {
			name: 'UpStream Key:Set Key Pattern Resize X Position',
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
				await sendCommand(ActionId.KeyPatternResizeXPosition, ReqType.Set, [
					getOptNumber(action, 'KeyPatternResizeXPosition'),
				])
			},
		},
		[ActionId.KeyPatternResizeYPosition]: {
			name: 'UpStream Key:Set Key Pattern Resize Y Position',
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
				await sendCommand(ActionId.KeyPatternResizeYPosition, ReqType.Set, [
					getOptNumber(action, 'KeyPatternResizeYPosition'),
				])
			},
		},
	}
	return actions
}
function PIPActions(_self) {
	const actions = {
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
				await sendCommand(ActionId.PipSource, ReqType.Set, [
					getOptNumber(action, 'KeyFill'),
				])
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
				let value = 0
				let info = KeyResizeSizeChoices.find((s) => s.id === action.options.PipSize)
				if (info !== null && info !== undefined) {
					value = Number(info.id)
				}
				await sendCommand(ActionId.PipSize, ReqType.Set, [value])
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
				await sendCommand(ActionId.PipXPosition, ReqType.Set, [
					getOptNumber(action, 'PipXPosition'),
				])
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
				await sendCommand(ActionId.PipYPosition, ReqType.Set, [
					getOptNumber(action, 'PipYPosition'),
				])
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
				await sendCommand(ActionId.PipMaskEnable, ReqType.Set, [
					getOptNumber(action, 'PipMaskEnable'),
				])
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
				await sendCommand(ActionId.PipMaskHStart, ReqType.Set, [
					getOptNumber(action, 'PipMaskHStart'),
				])
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
				await sendCommand(ActionId.PipMaskVStart, ReqType.Set, [
					getOptNumber(action, 'PipMaskVStart'),
				])
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
				await sendCommand(ActionId.PipMaskHEnd, ReqType.Set, [
					getOptNumber(action, 'PipMaskHEnd'),
				])
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
				await sendCommand(ActionId.PipMaskVEnd, ReqType.Set, [
					getOptNumber(action, 'PipMaskVEnd'),
				])
			},
		},
		[ActionId.PipBorderEnable]: {
			name: 'UpStream Key:Set Pip Border Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'PipBorderEnable',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.PipBorderEnable, ReqType.Set, [
					getOptNumber(action, 'PipBorderEnable'),
				])
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
				await sendCommand(ActionId.PipBorderWidth, ReqType.Set, [
					getOptNumber(action, 'PipBorderWidth'),
				])
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
				await sendCommand(ActionId.PipBorderHue, ReqType.Set, [
					getOptNumber(action, 'PipBorderHue'),
				])
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
				await sendCommand(ActionId.PipBorderSaturation, ReqType.Set, [
					getOptNumber(action, 'PipBorderSaturation'),
				])
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
				await sendCommand(ActionId.PipBorderBrightness, ReqType.Set, [
					getOptNumber(action, 'PipBorderBrightness'),
				])
			},
		},
	}
	return actions
}
function AudioMixerActions(_self) {
	const actions = {
		[ActionId.AudioTransition]: {
			name: 'Audio Mixer:Set audio fade in and out switch',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'AudioTrans',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'AudioTrans')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.AudioMixerPorp.AudioTransition === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.AudioTransition, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.AudioTransition, ReqType.Set, [opt])
				}
			},
		},
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
				await sendCommand(ActionId.AudioFader, ReqType.Set, [
					getOptNumber(action, 'ASource'),
					getOptNumber(action, 'AudioFader'),
				])
			},
		},
		[ActionId.AudioBalance]: {
			name: 'Audio Mixer:Set Audio Balance',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: getChoices(ActionType.AudioEnableSource),
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
				await sendCommand(ActionId.AudioBalance, ReqType.Set, [
					getOptNumber(action, 'ASource'),
					getOptNumber(action, 'AudioBalance'),
				])
			},
		},
		[ActionId.AudioInput]: {
			name: 'Audio Mixer:Set Audio Input',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: getChoices(ActionType.AudioEnableSource),
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
				await sendCommand(ActionId.AudioInput, ReqType.Set, [
					getOptNumber(action, 'ASource'),
					getOptNumber(action, 'AudioInput'),
				])
			},
		},
		[ActionId.AudioEnable]: {
			name: 'Audio Mixer:Set Mic Audio Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: AudioMicChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'AudioEnable',
					choices: [
						{ id: 0, label: 'off' },
						{ id: 1, label: 'on' },
						{ id: 2, label: 'Toggle' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				let opt1 = getOptNumber(action, 'ASource')
				let opt2 = getOptNumber(action, 'AudioEnable')
				let paramOpt = 0
				if (opt2 === 2) {
					if (opt1 === 0) {
						if (_self.states.AudioMixerPorp.AudioEnable.mic1 === 1) {
							paramOpt = 0
						} else {
							paramOpt = 1
						}
					} else {
						if (_self.states.AudioMixerPorp.AudioEnable.mic2 === 1) {
							paramOpt = 0
						} else {
							paramOpt = 1
						}
					}
					await sendCommand(ActionId.AudioEnable, ReqType.Set, [opt1, paramOpt])
				} else {
					await sendCommand(ActionId.AudioEnable, ReqType.Set, [opt1, opt2])
				}
			},
		},
		[ActionId.AudioEnable1]: {
			name: 'Audio Mixer:Set Input Audio Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'ASource',
					choices: AudioInputSourcesChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'AudioEnable',
					choices: [
						{ id: 0, label: 'off' },
						{ id: 1, label: 'on' },
						{ id: 2, label: 'afv' },
						{ id: 3, label: 'Toggle' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				let opt1 = getOptNumber(action, 'AudioEnable')
				let opt2 = getOptNumber(action, 'ASource')
				let paramOpt = 0
				if (opt1 === 3) {
					if (opt2 === 2) {
						if (_self.states.AudioMixerPorp.AudioEnable.in1 === 0) {
							paramOpt = 1
						} else if (_self.states.AudioMixerPorp.AudioEnable.in1 === 1) {
							paramOpt = 2
						} else {
							paramOpt = 0
						}
					} else if (opt2 == 3) {
						if (_self.states.AudioMixerPorp.AudioEnable.in2 === 0) {
							paramOpt = 1
						} else if (_self.states.AudioMixerPorp.AudioEnable.in2 === 1) {
							paramOpt = 2
						} else {
							paramOpt = 0
						}
					} else if (opt2 == 4) {
						if (_self.states.AudioMixerPorp.AudioEnable.in3 === 0) {
							paramOpt = 1
						} else if (_self.states.AudioMixerPorp.AudioEnable.in3 === 1) {
							paramOpt = 2
						} else {
							paramOpt = 0
						}
					} else if (opt2 == 5) {
						if (_self.states.AudioMixerPorp.AudioEnable.in4 === 0) {
							paramOpt = 1
						} else if (_self.states.AudioMixerPorp.AudioEnable.in4 === 1) {
							paramOpt = 2
						} else {
							paramOpt = 0
						}
					} else if (opt2 == 6) {
						if (_self.states.AudioMixerPorp.AudioEnable.aux === 0) {
							paramOpt = 1
						} else if (_self.states.AudioMixerPorp.AudioEnable.aux === 1) {
							paramOpt = 2
						} else {
							paramOpt = 0
						}
					}
					await sendCommand(ActionId.AudioEnable, ReqType.Set, [opt2, paramOpt])
				} else {
					await sendCommand(ActionId.AudioEnable, ReqType.Set, [opt2, opt1])
				}
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
				await sendCommand(ActionId.AudioDelay, ReqType.Set, [
					getOptNumber(action, 'ASource'),
					getOptNumber(action, 'AudioDelay'),
				])
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
				await sendCommand(ActionId.AudioMonitorLevel, ReqType.Set, [
					getOptNumber(action, 'AudioLevel'),
				])
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
				await sendCommand(ActionId.AudioMonitorSource, ReqType.Set, [
					getOptNumber(action, 'AudioSource'),
				])
			},
		},
	}
	return actions
}
function StillGeneratorActions(_self) {
	const actions = {
		[ActionId.StillSelection]: {
			name: 'Still:Select pic index',
			options: [
				{
					type: 'dropdown',
					label: 'Still',
					id: 'Stillindex',
					choices: [
						{ id: 0, label: 'Still1' },
						{ id: 1, label: 'Still2' },
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Pic index (0-31)',
					id: 'PicIndex',
					choices: getChoicesByStill(),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.StillSelection, ReqType.Set, [
					getOptNumber(action, 'Stillindex'),
					getOptNumber(action, 'PicIndex'),
				])
			},
		},
	}
	return actions
}
function MacroActions(_self) {
	const actions = {
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
				await sendCommand(ActionId.RemoveMacro, ReqType.Set, [
					getOptNumber(action, 'MacroIndex'),
				])
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
				await sendCommand(ActionId.MacroSleep, ReqType.Set, [
					getOptNumber(action, 'MacroSleep'),
				])
			},
		},
	}
	return actions
}
function StreamingActions(_self) {
	const actions = {
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
					label: 'Enable',
					id: 'EnableId',
					choices: SwitchChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				let opt1 = getOptNumber(action, 'StreamID')
				let opt2 = getOptNumber(action, 'EnableId')
				let paramOpt = 0
				if (opt2 === 2) {
					if (opt1 === 0) {
						paramOpt = _self.states.StreamingProp.stream1 === true ? 0 : 1
					} else if (opt1 === 1) {
						paramOpt = _self.states.StreamingProp.stream2 === true ? 0 : 1
					} else if (opt1 === 2) {
						paramOpt = _self.states.StreamingProp.stream3 === true ? 0 : 1
					} else {
					}
					await sendCommand(ActionId.StreamOutput, ReqType.Set, [opt1, paramOpt])
				} else {
					await sendCommand(ActionId.StreamOutput, ReqType.Set, [opt1, opt2])
				}
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
				await sendCommand(ActionId.StreamOutput, ReqType.Set, [
					getOptNumber(action, 'StreamID'),
					getOptString(action, 'StreamUrl'),
				])
			},
		},
	}
	return actions
}
function PlaybackActions(_self) {
	const actions = {
		[ActionId.PlayModeRepeatPause]: {
			name: 'Playback:Set playback Info',
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
				{
					type: 'dropdown',
					label: 'repeat',
					id: 'repeatId',
					choices: [
						{ id: 0, label: 'Off' },
						{ id: 1, label: 'On' },
					],
					default: 2,
				},
				{
					type: 'dropdown',
					label: 'pause',
					id: 'pauseId',
					choices: [
						{ id: 0, label: 'stop' },
						{ id: 1, label: 'start' },
						{ id: 2, label: 'Toggle' },
					],
					default: 2,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'pauseId')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.PlayBackState.PlaybackPause === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.PlayModeRepeatPause, ReqType.Set, [
						getOptNumber(action, 'ModeID'),
						getOptNumber(action, 'repeatId'),
						paramOpt,
					])
				} else {
					;sendCommand(ActionId.PlayModeRepeatPause, ReqType.Set, [
						getOptNumber(action, 'ModeID'),
						getOptNumber(action, 'repeatId'),
						opt,
					])
				}
			},
		},
		[ActionId.PlaybackMode]: {
			name: 'Playback:Set playback Mode',
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
			callback: async (action) => {
				await sendCommand(ActionId.PlaybackMode, ReqType.Set, [
					getOptNumber(action, 'ModeID'),
				])
			},
		},
		[ActionId.PlayFile]: {
			name: 'Playback:Set selected file',
			options: [
				{
					type: 'dropdown',
					label: 'PlayFile',
					id: 'PlayFileID',
					required: true,
					choices: _self.states.PlayBackState.PlayFileList.map((s, index) => ({
							id: index,
							label: s,
						})),
					default: 0,
				},
			],
			callback: async (action) => {
				let opt = action.options.PlayFileID
				await sendCommand(ActionId.PlayFile, ReqType.Set, [
					_self.states.PlayBackState.PlayFileList[opt],
				])
			},
		},
		[ActionId.PlaybackRepeat]: {
			name: 'Playback:Set playback Repeat',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'EnableID',
					choices: SwitchChoices,
					default: 2,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'EnableID')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.PlayBackState.PlaybackRepeat === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.PlaybackRepeat, ReqType.Set, [paramOpt])
				} else {
					;sendCommand(ActionId.PlaybackRepeat, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.PlaybackPause]: {
			name: 'Playback:Set playback Pause',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'EnableID',
					choices: [
						{ id: 0, label: 'stop' },
						{ id: 1, label: 'start' },
						{ id: 2, label: 'Toggle' },
					],
					default: 2,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'EnableID')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.PlayBackState.PlaybackPause === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.PlaybackPause, ReqType.Set, [paramOpt])
				} else {
					;sendCommand(ActionId.PlaybackPause, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.PlaybackBar]: {
			name: 'Playback:Set playback Bar',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'EnableID',
					choices: SwitchChoices,
					default: 2,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'EnableID')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.PlayBackState.PlaybackBar === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.PlaybackBar, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.PlaybackBar, ReqType.Set, [opt])
				}
			},
		},
	}
	return actions
}
function SettingsActions(_self) {
	const actions = {
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
				let src = getOptNumber(action, 'SrcID')
				let enable = getOptNumber(action, 'MvMeterEnable')
				if (enable === 2) {
					// Toggle
					enable = _self.states.SettingsProp.MvMeter[src] === 1 ? 0 : 1
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
				await sendCommand(ActionId.MvLayout, ReqType.Set, [
					getOptNumber(action, 'MvLayout'),
				])
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
				await sendCommand(ActionId.InputWindowLayout, ReqType.Set, [
					getOptNumber(action, 'StyleId'),
				])
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
				await sendCommand(ActionId.Marker, ReqType.Set, [
					getOptNumber(action, 'Marker'),
				])
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
				await sendCommand(ActionId.RecordFileName, ReqType.Set, [
					getOptString(action, 'RecordFileName'),
				])
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
				await sendCommand(ActionId.AuxSource, ReqType.Set, [
					getOptNumber(action, 'auxSourceID'),
				])
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
				await sendCommand(ActionId.OutFormat, ReqType.Set, [
					getOptNumber(action, 'OutFormat'),
				])
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
	return actions
}
function RecordActions(_self) {
	const actions = {
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
						{ id: '2', label: 'Toggle' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'Record')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.RecordState === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.Record, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.Record, ReqType.Set, [opt])
				}
			},
		},
	}
	return actions
}
function LiveActions(_self) {
	const actions = {
		[ActionId.Live]: {
			name: 'Live:Set Start or Stop Live',
			options: [
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'LiveEnable',
					choices: [
						{ id: 0, label: 'Stop' },
						{ id: 1, label: 'Start' },
						{ id: 2, label: 'Toggle' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'LiveEnable')
				let paramOpt = 0
				if (opt === 2) {
					if (_self.states.LiveState === 0) {
						paramOpt = 1
					} else {
						paramOpt = 0
					}
					await sendCommand(ActionId.Live, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.Live, ReqType.Set, [opt])
				}
			},
		},
	}
	return actions
}
function getOptNumber(action : any, key : string, defVal? : any) {
	const rawVal = action.options[key]
	if (defVal !== undefined && rawVal === undefined) return defVal
	const val = Number(rawVal)
	if (isNaN(val)) {
		throw new Error(`Invalid option '${key}'`)
	}
	return val
}
function getOptString(action : any, key : any, defVal? : any) {
	const rawVal = action.options[key]
	if (defVal !== undefined && rawVal === undefined) return defVal
	const val = String(rawVal)
	if (typeof rawVal !== 'string') {
		throw new Error(`Invalid option '${key}'`)
	}
	return val
}

export { actions }
