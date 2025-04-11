import { ActionId } from './actionId'
import { sendCommands, GoStreamCmd } from '../../connection'
import { ReqType } from '../../enums'
import type { GoStreamModel } from '../../models/types'

export enum USKKeyTypes {
	Luma = 0,
	Chroma = 1,
	KeyPattern = 2,
	Pip = 3,
}
export enum USKKeySourceType {
	Key = 0,
	Fill = 1,
}

export type MaskInfoT = {
	enabled: boolean
	hStart: number
	hEnd: number
	vStart: number
	vEnd: number
}

export type KeyInfoT = {
	enabled: boolean
	sources: number[]
	size: number
	xPosition: number
	yPosition: number
	mask: MaskInfoT
}

export class UpstreamKeyerStateT {
	model: GoStreamModel
	UpStreamKeyType: string
	keyInfo: KeyInfoT[]

	constructor(model: GoStreamModel) {
		this.model = model
		this.UpStreamKeyType = this.keyTypes()[0]
		this.keyInfo = [
			{
				enabled: false,
				sources: [0, 0],
				size: 0,
				xPosition: 0,
				yPosition: 0,
				mask: { enabled: false, hStart: 0, hEnd: 100, vStart: 100, vEnd: 100 },
			},
			{
				enabled: false,
				sources: [0, 0],
				size: 0,
				xPosition: 0,
				yPosition: 0,
				mask: { enabled: false, hStart: 0, hEnd: 100, vStart: 100, vEnd: 100 },
			},
			{
				enabled: false,
				sources: [0, 0],
				size: 0,
				xPosition: 0,
				yPosition: 0,
				mask: { enabled: false, hStart: 0, hEnd: 100, vStart: 100, vEnd: 100 },
			},
			{
				enabled: false,
				sources: [0, 0],
				size: 0,
				xPosition: 0,
				yPosition: 0,
				mask: { enabled: false, hStart: 0, hEnd: 100, vStart: 100, vEnd: 100 },
			},
		]
	}

	// Key Scaling methods
	keyScalingSizes(_protocolOrder = false): number[] {
		// setting protocolOrder to true guarantees it will correspond to the
		//  Osee communication protocol's index numbers. In this case it's a noop
		return [0.25, 0.33, 0.5]
	}

	encodeKeyScalingSize(val: number): number {
		return this.keyScalingSizes(true).indexOf(val)
	}

	decodeKeyScalingSize(idx: number): number {
		// could add something for 100% if resize is disabled? (keys other than PiP)
		const sizesPct = this.keyScalingSizes(true)
		return sizesPct[idx]
	}

	// Key Type methods
	keyTypes(_protocolOrder = false, shortname = false): string[] {
		// setting protocolOrder to true guarantees it will correspond to the
		//  Osee communication protocol's index numbers. In this case it's a noop
		if (!shortname) {
			return ['Luma Key', 'Chroma Key', 'Key Pattern', 'PIP']
		} else {
			return ['Luma', 'Chrom', 'Pattn', 'PiP']
		}
	}

	encodeKeyType(val: string = this.UpStreamKeyType): number {
		return this.keyTypes(true).indexOf(val)
	}

	decodeKeyType(idx: number): string {
		// convert Osee number to internal string format
		const keyTypes = this.keyTypes(true)
		return keyTypes[idx]
	}
}

