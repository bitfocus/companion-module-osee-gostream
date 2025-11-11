import { TCPHelper } from './libs/tcp'
import { EventEmitter } from 'eventemitter3'
import { StreamDeckState, StateUtil } from './state'
import { EffectStyle, ReqType, TcpStatus, sourceID } from './enums'
import crc16modbus from 'crc/crc16modbus'
import * as cmdUtil from './cmds/util'
import * as ID from './actionids'

export const HEAD1 = 0xeb
export const HEAD2 = 0xa6
export const ProType = 0x00
const DEFAULT_PORT = 19010

export enum StreamDeckConnectionStatus {
	CLOSED,
	CONNECTING,
	CONNECTED,
	ERROR,
}

export type GoStreamCmd = {
	id: string
	type: ReqType
	value?: (string | number)[]
}

export type StreamSocketEvents = {
	disconnect: []
	info: [string]
	debug: [string]
	error: [string]
	connected:[]
	status_change: [state: any, message: string | undefined]
	rec_data: [GoStreamCmd[]]
}

export interface goStreamSocketOptions {
	address: string
	port: number
	/** default 2000 */
	reconnect_interval?: number
	/** default true */
	reconnect?: boolean
}

function PackData(data: Buffer): Buffer {
	const packetLen = data.length + 7
	const packet = Buffer.alloc(packetLen)

	packet[0] = HEAD1
	packet[1] = HEAD2
	packet[2] = ProType
	packet.writeUInt16LE(packetLen - 5, 3)

	if (data != undefined) data.copy(packet, 5, 0, data.length)
	packet.writeUInt16LE(crc16modbus(packet.subarray(0, packetLen - 2)), packet.length - 2)
	return packet
}

export class BasicStreamDeck extends EventEmitter<StreamSocketEvents> {
	private _tcp: TCPHelper | null
	private _state: StreamDeckState | undefined
	// private _sentQueue: { [packetId: string]: SentPackets } = {}
	private _status: StreamDeckConnectionStatus

	constructor(options?: goStreamSocketOptions) {
		super()
		this._state = StateUtil.Create()
		this._status = StreamDeckConnectionStatus.CLOSED
		this._tcp = new TCPHelper(options?.address || ''
			, options?.port || DEFAULT_PORT,
			{ reconnect: options?.reconnect, reconnect_interval: options?.reconnect_interval }
		)

		this._tcp.on('status_change', (state, message) => {
			if (state === TcpStatus.Connecting) this._status = StreamDeckConnectionStatus.CONNECTING
			if (state === TcpStatus.Ok) this._status = StreamDeckConnectionStatus.CONNECTED
			if (state === TcpStatus.Disconnected) this._status = StreamDeckConnectionStatus.CLOSED
			if (state === TcpStatus.UnknownError) this._status = StreamDeckConnectionStatus.ERROR
			this.emit('status_change', this._status, message)
		})
		this._tcp.on('connect', () => {
			if (this._state && this._tcp) cmdUtil.Sync(this._state, this._tcp);
			console.log('connect.............tcp')
		})
		this._tcp.on('error', (err) => {
			this.emit('error', 'Socket connect error: ' + err);
			console.log('error.............tcp')
		})
		this._tcp.on('drain', () => {
			this.emit('debug', 'Socket drain')
			console.log('drain.............tcp')
		})
		this._tcp.on('end', () => {
			this._status = StreamDeckConnectionStatus.CLOSED
			this.emit('disconnect')
			this._state = undefined
			console.log('end.............tcp')
		})
		this._tcp.on('data', (data: GoStreamCmd[]) => {
			//更改状态
			this.emit('rec_data', data);
			if (this._state) {
				cmdUtil.Update(this._state, data);
				//判断是否更新完毕 按照命令先后顺序 so：
				if(this._state.initComplete){
					this.emit('connected');
				}
			}
		})
	}

	get status(): StreamDeckConnectionStatus {
		return this._status
	}

	get state(): Readonly<StreamDeckState> | undefined {
		return this._state
	}

	public async destroy(): Promise<void> {
		return this._tcp?.destroy()
	}

