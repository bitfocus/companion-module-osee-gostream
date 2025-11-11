// import { ActionId } from './actionId'
// import { sendCommands, GoStreamCmd } from '../../connection'
// import { ReqType } from '../../enums'
// import type { GoStreamModel } from '../../models/types'

// const maxStrillIndex=32;
// const maxBrowerIndex=1;
// export enum meType
// {
// 	Strll=0,
// 	Browser=1,
// }

// export type mpTypeT=
// {
// 	type:meType,
// 	selectIndex:number,
// }

// export type mpStrill=
// {
// 	index:number,
// 	path:string,
// }
// export type mpBrowser=
// {
// 	index:number,
// 	url:string,
// }
// export type mediaT = {
// 	mpType:mpTypeT[],
// 	mpStrill:mpStrill[],
// 	mpBrowser:mpBrowser[],
// }

// export function create(model: GoStreamModel): mediaT {
// 	let state:mediaT={
// 		mpType:[
// 		],
// 		mpStrill:[
// 		],
// 		mpBrowser:[]
// 	}
// 	for (let index = 0; index < model.mediaPlayerCount; index++) {
// 		state.mpType.push({type:meType.Browser,selectIndex:0})
// 	}
// 	for (let index = 0; index < maxStrillIndex; index++) {
// 		state.mpStrill.push({
// 			index:index,
// 			path:'',
// 		});
// 	}
// 	for (let index = 0; index < maxBrowerIndex; index++) {
// 		state.mpBrowser.push({
// 			index:index,
// 			url:'',
// 		});
// 	}
// 	return state
// }

// export async function sync(_model: GoStreamModel): Promise<boolean> {
// 	const cmds: GoStreamCmd[] = [
// 			{ id: ActionId.MediaPlayer, type: ReqType.Get,value:[0] },
// 			{ id: ActionId.MediaPlayer, type: ReqType.Get,value:[1] },
// 		]
// 		for (let index = 0; index < maxStrillIndex; index++) {
// 			cmds.push({ id: ActionId.Still, type: ReqType.Get,value:[index] });
// 		}
// 		for (let index = 0; index < maxBrowerIndex; index++) {
// 			cmds.push({ id: ActionId.Browser, type: ReqType.Get,value:[index] });
// 		}
// 		return await sendCommands(cmds)
// }

// export function update(state: mediaT, data: GoStreamCmd): boolean {
// 	switch (data.id as ActionId) {
// 		case ActionId.MediaPlayer: 
// 			var id = Number(data.value![0]);
// 			state.mpType[id].type =Number(data.value![1]);
// 			state.mpType[id].selectIndex =Number(data.value![2]);
// 			break;
// 		case ActionId.Still: 
// 			var index=Number(data.value![0]);
// 			state.mpStrill[index].path =String(data.value![1]);
// 			break;
// 		case ActionId.Browser: 
// 			var index=Number(data.value![0]);
// 			state.mpBrowser[index].url =String(data.value![1]);
// 			break;
// 	}
// 	return false
// }
