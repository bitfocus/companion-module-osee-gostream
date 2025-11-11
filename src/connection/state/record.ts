import { recodingFormat, recodingQuality } from "../enums"

export interface recordFreeT
{
	freeSpace:number | undefined,
	freeTime:number | undefined
}

export interface RecordT {
	format:recodingFormat
	quality:recodingQuality

	isRecording:number //0关 1：pgm 开 2： iso开
	recordTime :number | undefined,
	recordFree:recordFreeT
	ISORecordFree:recordFreeT
	channels:{[sID:number]:boolean }
	readonly channelsCount:number
	//目前只有一种 errCode:0  没有插入USB存储设备 pgm录制无
	isoErrCode:number
}