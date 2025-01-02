import { Choice } from './choices'
import { MixEffectState } from './functions/mixEffect'
import { StreamingState } from './functions/streaming'
import { LiveState } from './functions/live'
import { StillGeneratorState } from './functions/stillGenerator'
import { PlaybackState } from './functions/playback'
import { RecordState } from './functions/record'
import { SuperSourceState } from './functions/superSource'
import { AudioMixerState } from './functions/audioMixer'
import { DownstreamKeyerState } from './functions/downstreamKeyer'

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
	SettingsProp: {
		AuxSource: number
		OutSource: {
			hdmi1: Choice
			hdmi2: Choice
			uvc: Choice
		}
		SettingsInputWindowLayout: number
		MvMeter: number[]
		SourceSelection: number[]
		OutputColorSpace: number[]
		OutputFormat: number
		MicInput: number[]
		MvLayout: number
	}
	StillProp: {
		Still1: number
		Still2: number
	}
	MacroProp: {
		macroProperties: number[]
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
		SettingsProp: {
			AuxSource: 0,
			OutSource: {
				hdmi1: { id: 0, label: 'Input1' },
				hdmi2: { id: 0, label: 'Input1' },
				uvc: { id: 0, label: 'Input1' },
			},
			SettingsInputWindowLayout: 0,
			MvMeter: [0, 0, 0, 0, 0, 0],
			SourceSelection: [0, 0, 0, 0], // INPUT1-4
			OutputColorSpace: [0, 0],
			OutputFormat: 0,
			MicInput: [0, 0],
			MvLayout: 0,
		},
		StillProp: {
			Still1: 0,
			Still2: 0,
		},
		MacroProp: {
			macroProperties: [],
		},
	}
}
