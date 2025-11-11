import { ActionId } from "../actionids/ioActionId";
import { ReqType, sourceID } from "../enums";
import { TCPHelper } from "../libs/tcp";
import { StreamDeckState } from "../state";
import { GoStreamCmd } from "../streamdeck";


export async function sync(state: StreamDeckState, tcp: TCPHelper): Promise<boolean> {
    const cmds: GoStreamCmd[] = [
        { id: ActionId.InputMode, type: ReqType.Get },
        { id: ActionId.OutFormat, type: ReqType.Get },
        { id: ActionId.AudioMixerOutSourceRange, type: ReqType.Get },
        { id: ActionId.OutFormatList, type: ReqType.Get },
        // { id: ActionId.ColorSpace, type: ReqType.Get }
    ]
    for (const source_id of state.device.VideoOutSources) {
        cmds.push({ id: ActionId.OutSourceRange, type: ReqType.Get, value: [source_id] });
    }
    return await tcp.sendCommands(cmds)
}
export function update(state: StreamDeckState, data: GoStreamCmd): boolean {
    switch (data.id as ActionId) {
        case ActionId.InputMode:
            state.intputSetting.inputMode = Number(data.value![0]);
            break
        case ActionId.OutFormat:
            state.outputSetting.outFormat = String(data.value![0]);
            break
        case ActionId.OutSourceRange:
            var data_info = data.value as sourceID[]
            var s_id = data_info.shift();
            if (s_id) state.outputSetting.videoSourcesRange[s_id] = data_info;
            break
        case ActionId.AudioMixerOutSourceRange:
            state.outputSetting.audioSourcesRange = data.value as sourceID[]
            break
        case ActionId.ColorSpace:
            break
        case ActionId.OutFormatList:
            state.outputSetting.outFormatRange = data.value as string[]
            break;
    }
    return false
}