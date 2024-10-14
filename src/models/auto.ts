import { generateOutputs, MODEL_AUTO_DETECT, type IModelSpec } from './types.js'
import { PortType } from '../enums'

export const ModelSpecAuto: IModelSpec = {
	id: MODEL_AUTO_DETECT,
	label: 'Auto Detect',
	outputs: generateOutputs('Aux/Output', 3),
	inputs: [
		{
			id: 0,
			longName: 'Input1',
			shortName: 'In1',
			portType: PortType.Unknown,
		},
		{
			id: 1,
			longName: 'Input2',
			shortName: 'In2',
			portType: PortType.Unknown,
		},
		{
			id: 2,
			longName: 'Input3',
			shortName: 'In3',
			portType: PortType.Unknown,
		},
		{
			id: 3,
			longName: 'Input4',
			shortName: 'In4',
			portType: PortType.Unknown,
		},
	],
}
