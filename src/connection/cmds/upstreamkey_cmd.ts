import { ActionId } from "../actionids/uskActionId";
import { ReqType, USKKeyTypes } from "../enums";
import { TCPHelper } from "../libs/tcp";
import { StreamDeckState } from "../state";
import { GoStreamCmd } from "../streamdeck";

function create(state: StreamDeckState, index: number) {
    state.upStreamKey.USKS[index] = {
        enabled: false,
        onAir: false,
        keyType: USKKeyTypes.Chroma,
        Luma: {
            slectSource: [0, 0],
            maskInfo: {
                enabled: false,
                hStart: 0,
                hEnd: 0,
                vStart: 0,
                vEnd: 0,
            },
            keyControl: {
                lumaPreMultipliedKey: false,
                clip: 0,
                gain: 0,
                invert: false
            },
            size: {
                enable: false,
                x: 0,
                y: 0,
                size: 0
            }
        },
        Chroma: {
            slectSource: [0, 0],
            maskInfo: {
                enabled: false,
                hStart: 0,
                hEnd: 0,
                vStart: 0,
                vEnd: 0,
            },
            control: {
                SMPX: 0,
                SMPY: 0,
                sample: false,
                currentColor: 0,
                foreground: 0,
                background: 0,
                keyEdge: 0,
            },
            size: {
                enable: false,
                x: 0,
                y: 0,
                size: 0
            }
        },
        Pattern: {
            slectSource: [0, 0],
            maskInfo: {
                enabled: false,
                hStart: 0,
                hEnd: 0,
                vStart: 0,
                vEnd: 0,
            },
            size: {
                enable: false,
                x: 0,
                y: 0,
                size: 0
            },
            wipe: {
                selectWipeIndex: 0,
                size: 0,
            }
        },
        pip: {
            slectSource: [0, 0],
            maskInfo: {
                enabled: false,
                hStart: 0,
                hEnd: 0,
                vStart: 0,
                vEnd: 0,
            },
            size: {
                enable: false,
                x: 0,
                y: 0,
                size: 0
            },
            border: {
                enable: false,
                width: 0,
                hue: 0,
                saturation: 0,
                brightness: 0,
            }
        }
    }
}
export async function sync(state: StreamDeckState, tcp: TCPHelper): Promise<boolean> {
    const cmds: GoStreamCmd[] = [
        { id: ActionId.LumaFillSourceList, type: ReqType.Get },
        { id: ActionId.LumaKeySourceList, type: ReqType.Get },
        { id: ActionId.ChromaFillSourceList, type: ReqType.Get },
        { id: ActionId.PatternFillSourceList, type: ReqType.Get },
        { id: ActionId.PipFillSourceList, type: ReqType.Get },
        { id: ActionId.PatternWipeList, type: ReqType.Get },
    ]
    for (let index = 0; index < state.device.keyCount; index++) {
        create(state, index);
        cmds.push({ id: ActionId.KeyEnable, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.KeyType, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.KeyOnAir, type: ReqType.Get, value: [index] });
        //LumaKey
        cmds.push({ id: ActionId.LumaFillSource, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LumaKeySource, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LumaMaskEnable, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LumaMaskHStart, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LumaMaskVStart, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LumaMaskHEnd, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LumaMaskVEnd, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LumaPreMultipliedKey, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LumaClip, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LumaGain, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LumaResize, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LumaSize, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LumaXPosition, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.LumaYPosition, type: ReqType.Get, value: [index] });

        //Chroma
        cmds.push({ id: ActionId.ChromaFillSource, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaMaskEnable, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaMaskHStart, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaMaskVStart, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaMaskHEnd, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaMaskVEnd, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaResize, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaSize, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaXPosition, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaYPosition, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaSMPXPosition, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaSMPYPosition, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaSample, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaCurrentColor, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaForeground, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaBackground, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.ChromaKeyEdge, type: ReqType.Get, value: [index] });
        //Pattern
        cmds.push({ id: ActionId.PatternFillSource, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PatternWipeIndex, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PatternWipeSize, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PatternMaskEnable, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PatternMaskHStart, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PatternMaskVStart, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PatternMaskHEnd, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PatternMaskVEnd, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PatternResize, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PatternSize, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PatternXPosition, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PatternYPosition, type: ReqType.Get, value: [index] });
        //Pip
        cmds.push({ id: ActionId.PipFillSource, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PipMaskEnable, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PipMaskHStart, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PipMaskVStart, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PipMaskHEnd, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PipMaskVEnd, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PipSize, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PipXPosition, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PipYPosition, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PipBorderEnable, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PipBorderWidth, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PipBorderColorHue, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PipBorderColorSaturation, type: ReqType.Get, value: [index] });
        cmds.push({ id: ActionId.PipBorderColorBrightness, type: ReqType.Get, value: [index] });

    }
    return tcp.sendCommands(cmds)
}
export function update(state: StreamDeckState, data: GoStreamCmd): boolean {
    switch (data.id as ActionId) {
        case ActionId.LumaFillSourceList:
            var str = String(data.value)
            state.upStreamKey.LumaFillSources = str ? str.split(',').map(Number) : []
            break;
        case ActionId.LumaKeySourceList:
            var str = String(data.value)
            state.upStreamKey.LumaKeySources = str ? str.split(',').map(Number) : []
            break;
        case ActionId.ChromaFillSourceList:
            var str = String(data.value)
            state.upStreamKey.ChromaFillSource = str ? str.split(',').map(Number) : []
            break;
        case ActionId.PatternFillSourceList:
            var str = String(data.value)
            state.upStreamKey.PatternFillSource = str ? str.split(',').map(Number) : []
            break;
        case ActionId.PipFillSourceList:
            var str = String(data.value)
            state.upStreamKey.PipFileSource = str ? str.split(',').map(Number) : []
            break;
        case ActionId.PatternWipeList:
            var str = String(data.value)
            state.upStreamKey.PatternWipes = str ? str.split(',').map(String) : []
            break;
        case ActionId.KeyEnable:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.enabled = Boolean(data.value![1])
            break;
        case ActionId.KeyType: {
            var index = Number(data.value![0])
            var value = String(data.value![1])
            var usk = state.upStreamKey.USKS[index];
            switch (value) {
                case "Luma":
                default:
                    if (usk) usk.keyType = USKKeyTypes.Luma;
                    break;
                case "Chroma":
                    if (usk) usk.keyType = USKKeyTypes.Chroma;
                    break;
                case "Pattern":
                    if (usk) usk.keyType = USKKeyTypes.Pattern;
                    break;
                case "PIP":
                    if (usk) usk.keyType = USKKeyTypes.Pip;
                    break;
            }
            break;
        }
        case ActionId.KeyOnAir:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.onAir = Boolean(data.value![1])
            break;
        //Luma
        case ActionId.LumaFillSource:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Luma.slectSource[0] = Number(data.value![1])
            break;
        case ActionId.LumaKeySource:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Luma.slectSource[1] = Number(data.value![1])
            break;
        case ActionId.LumaMaskEnable:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Luma.maskInfo.enabled = Boolean(data.value![1])
            break;
        case ActionId.LumaMaskHStart:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Luma.maskInfo.hStart = Number(data.value![1])
            break;
        case ActionId.LumaMaskVStart:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Luma.maskInfo.vStart = Number(data.value![1])
            break;
        case ActionId.LumaMaskHEnd:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Luma.maskInfo.hEnd = Number(data.value![1])
            break;
        case ActionId.LumaMaskVEnd:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Luma.maskInfo.vEnd = Number(data.value![1])
            break;
        case ActionId.LumaPreMultipliedKey:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Luma.keyControl.lumaPreMultipliedKey = Boolean(data.value![1])
            break;
        case ActionId.LumaClip:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Luma.keyControl.clip = Number(data.value![1])
            break;
        case ActionId.LumaGain:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Luma.keyControl.gain = Number(data.value![1])
            break;
        case ActionId.LumaResize:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Luma.size.enable = Boolean(data.value![1])
            break;
        case ActionId.LumaSize:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Luma.size.size = Number(data.value![1])
            break;
        case ActionId.LumaXPosition:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Luma.size.x = Number(data.value![1])
            break;
        case ActionId.LumaYPosition:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Luma.size.y = Number(data.value![1])
            break;

        //chroma
        case ActionId.ChromaFillSource:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.slectSource[0] = Number(data.value![1])
            break;
        case ActionId.ChromaMaskEnable:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.maskInfo.enabled = Boolean(data.value![1])
            break;
        case ActionId.ChromaMaskHStart:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.maskInfo.hStart = Number(data.value![1])
            break;
        case ActionId.ChromaMaskVStart:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.maskInfo.vStart = Number(data.value![1])
            break;
        case ActionId.ChromaMaskHEnd:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.maskInfo.hEnd = Number(data.value![1])
            break;
        case ActionId.ChromaMaskVEnd:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.maskInfo.vEnd = Number(data.value![1])
            break;
        case ActionId.ChromaResize:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.size.enable = Boolean(data.value![1])
            break;
        case ActionId.ChromaSize:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.size.size = Number(data.value![1])
            break;
        case ActionId.ChromaXPosition:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.size.x = Number(data.value![1])
            break;
        case ActionId.ChromaYPosition:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.size.y = Number(data.value![1])
            break;
        case ActionId.ChromaSMPXPosition:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.control.SMPX = Number(data.value![1])
            break;
        case ActionId.ChromaSMPYPosition:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.control.SMPY = Number(data.value![1])
            break;
        case ActionId.ChromaSample:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.control.sample = Boolean(data.value![1])
            break;
        case ActionId.ChromaCurrentColor:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.control.currentColor = Number(data.value![1])
            break;
        case ActionId.ChromaForeground:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.control.foreground = Number(data.value![1])
            break;
        case ActionId.ChromaBackground:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.control.background = Number(data.value![1])
            break;
        case ActionId.ChromaKeyEdge:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Chroma.control.keyEdge = Number(data.value![1])
            break;
        //Pattern
        case ActionId.PatternFillSource:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Pattern.slectSource[0] = Number(data.value![1])
            break;
        case ActionId.PatternWipeIndex:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Pattern.wipe.selectWipeIndex = Number(data.value![1])
            break;
        case ActionId.PatternWipeSize:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Pattern.wipe.size = Number(data.value![1])
            break;
        case ActionId.PatternMaskEnable:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Pattern.maskInfo.enabled = Boolean(data.value![1])
            break;
        case ActionId.PatternMaskHStart:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Pattern.maskInfo.hStart = Number(data.value![1])
            break;
        case ActionId.PatternMaskVStart:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Pattern.maskInfo.vStart = Number(data.value![1])
            break;
        case ActionId.PatternMaskHEnd:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Pattern.maskInfo.hEnd = Number(data.value![1])
            break;
        case ActionId.PatternMaskVEnd:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Pattern.maskInfo.vEnd = Number(data.value![1])
            break;
        case ActionId.PatternResize:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Pattern.size.enable = Boolean(data.value![1])
            break;
        case ActionId.PatternSize:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Pattern.size.size = Number(data.value![1])
            break;
        case ActionId.PatternXPosition:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Pattern.size.x = Number(data.value![1])
            break;
        case ActionId.PatternYPosition:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.Pattern.size.y = Number(data.value![1])
            break;
        //Pip

        case ActionId.PipFillSource:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.pip.slectSource[0] = Number(data.value![1])
            break;
        case ActionId.PipMaskEnable:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.pip.maskInfo.enabled = Boolean(data.value![1])
            break;
        case ActionId.PipMaskHStart:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.pip.maskInfo.hStart = Number(data.value![1])
            break;
        case ActionId.PipMaskVStart:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.pip.maskInfo.vStart = Number(data.value![1])
            break;
        case ActionId.PipMaskHEnd:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.pip.maskInfo.hEnd = Number(data.value![1])
            break;
        case ActionId.PipMaskVEnd:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.pip.maskInfo.vEnd = Number(data.value![1])
            break;
        case ActionId.PipSize:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.pip.size.size = Number(data.value![1])
            break;
        case ActionId.PipXPosition:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.pip.size.x = Number(data.value![1])
            break;
        case ActionId.PipYPosition:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.pip.size.y = Number(data.value![1])
            break;
        case ActionId.PipBorderEnable:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.pip.border.enable = Boolean(data.value![1])
            break;
        case ActionId.PipBorderWidth:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.pip.border.width = Number(data.value![1])
            break;
        case ActionId.PipBorderColorHue:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.pip.border.hue = Number(data.value![1])
            break;
        case ActionId.PipBorderColorSaturation:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.pip.border.saturation = Number(data.value![1])
            break;
        case ActionId.PipBorderColorBrightness:
            var index = Number(data.value![0])
            var usk = state.upStreamKey.USKS[index];
            if (usk) usk.pip.border.brightness = Number(data.value![1])
            break;

    }
    return false
}