export async function sync(_model: GoStreamModel): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
		{ id: ActionId.UpStreamKeyType, type: ReqType.Get },
		{ id: ActionId.LumaKeySourceFill, type: ReqType.Get },
		{ id: ActionId.LumaKeyResizeEnable, type: ReqType.Get },
		{ id: ActionId.LumaKeyResizeSize, type: ReqType.Get },
		{ id: ActionId.LumaKeyResizeXPosition, type: ReqType.Get },
		{ id: ActionId.LumaKeyResizeYPosition, type: ReqType.Get },
		{ id: ActionId.LumaKeyMaskEnable, type: ReqType.Get },
		{ id: ActionId.LumaKeyMaskHStart, type: ReqType.Get },
		{ id: ActionId.LumaKeyMaskHEnd, type: ReqType.Get },
		{ id: ActionId.LumaKeyMaskVStart, type: ReqType.Get },
		{ id: ActionId.LumaKeyMaskVEnd, type: ReqType.Get },
		{ id: ActionId.ChromaKeyFill, type: ReqType.Get },
		{ id: ActionId.ChromaKeyResizeEnable, type: ReqType.Get },
		{ id: ActionId.ChromaKeyResizeSize, type: ReqType.Get },
		{ id: ActionId.ChromaKeyResizeXPosition, type: ReqType.Get },
		{ id: ActionId.ChromaKeyResizeYPosition, type: ReqType.Get },
		{ id: ActionId.ChromaKeyMaskEnable, type: ReqType.Get },
		{ id: ActionId.ChromaKeyMaskHStart, type: ReqType.Get },
		{ id: ActionId.ChromaKeyMaskHEnd, type: ReqType.Get },
		{ id: ActionId.ChromaKeyMaskVStart, type: ReqType.Get },
		{ id: ActionId.ChromaKeyMaskVEnd, type: ReqType.Get },
		{ id: ActionId.KeyPatternSourceFill, type: ReqType.Get },
		{ id: ActionId.KeyPatternResizeEnable, type: ReqType.Get },
		{ id: ActionId.KeyPatternResizeSize, type: ReqType.Get },
		{ id: ActionId.KeyPatternResizeXPosition, type: ReqType.Get },
		{ id: ActionId.KeyPatternResizeYPosition, type: ReqType.Get },
		{ id: ActionId.KeyPatternMaskEnable, type: ReqType.Get },
		{ id: ActionId.KeyPatternMaskHStart, type: ReqType.Get },
		{ id: ActionId.KeyPatternMaskHEnd, type: ReqType.Get },
		{ id: ActionId.KeyPatternMaskVStart, type: ReqType.Get },
		{ id: ActionId.KeyPatternMaskVEnd, type: ReqType.Get },
		{ id: ActionId.PipSource, type: ReqType.Get },
		{ id: ActionId.PipSize, type: ReqType.Get },
		{ id: ActionId.PipXPosition, type: ReqType.Get },
		{ id: ActionId.PipYPosition, type: ReqType.Get },
		{ id: ActionId.PipMaskEnable, type: ReqType.Get },
		{ id: ActionId.PipMaskHStart, type: ReqType.Get },
		{ id: ActionId.PipMaskHEnd, type: ReqType.Get },
		{ id: ActionId.PipMaskVStart, type: ReqType.Get },
		{ id: ActionId.PipMaskVEnd, type: ReqType.Get },
	]
	return sendCommands(cmds)
}
export function update(state: UpstreamKeyerStateT, data: GoStreamCmd): boolean {
	switch (data.id as ActionId) {
		case ActionId.UpStreamKeyType:
			state.UpStreamKeyType = state.decodeKeyType(Number(data.value![0]))
			break
		case ActionId.LumaKeySourceFill:
			state.keyInfo[USKKeyTypes.Luma].sources[USKKeySourceType.Fill] = Number(data.value![0])
			break
		case ActionId.LumaKeySourceKey:
			state.keyInfo[USKKeyTypes.Luma].sources[USKKeySourceType.Key] = Number(data.value![0])
			break
		case ActionId.LumaKeyResizeEnable:
			state.keyInfo[USKKeyTypes.Luma].enabled = Boolean(data.value![0])
			break
		case ActionId.LumaKeyResizeSize:
			state.keyInfo[USKKeyTypes.Luma].size = Number(data.value![0])
			break
		case ActionId.LumaKeyResizeXPosition:
			state.keyInfo[USKKeyTypes.Luma].xPosition = Number(data.value![0])
			break
		case ActionId.LumaKeyResizeYPosition:
			state.keyInfo[USKKeyTypes.Luma].yPosition = Number(data.value![0])
			break
		case ActionId.LumaKeyMaskEnable:
			state.keyInfo[USKKeyTypes.Luma].mask.enabled = Boolean(data.value![0])
			break
		case ActionId.LumaKeyMaskHStart:
			state.keyInfo[USKKeyTypes.Luma].mask.hStart = Number(data.value![0])
			break
		case ActionId.LumaKeyMaskHEnd:
			state.keyInfo[USKKeyTypes.Luma].mask.hEnd = Number(data.value![0])
			break
		case ActionId.LumaKeyMaskVStart:
			state.keyInfo[USKKeyTypes.Luma].mask.vStart = Number(data.value![0])
			break
		case ActionId.LumaKeyMaskVEnd:
			state.keyInfo[USKKeyTypes.Luma].mask.vEnd = Number(data.value![0])
			break
		case ActionId.ChromaKeyFill:
			state.keyInfo[USKKeyTypes.Chroma].sources[USKKeySourceType.Fill] = Number(data.value![0])
			break
		case ActionId.ChromaKeyResizeEnable:
			state.keyInfo[USKKeyTypes.Chroma].enabled = Boolean(data.value![0])
			break
		case ActionId.ChromaKeyResizeSize:
			state.keyInfo[USKKeyTypes.Chroma].size = Number(data.value![0])
			break
		case ActionId.ChromaKeyResizeXPosition:
			state.keyInfo[USKKeyTypes.Chroma].xPosition = Number(data.value![0])
			break
		case ActionId.ChromaKeyResizeYPosition:
			state.keyInfo[USKKeyTypes.Chroma].yPosition = Number(data.value![0])
			break
		case ActionId.ChromaKeyMaskEnable:
			state.keyInfo[USKKeyTypes.Chroma].mask.enabled = Boolean(data.value![0])
			break
		case ActionId.ChromaKeyMaskHStart:
			state.keyInfo[USKKeyTypes.Chroma].mask.hStart = Number(data.value![0])
			break
		case ActionId.ChromaKeyMaskHEnd:
			state.keyInfo[USKKeyTypes.Chroma].mask.hEnd = Number(data.value![0])
			break
		case ActionId.ChromaKeyMaskVStart:
			state.keyInfo[USKKeyTypes.Chroma].mask.vStart = Number(data.value![0])
			break
		case ActionId.ChromaKeyMaskVEnd:
			state.keyInfo[USKKeyTypes.Chroma].mask.vEnd = Number(data.value![0])
			break
		case ActionId.KeyPatternSourceFill:
			state.keyInfo[USKKeyTypes.KeyPattern].sources[USKKeySourceType.Fill] = Number(data.value![0])
			break
		case ActionId.KeyPatternResizeEnable:
			state.keyInfo[USKKeyTypes.KeyPattern].enabled = Boolean(data.value![0])
			break
		case ActionId.KeyPatternResizeSize:
			state.keyInfo[USKKeyTypes.KeyPattern].size = Number(data.value![0])
			break
		case ActionId.KeyPatternResizeXPosition:
			state.keyInfo[USKKeyTypes.KeyPattern].xPosition = Number(data.value![0])
			break
		case ActionId.KeyPatternResizeYPosition:
			state.keyInfo[USKKeyTypes.KeyPattern].yPosition = Number(data.value![0])
			break
		case ActionId.KeyPatternMaskEnable:
			state.keyInfo[USKKeyTypes.KeyPattern].mask.enabled = Boolean(data.value![0])
			break
		case ActionId.KeyPatternMaskHStart:
			state.keyInfo[USKKeyTypes.KeyPattern].mask.hStart = Number(data.value![0])
			break
		case ActionId.KeyPatternMaskHEnd:
			state.keyInfo[USKKeyTypes.KeyPattern].mask.hEnd = Number(data.value![0])
			break
		case ActionId.KeyPatternMaskVStart:
			state.keyInfo[USKKeyTypes.KeyPattern].mask.vStart = Number(data.value![0])
			break
		case ActionId.KeyPatternMaskVEnd:
			state.keyInfo[USKKeyTypes.KeyPattern].mask.vEnd = Number(data.value![0])
			break
		case ActionId.PipSource:
			state.keyInfo[USKKeyTypes.Pip].sources[USKKeySourceType.Fill] = Number(data.value![0])
			break
		case ActionId.PipSize:
			state.keyInfo[USKKeyTypes.Pip].size = state.decodeKeyScalingSize(Number(data.value![0]))
			break
		case ActionId.PipXPosition:
			state.keyInfo[USKKeyTypes.Pip].xPosition = Number(data.value![0])
			break
		case ActionId.PipYPosition:
			state.keyInfo[USKKeyTypes.Pip].yPosition = Number(data.value![0])
			break
		case ActionId.PipMaskEnable:
			state.keyInfo[USKKeyTypes.Pip].mask.enabled = Boolean(data.value![0])
			break
		case ActionId.PipMaskHStart:
			state.keyInfo[USKKeyTypes.Pip].mask.hStart = Number(data.value![0])
			break
		case ActionId.PipMaskHEnd:
			state.keyInfo[USKKeyTypes.Pip].mask.hEnd = Number(data.value![0])
			break
		case ActionId.PipMaskVStart:
			state.keyInfo[USKKeyTypes.Pip].mask.vStart = Number(data.value![0])
			break
		case ActionId.PipMaskVEnd:
			state.keyInfo[USKKeyTypes.Pip].mask.vEnd = Number(data.value![0])
			break
	}
	return false
}
