export enum ActionId {
	Record = 'record',
	RecordTime = 'recordTime',
	RecordFileName = 'recordFileName',
	// problem: it needs to be 'quality' for the communication protocol but you can't have two ID's with the same name
	RecordQuality = 'recordQuality',
}
