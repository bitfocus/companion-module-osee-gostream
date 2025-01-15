import { Model, PortType } from '../enums'

export const MODEL_AUTO_DETECT = 0
export type ModelId = 0 | Model
export interface IPortSpec {
	id: number
	longName: string
	shortName: string
	type: PortType
}

export interface IModelSpec {
	id: ModelId
	label: string
	outputs: IPortSpec[]
	inputs: IPortSpec[]
	streams: number
}

export function generatePorts(
	longNamePrefix: string,
	shortNamePrefix: string,
	type: PortType,
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
		})
	}
	return outputs
}
