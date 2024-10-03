function Create() {
	return {
		selectPrevInput: { id: 0, label: 'Input1' },
		selectPgmInput: { id: 0, label: 'Input1' },
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
			UpStreamKeyType: 0,
			ArrayKeySourceFill: [0, 0, 0, 0],
		},
		transitionPosition: {
			inTransition: false,
			handlePosition: 0,
		},
		fadeToBlack: {
			inTransition: false,
			isFullyBlack: false,
			AFV: false,
			rate: 0,
		},
		selectTransitionStyle: {
			PrevState: false,
			style: { id: 0, label: 'MIX' },
			mixrate: 0,
			diprate: 0,
			wiperate: 0,
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
		PlayBackState: {
			PlaybackMode: 0,
			PlaybackRepeat: false,
			PlaybackPause: false,
			PlaybackBar: false,
			PlayFile: 0,
			// Not really state variable, hold videofile list
			// TODO: place somewhere more logical
			PlayFileList: [],
		},
		RecordState: false,
		LiveState: 0,
		StreamingProp: {
			stream1: false,
			stream2: false,
			stream3: false,
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
			OutputColorSpace: [0, 0],
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
export { Create }
