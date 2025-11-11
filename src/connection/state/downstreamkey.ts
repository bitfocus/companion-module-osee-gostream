import { sourceID } from "../enums"

export interface DSKState {
    keyEnable: boolean
    keyOnAir: boolean
    source: {
        fill: number
        key: number
    }
    mask: {
        enabled: boolean
        hStart: number
        vStart: number
        hEnd: number
        vEnd: number
    }
    control: {
        invert: boolean
        preMultipliedKey: boolean
        clip: number
        gain: number
    }
    rate: {
        rate: number
    }
    sizePosition: {
        enable: boolean
        size: number
        xPosition: number
        yPosition: number
    }
}

export interface DSKStateT {
    FillSources: sourceID[]
    KeySources: sourceID[]
    DSKS: {[index:number]:DSKState|undefined}
}