"use strict"

//Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.actions = void 0;
const base_1 = require("@companion-module/base");
const connection_1 = require(/*! ./connection */ "./connection.js");
const choices_1 = require(/*! ./choices */ "./choices.js");
const enums_1 = require(/*! ./enums */ "./enums.js");
const model_1 = require(/*! ./model */ "./model.js");
//import { TransitionKeyeState } from './state'
/**
 * Returns all implemented actions.
 * @param self reference to the BaseInstance
 * @constructor
 * @returns CompanionActions
 */
function actions(_self) {
    const actions = {
        [enums_1.ActionId.PgmIndex]: {
            name: 'Set PGM Source',
            options: [
                {
                    type: 'dropdown',
                    label: 'Source',
                    id: 'Source',
                    default: enums_1.SourceType.Input1,
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.Program),
                }
            ],
            callback: async (action) => {
                //var source = getChoices(ActionType.Program);
                var id = getOptNumber(action, 'Source');
                // var select = source.find(s => s.id === id);
                // if (select !== undefined) {
                // 	_self.states.selectPgmInput = select;
                // }
                await (0, connection_1.sendCommand)(enums_1.ActionId.PgmIndex, enums_1.ReqType.Set, [id]);
            },
        },
        [enums_1.ActionId.PvwIndex]: {
            name: 'Set PVW Source',
            options: [
                {
                    type: 'dropdown',
                    label: 'Source',
                    id: 'Source',
                    default: enums_1.SourceType.Input1,
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.Preview),
                }
            ],
            callback: async (action) => {
                //var source = getChoices(ActionType.Preview);
                var id = getOptNumber(action, 'Source');
                // var select = source.find(s => s.id === id);
                // _self.log('info', id.toString());
                // if (select !== undefined) {
                // 	_self.states.selectPrevInput = select;
                // }
                await (0, connection_1.sendCommand)(enums_1.ActionId.PvwIndex, enums_1.ReqType.Set, [id]);
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
    };
    return actions;
}
exports.actions = actions;
function TransitionActions(_self) {
    const actions = {
        [enums_1.ActionId.CutTransition]: {
            name: 'Perform CUT transition',
            options: [],
            callback: async () => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.CutTransition, enums_1.ReqType.Set);
                //_self.states.
                //await sendCommand(ActionId.PgmIndex, ReqType.Get);
                //await sendCommand(ActionId.PvwIndex, ReqType.Get);
            },
        },
        [enums_1.ActionId.AutoTransition]: {
            name: 'Perform AUTO transition',
            options: [],
            callback: async () => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.AutoTransition, enums_1.ReqType.Set);
                //await sendCommand(ActionId.PgmIndex, ReqType.Get);
                //await sendCommand(ActionId.PvwIndex, ReqType.Get);
            },
        },
        [enums_1.ActionId.FTB]: {
            name: 'Perform FTB Transition',
            options: [],
            callback: async () => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.FTB, enums_1.ReqType.Set);
                //await sendCommand(ActionId.FTB, ReqType.Get);
            },
        },
        [enums_1.ActionId.FtbAudioAFV]: {
            name: 'Perform FTB Transition,Audio follows video and pops in',
            options: [
                {
                    type: 'dropdown',
                    label: 'FTB Audio AFV',
                    id: 'FtbAudioAFV',
                    default: 0,
                    choices: model_1.SwitchChoices,
                }
            ],
            callback: (action) => {
                let opt = getOptNumber(action, 'FtbAudioAFV');
                let paramOpt = 0;
                if (opt === 2) {
                    if (_self.states.fadeToBlack.AFV === true) {
                        paramOpt = 0;
                    }
                    else {
                        paramOpt = 1;
                    }
                    (0, connection_1.sendCommand)(enums_1.ActionId.FtbAudioAFV, enums_1.ReqType.Set, [paramOpt]);
                }
                else {
                    (0, connection_1.sendCommand)(enums_1.ActionId.FtbAudioAFV, enums_1.ReqType.Set, [opt]);
                }
                //sendCommand(ActionId.FtbAudioAFV, ReqType.Set, [getOptNumber(action, 'FtbAudioAFV')]);
            },
        },
        [enums_1.ActionId.FtbRate]: {
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
                }
            ],
            callback: (action) => {
                (0, connection_1.sendCommand)(enums_1.ActionId.FtbRate, enums_1.ReqType.Set, [getOptNumber(action, 'FtbRate')]);
            },
        },
        [enums_1.ActionId.Prev]: {
            name: 'Preview switch',
            options: [
                {
                    type: 'dropdown',
                    label: 'PREV',
                    id: 'prevEnable',
                    default: 2,
                    choices: model_1.SwitchChoices,
                }
            ],
            callback: (action) => {
                let opt = getOptNumber(action, 'prevEnable');
                let paramOpt = 0;
                if (opt === 2) {
                    if (_self.states.selectTransitionStyle.PrevState === true) {
                        paramOpt = 0;
                    }
                    else {
                        paramOpt = 1;
                    }
                    (0, connection_1.sendCommand)(enums_1.ActionId.Prev, enums_1.ReqType.Set, [paramOpt]);
                }
                else {
                    (0, connection_1.sendCommand)(enums_1.ActionId.Prev, enums_1.ReqType.Set, [opt]);
                }
            },
        },
        [enums_1.ActionId.TransitionIndex]: {
            name: 'Transition: Set style/pattern',
            options: [
                {
                    type: 'dropdown',
                    label: 'Transition Style',
                    id: 'TransitionStyle',
                    default: enums_1.TransitionStyle.MIX,
                    choices: model_1.TransitionStyleChoice,
                }
            ],
            callback: (action) => {
                (0, connection_1.sendCommand)(enums_1.ActionId.TransitionIndex, enums_1.ReqType.Set, [getOptNumber(action, 'TransitionStyle')]);
                //sendCommand(ActionId.TransitionIndex, ReqType.Get);
            },
        },
        [enums_1.ActionId.TransitionRate]: {
            name: 'Transition: Change rate',
            options: [
                {
                    type: 'dropdown',
                    label: 'Transition Style',
                    id: 'TransitionStyle',
                    default: enums_1.TransitionStyle.MIX,
                    choices: model_1.TransitionStyleChoice,
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
                (0, connection_1.sendCommand)(enums_1.ActionId.TransitionRate, enums_1.ReqType.Set, [getOptNumber(action, 'TransitionStyle'), getOptNumber(action, 'TransitionRate')]);
            },
        },
        [enums_1.ActionId.TransitionDipSource]: {
            name: 'Transition:Change Dip Source',
            options: [
                {
                    type: 'dropdown',
                    label: 'Change Dip Source',
                    id: 'TransitionDipSource',
                    default: 0,
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.TransitionDipSource),
                }
            ],
            callback: (action) => {
                (0, connection_1.sendCommand)(enums_1.ActionId.TransitionDipSource, enums_1.ReqType.Set, [getOptNumber(action, 'TransitionDipSource')]);
            },
        },
        [enums_1.ActionId.TransitionWipeXPosition]: {
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
                (0, connection_1.sendCommand)(enums_1.ActionId.TransitionWipeXPosition, enums_1.ReqType.Set, [getOptNumber(action, 'XPosition')]);
            },
        },
        [enums_1.ActionId.TransitionWipeYPosition]: {
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
                (0, connection_1.sendCommand)(enums_1.ActionId.TransitionWipeYPosition, enums_1.ReqType.Set, [getOptNumber(action, 'YPosition')]);
            },
        },
        [enums_1.ActionId.TransitionWipeDirection]: {
            name: 'Transition:Change Wipe Style Direction',
            options: [
                {
                    type: 'dropdown',
                    label: 'Change Wipe Style Direction',
                    id: 'WipeDirection',
                    default: 0,
                    choices: model_1.WipeDirectionChoices,
                }
            ],
            callback: (action) => {
                (0, connection_1.sendCommand)(enums_1.ActionId.TransitionWipeDirection, enums_1.ReqType.Set, [getOptNumber(action, 'WipeDirection')]);
            },
        },
        [enums_1.ActionId.TransitionWipeSymmetry]: {
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
                (0, connection_1.sendCommand)(enums_1.ActionId.TransitionWipeSymmetry, enums_1.ReqType.Set, [getOptNumber(action, 'WipeSymmetry')]);
            },
        },
        [enums_1.ActionId.TransitionWipeSoftness]: {
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
                }
            ],
            callback: (action) => {
                (0, connection_1.sendCommand)(enums_1.ActionId.TransitionWipeSoftness, enums_1.ReqType.Set, [getOptNumber(action, 'WipeSoftness')]);
            },
        },
        [enums_1.ActionId.TransitionWipeBorder]: {
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
                }
            ],
            callback: (action) => {
                (0, connection_1.sendCommand)(enums_1.ActionId.TransitionWipeBorder, enums_1.ReqType.Set, [getOptNumber(action, 'WipeBorder')]);
            },
        },
        [enums_1.ActionId.TransitionWipeFillSource]: {
            name: 'Transition:Change Wipe Style Fill Source',
            options: [
                {
                    type: 'dropdown',
                    label: 'Fill Source',
                    id: 'WipeFillSource',
                    default: 0,
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.TransitionWipeFillSource),
                }
            ],
            callback: (action) => {
                (0, connection_1.sendCommand)(enums_1.ActionId.TransitionWipeFillSource, enums_1.ReqType.Set, [getOptNumber(action, 'WipeFillSource')]);
            },
        },
    };
    return actions;
}
function DSKActions(_self) {
    const actions = {
        [enums_1.ActionId.TransitionSourceBG]: {
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
                }
            ],
            callback: async (action) => {
                let num = 0;
                let bg = action.options.Background;
                let key = action.options.Key;
                if (key === true) {
                    num += 1;
                }
                if (bg === true) {
                    num += (1 << 2);
                }
                await (0, connection_1.sendCommand)(enums_1.ActionId.TransitionSource, enums_1.ReqType.Set, [num]);
            },
        },
        [enums_1.ActionId.TransitionSource]: {
            name: 'Next Transition:Set Transition Key Switch',
            options: [
                {
                    type: 'dropdown',
                    label: 'Switch',
                    id: 'KeySwitch',
                    choices: model_1.KeySwitchChoices,
                    default: 2,
                }
            ],
            callback: async (action) => {
                let seleOptions = action.options.KeySwitch;
                if (seleOptions && Array.isArray(seleOptions)) {
                    let arratOptions = Array.from(seleOptions);
                    //console.log(arratOptions);
                    //const newProps: TransitionKeyeState = { M_Key: false, DSK: false, BKGD: false };
                    let keyState = _self.states.TKeyeState;
                    let num = 0;
                    if (keyState.M_Key === true) {
                        num += 1;
                    }
                    if (keyState.DSK === true) {
                        num += (1 << 1);
                    }
                    if (keyState.BKGD === true) {
                        num += (1 << 2);
                    }
                    //console.log(num);
                    if (arratOptions.includes(0)) {
                        if (keyState.M_Key === true) {
                            num -= 1;
                        }
                        else {
                            num += 1;
                        }
                    }
                    if (arratOptions.includes(1)) {
                        if (keyState.DSK === true) {
                            num -= (1 << 1);
                        }
                        else {
                            num += (1 << 1);
                        }
                    }
                    if (arratOptions.includes(2)) {
                        if (keyState.BKGD === true) {
                            num -= (1 << 2);
                        }
                        else {
                            num += (1 << 2);
                        }
                    }
                    //console.log(num);
                    await (0, connection_1.sendCommand)(enums_1.ActionId.TransitionSource, enums_1.ReqType.Set, [num]);
                }
            },
        },
        [enums_1.ActionId.KeyOnAir]: {
            name: 'Next Transition:Set KeyOnAir',
            options: [
                {
                    type: 'dropdown',
                    label: 'Key OnAir',
                    id: 'KeyOnAir',
                    choices: [
                        { id: 0, label: 'Off' },
                        { id: 1, label: 'On Air' },
                        { id: 2, label: 'Toggle' }
                    ],
                    default: 2,
                }
            ],
            callback: async (action) => {
                //_self.states.keyOnAir = true;
                let opt = getOptNumber(action, 'KeyOnAir');
                let paramOpt = 0;
                if (opt === 2) {
                    if (_self.states.TKeyeState.KeyOnAir === true) {
                        paramOpt = 0;
                    }
                    else {
                        paramOpt = 1;
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.KeyOnAir, enums_1.ReqType.Set, [paramOpt]);
                }
                else {
                    await (0, connection_1.sendCommand)(enums_1.ActionId.KeyOnAir, enums_1.ReqType.Set, [opt]);
                }
            },
        },
        [enums_1.ActionId.DskOnAir]: {
            name: 'Next Transition:Set DSKOnAir',
            options: [
                {
                    type: 'dropdown',
                    label: 'DSK OnAir',
                    id: 'DSKOnAir',
                    choices: [
                        { id: 0, label: 'Off' },
                        { id: 1, label: 'On Air' },
                        { id: 2, label: 'Toggle' }
                    ],
                    default: 0,
                }
            ],
            callback: async (action) => {
                let opt = getOptNumber(action, 'DSKOnAir');
                let paramOpt = 0;
                if (opt === 2) {
                    if (_self.states.TKeyeState.DSKOnAir === true) {
                        paramOpt = 0;
                    }
                    else {
                        paramOpt = 1;
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.DskOnAir, enums_1.ReqType.Set, [paramOpt]);
                }
                else {
                    await (0, connection_1.sendCommand)(enums_1.ActionId.DskOnAir, enums_1.ReqType.Set, [opt]);
                }
            },
        },
        [enums_1.ActionId.DskSourceFillKey]: {
            name: 'DSK:Set Source And Key',
            options: [
                {
                    type: 'dropdown',
                    label: 'Fill',
                    id: 'DSKFill',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.DskSourceFill),
                    default: 0,
                },
                {
                    type: 'dropdown',
                    label: 'Key',
                    id: 'DSKKey',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.DskSourceFill),
                    default: 0,
                }
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.DskSourceFillKey, enums_1.ReqType.Set, [getOptNumber(action, 'DSKFill'), getOptNumber(action, 'DSKKey')]);
            },
        },
        [enums_1.ActionId.DskSourceFill]: {
            name: 'DSK:Set Source',
            options: [
                {
                    type: 'dropdown',
                    label: 'DSK Fill',
                    id: 'DSKFill',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.DskSourceFill),
                    default: 0,
                }
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.DskSourceFill, enums_1.ReqType.Set, [getOptNumber(action, 'DSKFill')]);
            },
        },
        [enums_1.ActionId.DskSourceKey]: {
            name: 'DSK:Set Source Key',
            options: [
                {
                    type: 'dropdown',
                    label: 'DSK Key',
                    id: 'DSKKey',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.DskSourceFill),
                    default: 0,
                }
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.DskSourceKey, enums_1.ReqType.Set, [getOptNumber(action, 'DSKKey')]);
            },
        },
        [enums_1.ActionId.DskMaskEnable]: {
            name: 'DSK:Set Mask Enable',
            options: [
                {
                    type: 'dropdown',
                    label: 'Dsk Mask Enable',
                    id: 'DskMaskEnable',
                    default: 2,
                    choices: model_1.SwitchChoices,
                }
            ],
            callback: async (action) => {
                let opt = getOptNumber(action, 'DskMaskEnable');
                let paramOpt = 0;
                if (opt === 2) {
                    if (_self.states.DSKState.DskMask === true) {
                        paramOpt = 0;
                    }
                    else {
                        paramOpt = 1;
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.DskMaskEnable, enums_1.ReqType.Set, [paramOpt]);
                }
                else {
                    await (0, connection_1.sendCommand)(enums_1.ActionId.DskMaskEnable, enums_1.ReqType.Set, [opt]);
                }
            },
        },
        [enums_1.ActionId.DskMaskHStart]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.DskMaskHStart, enums_1.ReqType.Set, [getOptNumber(action, 'HStart')]);
            },
        },
        [enums_1.ActionId.DskMaskVStart]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.DskMaskVStart, enums_1.ReqType.Set, [getOptNumber(action, 'VStart')]);
            },
        },
        [enums_1.ActionId.DskMaskHEnd]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.DskMaskHEnd, enums_1.ReqType.Set, [getOptNumber(action, 'HEnd')]);
            },
        },
        [enums_1.ActionId.DskMaskVEnd]: {
            name: 'DSK:Set Mask V End',
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.DskMaskVEnd, enums_1.ReqType.Set, [getOptNumber(action, 'VEnd')]);
            },
        },
        [enums_1.ActionId.DskControlShapedKey]: {
            name: 'DSK:Set Control Shaped Key',
            options: [
                {
                    type: 'dropdown',
                    label: 'Shaped Key',
                    id: 'ShapedKey',
                    default: 0,
                    choices: model_1.SwitchChoices,
                }
            ],
            callback: async (action) => {
                let opt = getOptNumber(action, 'ShapedKey');
                let paramOpt = 0;
                if (opt === 2) {
                    if (_self.states.DSKState.DskControlShapedKey === true) {
                        paramOpt = 0;
                    }
                    else {
                        paramOpt = 1;
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.DskControlShapedKey, enums_1.ReqType.Set, [paramOpt]);
                }
                else {
                    await (0, connection_1.sendCommand)(enums_1.ActionId.DskControlShapedKey, enums_1.ReqType.Set, [opt]);
                }
            },
        },
        [enums_1.ActionId.DskControlClip]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.DskControlClip, enums_1.ReqType.Set, [getOptNumber(action, 'Clip')]);
            },
        },
        [enums_1.ActionId.DskControlGain]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.DskControlGain, enums_1.ReqType.Set, [getOptNumber(action, 'Gain')]);
            },
        },
        [enums_1.ActionId.DskControlInvert]: {
            name: 'DSK:Set Control Invert',
            options: [
                {
                    type: 'dropdown',
                    label: 'Invert',
                    id: 'Invert',
                    default: 0,
                    choices: model_1.SwitchChoices
                }
            ],
            callback: async (action) => {
                let opt = getOptNumber(action, 'Invert');
                let paramOpt = 0;
                if (opt === 2) {
                    if (_self.states.DSKState.DskControlInvert === true) {
                        paramOpt = 0;
                    }
                    else {
                        paramOpt = 1;
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.DskControlInvert, enums_1.ReqType.Set, [paramOpt]);
                }
                else {
                    await (0, connection_1.sendCommand)(enums_1.ActionId.DskControlInvert, enums_1.ReqType.Set, [opt]);
                }
            },
        },
        [enums_1.ActionId.DskRate]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.DskRate, enums_1.ReqType.Set, [getOptNumber(action, 'dskRate')]);
            },
        },
    };
    return actions;
}
function ColorBackActions(_self) {
    const actions = {
        [enums_1.ActionId.ColorHue]: {
            name: 'Color Back:Set Color Hue',
            options: [
                {
                    type: 'dropdown',
                    label: 'Color:',
                    id: 'ColorHub1',
                    choices: model_1.ColorSwitchChoices,
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.ColorHue, enums_1.ReqType.Set, [getOptNumber(action, 'ColorHub1'), getOptNumber(action, 'ColorHub2')]);
            },
        },
        [enums_1.ActionId.ColorSaturation]: {
            name: 'Color Back:Set Color Saturation',
            options: [
                {
                    type: 'dropdown',
                    label: 'Color:',
                    id: 'ColorSaturation1',
                    choices: model_1.ColorSwitchChoices,
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.ColorSaturation, enums_1.ReqType.Set, [getOptNumber(action, 'ColorSaturation1'), getOptNumber(action, 'ColorSaturation2')]);
            },
        },
        [enums_1.ActionId.ColorBrightness]: {
            name: 'Color Back:Set Color Brightness',
            options: [
                {
                    type: 'dropdown',
                    label: 'Color:',
                    id: 'ColorBrightness1',
                    choices: model_1.ColorSwitchChoices,
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.ColorBrightness, enums_1.ReqType.Set, [getOptNumber(action, 'ColorBrightness1'), getOptNumber(action, 'ColorBrightness2')]);
            },
        },
    };
    return actions;
}
function SuperSourceActions(_self) {
    const actions = {
        [enums_1.ActionId.SuperSourceEnable]: {
            name: 'Super Source:Super Source Enable',
            options: [
                {
                    type: 'dropdown',
                    label: 'Enable:',
                    id: 'SuperSourceEnable',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                let opt = getOptNumber(action, 'SuperSourceEnable');
                let paramOpt = 0;
                if (opt === 2) {
                    if (_self.states.SuperSourcePorp.SSEnable === true) {
                        paramOpt = 0;
                    }
                    else {
                        paramOpt = 1;
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceEnable, enums_1.ReqType.Set, [paramOpt]);
                }
                else {
                    await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceEnable, enums_1.ReqType.Set, [opt]);
                }
            },
        },
        [enums_1.ActionId.SuperSourceSource1]: {
            name: 'Super Source:Super Source Source1',
            options: [
                {
                    type: 'dropdown',
                    label: 'SuperSource Source1:',
                    id: 'SuperSourceSource1',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.SuperSourceSource),
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceSource1, enums_1.ReqType.Set, [getOptNumber(action, 'SuperSourceSource1')]);
            },
        },
        [enums_1.ActionId.SuperSourceSource2]: {
            name: 'Super Source:Super Source Source2',
            options: [
                {
                    type: 'dropdown',
                    label: 'SuperSource Source2:',
                    id: 'SuperSourceSource2',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.SuperSourceSource),
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceSource2, enums_1.ReqType.Set, [getOptNumber(action, 'SuperSourceSource2')]);
            },
        },
        [enums_1.ActionId.SuperSourceBackground]: {
            name: 'Super Source:Super Source Background',
            options: [
                {
                    type: 'dropdown',
                    label: 'SuperSource Background:',
                    id: 'SuperSourceBackground',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.SuperSourceSource),
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceBackground, enums_1.ReqType.Set, [getOptNumber(action, 'SuperSourceBackground')]);
            },
        },
        [enums_1.ActionId.SuperSourceControlStyle]: {
            name: 'Super Source:Super Source Background',
            options: [
                {
                    type: 'dropdown',
                    label: 'SuperSource Style:',
                    id: 'SuperSourceStyle',
                    choices: model_1.SuperSourceStyleChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceControlStyle, enums_1.ReqType.Set, [getOptNumber(action, 'SuperSourceStyle')]);
            },
        },
        [enums_1.ActionId.SuperSourceControlYPosition]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceControlYPosition, enums_1.ReqType.Set, [getOptNumber(action, 'SuperSourceYPosition')]);
            },
        },
        [enums_1.ActionId.SuperSourceMaskEnable]: {
            name: 'Super Source:Super Source Mask Enable',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mask',
                    id: 'SuperSourceMask',
                    choices: model_1.SuperSourceMaskChoices,
                    default: 0,
                },
                {
                    type: 'dropdown',
                    label: 'Mask Enable',
                    id: 'SuperSourceMaskEnable',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceMaskEnable, enums_1.ReqType.Set, [getOptNumber(action, 'SuperSourceMask'), getOptNumber(action, 'SuperSourceMaskEnable')]);
            },
        },
        [enums_1.ActionId.SuperSourceMaskHStart]: {
            name: 'Super Source:Super Source H Start',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mask',
                    id: 'SuperSourceMask',
                    choices: model_1.SuperSourceMaskChoices,
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceMaskHStart, enums_1.ReqType.Set, [getOptNumber(action, 'SuperSourceMask'), getOptNumber(action, 'SuperSourceMaskHStart')]);
            },
        },
        [enums_1.ActionId.SuperSourceMaskVStart]: {
            name: 'Super Source:Super Source V Start',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mask',
                    id: 'SuperSourceMask',
                    choices: model_1.SuperSourceMaskChoices,
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceMaskVStart, enums_1.ReqType.Set, [getOptNumber(action, 'SuperSourceMask'), getOptNumber(action, 'SuperSourceMaskVStart')]);
            },
        },
        [enums_1.ActionId.SuperSourceMaskHEnd]: {
            name: 'Super Source:Super Source H End',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mask',
                    id: 'SuperSourceMask',
                    choices: model_1.SuperSourceMaskChoices,
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceMaskHEnd, enums_1.ReqType.Set, [getOptNumber(action, 'SuperSourceMask'), getOptNumber(action, 'SuperSourceMaskHEnd')]);
            },
        },
        [enums_1.ActionId.SuperSourceMaskVEnd]: {
            name: 'Super Source:Super Source V End',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mask',
                    id: 'SuperSourceMask',
                    choices: model_1.SuperSourceMaskChoices,
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceMaskVEnd, enums_1.ReqType.Set, [getOptNumber(action, 'SuperSourceMask'), getOptNumber(action, 'SuperSourceMaskVEnd')]);
            },
        },
        [enums_1.ActionId.SuperSourceBorderWidth]: {
            name: 'Super Source:Super Source Border Width',
            options: [
                {
                    type: 'dropdown',
                    label: 'Border',
                    id: 'SuperSourceBorder',
                    choices: model_1.SuperSourceBorderChoices,
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceBorderWidth, enums_1.ReqType.Set, [getOptNumber(action, 'SuperSourceBorder'), getOptNumber(action, 'SuperSourceBorderWidth')]);
            },
        },
        [enums_1.ActionId.SuperSourceBorderHue]: {
            name: 'Super Source:Super Source Border Hue',
            options: [
                {
                    type: 'dropdown',
                    label: 'Border',
                    id: 'SuperSourceBorder',
                    choices: model_1.SuperSourceBorderChoices,
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceBorderHue, enums_1.ReqType.Set, [getOptNumber(action, 'SuperSourceBorder'), getOptNumber(action, 'SuperSourceBorderHue')]);
            },
        },
        [enums_1.ActionId.SuperSourceBorderSaturation]: {
            name: 'Super Source:Super Source Border Saturation',
            options: [
                {
                    type: 'dropdown',
                    label: 'Border',
                    id: 'SuperSourceBorder',
                    choices: model_1.SuperSourceBorderChoices,
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceBorderSaturation, enums_1.ReqType.Set, [getOptNumber(action, 'SuperSourceBorder'), getOptNumber(action, 'SuperSourceBorderSaturation')]);
            },
        },
        [enums_1.ActionId.SuperSourceBorderBrightness]: {
            name: 'Super Source:Super Source Border Brightness',
            options: [
                {
                    type: 'dropdown',
                    label: 'Border',
                    id: 'SuperSourceBorder',
                    choices: model_1.SuperSourceBorderChoices,
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.SuperSourceBorderBrightness, enums_1.ReqType.Set, [getOptNumber(action, 'SuperSourceBorder'), getOptNumber(action, 'SuperSourceBrightness')]);
            },
        },
    };
    return actions;
}
function UpStreamKeyActions(_self) {
    const actions = {
        [enums_1.ActionId.UpStreamKeyFillKeyType]: {
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
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.LumaKeySourceKey),
                    default: 0,
                },
                {
                    type: 'dropdown',
                    label: 'Key Source',
                    id: 'KeySource',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.LumaKeySourceKey),
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.UpStreamKeyFillKeyType, enums_1.ReqType.Set, [0, getOptNumber(action, 'FillSource'), getOptNumber(action, 'KeySource')]);
            },
        },
        [enums_1.ActionId.UpStreamKeyType]: {
            name: 'UpStream Key:Set Key Type',
            options: [
                {
                    type: 'dropdown',
                    label: 'Key Type:',
                    id: 'USKType',
                    choices: model_1.UpStreamKeyTypeChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.UpStreamKeyType, enums_1.ReqType.Set, [getOptNumber(action, 'USKType')]);
            },
        },
        ...LumaKeyActions(_self),
        ...ChromaKeyActions(_self),
        ...KeyPatternActions(_self),
        ...PIPActions(_self),
    };
    return actions;
}
function LumaKeyActions(_self) {
    const actions = {
        [enums_1.ActionId.LumaKeySourceFill]: {
            name: 'UpStream Key:Set Luma Key Source Fill',
            options: [
                {
                    type: 'dropdown',
                    label: 'Source Fill',
                    id: 'KeyFill',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.LumaKeySourceKey),
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.LumaKeySourceFill, enums_1.ReqType.Set, [getOptNumber(action, 'KeyFill')]);
            },
        },
        [enums_1.ActionId.LumaKeySourceKey]: {
            name: 'UpStream Key:Set Luma Key Source Key',
            options: [
                {
                    type: 'dropdown',
                    label: 'Key',
                    id: 'LumaKeySourceKey',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.LumaKeySourceKey),
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.LumaKeySourceKey, enums_1.ReqType.Set, [getOptNumber(action, 'LumaKeySourceKey')]);
            },
        },
        [enums_1.ActionId.LumaKeyMaskEnable]: {
            name: 'UpStream Key:Set Luma Key Mask Enable',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mask Enable',
                    id: 'LumaKeyMaskEnable',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.LumaKeyMaskEnable, enums_1.ReqType.Set, [getOptNumber(action, 'LumaKeyMaskEnable')]);
            },
        },
        [enums_1.ActionId.LumaKeyMaskHStart]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.LumaKeyMaskHStart, enums_1.ReqType.Set, [getOptNumber(action, 'LumaKeyMaskHStart')]);
            },
        },
        [enums_1.ActionId.LumaKeyMaskVStart]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.LumaKeyMaskVStart, enums_1.ReqType.Set, [getOptNumber(action, 'LumaKeyMaskVStart')]);
            },
        },
        [enums_1.ActionId.LumaKeyMaskHEnd]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.LumaKeyMaskHEnd, enums_1.ReqType.Set, [getOptNumber(action, 'LumaKeyMaskHEnd')]);
            },
        },
        [enums_1.ActionId.LumaKeyMaskVEnd]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.LumaKeyMaskVEnd, enums_1.ReqType.Set, [getOptNumber(action, 'LumaKeyMaskVEnd')]);
            },
        },
        [enums_1.ActionId.LumaKeyControlShapedKey]: {
            name: 'UpStream Key:Set Luma Key Control ShapedKey',
            options: [
                {
                    type: 'dropdown',
                    label: 'ShapedKey',
                    id: 'LumaKeyControlShapedKey',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.LumaKeyControlShapedKey, enums_1.ReqType.Set, [getOptNumber(action, 'LumaKeyControlShapedKey')]);
            },
        },
        [enums_1.ActionId.LumaKeyControlClip]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.LumaKeyControlClip, enums_1.ReqType.Set, [getOptNumber(action, 'LumaKeyControlClip')]);
            },
        },
        [enums_1.ActionId.LumaKeyControlGain]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.LumaKeyControlGain, enums_1.ReqType.Set, [getOptNumber(action, 'LumaKeyControlGain')]);
            },
        },
        [enums_1.ActionId.LumaKeyControlInvert]: {
            name: 'UpStream Key:Set Luma Key Control Invert',
            options: [
                {
                    type: 'dropdown',
                    label: 'Invert',
                    id: 'LumaKeyControlInvert',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.LumaKeyControlInvert, enums_1.ReqType.Set, [getOptNumber(action, 'LumaKeyControlInvert')]);
            },
        },
        [enums_1.ActionId.LumaKeyResizeEnable]: {
            name: 'UpStream Key:Set Luma Key Resize Enable',
            options: [
                {
                    type: 'dropdown',
                    label: 'Enable',
                    id: 'LumaKeyResizeEnable',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.LumaKeyResizeEnable, enums_1.ReqType.Set, [getOptNumber(action, 'LumaKeyResizeEnable')]);
            },
        },
        [enums_1.ActionId.LumaKeyResizeSize]: {
            name: 'UpStream Key:Set Luma Key Resize Size',
            options: [
                {
                    type: 'dropdown',
                    label: 'Size',
                    id: 'LumaKeyResizeSize',
                    choices: model_1.KeyResizeSizeChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                let value = 0.25;
                let info = model_1.KeyResizeSizeChoices.find(s => s.id === action.options.LumaKeyResizeSize);
                if (info !== null && info !== undefined) {
                    value = Number(info.label);
                }
                await (0, connection_1.sendCommand)(enums_1.ActionId.LumaKeyResizeSize, enums_1.ReqType.Set, [value]);
            },
        },
        [enums_1.ActionId.LumaKeyResizeXPosition]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.LumaKeyResizeXPosition, enums_1.ReqType.Set, [getOptNumber(action, 'LumaKeyResizeXPosition')]);
            },
        },
        [enums_1.ActionId.LumaKeyResizeYPosition]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.LumaKeyResizeYPosition, enums_1.ReqType.Set, [getOptNumber(action, 'LumaKeyResizeYPosition')]);
            },
        },
    };
    return actions;
}
function ChromaKeyActions(_self) {
    const actions = {
        [enums_1.ActionId.ChromaKeyFill]: {
            name: 'UpStream Key:Set Chroma Key Source Fill',
            options: [
                {
                    type: 'dropdown',
                    label: 'Source Fill',
                    id: 'KeyFill',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.ChromaKeySourceKey),
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyFill, enums_1.ReqType.Set, [getOptNumber(action, 'KeyFill')]);
            },
        },
        [enums_1.ActionId.ChromaKeyMaskEnable]: {
            name: 'UpStream Key:Set Chroma Key Mask Enable',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mask Enable',
                    id: 'ChromaKeyMaskEnable',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyMaskEnable, enums_1.ReqType.Set, [getOptNumber(action, 'ChromaKeyMaskEnable')]);
            },
        },
        [enums_1.ActionId.ChromaKeyMaskHStart]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyMaskHStart, enums_1.ReqType.Set, [getOptNumber(action, 'ChromaKeyMaskHStart')]);
            },
        },
        [enums_1.ActionId.ChromaKeyMaskVStart]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyMaskVStart, enums_1.ReqType.Set, [getOptNumber(action, 'ChromaKeyMaskVStart')]);
            },
        },
        [enums_1.ActionId.ChromaKeyMaskHEnd]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyMaskHEnd, enums_1.ReqType.Set, [getOptNumber(action, 'ChromaKeyMaskHEnd')]);
            },
        },
        [enums_1.ActionId.ChromaKeyMaskVEnd]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyMaskVEnd, enums_1.ReqType.Set, [getOptNumber(action, 'ChromaKeyMaskVEnd')]);
            },
        },
        [enums_1.ActionId.ChromaKeyResizeEnable]: {
            name: 'UpStream Key:Set Chroma Key Resize Enable',
            options: [
                {
                    type: 'dropdown',
                    label: 'Enable',
                    id: 'ChromaKeyResizeEnable',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyResizeEnable, enums_1.ReqType.Set, [getOptNumber(action, 'ChromaKeyResizeEnable')]);
            },
        },
        [enums_1.ActionId.ChromaKeyResizeSize]: {
            name: 'UpStream Key:Set Chroma Key Resize Size',
            options: [
                {
                    type: 'dropdown',
                    label: 'Size',
                    id: 'ChromaKeyResizeSize',
                    choices: model_1.KeyResizeSizeChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                let value = 0.25;
                let info = model_1.KeyResizeSizeChoices.find(s => s.id === action.options.ChromaKeyResizeSize);
                if (info !== null && info !== undefined) {
                    value = Number(info.label);
                }
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyResizeSize, enums_1.ReqType.Set, [value]);
            },
        },
        [enums_1.ActionId.ChromaKeyResizeXPosition]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyResizeXPosition, enums_1.ReqType.Set, [getOptNumber(action, 'ChromaKeyResizeXPosition')]);
            },
        },
        [enums_1.ActionId.ChromaKeyResizeYPosition]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyResizeYPosition, enums_1.ReqType.Set, [getOptNumber(action, 'ChromaKeyResizeYPosition')]);
            },
        },
        [enums_1.ActionId.ChromaKeyControlSMPXPosition]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyControlSMPXPosition, enums_1.ReqType.Set, [getOptNumber(action, 'ChromaKeyControlSMPXPosition')]);
            },
        },
        [enums_1.ActionId.ChromaKeyControlSMPYPosition]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyControlSMPYPosition, enums_1.ReqType.Set, [getOptNumber(action, 'ChromaKeyControlSMPYPosition')]);
            },
        },
        [enums_1.ActionId.ChromaKeyControlSample]: {
            name: 'UpStream Key:Set Chroma Key Control Sample Enable',
            options: [
                {
                    type: 'dropdown',
                    label: 'Sample Enable',
                    id: 'ChromaKeyControlSample',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyControlSample, enums_1.ReqType.Set, [getOptNumber(action, 'ChromaKeyControlSample')]);
            },
        },
        [enums_1.ActionId.ChromaKeyControlColor]: {
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
        [enums_1.ActionId.ChromaKeyControlForeground]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyControlForeground, enums_1.ReqType.Set, [getOptNumber(action, 'ChromaKeyControlForeground')]);
            },
        },
        [enums_1.ActionId.ChromaKeyControlBackground]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyControlBackground, enums_1.ReqType.Set, [getOptNumber(action, 'ChromaKeyControlBackground')]);
            },
        },
        [enums_1.ActionId.ChromaKeyControlKeyEdge]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.ChromaKeyControlKeyEdge, enums_1.ReqType.Set, [getOptNumber(action, 'ChromaKeyControlKeyEdge')]);
            },
        },
    };
    return actions;
}
function KeyPatternActions(_self) {
    const actions = {
        [enums_1.ActionId.KeyPatternSourceFill]: {
            name: 'UpStream Key:Set Key Pattern Source Fill',
            options: [
                {
                    type: 'dropdown',
                    label: 'Source Fill',
                    id: 'KeyFill',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.KeyPatternSourceKey),
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternSourceFill, enums_1.ReqType.Set, [getOptNumber(action, 'KeyFill')]);
            },
        },
        [enums_1.ActionId.KeyPatternWipePattern]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternWipePattern, enums_1.ReqType.Set, [getOptNumber(action, 'KeyPatternWipePattern')]);
            },
        },
        [enums_1.ActionId.KeyPatternWipeSize]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternWipeSize, enums_1.ReqType.Set, [getOptNumber(action, 'KeyPatternWipeSize')]);
            },
        },
        [enums_1.ActionId.KeyPatternWipeXPosition]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternWipeXPosition, enums_1.ReqType.Set, [getOptNumber(action, 'KeyPatternWipeXPosition')]);
            },
        },
        [enums_1.ActionId.KeyPatternWipeYPosition]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternWipeYPosition, enums_1.ReqType.Set, [getOptNumber(action, 'KeyPatternWipeYPosition')]);
            },
        },
        [enums_1.ActionId.KeyPatternWipeSymmetry]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternWipeSymmetry, enums_1.ReqType.Set, [getOptNumber(action, 'KeyPatternWipeSymmetry')]);
            },
        },
        [enums_1.ActionId.KeyPatternWipeSoftness]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternWipeSoftness, enums_1.ReqType.Set, [getOptNumber(action, 'KeyPatternWipeSoftness')]);
            },
        },
        [enums_1.ActionId.KeyPatternMaskEnable]: {
            name: 'UpStream Key:Set KeyPattern Mask Enable',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mask Enable',
                    id: 'KeyPatternMaskEnable',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternMaskEnable, enums_1.ReqType.Set, [getOptNumber(action, 'KeyPatternMaskEnable')]);
            },
        },
        [enums_1.ActionId.KeyPatternMaskHStart]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternMaskHStart, enums_1.ReqType.Set, [getOptNumber(action, 'KeyPatternMaskHStart')]);
            },
        },
        [enums_1.ActionId.KeyPatternMaskVStart]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternMaskVStart, enums_1.ReqType.Set, [getOptNumber(action, 'KeyPatternMaskVStart')]);
            },
        },
        [enums_1.ActionId.KeyPatternMaskHEnd]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternMaskHEnd, enums_1.ReqType.Set, [getOptNumber(action, 'KeyPatternMaskHEnd')]);
            },
        },
        [enums_1.ActionId.KeyPatternMaskVEnd]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternMaskVEnd, enums_1.ReqType.Set, [getOptNumber(action, 'KeyPatternMaskVEnd')]);
            },
        },
        [enums_1.ActionId.KeyPatternResizeEnable]: {
            name: 'UpStream Key:Set Key Pattern Resize Enable',
            options: [
                {
                    type: 'dropdown',
                    label: 'Enable',
                    id: 'KeyPatternResizeEnable',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternResizeEnable, enums_1.ReqType.Set, [getOptNumber(action, 'KeyPatternResizeEnable')]);
            },
        },
        [enums_1.ActionId.KeyPatternResizeSize]: {
            name: 'UpStream Key:Set Key Pattern Resize Size',
            options: [
                {
                    type: 'dropdown',
                    label: 'Size',
                    id: 'KeyPatternResizeSize',
                    choices: model_1.KeyResizeSizeChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                let value = 0.25;
                let info = model_1.KeyResizeSizeChoices.find(s => s.id === action.options.KeyPatternResizeSize);
                if (info !== null && info !== undefined) {
                    value = Number(info.label);
                }
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternResizeSize, enums_1.ReqType.Set, [value]);
            },
        },
        [enums_1.ActionId.KeyPatternResizeXPosition]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternResizeXPosition, enums_1.ReqType.Set, [getOptNumber(action, 'KeyPatternResizeXPosition')]);
            },
        },
        [enums_1.ActionId.KeyPatternResizeYPosition]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.KeyPatternResizeYPosition, enums_1.ReqType.Set, [getOptNumber(action, 'KeyPatternResizeYPosition')]);
            },
        },
    };
    return actions;
}
function PIPActions(_self) {
    const actions = {
        [enums_1.ActionId.PipSource]: {
            name: 'UpStream Key:Set Pip Source',
            options: [
                {
                    type: 'dropdown',
                    label: 'PIP Source',
                    id: 'KeyFill',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.PipSource),
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.PipSource, enums_1.ReqType.Set, [getOptNumber(action, 'KeyFill')]);
            },
        },
        [enums_1.ActionId.PipSize]: {
            name: 'UpStream Key:Set PIP Size',
            options: [
                {
                    type: 'dropdown',
                    label: 'Size',
                    id: 'PipSize',
                    choices: model_1.KeyResizeSizeChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                let value = 0.25;
                let info = model_1.KeyResizeSizeChoices.find(s => s.id === action.options.PipSize);
                if (info !== null && info !== undefined) {
                    value = Number(info.label);
                }
                await (0, connection_1.sendCommand)(enums_1.ActionId.PipSize, enums_1.ReqType.Set, [value]);
            },
        },
        [enums_1.ActionId.PipXPosition]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.PipXPosition, enums_1.ReqType.Set, [getOptNumber(action, 'PipXPosition')]);
            },
        },
        [enums_1.ActionId.PipYPosition]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.PipYPosition, enums_1.ReqType.Set, [getOptNumber(action, 'PipYPosition')]);
            },
        },
        [enums_1.ActionId.PipMaskEnable]: {
            name: 'UpStream Key:Set PIP Mask Enable',
            options: [
                {
                    type: 'dropdown',
                    label: 'Mask Enable',
                    id: 'PipMaskEnable',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.PipMaskEnable, enums_1.ReqType.Set, [getOptNumber(action, 'PipMaskEnable')]);
            },
        },
        [enums_1.ActionId.PipMaskHStart]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.PipMaskHStart, enums_1.ReqType.Set, [getOptNumber(action, 'PipMaskHStart')]);
            },
        },
        [enums_1.ActionId.PipMaskVStart]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.PipMaskVStart, enums_1.ReqType.Set, [getOptNumber(action, 'PipMaskVStart')]);
            },
        },
        [enums_1.ActionId.PipMaskHEnd]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.PipMaskHEnd, enums_1.ReqType.Set, [getOptNumber(action, 'PipMaskHEnd')]);
            },
        },
        [enums_1.ActionId.PipMaskVEnd]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.PipMaskVEnd, enums_1.ReqType.Set, [getOptNumber(action, 'PipMaskVEnd')]);
            },
        },
        [enums_1.ActionId.PipBorderEnable]: {
            name: 'UpStream Key:Set Pip Border Enable',
            options: [
                {
                    type: 'dropdown',
                    label: 'Enable',
                    id: 'PipBorderEnable',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.PipBorderEnable, enums_1.ReqType.Set, [getOptNumber(action, 'PipBorderEnable')]);
            },
        },
        [enums_1.ActionId.PipBorderWidth]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.PipBorderWidth, enums_1.ReqType.Set, [getOptNumber(action, 'PipBorderWidth')]);
            },
        },
        [enums_1.ActionId.PipBorderHue]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.PipBorderHue, enums_1.ReqType.Set, [getOptNumber(action, 'PipBorderHue')]);
            },
        },
        [enums_1.ActionId.PipBorderSaturation]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.PipBorderSaturation, enums_1.ReqType.Set, [getOptNumber(action, 'PipBorderSaturation')]);
            },
        },
        [enums_1.ActionId.PipBorderBrightness]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.PipBorderBrightness, enums_1.ReqType.Set, [getOptNumber(action, 'PipBorderBrightness')]);
            },
        },
    };
    return actions;
}
function AudioMixerActions(_self) {
    const actions = {
        [enums_1.ActionId.AudioTransition]: {
            name: 'Audio Mixer:Set audio fade in and out switch',
            options: [
                {
                    type: 'dropdown',
                    label: 'Enable',
                    id: 'AudioTrans',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                let opt = getOptNumber(action, 'AudioTrans');
                let paramOpt = 0;
                if (opt === 2) {
                    if (_self.states.AudioMixerPorp.AudioTransition === true) {
                        paramOpt = 0;
                    }
                    else {
                        paramOpt = 1;
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.AudioTransition, enums_1.ReqType.Set, [paramOpt]);
                }
                else {
                    await (0, connection_1.sendCommand)(enums_1.ActionId.AudioTransition, enums_1.ReqType.Set, [opt]);
                }
            },
        },
        [enums_1.ActionId.AudioFader]: {
            name: 'Audio Mixer:Set Audio Fader',
            options: [
                {
                    type: 'dropdown',
                    label: 'Source',
                    id: 'ASource',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.AudioFader),
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.AudioFader, enums_1.ReqType.Set, [getOptNumber(action, 'ASource'), getOptNumber(action, 'AudioFader')]);
            },
        },
        [enums_1.ActionId.AudioBalance]: {
            name: 'Audio Mixer:Set Audio Balance',
            options: [
                {
                    type: 'dropdown',
                    label: 'Source',
                    id: 'ASource',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.AudioEnableSource),
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.AudioBalance, enums_1.ReqType.Set, [getOptNumber(action, 'ASource'), getOptNumber(action, 'AudioBalance')]);
            },
        },
        [enums_1.ActionId.AudioInput]: {
            name: 'Audio Mixer:Set Audio Input',
            options: [
                {
                    type: 'dropdown',
                    label: 'Source',
                    id: 'ASource',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.AudioEnableSource),
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.AudioInput, enums_1.ReqType.Set, [getOptNumber(action, 'ASource'), getOptNumber(action, 'AudioInput')]);
            },
        },
        [enums_1.ActionId.AudioEnable]: {
            name: 'Audio Mixer:Set Mic Audio Enable',
            options: [
                {
                    type: 'dropdown',
                    label: 'Source',
                    id: 'ASource',
                    choices: model_1.AudioMicChoices,
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
                let opt1 = getOptNumber(action, 'ASource');
                let opt2 = getOptNumber(action, 'AudioEnable');
                let paramOpt = 0;
                if (opt2 === 2) {
                    if (opt1 === 0) {
                        if (_self.states.AudioMixerPorp.AudioEnable.mic1 === 1) {
                            paramOpt = 0;
                        }
                        else {
                            paramOpt = 1;
                        }
                    }
                    else {
                        if (_self.states.AudioMixerPorp.AudioEnable.mic2 === 1) {
                            paramOpt = 0;
                        }
                        else {
                            paramOpt = 1;
                        }
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.AudioEnable, enums_1.ReqType.Set, [opt1, paramOpt]);
                }
                else {
                    await (0, connection_1.sendCommand)(enums_1.ActionId.AudioEnable, enums_1.ReqType.Set, [opt1, opt2]);
                }
            },
        },
        [enums_1.ActionId.AudioEnable1]: {
            name: 'Audio Mixer:Set Input Audio Enable',
            options: [
                {
                    type: 'dropdown',
                    label: 'Source',
                    id: 'ASource',
                    choices: model_1.AudioInputSourcesChoices,
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
                let opt1 = getOptNumber(action, 'AudioEnable');
                let opt2 = getOptNumber(action, 'ASource');
                let paramOpt = 0;
                if (opt1 === 3) {
                    if (opt2 === 2) {
                        if (_self.states.AudioMixerPorp.AudioEnable.in1 === 0) {
                            paramOpt = 1;
                        }
                        else if (_self.states.AudioMixerPorp.AudioEnable.in1 === 1) {
                            paramOpt = 2;
                        }
                        else {
                            paramOpt = 0;
                        }
                    }
                    else if (opt2 == 3) {
                        if (_self.states.AudioMixerPorp.AudioEnable.in2 === 0) {
                            paramOpt = 1;
                        }
                        else if (_self.states.AudioMixerPorp.AudioEnable.in2 === 1) {
                            paramOpt = 2;
                        }
                        else {
                            paramOpt = 0;
                        }
                    }
                    else if (opt2 == 4) {
                        if (_self.states.AudioMixerPorp.AudioEnable.in3 === 0) {
                            paramOpt = 1;
                        }
                        else if (_self.states.AudioMixerPorp.AudioEnable.in3 === 1) {
                            paramOpt = 2;
                        }
                        else {
                            paramOpt = 0;
                        }
                    }
                    else if (opt2 == 5) {
                        if (_self.states.AudioMixerPorp.AudioEnable.in4 === 0) {
                            paramOpt = 1;
                        }
                        else if (_self.states.AudioMixerPorp.AudioEnable.in4 === 1) {
                            paramOpt = 2;
                        }
                        else {
                            paramOpt = 0;
                        }
                    }
                    else if (opt2 == 6) {
                        if (_self.states.AudioMixerPorp.AudioEnable.aux === 0) {
                            paramOpt = 1;
                        }
                        else if (_self.states.AudioMixerPorp.AudioEnable.aux === 1) {
                            paramOpt = 2;
                        }
                        else {
                            paramOpt = 0;
                        }
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.AudioEnable, enums_1.ReqType.Set, [opt2, paramOpt]);
                }
                else {
                    await (0, connection_1.sendCommand)(enums_1.ActionId.AudioEnable, enums_1.ReqType.Set, [opt2, opt1]);
                }
            },
        },
        [enums_1.ActionId.AudioDelay]: {
            name: 'Audio Mixer:Set Audio Delay',
            options: [
                {
                    type: 'dropdown',
                    label: 'Source',
                    id: 'ASource',
                    choices: model_1.AudioMicChoices,
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.AudioDelay, enums_1.ReqType.Set, [getOptNumber(action, 'ASource'), getOptNumber(action, 'AudioDelay')]);
            },
        },
        [enums_1.ActionId.AudioMonitorLevel]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.AudioMonitorLevel, enums_1.ReqType.Set, [getOptNumber(action, 'AudioLevel')]);
            },
        },
        [enums_1.ActionId.AudioMonitorSource]: {
            name: 'Audio Mixer:Set Monitor Source',
            options: [
                {
                    type: 'dropdown',
                    label: 'Source',
                    id: 'AudioSource',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.AudioMonitorSource),
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.AudioMonitorSource, enums_1.ReqType.Set, [getOptNumber(action, 'AudioSource')]);
            },
        },
    };
    return actions;
}
function StillGeneratorActions(_self) {
    const actions = {
        [enums_1.ActionId.StillSelection]: {
            name: 'Still:Select pic index',
            options: [
                {
                    type: 'dropdown',
                    label: 'Still',
                    id: 'Stillindex',
                    choices: [
                        { id: 0, label: 'Still1' },
                        { id: 1, label: 'Still2' }
                    ],
                    default: 0,
                },
                {
                    type: 'dropdown',
                    label: 'Pic index (1-32)',
                    id: 'PicIndex',
                    choices: (0, choices_1.getChoicesByStill)(),
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.StillSelection, enums_1.ReqType.Set, [getOptNumber(action, 'Stillindex'), getOptNumber(action, 'PicIndex')]);
            },
        }
    };
    return actions;
}
function MacroActions(_self) {
    const actions = {
        [enums_1.ActionId.MacroRecord]: {
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
                    choices: (0, choices_1.getChoicesByMacro)(),
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.MacroRecord, enums_1.ReqType.Set, [getOptNumber(action, 'StatusId'), getOptNumber(action, 'MacroIndex'), getOptString(action, 'MacroName'), getOptString(action, 'MacroRemark')]);
            },
        },
        [enums_1.ActionId.MacroInfo]: {
            name: 'Macro:Change Detail',
            options: [
                {
                    type: 'dropdown',
                    label: 'Macro',
                    id: 'MacroIndex',
                    choices: (0, choices_1.getChoicesByMacro)(),
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.MacroInfo, enums_1.ReqType.Set, [getOptNumber(action, 'MacroIndex'), getOptString(action, 'MacroName'), getOptString(action, 'MacroRemark')]);
            },
        },
        [enums_1.ActionId.RemoveMacro]: {
            name: 'Macro:Delete Macro',
            options: [
                {
                    type: 'dropdown',
                    label: 'Macro',
                    id: 'MacroIndex',
                    choices: (0, choices_1.getChoicesByMacro)(),
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.RemoveMacro, enums_1.ReqType.Set, [getOptNumber(action, 'MacroIndex')]);
            },
        },
        [enums_1.ActionId.MacroRun]: {
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
                    choices: (0, choices_1.getChoicesByMacro)(),
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.MacroRun, enums_1.ReqType.Set, [getOptNumber(action, 'StatusID'), getOptNumber(action, 'MacroIndex')]);
            },
        },
        [enums_1.ActionId.MacroSleep]: {
            name: 'Macro:Macro Sleep',
            options: [
                {
                    type: 'textinput',
                    label: 'Sleep',
                    id: 'MacroSleep',
                    default: '500',
                    regex: base_1.Regex.NUMBER,
                    required: true,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.MacroSleep, enums_1.ReqType.Set, [getOptNumber(action, 'MacroSleep')]);
            },
        },
    };
    return actions;
}
function StreamingActions(_self) {
    const actions = {
        [enums_1.ActionId.StreamOutput]: {
            name: 'Streaming:Set Output',
            options: [
                {
                    type: 'dropdown',
                    label: 'Stream',
                    id: 'StreamID',
                    choices: model_1.StreamingChoices,
                    default: 0,
                },
                {
                    type: 'dropdown',
                    label: 'Enable',
                    id: 'EnableId',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                let opt1 = getOptNumber(action, 'StreamID');
                let opt2 = getOptNumber(action, 'EnableId');
                let paramOpt = 0;
                if (opt2 === 2) {
                    if (opt1 === 0) {
                        paramOpt = _self.states.StreamingProp.stream1 === true ? 0 : 1;
                    }
                    else if (opt1 === 1) {
                        paramOpt = _self.states.StreamingProp.stream2 === true ? 0 : 1;
                    }
                    else if (opt1 === 2) {
                        paramOpt = _self.states.StreamingProp.stream3 === true ? 0 : 1;
                    }
                    else {
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.StreamOutput, enums_1.ReqType.Set, [opt1, paramOpt]);
                }
                else {
                    await (0, connection_1.sendCommand)(enums_1.ActionId.StreamOutput, enums_1.ReqType.Set, [opt1, opt2]);
                }
            },
        },
        [enums_1.ActionId.StreamUrl]: {
            name: 'Streaming:Set Stream Url',
            options: [
                {
                    type: 'dropdown',
                    label: 'Stream',
                    id: 'StreamID',
                    choices: model_1.StreamingChoices,
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.StreamOutput, enums_1.ReqType.Set, [getOptNumber(action, 'StreamID'), getOptString(action, 'StreamUrl')]);
            },
        },
    };
    return actions;
}
function PlaybackActions(_self) {
    const actions = {
        [enums_1.ActionId.PlayModeRepeatPause]: {
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
                let opt = getOptNumber(action, 'pauseId');
                let paramOpt = 0;
                if (opt === 2) {
                    if (_self.states.PlayBackState.PlaybackPause === true) {
                        paramOpt = 0;
                    }
                    else {
                        paramOpt = 1;
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.PlayModeRepeatPause, enums_1.ReqType.Set, [getOptNumber(action, 'ModeID'), getOptNumber(action, 'repeatId'), paramOpt]);
                }
                else {
                    (0, connection_1.sendCommand)(enums_1.ActionId.PlayModeRepeatPause, enums_1.ReqType.Set, [getOptNumber(action, 'ModeID'), getOptNumber(action, 'repeatId'), opt]);
                }
            },
        },
        [enums_1.ActionId.PlaybackMode]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.PlaybackMode, enums_1.ReqType.Set, [getOptNumber(action, 'ModeID')]);
            },
        },
	[enums_1.ActionId.PlayFile]: {
            name: 'Playback:Set selected file',
            options: [
		{
                    type: 'dropdown',
                    label: 'PlayFile',
                    id: 'PlayFileID',
		    required: true,
		    choices: (0, _self.states.PlayBackState.PlayFileList.map((s, index) => ({
        id: index,
        label: s,
		    }))),
                    default: 0,
                },
            ],
            callback: async (action) => {
		let opt = action.options.PlayFileID;
                await (0, connection_1.sendCommand)(enums_1.ActionId.PlayFile, enums_1.ReqType.Set, [_self.states.PlayBackState.PlayFileList[opt]]);
            },
        },
        [enums_1.ActionId.PlaybackRepeat]: {
            name: 'Playback:Set playback Repeat',
            options: [
                {
                    type: 'dropdown',
                    label: 'Enable',
                    id: 'EnableID',
                    choices: model_1.SwitchChoices,
                    default: 2,
                },
            ],
            callback: async (action) => {
                let opt = getOptNumber(action, 'EnableID');
                let paramOpt = 0;
                if (opt === 2) {
                    if (_self.states.PlayBackState.PlaybackRepeat === true) {
                        paramOpt = 0;
                    }
                    else {
                        paramOpt = 1;
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.PlaybackRepeat, enums_1.ReqType.Set, [paramOpt]);
                }
                else {
                    (0, connection_1.sendCommand)(enums_1.ActionId.PlaybackRepeat, enums_1.ReqType.Set, [opt]);
                }
            },
        },
        [enums_1.ActionId.PlaybackPause]: {
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
                let opt = getOptNumber(action, 'EnableID');
                let paramOpt = 0;
                if (opt === 2) {
                    if (_self.states.PlayBackState.PlaybackPause === true) {
                        paramOpt = 0;
                    }
                    else {
                        paramOpt = 1;
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.PlaybackPause, enums_1.ReqType.Set, [paramOpt]);
                }
                else {
                    (0, connection_1.sendCommand)(enums_1.ActionId.PlaybackPause, enums_1.ReqType.Set, [opt]);
                }
            },
        },
        [enums_1.ActionId.PlaybackBar]: {
            name: 'Playback:Set playback Bar',
            options: [
                {
                    type: 'dropdown',
                    label: 'Enable',
                    id: 'EnableID',
                    choices: model_1.SwitchChoices,
                    default: 2,
                },
            ],
            callback: async (action) => {
                let opt = getOptNumber(action, 'EnableID');
                let paramOpt = 0;
                if (opt === 2) {
                    if (_self.states.PlayBackState.PlaybackBar === true) {
                        paramOpt = 0;
                    }
                    else {
                        paramOpt = 1;
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.PlaybackBar, enums_1.ReqType.Set, [paramOpt]);
                }
                else {
                    await (0, connection_1.sendCommand)(enums_1.ActionId.PlaybackBar, enums_1.ReqType.Set, [opt]);
                }
            },
        },
    };
    return actions;
}
function SettingsActions(_self) {
    const actions = {
        [enums_1.ActionId.SrcName]: {
            name: 'Settings:Set SrcName',
            options: [
                {
                    type: 'dropdown',
                    label: 'Src',
                    id: 'SrcID',
                    choices: model_1.SettingsUMDSrcChoices,
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.SrcName, enums_1.ReqType.Set, [getOptNumber(action, 'SrcID'), getOptString(action, 'SrcName')]);
            },
        },
        [enums_1.ActionId.MvMeter]: {
            name: 'Settings:Set Mv Meter',
            options: [
                {
                    type: 'dropdown',
                    label: 'Src',
                    id: 'SrcID',
                    choices: model_1.SettingsMvMeterChoices,
                    default: 0,
                },
                {
                    type: 'dropdown',
                    label: 'Mv Meter Enable',
                    id: 'MvMeterEnable',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.SrcName, enums_1.ReqType.Set, [getOptNumber(action, 'SrcID'), getOptNumber(action, 'MvMeterEnable')]);
            },
        },
        [enums_1.ActionId.MvLayout]: {
            name: 'Settings:Set Mv Layout',
            options: [
                {
                    type: 'dropdown',
                    label: 'Layout',
                    id: 'MvLayout',
                    choices: model_1.SettingsMvLayoutChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.MvLayout, enums_1.ReqType.Set, [getOptNumber(action, 'MvLayout')]);
            },
        },
        [enums_1.ActionId.Marker]: {
            name: 'Settings:Set Marker',
            options: [
                {
                    type: 'dropdown',
                    label: 'marker',
                    id: 'Marker',
                    choices: model_1.SwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.Marker, enums_1.ReqType.Set, [getOptNumber(action, 'Marker')]);
            },
        },
        [enums_1.ActionId.MicInput]: {
            name: 'Settings:Mic Input',
            options: [
                {
                    type: 'dropdown',
                    label: 'mic',
                    id: 'micid',
                    choices: model_1.AudioMicChoices,
                    default: 0,
                },
                {
                    type: 'dropdown',
                    label: 'Mic Input',
                    id: 'MicInput',
                    choices: model_1.SettingsMicInputChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.MicInput, enums_1.ReqType.Set, [getOptNumber(action, 'micid'), getOptNumber(action, 'MicInput')]);
            },
        },
        [enums_1.ActionId.RecordFileName]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.RecordFileName, enums_1.ReqType.Set, [getOptString(action, 'RecordFileName')]);
            },
        },
        [enums_1.ActionId.SrcSelection]: {
            name: 'Settings:Src Selection',
            options: [
                {
                    type: 'dropdown',
                    label: 'Src',
                    id: 'Srcid',
                    choices: (0, choices_1.SourcesToChoices)(model_1.SourceModels),
                    default: 0,
                },
                {
                    type: 'dropdown',
                    label: 'Selection',
                    id: 'SrcSelection',
                    choices: model_1.SettingsColorChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.SrcSelection, enums_1.ReqType.Set, [getOptNumber(action, 'Srcid'), getOptNumber(action, 'SrcSelection')]);
            },
        },
        [enums_1.ActionId.AuxSource]: {
            name: 'Settings:Aux Source',
            options: [
                {
                    type: 'dropdown',
                    label: 'Aux Source',
                    id: 'auxSourceID',
                    choices: model_1.SettingsAuxSourceChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.AuxSource, enums_1.ReqType.Set, [getOptNumber(action, 'auxSourceID')]);
            },
        },
        [enums_1.ActionId.OutFormat]: {
            name: 'Settings:OutFormat',
            options: [
                {
                    type: 'dropdown',
                    label: 'OutFormat',
                    id: 'OutFormat',
                    choices: model_1.SettingsOutFormatChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.OutFormat, enums_1.ReqType.Set, [getOptNumber(action, 'OutFormat')]);
            },
        },
        [enums_1.ActionId.OutputColorSpace]: {
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
                    choices: model_1.SettingsColorChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.OutputColorSpace, enums_1.ReqType.Set, [getOptNumber(action, 'OutId'), getOptNumber(action, 'OutputColorSpace')]);
            },
        },
        [enums_1.ActionId.OutSource]: {
            name: 'Settings:Out Source',
            options: [
                {
                    type: 'dropdown',
                    label: 'Out',
                    id: 'OutId',
                    choices: model_1.SettingsOutSourceParamChoices,
                    default: 0,
                },
                {
                    type: 'dropdown',
                    label: 'OutSource',
                    id: 'OutSource',
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.SettingsoutSource),
                    default: 0,
                },
            ],
            callback: async (action) => {
                await (0, connection_1.sendCommand)(enums_1.ActionId.OutSource, enums_1.ReqType.Set, [getOptNumber(action, 'OutId'), getOptNumber(action, 'OutSource')]);
            },
        },
        [enums_1.ActionId.Quality]: {
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
                await (0, connection_1.sendCommand)(enums_1.ActionId.Quality, enums_1.ReqType.Set, [getOptNumber(action, 'TypeID'), getOptNumber(action, 'Quality')]);
            },
        }
    };
    return actions;
}
function RecordActions(_self) {
    const actions = {
        [enums_1.ActionId.Record]: {
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
                let opt = getOptNumber(action, 'Record');
                let paramOpt = 0;
                if (opt === 2) {
                    if (_self.states.RecordState === true) {
                        paramOpt = 0;
                    }
                    else {
                        paramOpt = 1;
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.Record, enums_1.ReqType.Set, [paramOpt]);
                }
                else {
                    await (0, connection_1.sendCommand)(enums_1.ActionId.Record, enums_1.ReqType.Set, [opt]);
                }
            },
        },
    };
    return actions;
}
function LiveActions(_self) {
    const actions = {
        [enums_1.ActionId.Live]: {
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
                let opt = getOptNumber(action, 'LiveEnable');
                let paramOpt = 0;
                if (opt === 2) {
                    if (_self.states.LiveState === 0) {
                        paramOpt = 1;
                    }
                    else {
                        paramOpt = 0;
                    }
                    await (0, connection_1.sendCommand)(enums_1.ActionId.Live, enums_1.ReqType.Set, [paramOpt]);
                }
                else {
                    await (0, connection_1.sendCommand)(enums_1.ActionId.Live, enums_1.ReqType.Set, [opt]);
                }
            },
        },
    };
    return actions;
}
function getOptNumber(action, key, defVal) {
    const rawVal = action.options[key];
    if (defVal !== undefined && rawVal === undefined)
        return defVal;
    const val = Number(rawVal);
    if (isNaN(val)) {
        throw new Error(`Invalid option '${key}'`);
    }
    return val;
}
function getOptString(action, key, defVal) {
    const rawVal = action.options[key];
    if (defVal !== undefined && rawVal === undefined)
        return defVal;
    const val = String(rawVal);
    if (typeof (rawVal) !== 'string') {
        throw new Error(`Invalid option '${key}'`);
    }
    return val;
}
//# sourceMappingURL=actions.js.map

//# sourceURL=webpack://osee-gostreamdeck/./dist/actions.js?
