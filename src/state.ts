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
	infos: {
		protocolVersion: string
		deviceType: number
	}
	TKeyeState: {
		BKGD: boolean
		DSK: boolean
		M_Key: boolean
		KeyOnAir: boolean
		DSKOnAir: boolean
	}
	selectOutputs: object
	upStreamKeyState: {
		PvwOnAir: boolean
		Tied: boolean
		OnAir: boolean
		UpStreamKeyType: number
		ArrayKeySourceFill: number[]
	}
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
		infos: {
			protocolVersion: '1.0',
			deviceType: 0,
		},
		TKeyeState: {
			BKGD: true,
			DSK: false,
			M_Key: false,
			KeyOnAir: false,
			DSKOnAir: false,
		},
		selectOutputs: {},
		upStreamKeyState: {
			PvwOnAir: false,
			Tied: false,
			OnAir: false,
			UpStreamKeyType: 0,
			ArrayKeySourceFill: [0, 0, 0, 0],
		},
	}
}
