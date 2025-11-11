import { EffectStyle, sourceID, WipeDirection } from "../enums"



export interface WipeProp{
    selectPattern:number,
    rate:number,
    x:number
    y:number
    direction:WipeDirection
    symmetry:number
    softness:number
    borderWidth:number
    selectWipeSource:sourceID
}
export interface DipProp{
    rate: number
    selectDipSource: sourceID,
}

export interface MixProp{
    rate: number
}

export interface EffectStateT {
    PvwSrc: sourceID
    PgmSrc: sourceID
    transitionPosition: {
        inTransition: boolean
        handlePosition: number
    }
    fadeToBlack: {
        inTransition: boolean
        isFullyBlack: boolean
        AFV: boolean
        rate: number
    }
    selectTransitionStyle: {
        PrevState: boolean
        style: EffectStyle
        mix: MixProp
        wipe: WipeProp
        dip:DipProp
    }
    tied: boolean
    dipFillSources: sourceID[],
    wipeFillSource:sourceID[]
}