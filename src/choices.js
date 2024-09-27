
//Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SourcesToChoices = exports.getChoicesByStill = exports.getChoicesByMacro = exports.getChoicesByAudioSourceType = exports.getChoices = void 0;
const model_1 = require("./model.js");
const enums_1 = require("./enums.js");
function getChoices(type) {
    switch (type) {
        default:
        case enums_1.ActionType.Program:
        case enums_1.ActionType.Preview:
            let sources = model_1.SourceModels;
            let others = model_1.OtherSourceModels;
            let f_sources = sources.concat(others);
            return SourcesToChoices(f_sources);
        case enums_1.ActionType.TransitionDipSource:
        case enums_1.ActionType.TransitionWipeFillSource:
            let sources1 = model_1.SourceModels;
            let others1 = model_1.OtherDipSourceModels;
            let dip_sources = sources1.concat(others1);
            return SourcesToChoices(dip_sources);
        case enums_1.ActionType.DskSourceFill:
        case enums_1.ActionType.SuperSourceSource:
        case enums_1.ActionType.LumaKeySourceKey:
        case enums_1.ActionType.ChromaKeySourceKey:
        case enums_1.ActionType.KeyPatternSourceKey:
        case enums_1.ActionType.PipSource:
            let sources2 = model_1.SourceModels;
            let others2 = model_1.OtherDSKSourceModels;
            let dsk_sources = sources2.concat(others2);
            return SourcesToChoices(dsk_sources);
        case enums_1.ActionType.AudioEnableSource:
            let audio_e_sources = model_1.AudioMicChoices.concat(model_1.AudioInputSourcesChoices);
            return audio_e_sources;
        case enums_1.ActionType.AudioFader:
        case enums_1.ActionType.AudioMonitorSource:
            let mic_sources = model_1.AudioMicChoices;
            let in_sources = model_1.AudioInputSourcesChoices;
            let o_sources = model_1.OtherAudioSourcesChoices;
            let audio_sources = mic_sources.concat(in_sources).concat(o_sources);
            return audio_sources;
        case enums_1.ActionType.AudioEnable:
            let ac_enables = model_1.AudioSourcesEnableChoices;
            let o_enables = model_1.OtherAudioSourcesEnableChoices;
            let a_enables = ac_enables.concat(o_enables);
            return a_enables;
        case enums_1.ActionType.SettingsoutSource:
            let i_sources = SourcesToChoices(model_1.SourceModels);
            let src_source = i_sources.concat(model_1.SettingsOutSourceChoices);
            return src_source;
    }
}
exports.getChoices = getChoices;
function getChoicesByAudioSourceType(value) {
    let sources = model_1.AudioSourcesEnableChoices;
    switch (value) {
        case 0:
        case 1:
            return sources;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            let o_sources = model_1.OtherAudioSourcesEnableChoices;
            let e_sources = sources.concat(o_sources);
            return e_sources;
        default:
            return model_1.AudioSourcesEnableChoices;
    }
}
exports.getChoicesByAudioSourceType = getChoicesByAudioSourceType;
function getChoicesByMacro() {
    let Source = [];
    for (var i = 0; i < 100; i++) {
        Source.push({ id: i.toString(), label: 'Macro' + (i + 1).toString() });
    }
    return Source;
}
exports.getChoicesByMacro = getChoicesByMacro;
function getChoicesByStill() {
    let Source = [];
    for (var i = 0; i < 31; i++) {
        Source.push({ id: i.toString(), label: 'Pic' + (i + 1).toString() });
    }
    return Source;
}
exports.getChoicesByStill = getChoicesByStill;
function SourcesToChoices(sources) {
    return sources.map((s) => ({
        id: s.inputId,
        label: s.longName,
    }));
}
exports.SourcesToChoices = SourcesToChoices;
//# sourceMappingURL=choices.js.map

//# sourceURL=webpack://osee-gostreamdeck/./dist/choices.js?