	protected async sendCommands(commands: GoStreamCmd[]): Promise<boolean> {
		if (this._tcp !== null) {
			const packedCmds: Buffer[] = []
			commands.forEach((cmd) => {
				const json = JSON.stringify(cmd)
				const buf = Buffer.from(json, 'utf-8')
				packedCmds.push(PackData(buf))
			})
			return this._tcp.send(Buffer.concat(packedCmds))
		}
		return false
	}

	protected async sendCommand(id: string, type: ReqType, value?: string | number | any[]): Promise<boolean> {
		if (this._tcp !== null) {
			const obj = { id: id, type: type, value: value }
			const json = JSON.stringify(obj)
			const bufs = Buffer.from(json, 'utf-8')
			const send_data = PackData(bufs)
			return this._tcp.send(send_data)
		}
		return false
	}

	public async connect(address: string, port?: number): Promise<void> {
		if(this._tcp) await this._tcp.connection(address, port);
	}
}

export class StreamDeck extends BasicStreamDeck {
	constructor(options?: goStreamSocketOptions) {
		super(options)
	}

	//Device
	public async setDeviceName(name:string): Promise<void> {
		await this.sendCommand(ID.Device.ActionId.DeviceName, ReqType.Set, [name])
	}


	//Effect
	public async setTransitionStyle(style:string): Promise<void> {
		await this.sendCommand(ID.Effect.ActionId.TransitionStyle, ReqType.Set, [style])
	}

	public async setAutoTransition(): Promise<void> {
		await this.sendCommand(ID.Effect.ActionId.AutoTransition, ReqType.Set)
	}

	public async setCutTransition(): Promise<void> {
		await this.sendCommand(ID.Effect.ActionId.CutTransition, ReqType.Set)
	}

	public async setFtbTransition(): Promise<void> {
		await this.sendCommand(ID.Effect.ActionId.Ftb, ReqType.Set)
	}

	public async changePVWIndex(s_id: sourceID): Promise<void> {
		await this.sendCommand(ID.Effect.ActionId.PvwIndex, ReqType.Set, [s_id])
	}

	public async changePGMIndex(s_id: sourceID): Promise<void> {
		await this.sendCommand(ID.Effect.ActionId.PgmIndex, ReqType.Set, [s_id])
	}

	public async setPrevEnabled(enable: number): Promise<void> {
		await this.sendCommand(ID.Effect.ActionId.PreviewTransition, ReqType.Set, [enable])
	}

	public async setStyleRate(style: EffectStyle,rate:number): Promise<void> {
		switch (style) {
			case EffectStyle.Mix:
				await this.sendCommand(ID.Effect.ActionId.TransitionMixRate, ReqType.Set, [rate])
				break;
			case EffectStyle.Dip:
				await this.sendCommand(ID.Effect.ActionId.TransitionDipRate, ReqType.Set, [rate])
				break;
			case EffectStyle.Wipe:
				await this.sendCommand(ID.Effect.ActionId.TransitionWipeRate, ReqType.Set, [rate])
				break;
			default:
				break;
		}
	}

	public async setTranstionDipFillSource(s_id:sourceID): Promise<void> {
		 await this.sendCommand(ID.Effect.ActionId.TransitionDipFillSource, ReqType.Set, [s_id])
	}

	public async setTransitionWipeDirection(direction:number): Promise<void> {
		 await this.sendCommand(ID.Effect.ActionId.TransitionWipeDirection, ReqType.Set, [direction])
	}

	public async setFtbRate(rate:number): Promise<void> {
		 await this.sendCommand(ID.Effect.ActionId.FtbRate, ReqType.Set, [rate])
	}
	public async setFtbAfvEnabled(enable:number): Promise<void> {
		 await this.sendCommand(ID.Effect.ActionId.FtbAfv, ReqType.Set, [enable])
	}

	public async setTransitionWipeXPosition(x:number): Promise<void> {
		 await this.sendCommand(ID.Effect.ActionId.TransitionWipeXPosition, ReqType.Set, [x])
	}
	public async setTransitionWipeYPosition(y:number): Promise<void> {
		 await this.sendCommand(ID.Effect.ActionId.TransitionWipeYPosition, ReqType.Set, [y])
	}

	public async setTransitionWipeSymmetry(symmetry:number): Promise<void> {
		 await this.sendCommand(ID.Effect.ActionId.TransitionWipeSymmetry, ReqType.Set, [symmetry])
	}

