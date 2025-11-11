import { ActionId } from "../actionids/multiSourceActionId";
import { Model, MultiSourceControlStyle, ReqType, sourceID } from "../enums";
import { TCPHelper } from "../libs/tcp";
import { StreamDeckState } from "../state";
import { GoStreamCmd } from "../streamdeck";

function create(state: StreamDeckState,index:number){
    if(state.device.deviceModel === Model.Duet_8ISO){
        state.mutiSource.eightWins[index]={
            enable: false,
            selectSource:sourceID.IN1,
            x:0,
            y:0,
            size:0,
            cropLeft:0,
            cropTop:0,
            cropRight:0,
            cropBottom:0,
        }
    }else{
        state.mutiSource.control={
            style:MultiSourceControlStyle.crop,
            y:0
        }
        state.mutiSource.enable=false,
        state.mutiSource.fourWins[index]={
            cropEnable: false,
            cropLeft:0,
            cropTop:0,
            cropRight:0,
            cropBottom:0,
            borderWidth:0,
            hue:0,
            saturation:0,
            brightness:0
        }
    }
}

export async function sync(state: StreamDeckState, tcp: TCPHelper): Promise<boolean> {
    const cmds: GoStreamCmd[] = [{ id: ActionId.MultiSourceWindowSourceList, type: ReqType.Get }];
    if(state.device.deviceModel === Model.Duet_8ISO){
        for (let index = 0; index < state.device.multiSourceWindowCount; index++) {
            create(state,index);
            cmds.push({ id: ActionId.MultiSourceWindowEnable, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.MultiSourceWindowSource, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.MultiSourceWindowXPosition, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.MultiSourceWindowYPosition, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.MultiSourceWindowSize, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.MultiSourceWindowCropLeft, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.MultiSourceWindowCropRight, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.MultiSourceWindowCropTop, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.MultiSourceWindowCropBottom, type: ReqType.Get, value: [index] });
        }
    }else{
        cmds.push({ id: ActionId.MultiSourceEnable, type: ReqType.Get });
        cmds.push({ id: ActionId.MultiSourceFillSourceList, type: ReqType.Get });
        cmds.push({ id: ActionId.MultiSourceKeySourceList, type: ReqType.Get });
        cmds.push({ id: ActionId.MultiSourceControlStyle, type: ReqType.Get });
        cmds.push({ id: ActionId.MultiSourceWindowYPosition, type: ReqType.Get });

        for (let index = 0; index < state.device.multiSourceWindowCount; index++) {
            create(state,index);
            cmds.push({ id: ActionId.MultiSourceWindowCropEnable, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.MultiSourceWindowCropLeft, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.MultiSourceWindowCropRight, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.MultiSourceWindowCropTop, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.MultiSourceWindowCropBottom, type: ReqType.Get, value: [index] });

            cmds.push({ id: ActionId.MultiSourceWindowBorderWidth, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.MultiSourceWindowBorderHue, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.MultiSourceWindowBorderSaturation, type: ReqType.Get, value: [index] });
            cmds.push({ id: ActionId.MultiSourceWindowBorderBrightness, type: ReqType.Get, value: [index] });
        }
    }
    return await tcp.sendCommands(cmds)
}
export function update(state: StreamDeckState, data: GoStreamCmd): boolean {
    let index = Number(data.value![0]);
    let win_8 =  state.mutiSource.eightWins[index];
    let win_4 =  state.mutiSource.fourWins[index];
    switch (data.id as ActionId) {
        case ActionId.MultiSourceWindowSourceList:
            var str = String(data.value)
            state.mutiSource.multiSourceWindowsSources = str ? str.split(',').map(Number) : []
            break;
        case ActionId.MultiSourceEnable:
            state.mutiSource.enable = Boolean(data.value![0]);
            break;
        case ActionId.MultiSourceFillSourceList:
            var str = String(data.value)
            state.mutiSource.fillSources= str ? str.split(',').map(Number) : []
            break;
        case ActionId.MultiSourceKeySourceList:
            var str = String(data.value)
            state.mutiSource.keySources= str ? str.split(',').map(Number) : []
            break;
         case ActionId.MultiSourceControlStyle:
            if(state.mutiSource.control) state.mutiSource.control.style= index
            break;
        case ActionId.MultiSourceWindowEnable:
            if (win_8) win_8.enable = Boolean(data.value![1]);
            break;
        case ActionId.MultiSourceWindowSource:
            if(state.device.deviceModel===Model.Duet_8ISO){
                if (win_8) win_8.selectSource = Number(data.value![1]);
            }else{
                if(state.mutiSource.control) state.mutiSource.control.y = index
            }
            break;
        case ActionId.MultiSourceWindowXPosition:
            if (win_8) win_8.x = Number(data.value![1]);
            break;
        case ActionId.MultiSourceWindowYPosition:
            if (win_8) win_8.y = Number(data.value![1]);
            break;
        case ActionId.MultiSourceWindowSize:
            if (win_8) win_8.size = Number(data.value![1]);
            break;
        case ActionId.MultiSourceWindowCropLeft:
            if(state.device.deviceModel===Model.Duet_8ISO){
                if (win_8) win_8.cropLeft = Number(data.value![1]);
            }else{
                if (win_4) win_4.cropLeft = Number(data.value![1]);
            }
            break;
        case ActionId.MultiSourceWindowCropRight:
            if(state.device.deviceModel===Model.Duet_8ISO){
                if (win_8) win_8.cropRight = Number(data.value![1]);
            }else{
                if (win_4) win_4.cropRight = Number(data.value![1]);
            }
            break;
        case ActionId.MultiSourceWindowCropTop:
            if(state.device.deviceModel===Model.Duet_8ISO){
                if (win_8) win_8.cropTop = Number(data.value![1]);
            }else{
                if (win_4) win_4.cropTop = Number(data.value![1]);
            }
            break;
        case ActionId.MultiSourceWindowCropBottom:
            if(state.device.deviceModel===Model.Duet_8ISO){
                if (win_8) win_8.cropBottom = Number(data.value![1]);
            }else{
                if (win_4) win_4.cropBottom = Number(data.value![1]);
            }
            break;
        case ActionId.MultiSourceWindowCropEnable:
            if (win_4) win_4.cropEnable = Boolean(data.value![1]);
            break;

        case ActionId.MultiSourceWindowBorderWidth:
            if (win_4) win_4.borderWidth = Number(data.value![1]);
            break;
        case ActionId.MultiSourceWindowBorderHue:
            if (win_4) win_4.hue = Number(data.value![1]);
            break;
        case ActionId.MultiSourceWindowBorderSaturation:
            if (win_4) win_4.saturation = Number(data.value![1]);
            break;
        case ActionId.MultiSourceWindowBorderBrightness:
            if (win_4) win_4.brightness = Number(data.value![1]);
            break;
    }
    return false
}