export interface ColorBackState {
    hue:number,
    saturation:number,
    brightness:number,
}
export interface ColorBackStateT  {
    colorBacks: { [index: number]: ColorBackState | undefined }
}