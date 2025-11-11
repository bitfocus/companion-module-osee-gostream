import { ActionId } from "../actionids/streamActionId";
import { LiveStatus, ReqType } from "../enums";
import { TCPHelper } from "../libs/tcp";
import { StreamDeckState } from "../state";
import { GoStreamCmd } from "../streamdeck";

function create(state: StreamDeckState,index:number){
    state.stream.streamInfos[index]={
        enabled: false,
        status: LiveStatus.Off,
        platform: '',
        url:'',
        key:'',
    }
}

export async function sync(state: StreamDeckState, tcp: TCPHelper): Promise<boolean> {

    const cmds: GoStreamCmd[] = [
        { id: ActionId.LiveStreamOutputProfile, type: ReqType.Get },
    ];
    for (let index = 0; index < state.device.streamCount; index++) {
        create(state,index);
        cmds.push({ id: ActionId.LiveStreamOutputEnable, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LiveStreamOutputKey, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LiveStreamOutputServiceName, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LiveStreamOutputStatus, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LiveStreamOutputUrl, type: ReqType.Get, value: [index] });
    }
    cmds.push({id: ActionId.LiveStreamOutputBitrate, type: ReqType.Get });
    return await tcp.sendCommands(cmds)
}

export function update(state: StreamDeckState, data: GoStreamCmd): boolean {
    switch (data.id as ActionId) {
        case ActionId.LiveStreamOutputBitrate:
            state.stream.quality = Number(data.value![0])
            //因为LiveStreamOutputBitrate 为最后一条指令，所以暂且认为接收到次消息认为是接收完毕
            state.initComplete = true;  
            break
        case ActionId.LiveStreamOutputProfile: {
            const arrData: any[] = data.value as any[]
            arrData.forEach(() => {
                for (let index = 0; index < 3; index++) {
                    const name = arrData.shift()
                    const server = arrData.shift()
                    const url = arrData.shift()
                    var info = state.stream.platforms.find(s => s.name === name);
                    if (info != undefined) {
                        info.servers.push({ serName: server, url: url })
                    } else {
                        state.stream.platforms.push({ name: name, servers: [{ serName: server, url: url }] });
                    }
                }
            })
            return true
        }
        case ActionId.LiveStreamOutputEnable:
            var index = Number(data.value![0]);
            var info = state.stream.streamInfos[index];
            if (info) info.enabled = Boolean(data.value![1])
            break
        case ActionId.LiveStreamOutputServiceName:
            var index = Number(data.value![0]);
            var info = state.stream.streamInfos[index];
            if (info) info.platform = String(data.value![1])
            break;
        case ActionId.LiveStreamOutputUrl:
            var index = Number(data.value![0]);
            var info = state.stream.streamInfos[index];
            if (info) info.url = String(data.value![1])
            
            break;
        case ActionId.LiveStreamOutputStatus:
            // 1 indicates stream
            var index = Number(data.value![0]);
            var info = state.stream.streamInfos[index];
            if (info) {
                info.status = Number(data.value![1])
                if (state.stream.streamInfos[0]?.status === LiveStatus.On &&
                    state.stream.streamInfos[1]?.status === LiveStatus.On &&
                    state.stream.streamInfos[2]?.status === LiveStatus.On) {
                    state.stream.status = LiveStatus.On
                } else if (state.stream.streamInfos[0]?.status === LiveStatus.Off
                    && state.stream.streamInfos[1]?.status === LiveStatus.Off
                    && state.stream.streamInfos[2]?.status === LiveStatus.Off) {
                    state.stream.status = LiveStatus.Off
                } else {
                    state.stream.status = LiveStatus.Abnormal
                }
            }
            break
        case ActionId.LiveStreamOutputKey:
            // 1 indicates stream
            var index = Number(data.value![0]);
            var info = state.stream.streamInfos[index];
            if (info) info.key = String(data.value![1])
            break
    }
    return false
}
