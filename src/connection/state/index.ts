import * as Device from './device'
import * as AudioMixer from './audiomixer'
import * as AudioSwitch from './audioswitching'
import * as ColorBack from './colorback'
import * as DSK from './downstreamkey'
import * as Effect from './effect'
import * as IOSetting from './iosetting'
import * as Macro from './macro'
import * as Media from './mediaplayer'
import * as MutiSource from './multisource'
import * as MutiView from './mutiview'
import * as PlayBack from './palyback'
import * as Record from './record'
import * as Stream from './stream'
import * as USK from './upstreamkey'
import * as StateUtil from './util'
export {
	Device,
	AudioMixer,
    AudioSwitch,
    ColorBack,
    DSK,
    Effect,
    IOSetting,
    Macro,
	Media,
    MutiSource,
    MutiView,
    PlayBack,
    Record,
    Stream,
    USK,
	StateUtil,
}
export interface StreamDeckState {
	device: Device.deviceInfoT
	audioMixer: AudioMixer.AudioMixerStateT
	audioSwitching: AudioSwitch.AutoSwitchingStateT
	colorBack: ColorBack.ColorBackStateT
	downStreamKey:DSK.DSKStateT
	effect: Effect.EffectStateT
    intputSetting:IOSetting.inputStateT
    outputSetting:IOSetting.OutPutStateT
	macro: Macro.MacroStateT
	media: Media.mediaT
	mutiSource: MutiSource.MultiSourceStateT
	mutiView: MutiView.MutiViewStateT
	playBack: PlayBack.PlaybackStateT
    record:Record.RecordT
    upStreamKey:USK.KeyerStateT
	stream:Stream.StreamingStateT
	initComplete:boolean
}

export class InvalidIdError extends Error {
	constructor(message: string, ...ids: Array<number | string>) {
		super(InvalidIdError.BuildErrorString(message, ids))
		Object.setPrototypeOf(this, new.target.prototype)
	}

	private static BuildErrorString(message: string, ids: Array<number | string>): string {
		if (ids && ids.length > 0) {
			return `${message} ${ids.join('-')} is not valid`
		} else {
			return message
		}
	}
}