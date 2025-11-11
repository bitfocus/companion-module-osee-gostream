// import { ActionId } from './actionId'
// import { sendCommands, GoStreamCmd } from '../../connection'
// import { ReqType } from '../../enums'
// import type { GoStreamModel } from '../../models/types'
// import {GoStreamState} from '../../state'



// export type inputStateT={
// 	mode:number
// }

// export function create(_model: GoStreamModel): inputStateT {
	
// 	return {
// 		mode:0
// 	}
// }

// export async function sync(_state: GoStreamState): Promise<boolean> {
// 	const cmds: GoStreamCmd[] = [
// 		{ id: ActionId.InputMode, type: ReqType.Get },
// 	]
// 	return await sendCommands(cmds)
// }
// export function update(state: inputStateT, data: GoStreamCmd): boolean {
// 	switch (data.id as ActionId) {
// 		case ActionId.InputMode:
// 			state.mode=Number(data.value![0]);
// 			break
// 	}
// 	return false
// }
