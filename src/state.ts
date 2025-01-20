import { MixEffectState } from './functions/mixEffect'
import { StreamingState } from './functions/streaming'
import { StillGeneratorState } from './functions/stillGenerator'
import { PlaybackState } from './functions/playback'
import { RecordState } from './functions/record'
import { SuperSourceState } from './functions/superSource'
import { AudioMixerState } from './functions/audioMixer'
import { DownstreamKeyerState } from './functions/downstreamKeyer'
import { SettingsState } from './functions/settings'
import { MacroState } from './functions/macro'
import { UpstreamKeyerState } from './functions/upstreamKeyer'
import type { IModelSpec } from './models/types'

export type GoStreamState = {
	MixEffect: MixEffectState.MixEffectStateT
	Streaming: StreamingState.StreamingStateT
	StillGenerator: StillGeneratorState.StillGeneratorStateT
	Playback: PlaybackState.PlaybackStateT
	Record: RecordState.RecordStateT
	SuperSource: SuperSourceState.SuperSourceStateT
	AudioMixer: AudioMixerState.AudioMixerState
	DownstreamKeyer: DownstreamKeyerState.DownstreamKeyerStateT
	Settings: SettingsState.SettingsStateT
	Macro: MacroState.MacroState
	UpstreamKeyer: UpstreamKeyerState.UpstreamKeyerStateT
	infos: {
		protocolVersion: string
		deviceType: number
	}
	selectOutputs: object
}

export function create(model: IModelSpec): GoStreamState {
	return {
		MixEffect: { ...MixEffectState.create(model) },
		Streaming: { ...StreamingState.create(model) },
		StillGenerator: { ...StillGeneratorState.create(model) },
		Playback: { ...PlaybackState.create(model) },
		Record: { ...RecordState.create(model) },
		SuperSource: { ...SuperSourceState.create(model) },
		AudioMixer: { ...AudioMixerState.create(model) },
		DownstreamKeyer: { ...DownstreamKeyerState.create(model) },
		Settings: { ...SettingsState.create(model) },
		Macro: { ...MacroState.create(model) },
		UpstreamKeyer: { ...UpstreamKeyerState.create(model) },
		infos: {
			protocolVersion: '1.0',
			deviceType: 0,
		},
		selectOutputs: {},
	}
}
