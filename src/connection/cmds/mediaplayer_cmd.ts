import { ActionId } from "../actionids/mediaPlayerActionId";
import { ReqType, Model, meType } from "../enums";
import { TCPHelper } from "../libs/tcp";
import { StreamDeckState } from "../state";
import { GoStreamCmd } from "../streamdeck";

let maxStrillIndex = 0;
let maxBrowerIndex = 0;

function create(state: StreamDeckState) {
    for (let index = 0; index < state.device.mediaCount; index++) {
        state.media.mpTypes.push({ type: meType.Browser, selectIndex: 0 })
    }
    for (let index = 0; index < maxStrillIndex; index++) {
        state.media.mpStrills.push({
            index: index,
            path: '',
        });
    }
    for (let index = 0; index < maxBrowerIndex; index++) {
        state.media.mpBrowsers.push({
            index: index,
            url: '',
        });
    }
}

export async function sync(state: StreamDeckState, tcp: TCPHelper): Promise<boolean> {
    if (state.device.deviceModel === Model.Duet_8ISO) {
        maxStrillIndex = 32;
        maxBrowerIndex = 1;
    } else {
        maxStrillIndex = 32;
        maxBrowerIndex = 0;
    }
    create(state);
    const cmds: GoStreamCmd[] = [
        { id: ActionId.MediaPlayer, type: ReqType.Get, value: [0] },
        { id: ActionId.MediaPlayer, type: ReqType.Get, value: [1] },
    ]
    for (let index = 0; index < maxStrillIndex; index++) {
        cmds.push({ id: ActionId.Still, type: ReqType.Get, value: [index] });
    }
    for (let index = 0; index < maxBrowerIndex; index++) {
        cmds.push({ id: ActionId.Browser, type: ReqType.Get, value: [index] });
    }
    return await tcp.sendCommands(cmds)
}

export function update(state: StreamDeckState, data: GoStreamCmd): boolean {
    switch (data.id as ActionId) {
        case ActionId.MediaPlayer:
            var id = Number(data.value![0]);
            state.media.mpTypes[id].type = Number(data.value![1]);
            state.media.mpTypes[id].selectIndex = Number(data.value![2]);
            break;
        case ActionId.Still:
            var index = Number(data.value![0]);
            state.media.mpStrills[index].path = String(data.value![1]);
            break;
        case ActionId.Browser:
            var index = Number(data.value![0]);
            state.media.mpBrowsers[index].url = String(data.value![1]);
            break;
    }
    return false
}