// import { ActionId } from './actionId'
// import { sendCommands, GoStreamCmd } from '../../connection'
// import { ReqType } from '../../enums'
// import { LiveStatus } from './actions'
// import type { GoStreamModel } from '../../models/types'



// export type ServerInfo={
// 	serName:string
// 	url:string
// }

// export type StreamPlatform = {
// 	name: string
// 	servers: ServerInfo[]
// }

// type StreamInfo = {
// 	enabled: boolean
// 	status: LiveStatus
// 	platform: string
// 	url:string
// 	key:string
// }
// export type StreamingStateT = {
// 	status: LiveStatus
// 	streamInfo: StreamInfo[]
// 	platforms: StreamPlatform[]
// 	quality: number
// }

// export function create(_model: GoStreamModel): StreamingStateT {
// 	return {
// 		status: LiveStatus.Off,
// 		streamInfo: [
// 			{ enabled: false, status: LiveStatus.Off, platform: '',url:'',key:'' },
// 			{ enabled: false, status: LiveStatus.Off, platform: '',url:'',key:'' },
// 			{ enabled: false, status: LiveStatus.Off, platform: '',url:'' ,key:''},
// 		],
// 		platforms: [{ name: 'Loading', servers: [{serName:'Loading',url:''}]}],
// 		quality: 0,
// 	}
// }

// export async function sync(model: GoStreamModel): Promise<boolean> {

// 	const cmds: GoStreamCmd[] = [
// 		{ id: ActionId.LiveStreamOutputBitrate, type: ReqType.Get},
// 		{ id: ActionId.LiveStreamOutputProfile, type: ReqType.Get},
// 	];
// 	for (let index = 0; index < model.streamCount; index++) {
// 		cmds.push({ id: ActionId.LiveStreamOutputEnable, type: ReqType.Get, value: [index]});
// 		cmds.push({ id: ActionId.LiveStreamOutputKey, type: ReqType.Get, value: [index]});
// 		cmds.push({ id: ActionId.LiveStreamOutputServiceName, type: ReqType.Get, value: [index]});
// 		cmds.push({ id: ActionId.LiveStreamOutputStatus, type: ReqType.Get, value: [index]});
// 		cmds.push({ id: ActionId.LiveStreamOutputUrl, type: ReqType.Get, value: [index]});
// 	}
// 	return await sendCommands(cmds)
// }

// export function update(state: StreamingStateT, data: GoStreamCmd): boolean {
// 	switch (data.id as ActionId) {
// 		case ActionId.LiveStreamOutputBitrate: 
// 			state.quality = Number(data.value![0])
// 			break
// 		case ActionId.LiveStreamOutputProfile: {
// 			const arrData: any[] = data.value as any[]
// 			arrData.forEach(()=>{
// 				for (let index = 0; index < 3; index++) {
// 					const name = arrData.shift()
// 					const server=arrData.shift()
// 					const url=arrData.shift()
// 					var info=state.platforms.find(s=>s.name===name);
// 					if(info!=undefined){
// 						info.servers.push({serName:server,url:url})
// 					}else{
// 						state.platforms.push({name:name,servers:[{serName:server,url:url}]});
// 					}
// 				}
// 			})
// 			return true
// 		}
// 		case ActionId.LiveStreamOutputEnable: 
// 			var index=Number(data.value![0]);
// 			state.streamInfo[index].enabled = Boolean(data.value![1])
// 			break
// 		case ActionId.LiveStreamOutputServiceName: 
// 			var index=Number(data.value![0]);
// 			state.streamInfo[index].platform = String(data.value![1])
// 			break;
// 		case ActionId.LiveStreamOutputUrl: 
// 			var index=Number(data.value![0]);
// 			state.streamInfo[index].url = String(data.value![1])
// 			break;
// 		case ActionId.LiveStreamOutputStatus: 
// 			// 1 indicates stream
// 			var index=Number(data.value![0]);
// 			state.streamInfo[index].status=Number(data.value![1])
// 			if(state.streamInfo[0].status===LiveStatus.On &&
// 				state.streamInfo[1].status===LiveStatus.On &&
// 				state.streamInfo[2].status===LiveStatus.On )
// 			{
// 				state.status=LiveStatus.On
// 			}else if(state.streamInfo[0].status===LiveStatus.Off
// 				&&state.streamInfo[1].status===LiveStatus.Off
// 				&&state.streamInfo[2].status===LiveStatus.Off){
// 					state.status=LiveStatus.Off
// 				}else
// 				{
// 					state.status=LiveStatus.Abnormal
// 				}
// 			break
// 		case ActionId.LiveStreamOutputKey: 
// 			// 1 indicates stream
// 			var index=Number(data.value![0]);
// 			state.streamInfo[index].key=String(data.value![1])
// 			break
// 	}
// 	return false
// }
