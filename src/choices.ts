import { ActionType } from './enums'
import { SourceModels,
	 OtherSourceModels,
	 OtherDipSourceModels,
	 OtherDSKSourceModels,
	 AudioMicChoices,
	 AudioInputSourcesChoices,
	 OtherAudioSourcesChoices,
         AudioSourcesEnableChoices,
	 OtherAudioSourcesEnableChoices,
       SettingsOutSourceChoices } from './model'

type Choice = {
    id: string,
    label: string
};

function getChoices(type) {
	switch (type) {
		default:
		case ActionType.Program:
		case ActionType.Preview:
			let sources = SourceModels
			let others = OtherSourceModels
			let f_sources = sources.concat(others)
			return SourcesToChoices(f_sources)
		case ActionType.TransitionDipSource:
		case ActionType.TransitionWipeFillSource:
			let sources1 = SourceModels
			let others1 = OtherDipSourceModels
			let dip_sources = sources1.concat(others1)
			return SourcesToChoices(dip_sources)
		case ActionType.DskSourceFill:
		case ActionType.SuperSourceSource:
		case ActionType.LumaKeySourceKey:
		case ActionType.ChromaKeySourceKey:
		case ActionType.KeyPatternSourceKey:
		case ActionType.PipSource:
			let sources2 = SourceModels
			let others2 = OtherDSKSourceModels
			let dsk_sources = sources2.concat(others2)
			return SourcesToChoices(dsk_sources)
		case ActionType.AudioEnableSource:
			let audio_e_sources = AudioMicChoices.concat(AudioInputSourcesChoices)
			return audio_e_sources
		case ActionType.AudioFader:
		case ActionType.AudioMonitorSource:
			let mic_sources = AudioMicChoices
			let in_sources = AudioInputSourcesChoices
			let o_sources = OtherAudioSourcesChoices
			let audio_sources = mic_sources.concat(in_sources).concat(o_sources)
			return audio_sources
		case ActionType.AudioEnable:
			let ac_enables = AudioSourcesEnableChoices
			let o_enables = OtherAudioSourcesEnableChoices
			let a_enables = ac_enables.concat(o_enables)
			return a_enables
		case ActionType.SettingsoutSource:
			let i_sources = SourcesToChoices(SourceModels)
			let src_source = i_sources.concat(SettingsOutSourceChoices)
			return src_source
	}
}

function getChoicesByAudioSourceType(value) {
	let sources = AudioSourcesEnableChoices
	switch (value) {
		case 0:
		case 1:
			return sources
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
			let o_sources = OtherAudioSourcesEnableChoices
			let e_sources = sources.concat(o_sources)
			return e_sources
		default:
			return AudioSourcesEnableChoices
	}
}

function getChoicesByMacro() {
    let Source : Choice[] = []
	for (var i = 0; i < 100; i++) {
		Source.push({ id: i.toString(), label: 'Macro' + (i + 1).toString() })
	}
	return Source
}

function getChoicesByStill() {
    let Source : Choice[] = []
	for (var i = 0; i <= 31; i++) {
		Source.push({ id: i.toString(), label: 'Pic' + i.toString() })
	}
	return Source
}

function SourcesToChoices(sources) {
	return sources.map((s) => ({
		id: s.inputId,
		label: s.longName,
	}))
}

export { SourcesToChoices, getChoicesByStill, getChoicesByMacro, getChoicesByAudioSourceType, getChoices, Choice }

