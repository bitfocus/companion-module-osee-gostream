import { PortCaps, PortType, ActionType } from '../enums'
import { DropdownChoice } from '@companion-module/base'
import {} from './../enums'
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
} from '../model'

export enum Model {
	Unknown = 'Unknown',
	Deck = 'GOSECK',
	Duet = 'GOSUET',
}

export const MODEL_AUTO_DETECT = Model.Unknown
export type ModelId = 0 | Model
export type IPortSpec = {
	id: number
	longName: string
	shortName: string
	type: PortType
	caps: PortCaps
}

export function SourcesToChoices(
	sources: { inputId: number; longName: string; shortName: string }[],
): DropdownChoice[] {
	return sources.map((s) => ({
		id: s.inputId,
		label: s.longName,
	}))
}

export class GoStreamModel {
	id: Model
	label: string
	outputs: IPortSpec[]
	inputs: IPortSpec[]
	streams: number
	transitionTypes: number
	stillSlots: number

	constructor() {
		this.id = Model.Unknown
		this.label = ''
		this.outputs = []
		this.inputs = []
		this.streams = 0
		this.transitionTypes = 0
		this.stillSlots = 0
	}

	// TODO: re-write all these getters below
	getChoices(type: ActionType): DropdownChoice[] {
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
		return []
	}

	getChoicesByAudioSourceType(value: number): DropdownChoice[] {
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

	getChoicesByMacro(): DropdownChoice[] {
		const Source: DropdownChoice[] = []
		for (let i = 0; i < 100; i++) {
			Source.push({ id: i, label: 'Macro' + (i + 1).toString() })
		}
		return Source
	}

	getChoicesByStill(): DropdownChoice[] {
		const Source: DropdownChoice[] = []
		for (let i = 0; i <= 31; i++) {
			Source.push({ id: i, label: 'Pic' + i.toString() })
		}
		return Source
	}

	SourcesToChoices(sources: { inputId: number; longName: string; shortName: string }[]): DropdownChoice[] {
		return sources.map((s) => ({
			id: s.inputId,
			label: s.longName,
		}))
	}
}

export function generatePorts(
	longNamePrefix: string,
	shortNamePrefix: string,
	type: PortType,
	caps: PortCaps,
	count: number,
	idOffset?: number,
): IPortSpec[] {
	const outputs: IPortSpec[] = []
	const offset = idOffset ? idOffset : 0
	for (let i = 0; i < count; i++) {
		outputs.push({
			id: offset + i,
			longName: `${longNamePrefix} ${i + 1}`,
			shortName: `${shortNamePrefix} ${i + 1}`,
			type: type,
			caps: caps,
		})
	}
	return outputs
}
