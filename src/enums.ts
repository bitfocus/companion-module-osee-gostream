export enum Model {
	Unknown = 0x00,
	Deck = 0x01, // TODO: Find out the ID number from handshake
	Duet = 0x02,
}

export enum PortType {
	Unknown = 0,
	SDI = 1 << 0,
	HDMI = 1 << 1,
}

export enum ReqType {
	Get = 'get',
	Set = 'set',
	Push = 'pus',
}

export enum ActionType {
	Unknown = 'Unknown',
	Heart = 'Heart',
	Program = 'Program',
	Preview = 'Preview',
	TransitionStyle = 'TransitionStyle',
	TransitionDipSource = '5',
	TransitionWipeFillSource = '6',
	DskSourceFill = '7',
	SuperSourceSource = '8',
	LumaKeySourceKey = '9',
	ChromaKeySourceKey = '10',
	KeyPatternSourceKey = '11',
	PipSource = '12',
	AudioFader = '13',
	AudioMonitorSource = '14',
	SettingsoutSource = '15',
	AudioEnable = '16',
	AudioEnableSource = '17',
}

export const feedbackId = {
	KeyOnAir: 'keyOnAir',
	KeyOnPvw: 'keyOnPvw',
	DskOnAir: 'dskOnAir',
	SettingOutSource: 'settingOutSource',
	Macro: 'macro',
	AuxBG: 'auxBG',
	UpStreamKeyType: 'upStreamKeyType',
	DskSourceFill: 'dskSourceFill',
	KeySourceFill: 'keySourceFill',
	TransitionSource: 'transitionSource',
	//AudioMixer
	AudioEnable: 'audioEnable',
	AudioTransition: 'audioTransition',
	//Playback
	PlaybackMode: 'playbackMode',
	PlaybackRepeat: 'playbackRepeat',
	PlaybackPause: 'playbackPause',
	PlaybackBar: 'playbackBar',
	PlayFile: 'playFile',

	// Settings
	InputWindowLayout: 'inputWindowLayout',
	SrcSelection: 'srcSelection',
	OutputColorSpace: 'outputColorSpace',
	OutputFormat: 'outFormat',
	MicInput: 'micInput',
	MvLayout: 'mvLayout',
}

export const variableId = {
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

export const SourceType = {
	Input1: 'Input1',
	Input2: 'Input2',
	Input3: 'Input3',
	Input4: 'Input4',
	Aux: 'Aux',
}

export const TransitionStyle = {
	MIX: 0,
	DIP: 1,
	WIPE: 2,
}
