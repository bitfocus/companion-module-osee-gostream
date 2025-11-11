// import { ActionId } from './actionId'
// import { sendCommands, GoStreamCmd } from '../../connection'
// import { ReqType, sourceID } from '../../enums'
// import type { GoStreamModel } from '../../models/types'

// export enum USKKeyTypes {
// 	Luma = 0,
// 	Chroma = 1,
// 	Pattern = 2,
// 	Pip = 3,
// }
// export enum USKKeySourceType {
// 	Key = 0,
// 	Fill = 1,
// }

// export enum WipePattern {
// 	Horizontal_LeftToRight,
// 	Vertical_UpToDown,
// 	Horizontal_RightToLeft,
// 	Vertical_DownToUp,
// 	Surround,
// 	Rectangle,
// 	Diamond,
// 	Circle,
// 	Rectangle_FromTopLeft,
// 	Rectangle_FromTopRight,
// 	Rectangle_FromBottomRight,
// 	Rectangle_FromBottomLeft,
// 	Rectangle_FromTopCenter,
// 	Rectangle_FromRightCenter,
// 	Rectangle_FromBottomCenter,
// 	Rectangle_FromLeftCenter,
// 	Diagonal_LeftToRight,
// 	Diagonal_RightToLeft,
// }

// export type MaskInfoT = {
// 	enabled: boolean
// 	hStart: number
// 	hEnd: number
// 	vStart: number
// 	vEnd: number
// }

// export type Position = {
// 	x: number
// 	y: number
// }

// export type WipeInfoT = {
// 	selectWipeIndex: number
// 	size: number
// }

// export type keyControlT={
// 	lumaPreMultipliedKey:boolean
// 	clip:number
// 	gain:number
// 	invert:boolean
// }

// export type LumaT ={
// 	slectSource:sourceID[] //fill Source & Key Source
// 	maskInfo:MaskInfoT
// 	keyControl:keyControlT
// 	size:sizeT
// }

// export type chromaControlT={
// 	position:Position
// 	sample:boolean,
// 	currentColor:number,
// 	foreground:number
// 	background:number
// 	keyEdge:number
// }
// export type sizeT={
// 	enable:boolean
// 	position:Position,
// 	size:number
// }

// export type ChromaT ={
// 	slectSource:sourceID[] //fill Source & Key Source
// 	maskInfo:MaskInfoT
// 	control:chromaControlT
// 	size:sizeT
// }

// export type PatternT={
// 	slectSource:sourceID[] //fill Source & Key Source
// 	maskInfo:MaskInfoT
// 	size:sizeT
// 	wipe:WipeInfoT
// }

// export type borderT={
// 	enable:boolean
// 	width:number
// 	hue:number
// 	saturation:number
// 	brightness:number
// }

// export type pipT={
// 	slectSource:sourceID[] //fill Source & Key Source
// 	maskInfo:MaskInfoT
// 	size:sizeT
// 	border:borderT
// }



// export type KeyInfoT = {
// 	enabled: boolean
// 	onAir:boolean
// 	keyType:USKKeyTypes
// 	Luma:LumaT
// 	Chroma:ChromaT
// 	Pattern:PatternT
// 	pip:pipT
// }

// export class KeyerStateT {
// 	model: GoStreamModel
// 	keyInfo: KeyInfoT[]
// 	LumaFillSources:sourceID[]
// 	LumaKeySources:sourceID[]
// 	ChromaFillSource:sourceID[]
// 	PatternFillSource:sourceID[]
// 	PatternWipes:string[]
// 	PipFileSource:sourceID[]

// 	constructor(model: GoStreamModel) {
// 		this.model = model
// 		this.keyInfo = []
// 		this.LumaFillSources=[]
// 		this.LumaKeySources=[]
// 		this.ChromaFillSource=[],
// 		this.PatternFillSource=[],
// 		this.PipFileSource=[]
// 		this.PatternWipes=[]

