// import { ActionId } from './actionId'
// import { sendCommands, GoStreamCmd } from '../../connection'
// import { ReqType } from '../../enums'
// import type { GoStreamModel } from '../../models/types'

// // export type modeRange={
// // 	id:number
// // 	name:string
// // }

// export type PlaybackStateT = {
// 	selectMode: string[]
// 	Pause: boolean
// 	modeRanges:string[]
// }

// export function create(model: GoStreamModel): PlaybackStateT {
// 	let state:PlaybackStateT={
// 		selectMode:[],
// 		Pause: false,
// 		modeRanges:[],
// 	}
// 	for (let index = 0; index < model.playCount; index++) {
// 		state.selectMode.push('');
// 	}
// 	return state
// }

// export async function sync(model: GoStreamModel): Promise<boolean> {
// 	const cmds: GoStreamCmd[] = [
// 		{ id: ActionId.PlaybackModeRange, type: ReqType.Get },
// 	]
// 	for (let index = 0; index < model.playCount; index++) {
// 		cmds.push({ id: ActionId.PlaybackMode, type: ReqType.Get,value:[index]});
// 	}
// 	return await sendCommands(cmds)
// }
// export function update(state: PlaybackStateT, data: GoStreamCmd): boolean {
// 	switch (data.id as ActionId) {
// 		case ActionId.PlaybackModeRange:
// 			// var str = String(data.value)
// 			state.modeRanges = data.value as any[]
// 			break;
// 		case ActionId.PlaybackMode:
// 			var index =data.value![0];
// 			state.selectMode[index] = String(data.value![1])
// 			break
// 	}
// 	return false
// }
