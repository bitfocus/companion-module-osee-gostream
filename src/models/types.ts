// import { PortCaps, PortType} from '../enums'
// import { DropdownChoice } from '@companion-module/base'
import { Model } from '../connection/enums'

// export const MODEL_AUTO_DETECT = Model.Unknown
// export type ModelId = 0 | Model
// export type IPortSpec = {
// 	id: number
// 	longName: string
// 	shortName: string
// 	type: PortType
// 	caps: PortCaps
// }

// export type PortT = {
// 	id: number
// 	name: string
// }

// export type SourceT = {
// 	id: number
// 	name: string
// }
// export function SourcesToChoices(
// 	sources: { inputId: number; longName: string; shortName: string }[],
// ): DropdownChoice[] {
// 	return sources.map((s) => ({
// 		id: s.inputId,
// 		label: s.longName,
// 	}))
// }

// export class GoStreamModel {
// 	id: Model
// 	label: string
// 	multiSourceWindowCount:number

// 	mediaPlayerCount:number

// 	streamCount:number

// 	colorBackCount:number

// 	constructor() {
// 		this.id = Model.Unknown
// 		this.label = ''
// 		this.multiSourceWindowCount = 4
// 		this.mediaPlayerCount= 2 //写死
// 		this.streamCount= 3 //写死
// 		this.colorBackCount=2
// 	}
// }

// state.device.mediaCount = 2;
// state.device.multiSourceWindowCount = 4;
// state.device.playCount = 2;
// state.device.ColorSpaceSources = [21001,21002];
// state.outputSetting.colorSpaceRange= ["Auto","RGB Full","RGB Limit","YC422 Full","YC422 Limit","YC444 Full","YC444 Limit"];

export class StreamModelSpec {
	id: Model
	label: string
	multiSourceWindowCount: number
	macros: number
	media: { players: number; stills: number; }
	recording: boolean
	recordISO: boolean
	audioMix: { effectEnable: boolean, micTypeEnable:boolean}
	audioSwitching: { audioCount: number }

	constructor() {
		this.id = Model.Unknown
		this.label = ''
		this.multiSourceWindowCount = 1
		this.macros = 100
		this.media = {
			players: 1,
			stills: 31,
		}
		this.recording = true
		this.recordISO = false
		this.audioMix = {
			effectEnable: false,
			micTypeEnable:false
		}
		this.audioSwitching = {
			audioCount: 2
		}
	}
}
