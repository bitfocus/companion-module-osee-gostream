import { generatePorts, type IModelSpec } from './types'
import { Model, PortType, PortCaps } from '../enums'

export const ModelSpecDeck: IModelSpec = {
	id: Model.Deck,
	label: 'Deck',
	outputs: [
		...generatePorts('Output', 'Out', PortType.HDMI, PortCaps.Colorspace, 2),
		{ id: 2, longName: 'UVC', shortName: 'UVC', type: PortType.Other, caps: PortCaps.NoCaps },
	],
	inputs: [
		{
			id: 0,
			longName: 'Program',
			shortName: 'PGM',
			type: PortType.Internal,
			caps: PortCaps.Renameable | PortCaps.Audio,
		},
		{
			id: 1,
			longName: 'Preview',
			shortName: 'Pvw',
			type: PortType.Internal,
			caps: PortCaps.Renameable,
		},
		...generatePorts('Input', 'In', PortType.HDMI, PortCaps.Renameable | PortCaps.Audio, 4), // HDMI 1-4
		{
			id: 4,
			longName: 'Aux',
			shortName: 'Aux',
			type: PortType.Aux,
			caps: PortCaps.Renameable | PortCaps.Audio,
		},
		{
			id: 5,
			longName: 'S/SRC',
			shortName: 'SSRC',
			type: PortType.Internal,
			caps: PortCaps.NoCaps,
		},
		...generatePorts('Still', 'STL', PortType.Internal, PortCaps.Renameable, 2, 6), // Still 1-2
		...generatePorts('Mic', 'Mic', PortType.Mic, PortCaps.NoCaps, 2),
	],
	streams: 3,
	transitionTypes: 3,
	stillSlots: 2,
}
