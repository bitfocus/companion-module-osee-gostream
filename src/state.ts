import { DropdownChoice } from "@companion-module/base"



export interface GoStreamDeckState {
	selectPrevInput?:DropdownChoice,
	selectPgmInput?: DropdownChoice,
	selectOutputs: { [outputId: number]: OutputChannel },
	selectTransitionStyle?:TransitionStyleInfo,
	TKeyeState:TransitionKeyeState,
	infos: DeviceInfo,
	keyOnAir:boolean,
	dskOnAir:boolean,
	///输出口 HDMI1和HDMI对应的输出信息 
	OutPutInfos:OutPutSource[],
	fadeToBlack?:FadeToBlackProperties,
	//aux 源
	auxSource:number,

	upStreamKeyType:number,

	arrayKeySourceFill:Array<number|undefined>,
}

export interface FadeToBlackProperties {
	readonly isFullyBlack: boolean
	readonly inTransition: boolean
	readonly remainingFrames: number
	rate: number
}
export interface OutPutSource{
	OutPutType:number,
	OutPutSource?:DropdownChoice,
}

export interface TransitionStyleInfo{
	style:DropdownChoice,

	mixrate:number,
	diprate:number,
	wiperate:number,
}

export interface TransitionKeyeState {
	M_Key: boolean
	DSK: boolean
	BKGD: boolean
}

export interface DeviceInfo {
	protocolVersion: string
	deviceType:number
	capabilities?: GostreamDeckCapabilites
	macroPool?: MacroPoolInfo
	mediaPool?: MediaPoolInfo
}

export interface InputChannel {
	readonly inputId: number
	longName: string
	shortName: string
}

export interface OutputChannel {
	readonly outputId: number
	longName: string
	shortName: string
}

export interface GostreamDeckCapabilites {
	readonly mixEffects: number
	readonly auxilliaries: number
	readonly mixMinusOutputs: number
	readonly serialPorts: number
	readonly maxHyperdecks: number
	readonly superSources: number
	readonly downstreamKeyers: number
	readonly advancedChromaKeyers: boolean
	readonly onlyConfigurableOutputs: boolean
}

export interface MacroPoolInfo {
	readonly macroCount: number
}

export interface MediaPoolInfo {
	readonly stillCount: number
	readonly clipCount: number
}

export function Create(): GoStreamDeckState {
	return {
		infos: {
			protocolVersion: "1.0",
			deviceType:0,
		},
		TKeyeState:{
			BKGD:true,
			DSK:false,
			M_Key:false,
		},
		selectOutputs:{},
		keyOnAir:false,
		dskOnAir:false,
		OutPutInfos:[
			{
				OutPutType:0,
			},
			{
				OutPutType:2,
			}
		],
		auxSource:0,
		upStreamKeyType:0,
		arrayKeySourceFill:[0,0,0,0],
	}
}