	public async setTransitionWipeSoftness(softness:number): Promise<void> {
		 await this.sendCommand(ID.Effect.ActionId.TransitionWipeSoftness, ReqType.Set, [softness])
	}

	public async setTransitionWipeBorder(border:number): Promise<void> {
		 await this.sendCommand(ID.Effect.ActionId.TransitionWipeBorder, ReqType.Set, [border])
	}

	public async setTransitionWipeFillSource(source_id:sourceID): Promise<void> {
		 await this.sendCommand(ID.Effect.ActionId.TransitionWipeFillSource, ReqType.Set, [source_id])
	}
	
	//AudioSwitching
	public async setAudioSwitchingEnabled(enable:number): Promise<void> {
		 await this.sendCommand(ID.AudioSwitch.ActionId.AutoSwitchingEnable, ReqType.Set, [enable])
	}

	public async setAudioSwitchingAudioSource(type:number,s_id:sourceID): Promise<void> {
		 await this.sendCommand(ID.AudioSwitch.ActionId.AutoSwitchingAudioSource, ReqType.Set, [type,s_id])
	}

	public async setAudioSwitchingAudioThreshold(type:number,threshold:number): Promise<void> {
		 await this.sendCommand(ID.AudioSwitch.ActionId.AutoSwitchingAudioThreshold, ReqType.Set, [type,threshold])
	}

	public async setAudioSwitchingVideoAMapping(s_id:sourceID): Promise<void> {
		 await this.sendCommand(ID.AudioSwitch.ActionId.AutoSwitchingVideoAMapping, ReqType.Set, [s_id])
	}

	public async setAudioSwitchingVideoBMapping(s_id:sourceID): Promise<void> {
		 await this.sendCommand(ID.AudioSwitch.ActionId.AutoSwitchingVideoBMapping, ReqType.Set, [s_id])
	}

	public async setAudioSwitchingVideoABMapping(s_id:sourceID): Promise<void> {
		 await this.sendCommand(ID.AudioSwitch.ActionId.AutoSwitchingVideoABMapping, ReqType.Set, [s_id])
	}

	public async setAutoSwitchingVideoSwitchingPeriod(period:string): Promise<void> {
		 await this.sendCommand(ID.AudioSwitch.ActionId.AutoSwitchingVideoSwitchingPeriod, ReqType.Set, [period])
	}

	public async setAutoSwitchingVideoABPriority(priority:string): Promise<void> {
		 await this.sendCommand(ID.AudioSwitch.ActionId.AutoSwitchingVideoABPriority, ReqType.Set, [priority])
	}
	
	//AudioMix
	public async setAudioMixerEnable(s_id:sourceID,enable:number): Promise<void> {
		 await this.sendCommand(ID.AudioMixer.ActionId.AudioMixerEnable, ReqType.Set, [s_id, enable])
	}

	public async setAudioMixerMicType(s_id:sourceID,type:number): Promise<void> {
		console.log("id:"+s_id+"--Type:"+type);
		await this.sendCommand(ID.AudioMixer.ActionId.AudioMixerMicType, ReqType.Set, [s_id, type])
	}
	public async setAudioMixerInput(s_id:sourceID,input:number): Promise<void> {
		 await this.sendCommand(ID.AudioMixer.ActionId.AudioMixerInput, ReqType.Set, [s_id, input])
	}

	public async setAudioMixerEffectEnable(s_id:sourceID,enable:number): Promise<void> {
		 await this.sendCommand(ID.AudioMixer.ActionId.AudioMixerEffectEnable, ReqType.Set, [s_id, enable])
	}

	public async setAudioMixerPanning(s_id:sourceID,panning:number): Promise<void> {
		 await this.sendCommand(ID.AudioMixer.ActionId.AudioMixerPanning, ReqType.Set, [s_id, panning])
	}

	public async setAudioMixerFader(s_id:sourceID,fader:number): Promise<void> {
		 await this.sendCommand(ID.AudioMixer.ActionId.AudioMixerFader, ReqType.Set, [s_id, fader])
	}

	public async setAudioMixerDelay(s_id:sourceID,delay:number): Promise<void> {
		 await this.sendCommand(ID.AudioMixer.ActionId.AudioMixerDelay, ReqType.Set, [s_id, delay])
	}

