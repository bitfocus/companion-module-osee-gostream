export enum ActionId {
	Record = 'record',
	RecordTime = 'recordTime',
	RecordFileName = 'recordFileName',
	// problem: it needs to be 'quality' for the communication protocol but you can't have two ID's with the same name
	RecordQuality = 'recordQuality',
}

export enum CommunicationId {
	Record = 'record',
	RecordTime = 'recordTime',
	RecordFileName = 'recordFileName',
	// It needs to be 'quality' for the communication protocol
	RecordQuality = 'quality',
	RecordFreeSpace = 'sdFreeSpace',
	RecordFreeTime = 'sdFreeTime',
	RecordFree = 'sdFree',
	RecordMediaPresent = 'sdCardStatus',
	BuildInfo = 'buildInfo',
}
