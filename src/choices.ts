import { ActionType } from './enums'
import {
	SourceModels,
	OtherSourceModels,
	OtherDipSourceModels,
	OtherDSKSourceModels,
	AudioMicChoices,
	AudioInputSourcesChoices,
	OtherAudioSourcesChoices,
	AudioSourcesEnableChoices,
	OtherAudioSourcesEnableChoices,
	SettingsOutSourceChoices,
} from './model'

export type Choice = {
	id: number
	label: string
}

export function getChoices(type: ActionType | undefined): Choice[] {
	switch (type) {
		default:
		case ActionType.Program:
		case ActionType.Preview: {
			const sources = SourceModels
			const others = OtherSourceModels
			const f_sources = sources.concat(others)
			return SourcesToChoices(f_sources)
		}
		case ActionType.TransitionDipSource:
		case ActionType.TransitionWipeFillSource: {
			const sources1 = SourceModels
			const others1 = OtherDipSourceModels
			const dip_sources = sources1.concat(others1)
			return SourcesToChoices(dip_sources)
		}
		case ActionType.DskSourceFill:
		case ActionType.SuperSourceSource:
		case ActionType.LumaKeySourceKey:
		case ActionType.ChromaKeySourceKey:
		case ActionType.KeyPatternSourceKey:
		case ActionType.PipSource: {
			const sources2 = SourceModels
			const others2 = OtherDSKSourceModels
			const dsk_sources = sources2.concat(others2)
			return SourcesToChoices(dsk_sources)
		}
		case ActionType.AudioEnableSource: {
			const audio_e_sources = AudioMicChoices.concat(AudioInputSourcesChoices)
			return audio_e_sources
		}
		case ActionType.AudioFader:
		case ActionType.AudioMonitorSource: {
			const mic_sources = AudioMicChoices
			const in_sources = AudioInputSourcesChoices
			const o_sources = OtherAudioSourcesChoices
			const audio_sources = mic_sources.concat(in_sources).concat(o_sources)
			return audio_sources
		}
		case ActionType.AudioEnable: {
			const ac_enables = AudioSourcesEnableChoices
			const o_enables = OtherAudioSourcesEnableChoices
			const a_enables = ac_enables.concat(o_enables)
			return a_enables
		}
		case ActionType.SettingsoutSource: {
			const i_sources = SourcesToChoices(SourceModels)
			const src_source = i_sources.concat(SettingsOutSourceChoices)
			return src_source
		}
	}
}

export function getChoicesByAudioSourceType(value: number): Choice[] {
	const sources = AudioSourcesEnableChoices
	switch (value) {
		case 0:
		case 1:
			return sources
		case 2:
		case 3:
		case 4:
		case 5:
		case 6: {
			const o_sources = OtherAudioSourcesEnableChoices
			const e_sources = sources.concat(o_sources)
			return e_sources
		}
		default:
			return AudioSourcesEnableChoices
	}
}

export function getChoicesByMacro(): Choice[] {
	const Source: Choice[] = []
	for (let i = 0; i < 100; i++) {
		Source.push({ id: i, label: 'Macro' + (i + 1).toString() })
	}
	return Source
}

export function getChoicesByStill(): Choice[] {
	const Source: Choice[] = []
	for (let i = 0; i <= 31; i++) {
		Source.push({ id: i, label: 'Pic' + i.toString() })
	}
	return Source
}

export function SourcesToChoices(sources: { inputId: number; longName: string; shortName: string }[]): Choice[] {
	return sources.map((s) => ({
		id: s.inputId,
		label: s.longName,
	}))
}