// 		for (let index = 0; index < model.keyCount; index++) {
// 			this.keyInfo.push({
// 				enabled: false,
// 				onAir:false,
// 				keyType:USKKeyTypes.Chroma,
// 				Luma:{
// 					slectSource:[0,0],
// 					maskInfo:{
// 						enabled: false,
// 						hStart: 0,
// 						hEnd: 0,
// 						vStart: 0,
// 						vEnd: 0,
// 					},
// 					keyControl:{
// 						lumaPreMultipliedKey:false,
// 						clip:0,
// 						gain:0,
// 						invert:false
// 					},
// 					size:{
// 						enable:false,
// 						position:{
// 							x:0,
// 							y:0
// 						},
// 						size:0
// 					}
// 				},
// 				Chroma:{
// 					slectSource:[0,0],
// 					maskInfo:{
// 						enabled: false,
// 						hStart: 0,
// 						hEnd: 0,
// 						vStart: 0,
// 						vEnd: 0,
// 					},
// 					control:{
// 						position:{
// 							x:0,
// 							y:0
// 						},
// 						sample:false,
// 						currentColor:0,
// 						foreground:0,
// 						background:0,
// 						keyEdge:0,
// 					},
// 					size:{
// 						enable:false,
// 						position:{
// 							x:0,
// 							y:0
// 						},
// 						size:0
// 					}
// 				},
// 				Pattern:{
// 					slectSource:[0,0],
// 					maskInfo:{
// 						enabled: false,
// 						hStart: 0,
// 						hEnd: 0,
// 						vStart: 0,
// 						vEnd: 0,
// 					},
// 					size:{
// 						enable:false,
// 						position:{
// 							x:0,
// 							y:0
// 						},
// 						size:0
// 					},
// 					wipe:{
// 						selectWipeIndex: 0,
// 						size: 0,
// 					}
// 				},
// 				pip:{
// 					slectSource:[0,0],
// 					maskInfo:{
// 						enabled: false,
// 						hStart: 0,
// 						hEnd: 0,
// 						vStart: 0,
// 						vEnd: 0,
// 					},
// 					size:{
// 						enable:false,
// 						position:{
// 							x:0,
// 							y:0
// 						},
// 						size:0
// 					},
// 					border:{
// 						enable:false,
// 						width:0,
// 						hue:0,
// 						saturation:0,
// 						brightness:0,
// 					}
// 				}
// 			});
// 		}
// 	}

// 	// Key Scaling methods
// 	keyScalingSizes(_protocolOrder = false): number[] {
// 		// setting protocolOrder to true guarantees it will correspond to the
// 		//  Osee communication protocol's index numbers. In this case it's a noop
// 		return [0.25, 0.33, 0.5]
// 	}

// 	encodeKeyScalingSize(val: number): number {
// 		return this.keyScalingSizes(true).indexOf(val)
// 	}

// 	decodeKeyScalingSize(idx: number): number {
// 		// could add something for 100% if resize is disabled? (keys other than PiP)
// 		const sizesPct = this.keyScalingSizes(true)
// 		return sizesPct[idx]
// 	}

// 	// Key Type methods
// 	keyTypes(_protocolOrder = false, shortname = false): string[] {
// 		// setting protocolOrder to true guarantees it will correspond to the
// 		//  Osee communication protocol's index numbers. In this case it's a noop
// 		if (!shortname) {
// 			return ['Luma Key', 'Chroma Key', 'Key Pattern', 'PIP']
// 		} else {
// 			return ['Luma', 'Chrom', 'Pattn', 'PiP']
// 		}
// 	}

// 	decodeKeyType(idx: number): string {
// 		// convert Osee number to internal string format
// 		const keyTypes = this.keyTypes(true)
// 		return keyTypes[idx]
// 	}
// }

