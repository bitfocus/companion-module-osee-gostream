import { generateOutputs, type IModelSpec } from './types'
import { Model, PortType } from '../enums'

export const ModelSpecDuet: IModelSpec = {
	id: Model.Duet,
	label: 'Duet',
	outputs: [...generateOutputs('Output', 1)],
	inputs: [
		{
			id: 0,
			longName: 'Input2',
			shortName: 'In1',
			portType: PortType.SDI | PortType.HDMI,
		},
		{
			id: 1,
			longName: 'Input2',
			shortName: 'In2',
			portType: PortType.SDI | PortType.HDMI,
		},
		{
			id: 2,
			longName: 'Input3',
			shortName: 'In3',
			portType: PortType.SDI | PortType.HDMI,
		},
		{
			id: 3,
			longName: 'Input4',
			shortName: 'In4',
			portType: PortType.SDI | PortType.HDMI,
		},
	],
}
