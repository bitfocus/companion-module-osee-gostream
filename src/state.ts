import { MixEffectState } from './functions/mixEffect'
import { StreamingState } from './functions/streaming'
import { LiveState } from './functions/live'
import { StillGeneratorState } from './functions/stillGenerator'
import { PlaybackState } from './functions/playback'
import { RecordState } from './functions/record'
import { SuperSourceState } from './functions/superSource'
import { AudioMixerState } from './functions/audioMixer'
import { DownstreamKeyerState } from './functions/downstreamKeyer'
import { SettingsState } from './functions/settings'
import { MacroState } from './functions/macro'
import { UpstreamKeyerState } from './functions/upstreamKeyer'

type GoStreamState = {
	MixEffect: MixEffectState.State
	Streaming: StreamingState.State
	Live: LiveState.State
	StillGenerator: StillGeneratorState.State
	Playback: PlaybackState.State
	Record: RecordState.State
	SuperSource: SuperSourceState.State
	AudioMixer: AudioMixerState.State
	DownstreamKeyer: DownstreamKeyerState.State
	Settings: SettingsState.State
	Macro: MacroState.State
	UpstreamKeyer: UpstreamKeyerState.State
	infos: {
		protocolVersion: string
		deviceType: number
	}
	selectOutputs: object
}

export function Create(): GoStreamState {
	return {
		...MixEffectState.create(),
		...StreamingState.create(),
		...LiveState.create(),
		...StillGeneratorState.create(),
		...PlaybackState.create(),
		...RecordState.create(),
		...SuperSourceState.create(),
		...AudioMixerState.create(),
		...DownstreamKeyerState.create(),
		...SettingsState.create(),
		...MacroState.create(),
		...UpstreamKeyerState.create(),
		infos: {
			protocolVersion: '1.0',
			deviceType: 0,
		},
		selectOutputs: {},
	}
}
