export enum Model {
	Unknown = 0x00,
	Deck = 0x01, // TODO: Find out the ID number from handshake
	Duet = 0x02,
}

export enum PortType {
	Unknown = 0,
	SDI = 1 << 0,
	HDMI = 1 << 1,
	Internal = 1 << 2,
	Other = 1 << 3,
	Aux = 1 << 4,
	UVC = 1 << 5,
	Mic = 1 << 6,
	External = SDI | HDMI | UVC,
	All = External | Internal | Other | Aux,
}

export enum PortCaps {
	NoCaps = 0,
	Renameable = 1 << 0,
	Audio = 1 << 1,
	Colorspace = 1 << 2,
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
