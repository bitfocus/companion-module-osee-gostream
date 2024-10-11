export let ReqType = {
	Get: 'get',
	Set: 'set',
	Push: 'pus',
}

export let ActionType = {
	Unknown: 'Unknown',
	Heart: 'Heart',
	Program: 'Program',
	Preview: 'Preview',
	TransitionStyle: 'TransitionStyle',
	TransitionDipSource: '5',
	TransitionWipeFillSource: '6',
	DskSourceFill: '7',
	SuperSourceSource: '8',
	LumaKeySourceKey: '9',
	ChromaKeySourceKey: '10',
	KeyPatternSourceKey: '11',
	PipSource: '12',
	AudioFader: '13',
	AudioMonitorSource: '14',
	SettingsoutSource: '15',
	AudioEnable: '16',
	AudioEnableSource: '17',
}

export let feedbackId = {
	PreviewBG: 'preview_bg',
	PreviewBG2: 'preview_bg_2',
	PreviewBG3: 'preview_bg_3',
	PreviewBG4: 'preview_bg_4',
	ProgramBG: 'program_bg',
	ProgramBG2: 'program_bg_2',
	ProgramBG3: 'program_bg_3',
	ProgramBG4: 'program_bg_4',
	TransitionStyle: 'TransitionStyle',
	InTransition: 'inTransition',
	Cut: 'cut',
	Prev: 'prev',
	TransitionRate: 'transitionRate',
	TransitionKeySwitch: 'transitionKeySwitch',
	TransitionSelection: 'transitionSelection',
	KeyOnAir: 'keyOnAir',
	DskOnAir: 'dskOnAir',
	SettingOutSource: 'settingOutSource',
	Macro: 'macro',
	Still: 'still',
	FadeToBlackIsBlack: 'fadeToBlackIsBlack',
	FadeToBlackRate: 'fadeToBlackRate',
	FTBAFV: 'FTBAFV',
	AuxBG: 'auxBG',
	UpStreamKeyType: 'upStreamKeyType',
	DskSourceFill: 'dskSourceFill',
	KeySourceFill: 'keySourceFill',
	SuperSourceEnable: 'superSourceEnable',
	SuperSourceSelect: 'superSourceSelect',
	SuperSourceControlStyle: 'superSourceControlStyle',
	SuperSourceMask: 'superSourceMask',
	//AudioMixer
	AudioEnable: 'audioEnable',
	AudioTransition: 'audioTransition',
	//Streamming
	StreamOutput: 'streamOutput',
	//Playback
	PlaybackMode: 'playbackMode',
	PlaybackRepeat: 'playbackRepeat',
	PlaybackPause: 'playbackPause',
	PlaybackBar: 'playbackBar',
	PlayFile: 'playFile',
	//Record
	Record: 'record',
	//Live
	Live: 'live',
	// Settings
	InputWindowLayout: 'inputWindowLayout',
	SrcSelection: 'srcSelection',
	OutputColorSpace: 'outputColorSpace',
	OutputFormat: 'outFormat',
	MicInput: 'micInput',
	MvLayout: 'mvLayout',
}

export let variableId = {
	PlayState: 'playState',
	Clock: 'clock',
	TimerStart: 'timer_start',
	TimerFinish: 'timer_finish',
	TimerDelay: 'timer_delay',
	Time: 'time',
	TimeHM: 'time_hm',
	TimeH: 'time_h',
	TimeM: 'time_m',
	TimeS: 'time_s',
	TitleNow: 'titleNow',
	SubtitleNow: 'subtitleNow',
	SpeakerNow: 'speakerNow',
	NoteNow: 'noteNow',
	TitleNext: 'titleNext',
	SubtitleNext: 'subtitleNext',
	SpeakerNext: 'speakerNext',
	NoteNext: 'noteNext',
	OnAir: 'onAir',
	SpeakerMessage: 'speakerMessage',
	PublicMessage: 'publicMessage',
	LowerMessage: 'lowerMessage',
}

export let SourceType = {
	Input1: 'Input1',
	Input2: 'Input2',
	Input3: 'Input3',
	Input4: 'Input4',
	Aux: 'Aux',
}

export let TransitionStyle = {
	MIX: 0,
	DIP: 1,
	WIPE: 2,
}
