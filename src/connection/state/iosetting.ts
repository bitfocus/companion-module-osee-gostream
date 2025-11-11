import { inputModeType, sourceID } from "../enums"

export interface inputStateT{
	inputMode:inputModeType
}

export interface OutPutStateT {
    outFormatRange: string[]
    outFormat: string
    audioSourcesRange:sourceID[]
    videoSourcesRange:{[sID:number]:sourceID[]}
    colorSpaceRange:string[]
}