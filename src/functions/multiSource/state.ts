// import { ActionId } from './actionId'
// import { sendCommands, GoStreamCmd } from '../../connection'
// import { ReqType, sourceID } from '../../enums'
// import type { GoStreamModel } from '../../models/types'


// export type multiSourceWindow ={
// 	winID:number
// 	enable: boolean
// 	selectSource:sourceID
// 	x:number,
// 	y:number,
// 	size:number,
// 	cropLeft:number,
// 	cropTop:number,
// 	cropRight:number,
// 	cropBottom:number,
// }

// export type MultiSourceStateT = {
// 	model: GoStreamModel
// 	multiSources:sourceID[]
// 	windows:multiSourceWindow[]
// }

// export function create(model: GoStreamModel): MultiSourceStateT {
//     let states: MultiSourceStateT = {
//         model: model,
//         windows: [],
//         multiSources: Array(model.multiSourceWindowCount)
//     };
//     for (let index = 0; index < model.multiSourceWindowCount; index++) {
//         states.windows.push({
//             winID: index,
//             enable: false,
//             selectSource: sourceID.IN1,
//             x: 0,
//             y: 0,
//             size: 0,
//             cropLeft: 0,
//             cropTop: 0,
//             cropRight: 0,
//             cropBottom: 0,
//         });
//     }
//     return states;
// }


// export async function sync(model: GoStreamModel): Promise<boolean> {
// 	const cmds: GoStreamCmd[] = [];
// 	cmds.push({id: ActionId.MultiSourceWindowSourceList, type: ReqType.Get });
// 	for (let index = 0; index < model.multiSourceWindowCount; index++) {
// 		cmds.push({id: ActionId.MultiSourceWindowEnable, type: ReqType.Get,value:[index] });
// 		cmds.push({id: ActionId.MultiSourceWindowSource, type: ReqType.Get,value:[index] });
// 		cmds.push({id: ActionId.MultiSourceWindowXPosition, type: ReqType.Get,value:[index] });
// 		cmds.push({id: ActionId.MultiSourceWindowYPosition, type: ReqType.Get,value:[index] });
// 		cmds.push({id: ActionId.MultiSourceWindowSize, type: ReqType.Get,value:[index] });
// 		cmds.push({id: ActionId.MultiSourceWindowCropLeft, type: ReqType.Get,value:[index] });
// 		cmds.push({id: ActionId.MultiSourceWindowCropRight, type: ReqType.Get,value:[index] });
// 		cmds.push({id: ActionId.MultiSourceWindowCropTop, type: ReqType.Get,value:[index] });
// 		cmds.push({id: ActionId.MultiSourceWindowCropBottom, type: ReqType.Get,value:[index] });
// 	}
// 	return await sendCommands(cmds)
// }
// export function update(state: MultiSourceStateT, data: GoStreamCmd): boolean {
// 	switch (data.id as ActionId) {
// 		case ActionId.MultiSourceWindowSourceList:
// 			var str = String(data.value)
// 			state.multiSources =  str ? str.split(',').map(Number) : []
// 			break;
// 		case ActionId.MultiSourceWindowEnable:
// 			var index=Number(data.value![0]);
// 			state.windows[index].enable=Boolean(data.value![1]);
// 			break;
// 		case ActionId.MultiSourceWindowSource:
// 			var index=Number(data.value![0]);
// 			state.windows[index].selectSource=Number(data.value![1]);
// 			break;
// 		case ActionId.MultiSourceWindowXPosition:
// 			var index=Number(data.value![0]);
// 			state.windows[index].x=Number(data.value![1]);
// 			break;
// 		case ActionId.MultiSourceWindowYPosition:
// 			var index=Number(data.value![0]);
// 			state.windows[index].y=Number(data.value![1]);
// 			break;
// 		case ActionId.MultiSourceWindowSize:
// 			var index=Number(data.value![0]);
// 			state.windows[index].size=Number(data.value![1]);
// 			break;
// 		case ActionId.MultiSourceWindowCropLeft:
// 			var index=Number(data.value![0]);
// 			state.windows[index].cropLeft=Number(data.value![1]);
// 			break;
// 		case ActionId.MultiSourceWindowCropRight:
// 			var index=Number(data.value![0]);
// 			state.windows[index].cropRight=Number(data.value![1]);
// 			break;
// 		case ActionId.MultiSourceWindowCropTop:
// 			var index=Number(data.value![0]);
// 			state.windows[index].cropTop=Number(data.value![1]);
// 			break;
// 		case ActionId.MultiSourceWindowCropBottom:
// 			var index=Number(data.value![0]);
// 			state.windows[index].cropBottom=Number(data.value![1]);
// 			break;
// 	}
// 	return false
// }