	public async setAudioMixerHPFEnable(s_id:sourceID,enable:number): Promise<void> {
		 await this.sendCommand(ID.AudioMixer.ActionId.AudioMixerHPFEnable, ReqType.Set, [s_id, enable])
	}

	public async setAudioMixerNoiseGateEnable(s_id:sourceID,enable:number): Promise<void> {
		 await this.sendCommand(ID.AudioMixer.ActionId.AudioMixerNoiseGateEnable, ReqType.Set, [s_id, enable])
	}

	public async setAudioMixerCompressorEnable(s_id:sourceID,enable:number): Promise<void> {
		 await this.sendCommand(ID.AudioMixer.ActionId.AudioMixerCompressorEnable, ReqType.Set, [s_id, enable])
	}

	public async setAudioMixerEQEnable(s_id:sourceID,enable:number): Promise<void> {
		 await this.sendCommand(ID.AudioMixer.ActionId.AudioMixerEQEnable, ReqType.Set, [s_id, enable])
	}
	public async setAudioMixerLimiterEnable(s_id:sourceID,enable:number): Promise<void> {
		 await this.sendCommand(ID.AudioMixer.ActionId.AudioMixerLimiterEnable, ReqType.Set, [s_id, enable])
	}
	public async setAudioMixerHeadphone(s_id:sourceID,level:number,opt_source:sourceID): Promise<void> {
		 await this.sendCommand(ID.AudioMixer.ActionId.AudioMixerHeadphone, ReqType.Set, [s_id,level, opt_source])
	}
	public async setAudioMixerSwitchType(type:number): Promise<void> {
		 await this.sendCommand(ID.AudioMixer.ActionId.AudioMixerSwitchType, ReqType.Set, [type])
	}

