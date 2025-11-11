import { ActionId } from "../actionids/deviceActionId";
import { Model, ReqType, sourceID } from "../enums";
import { TCPHelper } from "../libs/tcp";
import { StreamDeckState } from "../state";
import { GoStreamCmd } from "../streamdeck";

export async function sync(_state: StreamDeckState, tcp: TCPHelper): Promise<boolean> {
    const cmds: GoStreamCmd[] = [
        { id: ActionId.BuildInfo, type: ReqType.Get },
        { id: ActionId.DeviceId, type: ReqType.Get },
        { id: ActionId.DeviceName, type: ReqType.Get },
        { id: ActionId.InputList, type: ReqType.Get },
        { id: ActionId.FWVersion, type: ReqType.Get },
        { id: ActionId.DeviceType, type: ReqType.Get },

        { id: ActionId.AudioMixerInputSourceList, type: ReqType.Get },

        { id: ActionId.MultiSourceWindowCount, type: ReqType.Get },

        { id: ActionId.KeyCount, type: ReqType.Get },

        { id: ActionId.DskCount, type: ReqType.Get },

        { id: ActionId.PlayCount, type: ReqType.Get },

        { id: ActionId.RecordISOChannelList, type: ReqType.Get },

        { id: ActionId.AudioOutSourceList, type: ReqType.Get },
        { id: ActionId.VideoOutSourceList, type: ReqType.Get },
    ]

    return await tcp.sendCommands(cmds)
}

export function update(state: StreamDeckState, data: GoStreamCmd): boolean {
    switch (data.id as ActionId) {
        case ActionId.BuildInfo:
            state.device.buildInfo = String(data.value![0]);
            break;
        case ActionId.DeviceId:
            state.device.deviceID = String(data.value![0]);
            break;
        case ActionId.DeviceName:
            state.device.deviceName = String(data.value![0]);
            break;
        case ActionId.FWVersion:
            state.device.fwVersion = String(data.value![0]);
            break;

        case ActionId.DeviceType:
            let model = Number(data.value![0]);
            //针对不同设备，区别源
            switch (model) {
                case 0:
                    state.device.deviceModel = Model.Deck
                    state.device.mediaCount = 2;
                    state.device.multiSourceWindowCount = 2;
                    state.device.playCount = 1;
                    state.device.OutPutColorSpaceSources = [21001, 21002];
                    state.device.InputColorSpaceSources = [1, 2, 3, 4];
                    state.outputSetting.colorSpaceRange = ["Auto", "RGB Full", "RGB Limit", "YC422 Full", "YC422 Limit", "YC444 Full", "YC444 Limit"];
                    break;
                case 1:
                    state.device.deviceModel = Model.Duet_SDI
                    state.device.mediaCount = 2;
                    state.device.multiSourceWindowCount = 2;
                    state.device.playCount = 1;
                    state.device.OutPutColorSpaceSources = [21001, 21002];
                    state.device.InputColorSpaceSources = [1, 2, 3, 4];
                    state.outputSetting.colorSpaceRange = ["Auto", "RGB Full", "RGB Limit", "YC422 Full", "YC422 Limit", "YC444 Full", "YC444 Limit"];
                    break;
                case 2:
                    state.device.deviceModel = Model.Dect_FANS
                    state.device.mediaCount = 2;
                    state.device.multiSourceWindowCount = 2;
                    state.device.playCount = 1;
                    state.device.OutPutColorSpaceSources = [21001, 21002];
                    state.device.InputColorSpaceSources = [1, 2, 3, 4];
                    state.outputSetting.colorSpaceRange = ["Auto", "RGB Full", "RGB Limit", "YC422 Full", "YC422 Limit", "YC444 Full", "YC444 Limit"];
                    break;
                case 3:
                    state.device.deviceModel = Model.Dect_PLUS
                    state.device.mediaCount = 2;
                    state.device.multiSourceWindowCount = 2;
                    state.device.playCount = 1;
                    state.device.OutPutColorSpaceSources = [21001, 21002];
                    state.device.InputColorSpaceSources = [1, 2, 3, 4];
                    state.outputSetting.colorSpaceRange = ["Auto", "RGB Full", "RGB Limit", "YC422 Full", "YC422 Limit", "YC444 Full", "YC444 Limit"];
                    break;
                case 10:
                    state.device.deviceModel = Model.Duet_8ISO
                    state.device.mediaCount = 2;
                    state.device.multiSourceWindowCount = 4;
                    state.device.playCount = 2;
                    state.device.OutPutColorSpaceSources = [21001, 21002];
                    state.device.InputColorSpaceSources = [1, 2, 3, 4];
                    state.outputSetting.colorSpaceRange = ["Auto", "RGB Full", "RGB Limit", "YC422 Full", "YC422 Limit", "YC444 Full", "YC444 Limit"];
                    break;
                default:
                    state.device.deviceModel = Model.Unknown
                    break;
            }
            state.device.colorBackCount = 2;
            state.device.streamCount = 3;
            state.device.micSources = [sourceID.MIC1, sourceID.MIC2]
            break;

        case ActionId.InputList:
            var str = String(data.value)
            state.device.inputSources = str ? str.split(',').map(Number) : []
            break;

        case ActionId.AudioMixerInputSourceList:
            var str = String(data.value)
            state.device.audioMixSources = str ? str.split(',').map(Number) : []
            break;

        case ActionId.MultiSourceWindowCount:
            state.device.multiSourceWindowCount = Number(data.value![0]);
            break;

        case ActionId.KeyCount:
            state.device.keyCount = Number(data.value![0]);
            break;
        case ActionId.DskCount:
            state.device.dskCount = Number(data.value![0]);
            break;

        case ActionId.PlayCount:
            state.device.playCount = Number(data.value![0]);
            break;

        case ActionId.RecordISOChannelList:
            var str = String(data.value)
            state.device.RecordISOChannels = str ? str.split(',').map(Number) : []
            break;

        case ActionId.AudioOutSourceList:
            var str = String(data.value)
            state.device.AudioOutSources = str ? str.split(',').map(Number) : []
            break;
        case ActionId.VideoOutSourceList:
            var str = String(data.value)
            state.device.VideoOutSources = str ? str.split(',').map(Number) : []
            break;

    }
    return false
}

