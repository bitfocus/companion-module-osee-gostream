
//Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.feedbacks = exports.MacroFeedbackType = void 0;
const base_1 = require("@companion-module/base");
const enums_1 = require("./enums.js");
const choices_1 = require(/*! ./choices */ "./choices.js");
const model_1 = require(/*! ./model */ "./model.js");
var MacroFeedbackType;
(function (MacroFeedbackType) {
    MacroFeedbackType["IsRunning"] = "isRunning";
    MacroFeedbackType["IsWaiting"] = "isWaiting";
    MacroFeedbackType["IsRecording"] = "isRecording";
    MacroFeedbackType["IsUsed"] = "isUsed";
})(MacroFeedbackType = exports.MacroFeedbackType || (exports.MacroFeedbackType = {}));
function feedbacks(self) {
    const feedbacks = {};
    feedbacks[enums_1.feedbackId.PreviewBG] = {
        type: 'boolean',
        name: 'preview source',
        description: 'If the input specified is selected in preview, change style of the bank',
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(0, 255, 0),
        },
        options: [
            {
                type: 'dropdown',
                label: 'Source',
                id: 'Source',
                default: enums_1.SourceType.Input1,
                choices: (0, choices_1.getChoices)(enums_1.ActionType.Preview),
            }
        ],
        callback: (_feedback) => {
            if (self.states.selectPrevInput?.id === _feedback.options.Source) {
                return true;
            }
            else {
                return false;
            }
        },
    },
        feedbacks[enums_1.feedbackId.ProgramBG] = {
            type: 'boolean',
            name: 'program source',
            description: 'If the input specified is selected in program, change style of the bank',
            defaultStyle: {
                color: (0, base_1.combineRgb)(0, 0, 0),
                bgcolor: (0, base_1.combineRgb)(0, 255, 0),
            },
            options: [
                {
                    type: 'dropdown',
                    label: 'Source',
                    id: 'Source',
                    default: enums_1.SourceType.Input1,
                    choices: (0, choices_1.getChoices)(enums_1.ActionType.Program),
                }
            ],
            callback: (_feedback) => {
                if (self.states.selectPgmInput?.id === _feedback.options.Source) {
                    return true;
                }
                else {
                    return false;
                }
            },
        },
        feedbacks[enums_1.feedbackId.InTransition] = {
            type: 'boolean',
            name: 'Transition: Active/Running',
            description: 'If the specified transition is active, change style of the bank',
            options: [],
            defaultStyle: {
                color: (0, base_1.combineRgb)(0, 0, 0),
                bgcolor: (0, base_1.combineRgb)(255, 255, 0),
            },
            callback: (_feedback) => {
                return !!self.states.transitionPosition.inTransition;
            },
        },
        feedbacks[enums_1.feedbackId.Cut] = {
            type: 'boolean',
            name: 'Transition: Active/Running',
            description: 'If the specified transition is active, change style of the bank',
            options: [],
            defaultStyle: {
                color: (0, base_1.combineRgb)(0, 0, 0),
                bgcolor: (0, base_1.combineRgb)(255, 255, 0),
            },
            callback: (_feedback) => {
                return false;
            },
        },
        feedbacks[enums_1.feedbackId.Prev] = {
            type: 'boolean',
            name: 'Transition: Active/Running',
            description: 'If the PREV is active, change style of the bank',
            options: [],
            defaultStyle: {
                color: (0, base_1.combineRgb)(0, 0, 0),
                bgcolor: (0, base_1.combineRgb)(255, 255, 0),
            },
            callback: (_feedback) => {
                return self.states.selectTransitionStyle.PrevState;
            },
        },
        feedbacks[enums_1.feedbackId.TransitionStyle] = {
            type: 'boolean',
            name: 'Transition: Style',
            description: 'If the specified transition style is active, change style of the bank',
            options: [
                {
                    type: 'dropdown',
                    label: 'TransitionStyle',
                    id: 'TransitionStyle',
                    default: enums_1.TransitionStyle.MIX,
                    choices: model_1.TransitionStyleChoice,
                }
            ],
            defaultStyle: {
                color: (0, base_1.combineRgb)(0, 0, 0),
                bgcolor: (0, base_1.combineRgb)(255, 255, 0),
            },
            callback: (_feedback) => {
                if (self.states.selectTransitionStyle?.style.id === _feedback.options.TransitionStyle) {
                    return true;
                }
                else {
                    return false;
                }
            },
        },
        feedbacks[enums_1.feedbackId.TransitionRate] = {
            type: 'boolean',
            name: 'Transition: Rate',
            description: 'If the specified transition rate is active, change style of the bank',
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
            defaultStyle: {
                color: (0, base_1.combineRgb)(0, 0, 0),
                bgcolor: (0, base_1.combineRgb)(255, 255, 0),
            },
            callback: (_feedback) => {
                const me = self.states.selectTransitionStyle;
                if (me?.style.id === _feedback.options.TransitionStyle) {
                    const style = Number(_feedback.options.TransitionStyle);
                    const rate = Number(_feedback.options.TransitionRate);
                    switch (style) {
                        case 0:
                            return me?.mixrate === rate;
                        case 1:
                            return me?.diprate === rate;
                        case 2:
                            return me?.wiperate === rate;
                        default:
                            return false;
                            break;
                    }
                }
                return false;
            },
            learn: (_feedback) => {
                const me = self.states.selectTransitionStyle;
                if (me?.style.id === _feedback.options.TransitionStyle) {
                    const style = Number(_feedback.options.TransitionStyle);
                    switch (style) {
                        case 0:
                            return {
                                ..._feedback.options,
                                TransitionRate: me?.mixrate,
                            };
                        case 1:
                            return {
                                ..._feedback.options,
                                TransitionRate: me?.diprate,
                            };
                        case 2:
                            return {
                                ..._feedback.options,
                                TransitionRate: me?.wiperate,
                            };
                        default:
                            return undefined;
                    }
                }
                else {
                    return undefined;
                }
            },
        };
    feedbacks[enums_1.feedbackId.TransitionSelection] = {
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
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            let seleOptions = _feedback.options.MatchState;
            let BG = _feedback.options.Background;
            let Key = _feedback.options.Key;
            switch (seleOptions) {
                case 0:
                    if ((BG && self.states.TKeyeState.BKGD) || (Key && self.states.TKeyeState.M_Key)) {
                        return true;
                    }
                    else if (BG && Key) {
                        return self.states.TKeyeState.M_Key && self.states.TKeyeState.BKGD;
                    }
                    else {
                        return false;
                    }
                case 1:
                    if (BG && Key) {
                        return self.states.TKeyeState.M_Key || self.states.TKeyeState.BKGD;
                    }
                    else {
                        if (BG) {
                            return self.states.TKeyeState.BKGD;
                        }
                        else if (Key) {
                            return self.states.TKeyeState.M_Key;
                        }
                        else {
                            return false;
                        }
                    }
                default:
                    return false;
            }
        },
    },
        feedbacks[enums_1.feedbackId.TransitionKeySwitch] = {
            type: 'boolean',
            name: 'Next Transition:Key Switch',
            description: 'Set the special effect Transition key switch',
            options: [
                {
                    type: 'dropdown',
                    label: 'Switch',
                    id: 'KeySwitch',
                    choices: model_1.KeySwitchChoices,
                    default: 2,
                }
            ],
            defaultStyle: {
                color: (0, base_1.combineRgb)(0, 0, 0),
                bgcolor: (0, base_1.combineRgb)(255, 255, 0),
            },
            callback: (_feedback) => {
                let seleOptions = _feedback.options.KeySwitch;
                if (seleOptions && Array.isArray(seleOptions)) {
                    let arratOptions = Array.from(seleOptions);
                    if (arratOptions.includes(0) && self.states.TKeyeState.M_Key) {
                        return true;
                    }
                    if (arratOptions.includes(1) && self.states.TKeyeState.DSK) {
                        return true;
                    }
                    if (arratOptions.includes(2) && self.states.TKeyeState.BKGD) {
                        return true;
                    }
                    return false;
                }
                else
                    return false;
            },
        },
        feedbacks[enums_1.feedbackId.DskOnAir] = {
            type: 'boolean',
            name: 'Next Transition:DSK OnAir',
            description: 'Set the special effect Transition DSK OnAir',
            options: [
                {
                    type: 'dropdown',
                    label: 'DSK OnAir',
                    id: 'DSKOnAir',
                    choices: model_1.SwitchChoices,
                    default: 1,
                }
            ],
            defaultStyle: {
                color: (0, base_1.combineRgb)(0, 0, 0),
                bgcolor: (0, base_1.combineRgb)(255, 255, 0),
            },
            callback: (_feedback) => {
                if (self.states.TKeyeState.DSKOnAir && _feedback.options.DSKOnAir === 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        feedbacks[enums_1.feedbackId.KeyOnAir] = {
            type: 'boolean',
            name: 'Next Transition:Key OnAir Switch',
            description: 'Set the special effect Transition key switch',
            options: [
                {
                    type: 'dropdown',
                    label: 'Key OnAir',
                    id: 'KeyOnAir',
                    choices: model_1.SwitchChoices,
                    default: 1,
                }
            ],
            defaultStyle: {
                color: (0, base_1.combineRgb)(0, 0, 0),
                bgcolor: (0, base_1.combineRgb)(255, 255, 0),
            },
            callback: (_feedback) => {
                if (self.states.TKeyeState.KeyOnAir && _feedback.options.KeyOnAir === 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
    feedbacks[enums_1.feedbackId.KeySourceFill] = {
        type: 'boolean',
        name: 'UpStreamKey:UpStream Key Source Fill',
        description: 'Set the special effect UpStream Key Source Fill',
        options: [
            {
                type: 'dropdown',
                label: 'Key Type:',
                id: 'USKKeyType',
                choices: model_1.UpStreamKeyTypeChoices,
                default: 0,
            },
            {
                type: 'dropdown',
                label: 'Source Fill:',
                id: 'USKSourceFill',
                choices: (0, choices_1.getChoices)(enums_1.ActionType.KeyPatternSourceKey),
                default: 0,
            },
        ],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            let typeId = Number(_feedback.options.USKKeyType);
            return self.states.upStreamKeyState.ArrayKeySourceFill[typeId] === Number(_feedback.options.USKSourceFill);
        }
    };
    feedbacks[enums_1.feedbackId.Still] = {
        type: 'boolean',
        name: 'Still: Select pic index',
        description: '',
        options: [
            // {
            // 	type: 'dropdown',
            // 	label: 'Still',
            // 	id: 'Stillindex',
            // 	choices: [
            // 		{id:0,label:'Still1'},
            // 		{id:1,label:'Still2'}
            // 	],
            // 	default: 0,
            // },
            {
                type: 'dropdown',
                label: 'Pic index (1-32)',
                id: 'PicIndex',
                default: 1,
                choices: (0, choices_1.getChoicesByStill)(),
            }
        ],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            let picIndex = Number(_feedback.options.PicIndex);
            return self.states.StillProp.Still1 === picIndex;
        },
    };
    feedbacks[enums_1.feedbackId.DskSourceFill] = {
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
                choices: (0, choices_1.getChoices)(enums_1.ActionType.KeyPatternSourceKey),
                default: 0,
            },
        ],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            let typeId = Number(_feedback.options.TypeID);
            let dsk_source = Number(_feedback.options.DSKFill);
            if (typeId === 0) {
                return self.states.DSKState.DSKSourceKeyFill.id === dsk_source;
            }
            else {
                return self.states.DSKState.DSKSourceFill.id === dsk_source;
            }
        }
    };
    feedbacks[enums_1.feedbackId.SettingOutSource] =
        {
            type: 'boolean',
            name: 'Setting: Set Out Source',
            description: 'If the input specified is selected in the OutSource specified, change style of the bank',
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
            defaultStyle: {
                color: (0, base_1.combineRgb)(0, 0, 0),
                bgcolor: (0, base_1.combineRgb)(255, 255, 0),
            },
            callback: (_feedback) => {
                let outSource = self.states.SettingsProp.OutSource;
                let OutTypeID = _feedback.options.OutId;
                let SelectSource = _feedback.options.OutSource;
                if (OutTypeID === 0) {
                    return SelectSource === outSource.hdmi1.id;
                }
                else if (OutTypeID === 1) {
                    return SelectSource === outSource.hdmi2.id;
                }
                else {
                    return SelectSource === outSource.uvc.id;
                }
            },
            learn: (_feedback) => {
                let outSource = self.states.SettingsProp.OutSource;
                let OutTypeID = _feedback.options.OutId;
                if (OutTypeID === 0) {
                    return {
                        ..._feedback.options,
                        OutSource: outSource.hdmi1.id,
                    };
                }
                else if (OutTypeID === 1) {
                    return {
                        ..._feedback.options,
                        OutSource: outSource.hdmi2.id,
                    };
                }
                else {
                    return {
                        ..._feedback.options,
                        OutSource: outSource.uvc.id,
                    };
                }
            },
        };
    feedbacks[enums_1.feedbackId.Macro] = {
        type: 'boolean',
        name: 'Macro: State',
        description: 'If the specified macro is running, change style of the bank',
        options: [
            {
                type: 'dropdown',
                label: 'Macro Number (1-100)',
                id: 'MacroIndex',
                default: 1,
                choices: (0, choices_1.getChoicesByMacro)(),
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
            }
        ],
        defaultStyle: {
            color: (0, base_1.combineRgb)(255, 255, 255),
            bgcolor: (0, base_1.combineRgb)(238, 238, 0),
        },
        callback: (_feedback) => {
            // let macroIndex = Number(_feedback.options.MacroIndex)
            // if (!isNaN(macroIndex)) {
            // 	macroIndex -= 1
            // }
            // return false
            let macroIndex = Number(_feedback.options.MacroIndex);
            if (!isNaN(macroIndex)) {
                const type = _feedback.options.state;
                //console.log(self.states.MacroProp.macroProperties);
                const macro = self.states.MacroProp.macroProperties.find(item => item?.MacroIndex === macroIndex);
                //console.log(macro);
                switch (type) {
                    case MacroFeedbackType.IsUsed: {
                        return !!macro?.isUsed;
                    }
                    case MacroFeedbackType.IsRecording:
                        return !!macro?.isRecording;
                    case MacroFeedbackType.IsRunning:
                        return !!macro?.isRunning;
                    case MacroFeedbackType.IsWaiting:
                        return !!macro?.isWaiting;
                }
            }
            return false;
        },
    };
    feedbacks[enums_1.feedbackId.FadeToBlackRate] = {
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
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            const rate = Number(_feedback.options.FtbRate);
            //console.log(rate);
            return self.states.fadeToBlack?.rate === rate;
        },
        learn: (feedback) => {
            if (self.states.fadeToBlack) {
                return {
                    ...feedback.options,
                    FtbRate: self.states.fadeToBlack?.rate,
                };
            }
            else {
                return undefined;
            }
        },
    };
    feedbacks[enums_1.feedbackId.FadeToBlackIsBlack] = {
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
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            if (self.states.fadeToBlack) {
                switch (_feedback.options.state) {
                    case 'off':
                        return !self.states.fadeToBlack.isFullyBlack && !self.states.fadeToBlack.inTransition;
                    case 'fading':
                        return self.states.fadeToBlack.inTransition;
                    default:
                        // on
                        return !self.states.fadeToBlack.inTransition && self.states.fadeToBlack.isFullyBlack;
                }
            }
            return false;
        },
    };
    feedbacks[enums_1.feedbackId.FTBAFV] = {
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
            }
        ],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            if (self.states.fadeToBlack) {
                switch (_feedback.options.state) {
                    case 0:
                        return false;
                    default:
                        // on
                        return self.states.fadeToBlack.AFV;
                }
            }
            return false;
        },
    };
    feedbacks[enums_1.feedbackId.AuxBG] = {
        type: 'boolean',
        name: 'Aux: Source',
        description: 'If the input specified is selected in the aux bus specified, change style of the bank',
        options: [
            {
                type: 'dropdown',
                label: 'Aux Source',
                id: 'auxSourceID',
                choices: model_1.SettingsAuxSourceChoices,
                default: 0,
            }
        ],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            return self.states.SettingsProp.AuxSource === Number(_feedback.options.auxSourceID);
        },
        learn: (feedback) => {
            const auxSource = self.states.SettingsProp.AuxSource;
            if (auxSource !== undefined) {
                return {
                    ...feedback.options,
                    auxSourceID: auxSource,
                };
            }
            else {
                return undefined;
            }
        },
    };
    //superSource
    feedbacks[enums_1.feedbackId.SuperSourceEnable] = {
        type: 'boolean',
        name: 'SuperSource: Set Super Source Enable',
        description: 'If you turn on Super Source, change style of the bank',
        options: [],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            return self.states.SuperSourcePorp.SSEnable;
        },
    };
    feedbacks[enums_1.feedbackId.SuperSourceSelect] = {
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
                choices: (0, choices_1.getChoices)(enums_1.ActionType.SuperSourceSource),
                default: 0,
            }
        ],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            let type = Number(_feedback.options.typeid);
            let SourceID = Number(_feedback.options.SourceID);
            if (type === 0) {
                return self.states.SuperSourcePorp.SuperSourceSource1.id === SourceID;
            }
            else if (type === 1) {
                return self.states.SuperSourcePorp.SuperSourceSource2.id === SourceID;
            }
            else if (type === 2) {
                return self.states.SuperSourcePorp.SuperSourceBackground.id === SourceID;
            }
            return false;
        },
    };
    feedbacks[enums_1.feedbackId.SuperSourceControlStyle] = {
        type: 'boolean',
        name: 'SuperSource: Set SuperSource ControlStyle',
        description: 'If you Select SuperSource, change style of the bank',
        options: [
            {
                type: 'dropdown',
                label: 'style',
                id: 'styleid',
                choices: model_1.SuperSourceStyleChoices,
                default: 0,
            }
        ],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            return self.states.SuperSourcePorp.SuperSourceControlStyle.id === _feedback.options.styleid;
        },
    };
    feedbacks[enums_1.feedbackId.SuperSourceMask] = {
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
                    { id: 1, label: 'mask2' }
                ],
                default: 0,
            }
        ],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            let type = Number(_feedback.options.typeid);
            if (type === 0) {
                return self.states.SuperSourcePorp.SuperSourceMaskEnable.mask1;
            }
            else {
                return self.states.SuperSourcePorp.SuperSourceMaskEnable.mask2;
            }
        },
    };
    //upStreamKeyType
    feedbacks[enums_1.feedbackId.UpStreamKeyType] = {
        type: 'boolean',
        name: 'UpStream Key: Set UpStream Key Type',
        description: 'If you Select UpStream Key, change style of the bank',
        options: [
            {
                type: 'dropdown',
                label: 'Type',
                id: 'USKType',
                choices: model_1.UpStreamKeyTypeChoices,
                default: 0,
            }
        ],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            let typeid = Number(_feedback.options.USKType);
            return self.states.upStreamKeyState.UpStreamKeyType === typeid;
        },
    };
    //AUdio Mixer
    feedbacks[enums_1.feedbackId.AudioEnable] = {
        type: 'boolean',
        name: 'UpStream Key: Set UpStream Key Type',
        description: 'If you Select UpStream Key, change style of the bank',
        options: [
            {
                type: 'dropdown',
                label: 'Source',
                id: 'ASource',
                choices: (0, choices_1.getChoices)(enums_1.ActionType.AudioEnableSource),
                default: 0,
            },
            {
                type: 'dropdown',
                label: 'Enable',
                id: 'AudioEnable',
                choices: (0, choices_1.getChoices)(enums_1.ActionType.AudioEnable),
                default: 0,
            },
        ],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            let typeid = Number(_feedback.options.ASource);
            let t_enable = Number(_feedback.options.AudioEnable);
            if (typeid === 0) {
                return self.states.AudioMixerPorp.AudioEnable.mic1 === t_enable;
            }
            else if (typeid === 1) {
                return self.states.AudioMixerPorp.AudioEnable.mic2 === t_enable;
            }
            else if (typeid === 2) {
                return self.states.AudioMixerPorp.AudioEnable.in1 === t_enable;
            }
            else if (typeid === 3) {
                return self.states.AudioMixerPorp.AudioEnable.in2 === t_enable;
            }
            else if (typeid === 4) {
                return self.states.AudioMixerPorp.AudioEnable.in3 === t_enable;
            }
            else if (typeid === 5) {
                return self.states.AudioMixerPorp.AudioEnable.in4 === t_enable;
            }
            else {
                return self.states.AudioMixerPorp.AudioEnable.aux === t_enable;
            }
        },
    };
    feedbacks[enums_1.feedbackId.AudioTransition] = {
        type: 'boolean',
        name: 'Audio Mixer: Set AudioTransition	Enable',
        description: 'If you turn on AudioTransition, change style of the bank',
        options: [],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            return self.states.AudioMixerPorp.AudioTransition;
        },
    };
    //Streamming
    feedbacks[enums_1.feedbackId.StreamOutput] = {
        type: 'boolean',
        name: 'Streamming: Set Stream Enable',
        description: 'If you turn on Stream Enable, change style of the bank',
        options: [
            {
                type: 'dropdown',
                label: 'Stream',
                id: 'StreamID',
                choices: model_1.StreamingChoices,
                default: 0,
            },
        ],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            if (_feedback.options.StreamID === 0) {
                return self.states.StreamingProp.stream1;
            }
            else if (_feedback.options.StreamID === 1) {
                return self.states.StreamingProp.stream2;
            }
            else if (_feedback.options.StreamID === 2) {
                return self.states.StreamingProp.stream3;
            }
            return false;
        },
    };
    //Playback
    feedbacks[enums_1.feedbackId.PlaybackMode] = {
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
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            return _feedback.options.ModeID === self.states.PlayBackState.PlaybackMode;
        },
    };
    feedbacks[enums_1.feedbackId.PlaybackRepeat] = {
        type: 'boolean',
        name: 'Playback: Set Playback Repeat',
        description: 'If you turn on Playback Repeat, change style of the bank',
        options: [],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            return self.states.PlayBackState.PlaybackRepeat;
        },
    };
    feedbacks[enums_1.feedbackId.PlaybackPause] = {
        type: 'boolean',
        name: 'Playback: Set Playback Pause',
        description: 'If you turn on Playback Pause, change style of the bank',
        options: [],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            return self.states.PlayBackState.PlaybackPause;
        },
    };
    feedbacks[enums_1.feedbackId.PlaybackBar] = {
        type: 'boolean',
        name: 'Playback: Set Playback Bar',
        description: 'If you turn on Playback Bar, change style of the bank',
        options: [],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            return self.states.PlayBackState.PlaybackBar;
        },
    };
    feedbacks[enums_1.feedbackId.PlayFile] = {
        type: 'boolean',
        name: 'PlayFile: feedback based on current loaded video file',
        description: 'Change style of bank if video file is loaded',
        options: [
            {
                type: 'dropdown',
                label: 'Video file',
                id: 'PlayFileID',
		choices: (0, self.states.PlayBackState.PlayFileList.map((s, index) => ({
        id: index,
        label: s,
		    }))),
                default: 0,
            },
        ],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            return _feedback.options.PlayFileID === self.states.PlayBackState.PlayFile;
        },
    };
    
    //Record
    feedbacks[enums_1.feedbackId.Record] = {
        type: 'boolean',
        name: 'Record: Set Record Start or Stop',
        description: 'If you turn on Record Start, change style of the bank',
        options: [],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            return self.states.RecordState;
        },
    };
    //Live
    feedbacks[enums_1.feedbackId.Live] = {
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
                    { id: 2, label: 'abnormal' }
                ],
                default: 0,
            },
        ],
        defaultStyle: {
            color: (0, base_1.combineRgb)(0, 0, 0),
            bgcolor: (0, base_1.combineRgb)(255, 255, 0),
        },
        callback: (_feedback) => {
            return self.states.LiveState === _feedback.options.statesId;
        },
    };
    return feedbacks;
}
exports.feedbacks = feedbacks;
//# sourceMappingURL=feedback.js.map

//# sourceURL=webpack://osee-gostreamdeck/./dist/feedback.js?
