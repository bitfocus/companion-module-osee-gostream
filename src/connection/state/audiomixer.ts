import { AfvState, AudioFadeSwitching, sourceID } from "../enums"


export interface commonProp {
    audioMixerEffectEnable: boolean,
    lowCutEnable: boolean,
    audioMixerEnable: AfvState,
    noiseGateEnable: boolean,
    compressorEnable: boolean,
    EQEnable: boolean,
    PGMLimiterEnable: boolean,
}
export interface MicProp {
    micType: number,
    micTypeRange:string[]
    inputRange:number[]
    input:number,
    delay:number,
}

export interface AudioMixerStateT {
    HeadphoneSources: sourceID[]
    commonChannels: { [id: number]: commonProp | undefined }
    audioFade: AudioFadeSwitching,
    micChannels:{ [id: number]: MicProp | undefined }
}