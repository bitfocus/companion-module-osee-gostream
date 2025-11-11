import { AfvState, sourceID } from "../enums";
import { ActionId } from "../actionids/audioMixerActionId";
import { ReqType } from "../enums";
import { TCPHelper } from "../libs/tcp";
import { GoStreamCmd } from "../streamdeck";
import { StreamDeckState } from "../state";

function createCommon(state: StreamDeckState, source_id: sourceID) {
    state.audioMixer.commonChannels[source_id] = {
        audioMixerEffectEnable: false, lowCutEnable: false,
        audioMixerEnable: AfvState.off,
        noiseGateEnable: false,
        compressorEnable: false,
        EQEnable: false,
        PGMLimiterEnable: false,
    };
}
function createMic(state: StreamDeckState, source_id: sourceID) {
    state.audioMixer.micChannels[source_id] = {
        micType: 0,
        micTypeRange:[],
        inputRange:[],
        input:0,
        delay:0,
    };
}

export async function sync(state: StreamDeckState, tcp: TCPHelper): Promise<boolean> {
    const cmds: GoStreamCmd[] = [
        { id: ActionId.AudioMixerSwitchType, type: ReqType.Get },
        { id: ActionId.AudioMixerHeadphoneSourceList, type: ReqType.Get },
    ]

    for (const source_id of state.device.audioMixSources) {
        cmds.push({ id: ActionId.AudioMixerCompressorEnable, type: ReqType.Get, value: [source_id] });
        cmds.push({ id: ActionId.AudioMixerEffectEnable, type: ReqType.Get, value: [source_id] });
        cmds.push({ id: ActionId.AudioMixerEnable, type: ReqType.Get, value: [source_id] });
        cmds.push({ id: ActionId.AudioMixerHPFEnable, type: ReqType.Get, value: [source_id] });
        cmds.push({ id: ActionId.AudioMixerNoiseGateEnable, type: ReqType.Get, value: [source_id] });
        cmds.push({ id: ActionId.AudioMixerEQEnable, type: ReqType.Get, value: [source_id] });
        cmds.push({ id: ActionId.AudioMixerLimiterEnable, type: ReqType.Get, value: [source_id] });
        createCommon(state, source_id);
    }

    for (const source_id of state.device.micSources) {
        cmds.push({ id: ActionId.AudioMixerMicTypeList, type: ReqType.Get , value: [source_id] });
        cmds.push({ id: ActionId.AudioMixerMicType, type: ReqType.Get , value: [source_id] });
        cmds.push({ id: ActionId.AudioMixerInput, type: ReqType.Get , value: [source_id] });
        cmds.push({ id: ActionId.AudioMixerDelay, type: ReqType.Get , value: [source_id] });
        createMic(state,source_id)
    }
    return await tcp.sendCommands(cmds)
}

export function update(state: StreamDeckState, data: GoStreamCmd): boolean {
    console.log(data)
    if (!data.value) return false
    let source_id = Number(data.value![0]);
    let channel = state.audioMixer.commonChannels[source_id];
    switch (data.id as ActionId) {
        case ActionId.AudioMixerEnable:
            if (channel) channel.audioMixerEnable = Number(data.value![1]);
            break;
        case ActionId.AudioMixerCompressor:
            if (channel) channel.compressorEnable = Boolean(data.value![1]);
            break;
        case ActionId.AudioMixerEffectEnable:
            if (channel) channel.audioMixerEffectEnable = Boolean(data.value![1]);
            break;
        case ActionId.AudioMixerHPF:
            if (channel) channel.lowCutEnable = Boolean(data.value![1]);
            break;
        case ActionId.AudioMixerNoiseGate:
            if (channel) channel.noiseGateEnable = Boolean(data.value![1]);
            break;
        case ActionId.AudioMixerEQEnable:
            if (channel) channel.EQEnable = Boolean(data.value![1]);
            break;
        case ActionId.AudioMixerLimiter:
            if (channel) channel.PGMLimiterEnable = Boolean(data.value![1]);
            break;
        case ActionId.AudioMixerSwitchType:
            state.audioMixer.audioFade = Number(data.value![0]);
            break;
        case ActionId.AudioMixerHeadphoneSourceList:
            var str = String(data.value)
            state.audioMixer.HeadphoneSources = str ? str.split(',').map(Number) : []
            break;
        case ActionId.AudioMixerMicTypeList:
            var data_info = data.value as any[]
            var s_id = data_info.shift();
            var mic = s_id? state.audioMixer.micChannels[s_id]:undefined
            if (mic) mic.micTypeRange = data_info;
            break;
        case ActionId.AudioMixerMicType:
            var mic = state.audioMixer.micChannels[source_id];
            if(mic) mic.micType= Number(data.value![1]);
            break;
        case ActionId.AudioMixerInput:
            var mic = state.audioMixer.micChannels[source_id];
            if(mic) mic.input= Number(data.value![1]);
            break;
        case ActionId.AudioMixerDelay:
            var mic = state.audioMixer.micChannels[source_id];
            if(mic) mic.delay= Number(data.value![1]);
            break;
    }
    return false
}