	//mutiSource
	public async setMultiSourceWindowEnable(win_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceWindowEnable, ReqType.Set, [win_id,enable])
	}
	public async setMultiSourceWindowSource(win_id:number,source_id:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceWindowSource, ReqType.Set, [win_id,source_id])
	}
	public async setMultiSourceWindowXPosition(win_id:number,X:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceWindowXPosition, ReqType.Set, [win_id,X])
	}
	public async setMultiSourceControlYPosition(Y:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceControlYPosition, ReqType.Set, [Y])
	}
	public async setMultiSourceWindowYPosition(id:number,Y:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceWindowYPosition, ReqType.Set, [id,Y])
	}
	public async setMultiSourceWindowSize(win_id:number,size:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceWindowSize, ReqType.Set, [win_id,size])
	}

	public async setMultiSourceWindowCropLeft(win_id:number,crop_left:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceWindowCropLeft, ReqType.Set, [win_id,crop_left])
	}

	public async setMultiSourceWindowCropRight(win_id:number,crop_right:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceWindowCropRight, ReqType.Set, [win_id,crop_right])
	}

	public async setMultiSourceWindowCropTop(win_id:number,crop_top:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceWindowCropTop, ReqType.Set, [win_id,crop_top])
	}
	public async setMultiSourceWindowCropBottom(win_id:number,crop_bottom:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceWindowCropBottom, ReqType.Set, [win_id,crop_bottom])
	}
	//4路
	
	public async setMultiSourceEnable(enable:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceEnable, ReqType.Set, [enable])
	}
	public async setMultiSourceKeySource(source_id:sourceID): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceKeySource, ReqType.Set, [source_id])
	}
	public async setMultiSourceFillSource(source_id:sourceID): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceFillSource, ReqType.Set, [source_id])
	}
	public async setMultiSourceControlStyle(style:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceControlStyle, ReqType.Set, [style])
	}
	public async setMultiSourceWindowCropEnable(id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceWindowCropEnable, ReqType.Set, [id,enable])
	}

	public async setMultiSourceWindowBorderWidth(id:number,width:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceWindowBorderWidth, ReqType.Set, [id,width])
	}
	public async setMultiSourceWindowBorderHue(id:number,hue:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceWindowBorderHue, ReqType.Set, [id,hue])
	}
	public async setMultiSourceWindowBorderSaturation(id:number,saturation:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceWindowBorderSaturation, ReqType.Set, [id,saturation])
	}
	public async setMultiSourceWindowBorderBrightness(id:number,brightness:number): Promise<void> {
		 await this.sendCommand(ID.MutiSource.ActionId.MultiSourceWindowBorderBrightness, ReqType.Set, [id,brightness])
	}

	

	//streamming
	public async setLiveStreamOutputEnable(stream_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.Stream.ActionId.LiveStreamOutputEnable, ReqType.Set, [stream_id,enable])
	}

	public async setLiveStreamOutputServiceName(stream_id:number,platformId:string): Promise<void> {
		 await this.sendCommand(ID.Stream.ActionId.LiveStreamOutputServiceName, ReqType.Set, [stream_id,platformId])
	}
	public async setLiveStreamOutputUrl(stream_id:number,url:string): Promise<void> {
		 await this.sendCommand(ID.Stream.ActionId.LiveStreamOutputUrl, ReqType.Set, [stream_id,url])
	}
	public async setLiveStreamOutputKey(stream_id:number,KeyId:string): Promise<void> {
		 await this.sendCommand(ID.Stream.ActionId.LiveStreamOutputKey, ReqType.Set, [stream_id,KeyId])
	}
	public async startOrStopLive(enable:number): Promise<void> {
		 await this.sendCommand(ID.Stream.ActionId.Live, ReqType.Set, [enable])
	}
	public async setLiveStreamOutputBitrate(quality:number): Promise<void> {
		 await this.sendCommand(ID.Stream.ActionId.LiveStreamOutputBitrate, ReqType.Set, [quality])
	}

	//Record
	public async stopRecord(): Promise<void> {
		 await this.sendCommand(ID.Record.ActionId.RecordStop, ReqType.Set)
	}

	//0：pgm录制，1：iso录制
	public async startRecord(opt:number): Promise<void> {
		 await this.sendCommand(ID.Record.ActionId.RecordStart, ReqType.Set,[opt])
	}
	
	public async setRecordFormat(format:string): Promise<void> {
		 await this.sendCommand(ID.Record.ActionId.RecordFormat, ReqType.Set,[format])
	}
	
	public async setRecordBitrate(bitrate:number): Promise<void> {
		 await this.sendCommand(ID.Record.ActionId.RecordBitrate, ReqType.Set,[bitrate])
	}

	public async setRecordISOChannel(source_id:sourceID,enable:number): Promise<void> {
		 await this.sendCommand(ID.Record.ActionId.RecordISOChannel, ReqType.Set,[source_id,enable])
	}

	//PlayBack
	public async setPlaybackMode(play_id:number,mode:string): Promise<void> {
		 await this.sendCommand(ID.PlayBack.ActionId.PlaybackMode, ReqType.Set,[play_id,mode])
	}
	public async setPlayPause(play_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.PlayBack.ActionId.PlayPause, ReqType.Set,[play_id,enable])
	}
	public async setPlayRepeat(play_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.PlayBack.ActionId.PlayRepeat, ReqType.Set,[play_id,enable])
	}
	
	//ColoBack
	public async setColorHue(source_id:sourceID,hub:number): Promise<void> {
		 await this.sendCommand(ID.ColorBack.ActionId.ColorHue, ReqType.Set,[source_id,hub])
	}

	public async setColorSaturation(source_id:sourceID,saturation:number): Promise<void> {
		 await this.sendCommand(ID.ColorBack.ActionId.ColorSaturation, ReqType.Set,[source_id,saturation])
	}

	public async setColorBrightness(source_id:sourceID,brightness:number): Promise<void> {
		 await this.sendCommand(ID.ColorBack.ActionId.ColorBrightness, ReqType.Set,[source_id,brightness])
	}

	//DSK
	public async setDskOnAir(key_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskOnAir, ReqType.Set,[key_id,enable])
	}

	public async setDskEnable(key_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskEnable, ReqType.Set,[key_id,enable])
	}

	public async setDskFillSource(key_id:number,fillSource:sourceID): Promise<void> {
		
		 await this.sendCommand(ID.DSK.ActionId.DskFillSource, ReqType.Set,[key_id,fillSource])
	}

	public async setDskKeySource(key_id:number,keySource:sourceID): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskKeySource, ReqType.Set,[key_id,keySource])
	}

	public async setDskMaskEnable(key_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskMaskEnable, ReqType.Set,[key_id,enable])
	}

	public async setDskMaskHStart(key_id:number,hStart:number): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskMaskHStart, ReqType.Set,[key_id,hStart])
	}

	public async setDskMaskHEnd(key_id:number,hEnd:number): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskMaskHEnd, ReqType.Set,[key_id,hEnd])
	}
	public async setDskMaskVStart(key_id:number,vStart:number): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskMaskVStart, ReqType.Set,[key_id,vStart])
	}
	public async setDskMaskVEnd(key_id:number,vEnd:number): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskMaskVEnd, ReqType.Set,[key_id,vEnd])
	}

	public async setDskPreMultipliedKey(key_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskPreMultipliedKey, ReqType.Set,[key_id,enable])
	}

	public async setDskClip(key_id:number,clip:number): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskClip, ReqType.Set,[key_id,clip])
	}

	public async setDskGain(key_id:number,gain:number): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskGain, ReqType.Set,[key_id,gain])
	}

	public async setDskInvert(key_id:number,invert:number): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskInvert, ReqType.Set,[key_id,invert])
	}


	public async setDskResize(key_id:number,resize:number): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskResize, ReqType.Set,[key_id,resize])
	}
	public async setDskSize(key_id:number,size:number): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskSize, ReqType.Set,[key_id,size])
	}
	public async setDskXPosition(key_id:number,x:number): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskXPosition, ReqType.Set,[key_id,x])
	}
	public async setDskYPosition(key_id:number,y:number): Promise<void> {
		 await this.sendCommand(ID.DSK.ActionId.DskYPosition, ReqType.Set,[key_id,y])
	}
	
	//mutiview
	public async setMultiViewLayout(style:number): Promise<void> {
		 await this.sendCommand(ID.MutiView.ActionId.MultiViewLayout, ReqType.Set,[style])
	}

	//macro
	public async setMacroRecordStart(macro_index:number,name:string,remark:string): Promise<void> {
		 await this.sendCommand(ID.Macro.ActionId.MacroRecordStart, ReqType.Set,[macro_index,name,remark])
	}

	public async setMacroRecordStop(): Promise<void> {
		 await this.sendCommand(ID.Macro.ActionId.MacroRecordStop, ReqType.Set)
	}
	
	public async setMacroInfo(macro_index:number,name:string,remark:string): Promise<void> {
		 await this.sendCommand(ID.Macro.ActionId.MacroInfo, ReqType.Set,[macro_index,name,remark])
	}

	public async RemoveMacro(macro_index:number): Promise<void> {
		 await this.sendCommand(ID.Macro.ActionId.RemoveMacro, ReqType.Set,[macro_index])
	}

	public async setMacroRunStart(macro_index:number): Promise<void> {
		 await this.sendCommand(ID.Macro.ActionId.MacroRunStart, ReqType.Set,[macro_index])
	}

	public async setMacroRunStop(): Promise<void> {
		 await this.sendCommand(ID.Macro.ActionId.MacroRunStop, ReqType.Set)
	}

	public async setMacroAddSleep(sleep:number): Promise<void> {
		 await this.sendCommand(ID.Macro.ActionId.MacroAddSleep, ReqType.Set,[sleep])
	}

	//#region  USK
	public async setKeyOnAir(key_id:number,enable:boolean): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.KeyOnAir, ReqType.Set,[key_id,enable])
	}
	public async setKeyEnable(key_id:number,enable:boolean): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.KeyEnable, ReqType.Set,[key_id,enable])
	}

	public async setKeyType(key_id:number,type:string): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.KeyType, ReqType.Set,[key_id,type])
	}

	//USK ChromaKey
	public async setChromaFillSource(key_id:number,source_id:sourceID): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaFillSource, ReqType.Set,[key_id,source_id])
	}

	public async setChromaMaskEnable(key_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaMaskEnable, ReqType.Set,[key_id,enable])
	}

	public async setChromaMaskHStart(key_id:number,hStart:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaMaskHStart, ReqType.Set,[key_id,hStart])
	}

	public async setChromaMaskHEnd(key_id:number,hEnd:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaMaskHEnd, ReqType.Set,[key_id,hEnd])
	}
	public async setChromaMaskVStart(key_id:number,vStart:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaMaskVStart, ReqType.Set,[key_id,vStart])
	}
	public async setChromaMaskVEnd(key_id:number,vEnd:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaMaskVEnd, ReqType.Set,[key_id,vEnd])
	}

	public async setChromaResize(key_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaResize, ReqType.Set,[key_id,enable])
	}

	public async setChromaSize(key_id:number,size:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaSize, ReqType.Set,[key_id,size])
	}

	public async setChromaXPosition(key_id:number,x:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaXPosition, ReqType.Set,[key_id,x])
	}

	public async setChromaYPosition(key_id:number,y:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaYPosition, ReqType.Set,[key_id,y])
	}

	public async setChromaSMPXPosition(key_id:number,x:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaSMPXPosition, ReqType.Set,[key_id,x])
	}
	public async setChromaSMPYPosition(key_id:number,y:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaSMPYPosition, ReqType.Set,[key_id,y])
	}

	public async setChromaSample(key_id:number,sample:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaSample, ReqType.Set,[key_id,sample])
	}

	public async setChromaForeground(key_id:number,foreground:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaForeground, ReqType.Set,[key_id,foreground])
	}

	public async setChromaBackground(key_id:number,background:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaBackground, ReqType.Set,[key_id,background])
	}

	public async setKeyEdge(key_id:number,edge:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.ChromaKeyEdge, ReqType.Set,[key_id,edge])
	}
	
	//USK LumaKey
	public async setLumaFillSource(key_id:number,source_id:sourceID): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.LumaFillSource, ReqType.Set,[key_id,source_id])
	}
	public async setLumaKeySource(key_id:number,source_id:sourceID): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.LumaKeySource, ReqType.Set,[key_id,source_id])
	}

	public async setLumaMaskEnable(key_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.LumaMaskEnable, ReqType.Set,[key_id,enable])
	}

	public async setLumaMaskHStart(key_id:number,hStart:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.LumaMaskHStart, ReqType.Set,[key_id,hStart])
	}

	public async setLumaMaskHEnd(key_id:number,hEnd:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.LumaMaskHEnd, ReqType.Set,[key_id,hEnd])
	}
	public async setLumaMaskVStart(key_id:number,vStart:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.LumaMaskVStart, ReqType.Set,[key_id,vStart])
	}
	public async setLumaMaskVEnd(key_id:number,vEnd:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.LumaMaskVEnd, ReqType.Set,[key_id,vEnd])
	}

	public async setLumaPreMultipliedKey(key_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.LumaPreMultipliedKey, ReqType.Set,[key_id,enable])
	}

	public async setLumaClip(key_id:number,clip:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.LumaClip, ReqType.Set,[key_id,clip])
	}
	
	public async setLumaGain(key_id:number,gain:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.LumaGain, ReqType.Set,[key_id,gain])
	}

	public async setLumaInvert(key_id:number,invert:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.LumaInvert, ReqType.Set,[key_id,invert])
	}
	
	public async setLumaResize(key_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.LumaResize, ReqType.Set,[key_id,enable])
	}

	public async setLumaSize(key_id:number,size:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.LumaSize, ReqType.Set,[key_id,size])
	}

	public async setLumaXPosition(key_id:number,x:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.LumaXPosition, ReqType.Set,[key_id,x])
	}

	public async setLumaYPosition(key_id:number,y:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.LumaYPosition, ReqType.Set,[key_id,y])
	}

	//USK PatternKey
	public async setPatternFillSource(key_id:number,source_id:sourceID): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PatternFillSource, ReqType.Set,[key_id,source_id])
	}

	public async setPatternWipeSize(key_id:number,size:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PatternWipeSize, ReqType.Set,[key_id,size])
	}

	public async setPatternMaskEnable(key_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PatternMaskEnable, ReqType.Set,[key_id,enable])
	}

	public async setPatternMaskHStart(key_id:number,hStart:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PatternMaskHStart, ReqType.Set,[key_id,hStart])
	}

	public async setPatternMaskHEnd(key_id:number,hEnd:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PatternMaskHEnd, ReqType.Set,[key_id,hEnd])
	}
	public async setPatternMaskVStart(key_id:number,vStart:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PatternMaskVStart, ReqType.Set,[key_id,vStart])
	}
	public async setPatternMaskVEnd(key_id:number,vEnd:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PatternMaskVEnd, ReqType.Set,[key_id,vEnd])
	}
	
	public async setPatternResize(key_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PatternResize, ReqType.Set,[key_id,enable])
	}

	public async setPatternSize(key_id:number,size:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PatternSize, ReqType.Set,[key_id,size])
	}

	public async setPatternXPosition(key_id:number,x:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PatternXPosition, ReqType.Set,[key_id,x])
	}

	public async setPatternYPosition(key_id:number,y:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PatternYPosition, ReqType.Set,[key_id,y])
	}

	//USK PipKey
	public async setPipFillSource(key_id:number,source_id:sourceID): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PipFillSource, ReqType.Set,[key_id,source_id])
	}

	public async setPipSize(key_id:number,size:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PipSize, ReqType.Set,[key_id,size])
	}

	public async setPipXPosition(key_id:number,x:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PipXPosition, ReqType.Set,[key_id,x])
	}

	public async setPipYPosition(key_id:number,y:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PipYPosition, ReqType.Set,[key_id,y])
	}

	public async setPipMaskEnable(key_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PipMaskEnable, ReqType.Set,[key_id,enable])
	}

	public async setPipMaskHStart(key_id:number,hStart:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PipMaskHStart, ReqType.Set,[key_id,hStart])
	}

	public async setPipMaskHEnd(key_id:number,hEnd:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PipMaskHEnd, ReqType.Set,[key_id,hEnd])
	}
	public async setPipMaskVStart(key_id:number,vStart:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PipMaskVStart, ReqType.Set,[key_id,vStart])
	}
	public async setPipMaskVEnd(key_id:number,vEnd:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PipMaskVEnd, ReqType.Set,[key_id,vEnd])
	}

	public async setPipBorderEnable(key_id:number,enable:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PipBorderEnable, ReqType.Set,[key_id,enable])
	}

	public async setPipBorderWidth(key_id:number,width:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PipBorderWidth, ReqType.Set,[key_id,width])
	}

	public async setPipBorderColorHue(key_id:number,hue:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PipBorderColorHue, ReqType.Set,[key_id,hue])
	}

	public async setPipBorderColorSaturation(key_id:number,saturation:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PipBorderColorSaturation, ReqType.Set,[key_id,saturation])
	}
	
	public async setPipBorderColorBrightness(key_id:number,brightness:number): Promise<void> {
		 await this.sendCommand(ID.USK.ActionId.PipBorderColorBrightness, ReqType.Set,[key_id,brightness])
	}
	
	//#endregion
	
	//MediaPlayer
	public async setMediaPlayer(media_id:number,type:string,source_index:number): Promise<void> {
		 await this.sendCommand(ID.Media.ActionId.MediaPlayer, ReqType.Set,[media_id,type,source_index])
	}

	public async setBrowser(source_index:number,url:string): Promise<void> {
		 await this.sendCommand(ID.Media.ActionId.Browser, ReqType.Set,[source_index,url])
	}
	
	//IOSetting
	public async setInputColorSpace(id:sourceID,colorSpace:string ): Promise<void> {
		 await this.sendCommand(ID.IOSetting.ActionId.ColorSpace, ReqType.Set,[id,colorSpace])
	}
	public async setOutPutColorSpace(outputID:number,colorSpace:string): Promise<void> {
		 await this.sendCommand(ID.IOSetting.ActionId.ColorSpace, ReqType.Set,[outputID,colorSpace])
	}	

	public async setInputMode(mode:number): Promise<void> {
		 await this.sendCommand(ID.IOSetting.ActionId.InputMode, ReqType.Set,[mode])
	}
	
	public async setOutSource(outputID:number,source_id:number): Promise<void> {
		 await this.sendCommand(ID.IOSetting.ActionId.OutSource, ReqType.Set,[outputID,source_id])
	}
	
	public async setAudioMixerOutSource(outputID:number,source_id:number): Promise<void> {
		 await this.sendCommand(ID.IOSetting.ActionId.AudioMixerOutSource, ReqType.Set,[outputID,source_id])
	}
	public async setOutFormat(format:string): Promise<void> {
		 await this.sendCommand(ID.IOSetting.ActionId.OutFormat, ReqType.Set,[format])
	}
}