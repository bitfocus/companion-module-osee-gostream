import { DropdownChoice } from '@companion-module/base'
import {
    SourceModels,
    OtherSourceModels,
    OtherDipSourceModels,
    OtherDSKSourceModels,
    AudioSourcesChoices,
    OtherAudioSourcesChoices,
    AudioSourcesEnableChoices,
    OtherAudioSourcesEnableChoices,
    SettingsOutSourceChoices,
} from './model'
import { ActionType } from './enums'
import { InputChannel } from './state';

export function getChoices(type: ActionType): DropdownChoice[] {
    switch (type) {
        default:
        case ActionType.Program:
        case ActionType.Preview:
            let sources = SourceModels;
            let others = OtherSourceModels;
            let f_sources = sources.concat(others);
            return SourcesToChoices(f_sources);
        case ActionType.TransitionDipSource:
        case ActionType.TransitionWipeFillSource:
            let sources1 = SourceModels;
            let others1 = OtherDipSourceModels;
            let dip_sources = sources1.concat(others1);
            return SourcesToChoices(dip_sources);
        case ActionType.DskSourceFill:
        case ActionType.SuperSourceSource:
        case ActionType.LumaKeySourceKey:
        case ActionType.ChromaKeySourceKey:
        case ActionType.KeyPatternSourceKey:
        case ActionType.PipSource:
            let sources2 = SourceModels;
            let others2 = OtherDSKSourceModels;
            let dsk_sources = sources2.concat(others2);
            return SourcesToChoices(dsk_sources);
        case ActionType.AudioFader:
        case ActionType.AudioMonitorSource:
            let a_sources = AudioSourcesChoices;
            let o_sources = OtherAudioSourcesChoices;
            let audio_sources = a_sources.concat(o_sources);
            return audio_sources;
        case ActionType.SettingsoutSource:
            let i_sources = SourcesToChoices(SourceModels);
            let src_source = i_sources.concat(SettingsOutSourceChoices)
            return src_source;
    }
}

export function getChoicesByAudioSourceType(value: Number): DropdownChoice[] {
    let sources = AudioSourcesEnableChoices;
    switch (value) {
        case 0:
        case 1:
            return sources;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            let o_sources = OtherAudioSourcesEnableChoices;
            let e_sources = sources.concat(o_sources);
            return e_sources;
        default:
            return AudioSourcesEnableChoices;
    }
}

export function getChoicesByMacro(): DropdownChoice[] {
    let Source: DropdownChoice[] = [];
    for (var i = 0; i < 100; i++) {
        Source.push({ id: i.toString(), label: 'Macro' + (i + 1).toString() })
    }
    return Source;
}

export function SourcesToChoices(sources: InputChannel[]): DropdownChoice[] {
    return sources.map((s) => ({
        id: s.inputId,
        label: s.longName,
    }))
}