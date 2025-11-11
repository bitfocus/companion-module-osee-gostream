import { ActionId } from "../actionids/autoSwitchingActionId";
import { ReqType, sourceID } from "../enums";
import { TCPHelper } from "../libs/tcp";
import { GoStreamCmd } from "../streamdeck";
import { StreamDeckState } from "../state";


// function create(state: StreamDeckState){
//     state.audioSwitching = {
//         enable: false,
//         ASources: [],
//         BSources: [],
//         AMapSources: [],
//         BMapSources: [],
//         ABMapSources: [],
//         A: {
//             selectSource: sourceID.IN1,
//             threshold: 0
//         },
//         B: {
//             selectSource: sourceID.IN1,
//             threshold: 0
//         },
//         video:{
//             AMapSelectSource: sourceID.IN1,
//             BMapSelectSource: sourceID.IN1,
//             ABMapSelectSource: sourceID.IN1,
//             Period: Period.Normal,
//             ABPriority: Priority.Balance,
//         }
//     };
// }

export async function sync(_state: StreamDeckState, tcp: TCPHelper): Promise<boolean> {
    // create(state);
    const cmds: GoStreamCmd[] = [
        { id: ActionId.AutoSwitchingEnable, type: ReqType.Get },
        { id: ActionId.AutoSwitchingAudioAList, type: ReqType.Get },
        { id: ActionId.AutoSwitchingAudioBList, type: ReqType.Get },
        { id: ActionId.AutoSwitchingAudio, type: ReqType.Get },

        { id: ActionId.AutoSwitchingVideoAMapList, type: ReqType.Get },
        { id: ActionId.AutoSwitchingVideoBMapList, type: ReqType.Get },
        { id: ActionId.AutoSwitchingVideoABMapList, type: ReqType.Get },
        { id: ActionId.AutoSwitchingVideo, type: ReqType.Get },
    ]

    return await tcp.sendCommands(cmds)
}
export function update(state: StreamDeckState, data: GoStreamCmd): boolean {
    switch (data.id as ActionId) {
        case ActionId.AutoSwitchingEnable:
            state.audioSwitching.enable = Boolean(data.value![0])
            break;
        case ActionId.AutoSwitchingAudioAList:
            state.audioSwitching.ASources = data.value as sourceID[]
            break;
        case ActionId.AutoSwitchingAudioBList:
            state.audioSwitching.BSources = data.value as sourceID[]
            break;
        case ActionId.AutoSwitchingVideoAMapList:
            state.audioSwitching.AMapSources = data.value as sourceID[]
            break;
        case ActionId.AutoSwitchingVideoBMapList:
            state.audioSwitching.BMapSources = data.value as sourceID[]
            break;
        case ActionId.AutoSwitchingVideoABMapList:
            state.audioSwitching.ABMapSources = data.value as sourceID[]
            break;
    }
    return false
}