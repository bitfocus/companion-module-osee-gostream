import { MultiSourceControlStyle, sourceID } from "../enums"

export interface multiSourceEightWindow {
    enable: boolean
    selectSource:sourceID
    x:number,
    y:number,
    size:number,
    cropLeft:number,
    cropTop:number,
    cropRight:number,
    cropBottom:number,
}

export interface controlItem {
    style:MultiSourceControlStyle
    y:number
}

export interface multiSourceFourWindow {
    cropEnable: boolean
    cropLeft:number,
    cropTop:number,
    cropRight:number,
    cropBottom:number,
    borderWidth:number,
    hue:number,
    saturation:number,
    brightness:number
}

export interface MultiSourceStateT {
    enable?:boolean
    fillSources?:sourceID[]
    keySources?:sourceID[]
    multiSourceWindowsSources?:sourceID[]
    eightWins:{[winId:number]:multiSourceEightWindow|undefined}
    control?:controlItem,
    fourWins:{[winId:number]:multiSourceFourWindow|undefined}
}