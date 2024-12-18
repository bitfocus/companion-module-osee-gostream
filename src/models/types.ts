import { Model, PortType } from '../enums'

export const MODEL_AUTO_DETECT = 0
export type ModelId = 0 | Model

export interface IModelSpec {
	id: ModelId
	label: string
	outputs: Array<{
		id: number
		name: string
	}>
	inputs: Array<{
		id: number
		longName: string
		shortName: string
		portType: PortType
		//sourceAvailability: Enums.SourceAvailability
		//meAvailability: Enums.MeAvailability
	}>
}

export function generateOutputs(prefix: string, count: number): IModelSpec['outputs'] {
	const outputs: IModelSpec['outputs'] = []
	for (let i = 0; i < count; i++) {
		outputs.push({
			id: i,
			name: `${prefix} ${i + 1}`,
		})
	}
	return outputs
}

export function generateInputs(prefix: string, count: number): IModelSpec['outputs'] {
	const outputs: IModelSpec['outputs'] = []
	for (let i = 0; i < count; i++) {
		outputs.push({
			id: i,
			name: `${prefix} ${i + 1}`,
		})
	}
	return outputs
}
