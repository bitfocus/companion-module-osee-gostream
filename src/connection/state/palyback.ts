
export interface selectConfig {
	selectMode: string
	repeatEnable:boolean
	playStatus:number  //0：停止，1：播放，2：暂停
}

export interface PlaybackStateT {
	config:{[id:number]:selectConfig|undefined }
	modeRanges:string[]
}