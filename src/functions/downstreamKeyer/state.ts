// import { ActionId } from './actionId'
// import { sendCommands, GoStreamCmd } from '../../connection'
// import { ReqType, sourceID } from '../../enums'
// import type { GoStreamModel } from '../../models/types'

// export type DSKState = {
// 	keyEnable: boolean
// 	keyOnAir: boolean
// 	source: {
// 		fill: number
// 		key: number
// 	}
// 	mask: {
// 		enabled: boolean
// 		hStart: number
// 		vStart: number
// 		hEnd: number
// 		vEnd: number
// 	}
// 	control: {
// 		invert: boolean
// 		preMultipliedKey: boolean
// 		clip: number
// 		gain: number
// 	}
// 	rate: {
// 		rate: number
// 	}
// 	sizePosition: {
// 		enable: boolean
// 		size: number
// 		xPosition: number
// 		yPosition: number
// 	}
// }

// export class DSKStateT {
// 	model: GoStreamModel
// 	FillSources: sourceID[]
// 	KeySources: sourceID[]
// 	DSKStates: DSKState[]

// 	constructor(model: GoStreamModel) {
// 		this.model = model
// 		this.DSKStates = []
// 		this.FillSources = []
// 		this.KeySources = []
// 		for (let index = 0; index < model.dskCount; index++) {
// 			this.DSKStates.push({
// 				keyEnable: false,
// 				keyOnAir: false,
// 				source: {
// 					fill: sourceID.IN1,
// 					key: sourceID.IN1,
// 				},
// 				mask: {
// 					enabled: false,
// 					hStart: 0,
// 					vStart: 0,
// 					hEnd: 0,
// 					vEnd: 0,
// 				},
// 				control: {
// 					invert: false,
// 					preMultipliedKey: false,
// 					clip: 0,
// 					gain: 0,
// 				},
// 				rate: {
// 					rate: 0
// 				},
// 				sizePosition: {
// 					enable: false,
// 					size: 0,
// 					xPosition: 0,
// 					yPosition: 0,
// 				}
// 			});
// 		}
// 	}
// }


// export function create(model: GoStreamModel): DSKStateT {
// 	let state: DSKStateT = {
// 		model: model,
// 		FillSources: [],
// 		KeySources: [],
// 		DSKStates: [],
// 	}
// 	for (let index = 0; index < model.dskCount; index++) {
// 		state.DSKStates.push({
// 			keyEnable: false,
// 			keyOnAir: false,
// 			source: {
// 				fill: sourceID.IN1,
// 				key: sourceID.IN1,
// 			},
// 			mask: {
// 				enabled: false,
// 				hStart: 0,
// 				vStart: 0,
// 				hEnd: 0,
// 				vEnd: 0,
// 			},
// 			control: {
// 				invert: false,
// 				preMultipliedKey: false,
// 				clip: 0,
// 				gain: 0,
// 			},
// 			rate: {
// 				rate: 0
// 			},
// 			sizePosition: {
// 				enable: false,
// 				size: 0,
// 				xPosition: 0,
// 				yPosition: 0,
// 			}
// 		});
// 	}
// 	return state;
// }

// export async function sync(model: GoStreamModel): Promise<boolean> {
// 	const cmds: GoStreamCmd[] = [
// 		{ id: ActionId.DskFillSourceList, type: ReqType.Get },
// 		{ id: ActionId.DskKeySourceList, type: ReqType.Get },
// 	]
// 	for (let index = 0; index < model.dskCount; index++) {
// 		cmds.push({ id: ActionId.DskEnable, type: ReqType.Get, value: [index] });
// 		cmds.push({ id: ActionId.DskOnAir, type: ReqType.Get, value: [index] });
// 		cmds.push({ id: ActionId.DskFillSource, type: ReqType.Get, value: [index] });
// 		cmds.push({ id: ActionId.DskKeySource, type: ReqType.Get, value: [index] });
// 		cmds.push({ id: ActionId.DskMaskEnable, type: ReqType.Get, value: [index] });
// 		cmds.push({ id: ActionId.DskMaskHStart, type: ReqType.Get, value: [index] });
// 		cmds.push({ id: ActionId.DskMaskVStart, type: ReqType.Get, value: [index] });
// 		cmds.push({ id: ActionId.DskMaskHEnd, type: ReqType.Get, value: [index] });
// 		cmds.push({ id: ActionId.DskPreMultipliedKey, type: ReqType.Get, value: [index] });
// 		cmds.push({ id: ActionId.DskClip, type: ReqType.Get, value: [index] });
// 		cmds.push({ id: ActionId.DskGain, type: ReqType.Get, value: [index] });
// 		cmds.push({ id: ActionId.DskInvert, type: ReqType.Get, value: [index] });
// 		cmds.push({ id: ActionId.DskResize, type: ReqType.Get, value: [index] });
// 		cmds.push({ id: ActionId.DskSize, type: ReqType.Get, value: [index] });
// 		cmds.push({ id: ActionId.DskXPosition, type: ReqType.Get, value: [index] });
// 		cmds.push({ id: ActionId.DskYPosition, type: ReqType.Get, value: [index] });
// 	}
// 	return await sendCommands(cmds)
// }
// export function update(state: DSKStateT, data: GoStreamCmd): boolean {

// 	switch (data.id as ActionId) {
// 		case ActionId.DskFillSourceList:
// 			var str = String(data.value)
// 			state.FillSources = str ? str.split(',').map(Number) : []

// 			break;
// 		case ActionId.DskKeySourceList:
// 			var str = String(data.value)
// 			state.KeySources = str ? str.split(',').map(Number) : []
// 			break;
// 		case ActionId.DskEnable:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].keyEnable = Boolean(data.value![1])
// 			break;
// 		case ActionId.DskOnAir:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].keyOnAir = Boolean(data.value![1])
// 			break;
// 		case ActionId.DskFillSource:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].source.fill = Number(data.value![1])
// 			break;
// 		case ActionId.DskKeySource:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].source.key = Number(data.value![1])
// 			break;
// 		case ActionId.DskMaskEnable:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].mask.enabled = Boolean(data.value![1])
// 			break;
// 		case ActionId.DskMaskHStart:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].mask.hStart = Number(data.value![1])
// 			break;
// 		case ActionId.DskMaskVStart:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].mask.vStart = Number(data.value![1])
// 			break;
// 		case ActionId.DskMaskHEnd:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].mask.hEnd = Number(data.value![1])
// 			break
// 		case ActionId.DskMaskVEnd:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].mask.vEnd = Number(data.value![1])
// 			break
// 		case ActionId.DskPreMultipliedKey:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].control.preMultipliedKey = Boolean(data.value![1])
// 			break
// 		case ActionId.DskClip:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].control.clip = Number(data.value![1])
// 			break
// 		case ActionId.DskGain:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].control.gain = Number(data.value![1])
// 			break
// 		case ActionId.DskInvert:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].control.invert = Boolean(data.value![1])
// 			break
// 		case ActionId.DskResize:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].sizePosition.enable = Boolean(data.value![1])
// 			break
// 		case ActionId.DskSize:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].sizePosition.size = Number(data.value![1])
// 			break
// 		case ActionId.DskXPosition:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].sizePosition.xPosition = Number(data.value![1])
// 			break
// 		case ActionId.DskYPosition:
// 			var index = Number(data.value![0]);
// 			state.DSKStates[index].sizePosition.yPosition = Number(data.value![1])
// 			break
// 	}
// 	return false
// }
