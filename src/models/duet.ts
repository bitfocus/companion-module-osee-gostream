import { generatePorts, type IModelSpec } from './types'
import { Model, PortType } from '../enums'

export const ModelSpecDuet: IModelSpec = {
	id: Model.Duet,
	label: 'Duet',
	outputs: [...generatePorts('Output', "Out", PortType.HDMI, 2), { id: 2, longName: 'UVC', shortName: 'UVC', type: PortType.Other }],
	inputs: [
		...generatePorts('Input', "In", PortType.External, 4),  // HDMI 1-4
		{
			id: 4,
			longName: 'Aux',
			shortName: 'Aux',
			type: PortType.Aux,
		},
		{
			id: 5,
			longName: 'S/SRC',
			shortName: 'SSRC',
			type: PortType.Internal,
		},
		...generatePorts('Still', "STL", PortType.Internal, 2, 6),  // Still 1-2
	],
}
