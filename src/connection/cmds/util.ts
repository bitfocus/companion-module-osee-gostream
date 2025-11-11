import { StreamDeckState } from "../state"
import { TCPHelper } from "../libs/tcp"
import * as Device from './device_cmd'
import * as AudioMixer from './audiomixer_cmd'
import * as AudioSwitch from './audioswitching_cmd'
import * as ColorBack from './colorback_cmd'
import * as DSK from './downstreamkey_cmd'
import * as Effect from './effect_cmd'
import * as IOSetting from './iosetting_cmd'
import * as Macro from './macro_cmd'
import * as Media from './mediaplayer_cmd'
import * as MutiSource from './multisource_cmd'
import * as MutiView from './mutiview_cmd'
import * as PlayBack from './palyback_cmd'
import * as Record from './record_cmd'
import * as Stream from './stream_cmd'
import * as USK from './upstreamkey_cmd'
import { GoStreamCmd } from "../streamdeck"


export async function Sync(state: StreamDeckState, tcp: TCPHelper): Promise<void> {
    await Device.sync(state, tcp);
    await new Promise((resolve) => setTimeout(resolve, 300)) //获取设备信息
    await AudioMixer.sync(state, tcp);
    await AudioSwitch.sync(state, tcp);
    await ColorBack.sync(state, tcp);
    await DSK.sync(state, tcp);
    await Effect.sync(state, tcp);
    await IOSetting.sync(state, tcp);
    await Macro.sync(state, tcp);
    await Media.sync(state, tcp);
    await MutiSource.sync(state, tcp);
    await MutiView.sync(state, tcp);
    await PlayBack.sync(state, tcp);
    await Record.sync(state, tcp);
    await USK.sync(state, tcp);
    await Stream.sync(state, tcp);
}

export function Update(state: StreamDeckState, datas: GoStreamCmd[]) {
    datas.forEach(data => {
        Device.update(state, data);
        AudioMixer.update(state, data);
        AudioSwitch.update(state, data);
        ColorBack.update(state, data);
        DSK.update(state, data);
        Effect.update(state, data);
        IOSetting.update(state, data);
        Macro.update(state, data);
        Media.update(state, data);
        MutiSource.update(state, data);
        MutiView.update(state, data);
        PlayBack.update(state, data);
        Record.update(state, data);
        USK.update(state, data);
        Stream.update(state, data);
    });
}