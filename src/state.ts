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
import { ColorBackState } from './functions/colorBack'
import type { GoStreamModel } from './models/types'

export type GoStreamState = {
	MixEffect: MixEffectState.MixEffectStateT
	Streaming: StreamingState.StreamingStateT
	StillGenerator: StillGeneratorState.StillGeneratorStateT
	Playback: PlaybackState.PlaybackStateT
	Record: RecordState.RecordStateT
	SuperSource: SuperSourceState.SuperSourceStateT
	AudioMixer: AudioMixerState.AudioMixerStateT
	DownstreamKeyer: DownstreamKeyerState.DownstreamKeyerStateT
	Settings: SettingsState.SettingsStateT
	Macro: MacroState.MacroStateT
	UpstreamKeyer: UpstreamKeyerState.UpstreamKeyerStateT
	ColorBack: ColorBackState.ColorBackStateT
	infos: {
		protocolVersion: string
		deviceType: number
	}
	selectOutputs: object
}

export function create(model: GoStreamModel): GoStreamState {
	return {
		MixEffect: MixEffectState.create(model),
		Streaming: StreamingState.create(model),
		StillGenerator: StillGeneratorState.create(model),
		Playback: PlaybackState.create(model),
		Record: RecordState.create(model),
		SuperSource: SuperSourceState.create(model),
		AudioMixer: AudioMixerState.create(model),
		DownstreamKeyer: DownstreamKeyerState.create(model),
		Settings: SettingsState.create(model),
		Macro: MacroState.create(model),
		UpstreamKeyer: new UpstreamKeyerState.UpstreamKeyerStateT(model),
		ColorBack: ColorBackState.create(model),
		infos: {
			protocolVersion: '1.0',
			deviceType: 0,
		},
		selectOutputs: {},
	}
}
