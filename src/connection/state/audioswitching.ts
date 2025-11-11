import { Period, Priority, sourceID } from "../enums"



export interface switchProp {
    selectSource:sourceID
    threshold:number
}

export interface videoMappingProp {
    AMapSelectSource:sourceID
    BMapSelectSource:sourceID
    ABMapSelectSource:sourceID
    Period:Period
    ABPriority:Priority
}

export interface AutoSwitchingStateT {
    enable: boolean
    ASources:sourceID[]
    BSources:sourceID[]
    AMapSources:sourceID[]
    BMapSources:sourceID[]
    ABMapSources:sourceID[]

    A:switchProp
    B:switchProp

    video:videoMappingProp
}