// export async function sync(model: GoStreamModel): Promise<boolean> {
// 	const cmds: GoStreamCmd[] = [
// 		{id: ActionId.LumaFillSourceList, type: ReqType.Get},
// 		{id: ActionId.LumaKeySourceList, type: ReqType.Get},
// 		{id: ActionId.ChromaFillSourceList, type: ReqType.Get},
// 		{id: ActionId.PatternFillSourceList, type: ReqType.Get},
// 		{id: ActionId.PipFillSourceList, type: ReqType.Get},
// 		{id: ActionId.PatternWipeList, type: ReqType.Get},
// 	]
// 	for (let index = 0; index < model.keyCount; index++) {
// 		cmds.push({id: ActionId.KeyEnable, type: ReqType.Get,value:[index] });
// 		cmds.push({id: ActionId.KeyType, type: ReqType.Get,value:[index] });
// 		cmds.push({id: ActionId.KeyOnAir, type: ReqType.Get,value:[index] });
// 		//LumaKey
// 		cmds.push({ id: ActionId.LumaFillSource, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.LumaKeySource, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.LumaMaskEnable, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.LumaMaskHStart, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.LumaMaskVStart, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.LumaMaskHEnd, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.LumaMaskVEnd, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.LumaPreMultipliedKey, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.LumaClip, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.LumaGain, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.LumaResize, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.LumaSize, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.LumaXPosition, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.LumaYPosition, type: ReqType.Get,value:[index] });

// 		//Chroma
// 		cmds.push({ id: ActionId.ChromaFillSource, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaMaskEnable, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaMaskHStart, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaMaskVStart, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaMaskHEnd, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaMaskVEnd, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaResize, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaSize, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaXPosition, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaYPosition, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaSMPXPosition, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaSMPYPosition, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaSample, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaCurrentColor, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaForeground, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaBackground, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.ChromaKeyEdge, type: ReqType.Get,value:[index] });
// 		//Pattern
// 		cmds.push({ id: ActionId.PatternFillSource, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PatternWipeIndex, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PatternWipeSize, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PatternMaskEnable, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PatternMaskHStart, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PatternMaskVStart, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PatternMaskHEnd, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PatternMaskVEnd, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PatternResize, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PatternSize, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PatternXPosition, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PatternYPosition, type: ReqType.Get,value:[index] });
// 		//Pip
// 		cmds.push({ id: ActionId.PipFillSource, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PipMaskEnable, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PipMaskHStart, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PipMaskVStart, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PipMaskHEnd, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PipMaskVEnd, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PipSize, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PipXPosition, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PipYPosition, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PipBorderEnable, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PipBorderWidth, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PipBorderColorHue, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PipBorderColorSaturation, type: ReqType.Get,value:[index] });
// 		cmds.push({ id: ActionId.PipBorderColorBrightness, type: ReqType.Get,value:[index] });

