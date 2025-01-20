import { Model, PortCaps, PortType } from '../enums'

export const MODEL_AUTO_DETECT = 0
export type ModelId = 0 | Model
export type IPortSpec = {
	id: number
	longName: string
	shortName: string
	type: PortType
	caps: PortCaps
}

export interface IModelSpec {
	id: ModelId
	label: string
	outputs: IPortSpec[]
	inputs: IPortSpec[]
	streams: number
	transitionTypes: number
	stillSlots: number
}

export function generatePorts(
	longNamePrefix: string,
	shortNamePrefix: string,
	type: PortType,
	caps: PortCaps,
	count: number,
	idOffset?: number,
): IPortSpec[] {
	const outputs: IPortSpec[] = []
	const offset = idOffset ? idOffset : 0
	for (let i = 0; i < count; i++) {
		outputs.push({
			id: offset + i,
			longName: `${longNamePrefix} ${i + 1}`,
			shortName: `${shortNamePrefix} ${i + 1}`,
			type: type,
			caps: caps,
		})
	}
	return outputs
}
