import { ActionId } from "../actionids/colorBackActionId";
import { ReqType } from "../enums";
import { TCPHelper } from "../libs/tcp";
import { StreamDeckState } from "../state";
import { GoStreamCmd } from "../streamdeck";

function create(state: StreamDeckState, index: number) {
    state.colorBack.colorBacks[index] = {
        hue: 0,
        saturation: 0,
        brightness: 0,
    }
}

export async function sync(state: StreamDeckState, tcp: TCPHelper): Promise<boolean> {
    const cmds: GoStreamCmd[] = []
    if (state.device.colorBackCount > 0) {
        for (let index = 0; index < state.device.colorBackCount; index++) {
            cmds.push({ id: ActionId.ColorHue, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.ColorBrightness, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.ColorSaturation, type: ReqType.Get, value: [index] });
            create(state, index);
        }
    }
    return await tcp.sendCommands(cmds)
}

export function update(state: StreamDeckState, data: GoStreamCmd): boolean {
    if (!data.value) return false
    const index = Number(data.value![0])
    switch (data.id as ActionId) {
        case ActionId.ColorBrightness:
            var colorback = state.colorBack.colorBacks[index];
            if (colorback) colorback.brightness = Number(data.value![1])
            break;
        case ActionId.ColorHue:
            var colorback = state.colorBack.colorBacks[index];
            if (colorback) colorback.hue = Number(data.value![1])
            break;
        case ActionId.ColorSaturation:
            var colorback = state.colorBack.colorBacks[index];
            if (colorback) colorback.saturation = Number(data.value![1])
            break;
    }
    return true
}