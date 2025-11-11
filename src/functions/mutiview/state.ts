// import { ActionId } from './actionId'
// import { sendCommands, GoStreamCmd } from '../../connection'
// import { ReqType, sourceID } from '../../enums'
// import type { GoStreamModel } from '../../models/types'


// export type MutiViewStateT = {
// 	layoutStyle: number
// 	mutiViewWinSize: number
// 	mutiViewWinSource: sourceID[]
// 	multiViewWins: number[] // hdmi1, hdmi2, uvc
// 	meterEnable: boolean
// 	marker: boolean
// }

// export function create(_model: GoStreamModel): MutiViewStateT {
// 	return {
// 		layoutStyle: 0,
// 		mutiViewWinSize: 0,
// 		mutiViewWinSource: [],
// 		multiViewWins: [] ,
// 		meterEnable: false,
// 		marker: false,
// 	}
// }

// export async function sync(_model: GoStreamModel): Promise<boolean> {
// 	const cmds: GoStreamCmd[] = [
// 		{ id: ActionId.MultiViewLayout, type: ReqType.Get },
// 		{ id: ActionId.MultiViewWindowsSize, type: ReqType.Get },
// 		{ id: ActionId.MultiViewWindows, type: ReqType.Get },
// 		{ id: ActionId.MultiViewWindowsSourceList, type: ReqType.Get },
// 	]
// 	return sendCommands(cmds)
// }

// export function update(state: MutiViewStateT, data: GoStreamCmd): boolean {
// 	switch (data.id as ActionId) {
// 		case ActionId.MultiViewLayout: {
// 			state.layoutStyle= Number(data.value![0])
// 			break;
// 		}
// 		case ActionId.MultiViewWindowsSize:
// 			state.mutiViewWinSize = Number(data.value![0])
// 			break
// 		case ActionId.MultiViewWindows:
			
// 			break
// 		case ActionId.MultiViewWindowsSourceList: {
// 			state.mutiViewWinSource = data.value as sourceID[]
// 			break
// 		}
// 	}
// 	return false
// }
