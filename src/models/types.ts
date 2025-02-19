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
	HeadphoneSourceChoices,
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

export type PortT = {
	id: number
	name: string
}

export type SourceT = {
	id: number
	name: string
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
	outputPorts: PortT[]

	constructor() {
		this.id = Model.Unknown
		this.label = ''
		this.outputs = []
		this.inputs = []
		this.streams = 0
		this.transitionTypes = 0
		this.stillSlots = 0
		this.outputPorts = [
			{ id: 0, name: 'HDMI 1' },
			{ id: 1, name: 'HDMI 2' },
			{ id: 2, name: 'UVC' },
		]
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
				return HeadphoneSourceChoices
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

	InputSources(): SourceT[] {
		return [
			{ id: 0, name: 'In 1' },
			{ id: 1, name: 'In 2' },
			{ id: 2, name: 'In 3' },
			{ id: 3, name: 'In 4' },
			{ id: 4, name: 'Aux' },
			{ id: 5, name: 'S/SRC' },
			{ id: 6, name: 'Still 1' },
			{ id: 7, name: 'Still 2' },
		]
	}

	OutputSources(): SourceT[] {
		return [
			{ id: 0, name: 'In 1' },
			{ id: 1, name: 'In 2' },
			{ id: 2, name: 'In 3' },
			{ id: 3, name: 'In 4' },
			{ id: 4, name: 'Aux' },
			{ id: 5, name: 'PGM' },
			{ id: 6, name: 'PVW' },
			{ id: 7, name: 'Multiview' },
		]
	}

	FillKeySources(): SourceT[] {
		return [
			{ id: 0, name: 'In 1' },
			{ id: 1, name: 'In 2' },
			{ id: 2, name: 'In 3' },
			{ id: 3, name: 'In 4' },
			{ id: 4, name: 'Aux' },
			{ id: 5, name: 'Still 1' },
			{ id: 6, name: 'Still 1 Key' },
			{ id: 7, name: 'Still 2' },
			{ id: 8, name: 'Still 2 Key' },
			{ id: 9, name: 'Color 1' },
			{ id: 10, name: 'Color 2' },
			{ id: 11, name: 'Color Bar' },
			{ id: 12, name: 'Black' },
		]
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
