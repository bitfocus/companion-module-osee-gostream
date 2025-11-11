export enum TcpStatus {
	Ok = 'ok',
	Connecting = 'connecting',
	Disconnected = 'disconnected',
	UnknownError = 'unknown_error',
}

export enum sourceID {
	Black = 0,
	IN1 = 1,
	IN2 = 2,
	IN3 = 3,
	IN4 = 4,
	ColorBar = 1000,
	Color = 2001,
	Color2 = 2002,
	Multiview = 9001,
	PGM = 10010,
	PVW = 10011,
	MP = 3010,
	MPK = 3011,
	MP2 = 3020,
	MP2K = 3021,
	AUX1 = 4001,
	AUX2 = 4002,
	AUX3 = 4003,
	AUX4 = 4004,
	MultiSource = 5001,
	SDIOutput = 20001,
	HDMIOutput = 21001,
	HDMIOutput2 = 21002,
	USBOutput = 22001,
	StreamingOutput = 25001,
	MIC1 = 1301,
	MIC2 = 1302,
	Headphone = 2301
}

export enum Model {
	Deck = 0x00,
	Duet_SDI = 0x01,
	Dect_FANS = 0x02,
	Dect_PLUS = 0x03,
	Duet_8ISO = 0x10,
	Unknown = 0xFF,
}

//audiomixer
export enum AfvState {
	off = 0,
	on = 1,
	afv = 2,
}

export enum AudioFadeSwitching {
	HardCut = 0,
	SwitchWithEffect = 1
}
//audioSwitching
export enum Period {
	Fast = 0,
	Normal = 1,
	Slow = 2,
}
export enum Priority {
	Low = 0,
	Balance = 1,
	Hight = 2,
}

//meffect

export enum EffectStyle {
	Mix = 0,
	Dip = 1,
	Wipe = 2,
}

//ioSetting

export enum inputModeType {
	physicalPorts_4_0 = 0,
	physicalPorts_8_1 = 1,
	physicalPorts_8_2 = 2,
	physicalPorts_8_3 = 3,
}

//mediaPlayer
export enum meType {
	Strll = 0,
	Browser = 1,
}

//record
export enum recodingFormat {
	H264 = 0,
	H265 = 1,
}
export enum recodingQuality {
	High = 0,
	Good = 1,
	Medium = 2,
	Low = 3,
}

//stream

export enum LiveStatus {
	Off,
	On,
	Abnormal,
}

//usk
export enum USKKeyTypes {
	Luma = 0,
	Chroma = 1,
	Pattern = 2,
	Pip = 3,
}

export enum WipePattern {
	Horizontal_LeftToRight,
	Vertical_UpToDown,
	Horizontal_RightToLeft,
	Vertical_DownToUp,
	Surround,
	Rectangle,
	Diamond,
	Circle,
	Rectangle_FromTopLeft,
	Rectangle_FromTopRight,
	Rectangle_FromBottomRight,
	Rectangle_FromBottomLeft,
	Rectangle_FromTopCenter,
	Rectangle_FromRightCenter,
	Rectangle_FromBottomCenter,
	Rectangle_FromLeftCenter,
	Diagonal_LeftToRight,
	Diagonal_RightToLeft,
}

//请求
export enum ReqType {
	Get = 'get',
	Set = 'set',
	Push = 'pus',
}


export enum MultiSourceControlStyle {
	zoomOut = 0,
	cropZoomOut = 1,
	zoomOutCrop = 2,
	crop = 3,
	CropZoomOut2_3 = 4,
	ZoomOutCrop2_3 = 5,
}

export enum WipeDirection {
	Normal = 0,
	Inverse = 1,
}

