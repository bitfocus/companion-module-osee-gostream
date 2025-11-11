import { sourceID, USKKeyTypes } from "../enums"

export type maskInfoT = {
    enabled: boolean
    hStart: number
    hEnd: number
    vStart: number
    vEnd: number
}

export type wipeInfoT = {
    selectWipeIndex: number
    size: number
}

export type keyControlT = {
    lumaPreMultipliedKey: boolean
    clip: number
    gain: number
    invert: boolean
}

export type LumaT = {
    slectSource: sourceID[] //fill Source & Key Source
    maskInfo: maskInfoT
    keyControl: keyControlT
    size: sizeT
}

export type chromaControlT = {
    SMPX: number
    SMPY: number
    sample: boolean,
    currentColor: number,
    foreground: number
    background: number
    keyEdge: number
}
export type sizeT = {
    enable?: boolean
    x: number
    y: number
    size: number
}

export type ChromaT = {
    slectSource: sourceID[] //fill Source & Key Source
    maskInfo: maskInfoT
    control: chromaControlT
    size: sizeT
}

export type PatternT = {
    slectSource: sourceID[] //fill Source & Key Source
    maskInfo: maskInfoT
    size: sizeT
    wipe: wipeInfoT
}

export type borderT = {
    enable: boolean
    width: number
    hue: number
    saturation: number
    brightness: number
}

export type pipT = {
    slectSource: sourceID[] //fill Source & Key Source
    maskInfo: maskInfoT
    size: sizeT
    border: borderT
}



export type KeyInfoT = {
    enabled: boolean
    onAir: boolean
    keyType: USKKeyTypes
    Luma: LumaT
    Chroma: ChromaT
    Pattern: PatternT
    pip: pipT
}

export interface KeyerStateT {
    USKS: { [index: number]: KeyInfoT|undefined }
    LumaFillSources: sourceID[]
    LumaKeySources: sourceID[]
    ChromaFillSource: sourceID[]
    PatternFillSource: sourceID[]
    PatternWipes: string[]
    PipFileSource: sourceID[]
}