import { generatePorts, GoStreamModel, Model } from './types'
import { PortType, PortCaps } from '../enums'

export class GoStreamDuet extends GoStreamModel {
	constructor() {
		super()
		this.id = Model.Duet
		this.label = 'Duet'
		this.outputs = [
			...generatePorts('Output', 'Out', PortType.HDMI, PortCaps.Colorspace, 2),
			{ id: 2, longName: 'UVC', shortName: 'UVC', type: PortType.Other, caps: PortCaps.NoCaps },
		]
		this.inputs = [
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
			...generatePorts('Input', 'In', PortType.External, PortCaps.Renameable | PortCaps.Audio, 4, 2), // HDMI 1-4
			{
				id: 6,
				longName: 'Aux',
				shortName: 'Aux',
				type: PortType.Aux,
				caps: PortCaps.Renameable | PortCaps.Audio,
			},
			{
				id: 7,
				longName: 'S/SRC',
				shortName: 'SSRC',
				type: PortType.Internal,
				caps: PortCaps.NoCaps,
			},
			...generatePorts('Still', 'STL', PortType.Internal, PortCaps.Renameable, 2, 8), // Still 1-2
			...generatePorts('Mic', 'Mic', PortType.Mic, PortCaps.Audio, 2),
		]
		this.streams = 3
		this.transitionTypes = 3
		this.stillSlots = 2
	}
}
