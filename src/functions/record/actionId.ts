export enum ActionId {
	Record = 'record',
	RecordStatus = 'recordStatus',
	RecordTime = 'recordTime',
	RecordFileName = 'recordFileName',
	// problem: it needs to be 'quality' for the protocol but you can't have two ID's with the same name
	RecordQuality = 'quality.record',
}

export enum CommId {
	Record = 'record',
	RecordStatus = 'recordStatus',
	RecordTime = 'recordTime',
	RecordFileName = 'recordFileName',
	// problem: it needs to be 'quality' for the protocol but you can't have two ID's with the same name
	Quality = 'quality',
}
