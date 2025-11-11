// import { ReqType } from '../../enums'
// import { GoStreamCmd, sendCommands } from '../../connection'
// import type { GoStreamModel } from '../../models/types'
// import { ActionId } from './actionId'

// export type ColorBackState= {
// 	hue:number,
// 	saturation:number,
// 	brightness:number,
// }
// export type ColorBackStateT = {
// 	model: GoStreamModel
// 	ColorBackStates:ColorBackState[]
// }

// export function create(model: GoStreamModel): ColorBackStateT {
// 	const cb_states: ColorBackStateT = {
// 		model: model,
// 		ColorBackStates: []
// 	};
// 	for (let index = 0; index < model.colorBackCount; index++) {
// 		cb_states.ColorBackStates.push({hue: 0, saturation: 0, brightness: 0});
// 	}
// 	return cb_states;
// }

// export async function sync(model: GoStreamModel): Promise<boolean> {
// 	const cmds: GoStreamCmd[] = []
// 	if(model.colorBackCount>0)
// 	{
// 		for (let index = 0; index < model.colorBackCount; index++) {
// 			cmds.push({id:ActionId.ColorHue,type:ReqType.Get, value: [index]});
// 			cmds.push({id:ActionId.ColorBrightness,type:ReqType.Get, value: [index]});
// 			cmds.push({id:ActionId.ColorSaturation,type:ReqType.Get, value: [index]});
// 		}
// 	}
// 	return await sendCommands(cmds)
// }

// export function update(state: ColorBackStateT, data: GoStreamCmd): boolean {
// 	if (!data.value) return false
// 	const index=Number(data.value![0])
// 	switch (data.id as ActionId) {
// 		case ActionId.ColorBrightness:
// 			state.ColorBackStates[index].brightness= Number( data.value![1])
// 			break;
// 		case ActionId.ColorHue:
// 			state.ColorBackStates[index].hue= Number( data.value![1])
// 			break;
// 		case ActionId.ColorSaturation:
// 			state.ColorBackStates[index].saturation= Number( data.value![1])
// 			break;
// 	}
// 	return true
// }