// 	}
// 	return sendCommands(cmds)
// }
// export function update(state: KeyerStateT, data: GoStreamCmd): boolean {
// 	switch (data.id as ActionId) {
// 		case ActionId.LumaFillSourceList:
// 			var str = String(data.value)
// 			state.LumaFillSources =  str ? str.split(',').map(Number) : []
// 			break;
// 		case ActionId.LumaKeySourceList:
// 			var str = String(data.value)
// 			state.LumaKeySources =  str ? str.split(',').map(Number) : []
// 			break;
// 		case ActionId.ChromaFillSourceList:
// 			var str = String(data.value)
// 			state.ChromaFillSource =  str ? str.split(',').map(Number) : []
// 			break;
// 		case ActionId.PatternFillSourceList:
// 			var str = String(data.value)
// 			state.PatternFillSource =  str ? str.split(',').map(Number) : []
// 			break;
// 		case ActionId.PipFillSourceList:
// 			var str = String(data.value)
// 			state.PipFileSource =  str ? str.split(',').map(Number) : []
// 			break;
// 		case ActionId.PatternWipeList:
// 			var str = String(data.value)
// 			state.PatternWipes =  str ? str.split(',').map(String) : []
// 			break;
// 		case ActionId.KeyEnable:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].enabled=Boolean(data.value![1])
// 			break;
// 		case ActionId.KeyType:{
// 			var index=Number(data.value![0])
// 			var value=String(data.value![1])
// 			switch (value) {
// 				case "Luma":
// 				default:
// 					state.keyInfo[index].keyType= USKKeyTypes.Luma
// 					break;
// 				case "Chroma":
// 					state.keyInfo[index].keyType= USKKeyTypes.Chroma
// 					break;
// 				case "Pattern":
// 					state.keyInfo[index].keyType= USKKeyTypes.Pattern
// 					break;
// 				case "PIP":
// 					state.keyInfo[index].keyType= USKKeyTypes.Pip
// 					break;
// 			}
// 			break;
// 		}
// 		case ActionId.KeyOnAir:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].onAir=Boolean(data.value![1])
// 			break;
// 		//Luma
// 		case ActionId.LumaFillSource:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Luma.slectSource[0]=Number(data.value![1])
// 			break;
// 		case ActionId.LumaKeySource:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Luma.slectSource[1]=Number(data.value![1])
// 			break;
// 		case ActionId.LumaMaskEnable:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Luma.maskInfo.enabled=Boolean(data.value![1])
// 			break;
// 		case ActionId.LumaMaskHStart:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Luma.maskInfo.hStart=Number(data.value![1])
// 			break;
// 		case ActionId.LumaMaskVStart:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Luma.maskInfo.vStart=Number(data.value![1])
// 			break;
// 		case ActionId.LumaMaskHEnd:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Luma.maskInfo.hEnd=Number(data.value![1])
// 			break;
// 		case ActionId.LumaMaskVEnd:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Luma.maskInfo.vEnd=Number(data.value![1])
// 			break;
// 		case ActionId.LumaPreMultipliedKey:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Luma.keyControl.lumaPreMultipliedKey=Boolean(data.value![1])
// 			break;
// 		case ActionId.LumaClip:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Luma.keyControl.clip=Number(data.value![1])
// 			break;
// 		case ActionId.LumaGain:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Luma.keyControl.gain=Number(data.value![1])
// 			break;
// 		case ActionId.LumaResize:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Luma.size.enable=Boolean(data.value![1])
// 			break;
// 		case ActionId.LumaSize:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Luma.size.size=Number(data.value![1])
// 			break;
// 		case ActionId.LumaXPosition:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Luma.size.position.x=Number(data.value![1])
// 			break;
// 		case ActionId.LumaYPosition:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Luma.size.position.y=Number(data.value![1])
// 			break;

