// import { sendCommands } from '../../connection'
// import { ReqType, sourceID } from '../../enums'
// import type { GoStreamModel } from '../../models/types'
// import { GoStreamCmd } from '../../connection'
// import { ActionId } from './actionId'


// export enum recodingFormat{
// 	H264=0,
// 	H265=1,
// }
// export enum recodingQuality{
// 	High=0,
// 	Good=1,
// 	Medium=2, 
// 	Low=3,
// }

// export type recordFreeT=
// {
// 	freeSpace:string | undefined,
// 	freeTime:string | undefined
// }

// export type SourceInfoT={
// 	ID:sourceID,
// 	enable:boolean
// }

// export type RecordT = {
// 	format:recodingFormat
// 	quality:recodingQuality

// 	isRecording:number //0关 1：pgm 开 2： iso开
// 	recordTime :string | undefined,
// 	recordFree:recordFreeT
// 	ISORecordFree:recordFreeT
// 	sources:SourceInfoT[]
// 	//目前只有一种 errCode:0  没有插入USB存储设备 pgm录制无
// 	isoErrCode:number
// }

// export class RecordStateT {
// 	model: GoStreamModel
// 	recordState:RecordT
// 	constructor(model: GoStreamModel) {
// 		this.model = model
// 		this.recordState= {
// 			format:recodingFormat.H264,
// 			quality:recodingQuality.Low,

// 			isRecording:0, //0关 1：pgm 开 2： iso开
// 			recordTime :'',
// 			recordFree:{
// 				freeSpace:'',
// 				freeTime:'',
// 			},
// 			ISORecordFree:{
// 				freeSpace:'',
// 				freeTime:'',
// 			},
// 			sources:[],
// 			isoErrCode:0,
// 		}
// 		for (let index = 0; index < model.RecordISOChannels.length; index++) {
// 			this.recordState.sources.push({ID:model.RecordISOChannels[index],enable:false});
// 		}
		
// 	}
// }

// export async function sync(model: GoStreamModel): Promise<boolean> {
// 	const cmds: GoStreamCmd[] = [
// 		{ id: ActionId.RecordStatus, type: ReqType.Get },
// 		{ id: ActionId.RecordFormat, type: ReqType.Get },
// 		{ id: ActionId.RecordBitrate, type: ReqType.Get },
// 		{ id: ActionId.RecordDuration, type: ReqType.Get },
// 		{ id: ActionId.RecordFree, type: ReqType.Get },
// 		{ id: ActionId.ISORecordFree, type: ReqType.Get },
// 	]
// 	for (let index = 0; index < model.RecordISOChannels.length; index++) {
// 		cmds.push({ id: ActionId.RecordISOChannel, type: ReqType.Get,value:[model.RecordISOChannels[index]]});
// 	}
// 	return sendCommands(cmds)
// }

// export function update(state: RecordStateT, data: GoStreamCmd): boolean {
// 	switch (data.id as ActionId) {
// 		case ActionId.RecordStatus:
// 			state.recordState.isRecording = Number(data.value![0])
// 			break
// 		case ActionId.RecordFormat:
// 			state.recordState.format = Number(data.value![0])
// 			break
// 		case ActionId.RecordBitrate:
// 			state.recordState.quality = Number(data.value![0])
// 			break
// 		case ActionId.RecordFree:
// 			state.recordState.recordFree.freeSpace = String(data.value![0])
// 			state.recordState.recordFree.freeTime = String(data.value![1])
// 			break
// 		case ActionId.ISORecordFree:
// 			state.recordState.ISORecordFree.freeSpace = String(data.value![0])
// 			state.recordState.ISORecordFree.freeTime = String(data.value![1])
// 			break
// 		case ActionId.RecordDuration:
// 			state.recordState.recordTime = String(data.value![0])
// 			break
// 		case ActionId.RecordISOChannel:
// 			const source = state.recordState.sources.find(s => s.ID === Number(data.value![0]));
// 			if (source !== undefined) {
// 				source.enable = Boolean(data.value![1]);
// 			}
// 			break;
// 		case ActionId.ISORecordStartError:
// 			state.recordState.isoErrCode= data.value![0] as number
// 			break;
// 	}
// 	return false
// }
