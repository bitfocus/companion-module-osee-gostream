import { Choice } from './choices'
import { MixEffectState } from './functions/mixEffect'
import { StreamingState } from './functions/streaming'
import { LiveState } from './functions/live'
import { StillGeneratorState } from './functions/stillGenerator'
import { PlaybackState } from './functions/playback'
import { RecordState } from './functions/record'

type GoStreamState = {
	MixEffect: MixEffectState.State
	Streaming: StreamingState.State
	Live: LiveState.State
	StillGenerator: StillGeneratorState.State
	Playback: PlaybackState.State
	Record: RecordState.State
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
	DSKState: {
		DSKSourceFill: Choice
		DSKSourceKeyFill: Choice
		DskMask: boolean
		DskControlInvert: boolean
		DskControlShapedKey: boolean
	}
	selectOutputs: object
	upStreamKeyState: {
		PvwOnAir: boolean
		Tied: boolean
		OnAir: boolean
		UpStreamKeyType: number
		ArrayKeySourceFill: number[]
	}
	SuperSourcePorp: {
		SSEnable: boolean
		SuperSourceSource1: Choice
		SuperSourceSource2: Choice
		SuperSourceBackground: Choice
		SuperSourceControlStyle: Choice
		SuperSourceMaskEnable: {
			mask1: boolean
			mask2: boolean
		}
	}
	AudioMixerPorp: {
		AudioTransition: boolean
		AudioEnable: {
			mic1: number
			mic2: number
			in1: number
			in2: number
			in3: number
			in4: number
			aux: number
		}
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
		DSKState: {
			DSKSourceFill: { id: 0, label: 'Input1' },
			DSKSourceKeyFill: { id: 0, label: 'Input1' },
			DskMask: false,
			DskControlInvert: false,
			DskControlShapedKey: false,
		},
		selectOutputs: {},
		upStreamKeyState: {
			PvwOnAir: false,
			Tied: false,
			OnAir: false,
			UpStreamKeyType: 0,
			ArrayKeySourceFill: [0, 0, 0, 0],
		},
		SuperSourcePorp: {
			SSEnable: false,
			SuperSourceSource1: { id: 0, label: 'Input1' },
			SuperSourceSource2: { id: 0, label: 'Input1' },
			SuperSourceBackground: { id: 0, label: 'Input1' },
			SuperSourceControlStyle: { id: 0, label: 'zoom in' },
			SuperSourceMaskEnable: {
				mask1: false,
				mask2: false,
			},
		},
		AudioMixerPorp: {
			AudioTransition: false,
			AudioEnable: {
				mic1: 0,
				mic2: 0,
				in1: 0,
				in2: 0,
				in3: 0,
				in4: 0,
				aux: 0,
			},
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