// 		//chroma
// 		case ActionId.ChromaFillSource:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.slectSource[0]=Number(data.value![1])
// 			break;
// 		case ActionId.ChromaMaskEnable:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.maskInfo.enabled=Boolean(data.value![1])
// 			break;
// 		case ActionId.ChromaMaskHStart:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.maskInfo.hStart=Number(data.value![1])
// 			break;
// 		case ActionId.ChromaMaskVStart:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.maskInfo.vStart=Number(data.value![1])
// 			break;
// 		case ActionId.ChromaMaskHEnd:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.maskInfo.hEnd=Number(data.value![1])
// 			break;
// 		case ActionId.ChromaMaskVEnd:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.maskInfo.vEnd=Number(data.value![1])
// 			break;
// 		case ActionId.ChromaResize:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.size.enable=Boolean(data.value![1])
// 			break;
// 		case ActionId.ChromaSize:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.size.size=Number(data.value![1])
// 			break;
// 		case ActionId.ChromaXPosition:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.size.position.x=Number(data.value![1])
// 			break;
// 		case ActionId.ChromaYPosition:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.size.position.y=Number(data.value![1])
// 			break;
// 		case ActionId.ChromaSMPXPosition:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.control.position.x=Number(data.value![1])
// 			break;
// 		case ActionId.ChromaSMPYPosition:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.control.position.y=Number(data.value![1])
// 			break;
// 		case ActionId.ChromaSample:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.control.sample=Boolean(data.value![1])
// 			break;
// 		case ActionId.ChromaCurrentColor:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.control.currentColor=Number(data.value![1])
// 			break;
// 		case ActionId.ChromaForeground:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.control.foreground=Number(data.value![1])
// 			break;
// 		case ActionId.ChromaBackground:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.control.background=Number(data.value![1])
// 			break;
// 		case ActionId.ChromaKeyEdge:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Chroma.control.keyEdge=Number(data.value![1])
// 			break;
// 		//Pattern
// 		case ActionId.PatternFillSource:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Pattern.slectSource[0]=Number(data.value![1])
// 			break;
// 		case ActionId.PatternWipeIndex:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Pattern.wipe.selectWipeIndex=Number(data.value![1])
// 			break;
// 		case ActionId.PatternWipeSize:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Pattern.wipe.size=Number(data.value![1])
// 			break;
// 		case ActionId.PatternMaskEnable:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Pattern.maskInfo.enabled=Boolean(data.value![1])
// 			break;
// 		case ActionId.PatternMaskHStart:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Pattern.maskInfo.hStart=Number(data.value![1])
// 			break;
// 		case ActionId.PatternMaskVStart:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Pattern.maskInfo.vStart=Number(data.value![1])
// 			break;
// 		case ActionId.PatternMaskHEnd:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Pattern.maskInfo.hEnd=Number(data.value![1])
// 			break;
// 		case ActionId.PatternMaskVEnd:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Pattern.maskInfo.vEnd=Number(data.value![1])
// 			break;
// 		case ActionId.PatternResize:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Pattern.size.enable=Boolean(data.value![1])
// 			break;
// 		case ActionId.PatternSize:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Pattern.size.size=Number(data.value![1])
// 			break;
// 		case ActionId.PatternXPosition:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Pattern.size.position.x=Number(data.value![1])
// 			break;
// 		case ActionId.PatternYPosition:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].Pattern.size.position.y=Number(data.value![1])
// 			break;
// 		//Pip

// 		case ActionId.PipFillSource:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].pip.slectSource[0]=Number(data.value![1])
// 			break;
// 		case ActionId.PipMaskEnable:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].pip.maskInfo.enabled=Boolean(data.value![1])
// 			break;
// 		case ActionId.PipMaskHStart:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].pip.maskInfo.hStart=Number(data.value![1])
// 			break;
// 		case ActionId.PipMaskVStart:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].pip.maskInfo.vStart=Number(data.value![1])
// 			break;
// 		case ActionId.PipMaskHEnd:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].pip.maskInfo.hEnd=Number(data.value![1])
// 			break;
// 		case ActionId.PipMaskVEnd:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].pip.maskInfo.vEnd=Number(data.value![1])
// 			break;
// 		case ActionId.PipSize:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].pip.size.size=Number(data.value![1])
// 			break;
// 		case ActionId.PipXPosition:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].pip.size.position.x=Number(data.value![1])
// 			break;
// 		case ActionId.PipYPosition:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].pip.size.position.y=Number(data.value![1])
// 			break;
// 		case ActionId.PipBorderEnable:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].pip.border.enable=Boolean(data.value![1])
// 			break;
// 		case ActionId.PipBorderWidth:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].pip.border.width=Number(data.value![1])
// 			break;
// 		case ActionId.PipBorderColorHue:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].pip.border.hue=Number(data.value![1])
// 			break;
// 		case ActionId.PipBorderColorSaturation:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].pip.border.saturation=Number(data.value![1])
// 			break;
// 		case ActionId.PipBorderColorBrightness:
// 			var index=Number(data.value![0])
// 			state.keyInfo[index].pip.border.brightness=Number(data.value![1])
// 			break;

// 	}
// 	return false
// }
