import { Model, sourceID } from "../enums"

export interface deviceInfoT {
    fwVersion: string
    buildInfo: string
    deviceID: string
    deviceName: string
    
    deviceModel:Model

    inputSources:sourceID[]
    audioMixSources:sourceID[]
    multiSourceWindowCount:number
    keyCount:number
    dskCount:number
    playCount:number

    colorBackCount:number
    streamCount:number
    mediaCount:number
    //因为无命令获取，写死
    micSources:sourceID[]
    
    RecordISOChannels:sourceID[]

    VideoOutSources:sourceID[],
    AudioOutSources:sourceID[],
    OutPutColorSpaceSources:sourceID[],
    InputColorSpaceSources:sourceID[],
}

