import { ActionId } from "../actionids/dskActionId";
import { ReqType, sourceID } from "../enums";
import { TCPHelper } from "../libs/tcp";
import { StreamDeckState } from "../state";
import { GoStreamCmd } from "../streamdeck";

function create(state: StreamDeckState, index: number) {
	state.downStreamKey.DSKS[index] = {
		keyEnable: false,
		keyOnAir: false,
		source: {
			fill: sourceID.IN1,
			key: sourceID.IN1,
		},
		mask: {
			enabled: false,
			hStart: 0,
			vStart: 0,
			hEnd: 0,
			vEnd: 0,
		},
		control: {
			invert: false,
			preMultipliedKey: false,
			clip: 0,
			gain: 0,
		},
		rate: {
			rate: 0
		},
		sizePosition: {
			enable: false,
			size: 0,
			xPosition: 0,
			yPosition: 0,
		}
	}
}

export async function sync(state: StreamDeckState, tcp: TCPHelper): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
		{ id: ActionId.DskFillSourceList, type: ReqType.Get },
		{ id: ActionId.DskKeySourceList, type: ReqType.Get },
	]
	for (let index = 0; index < state.device.dskCount; index++) {
		cmds.push({ id: ActionId.DskEnable, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.DskOnAir, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.DskFillSource, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.DskKeySource, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.DskMaskEnable, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.DskMaskHStart, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.DskMaskVStart, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.DskMaskHEnd, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.DskPreMultipliedKey, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.DskClip, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.DskGain, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.DskInvert, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.DskResize, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.DskSize, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.DskXPosition, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.DskYPosition, type: ReqType.Get, value: [index] });
		create(state, index);
	}
	return await tcp.sendCommands(cmds)
}
export function update(state: StreamDeckState, data: GoStreamCmd): boolean {
	let index = Number(data.value![0]);
	let dsk = state.downStreamKey.DSKS[index];
	switch (data.id as ActionId) {
		case ActionId.DskFillSourceList:
			var str = String(data.value)
			state.downStreamKey.FillSources = str ? str.split(',').map(Number) : []
			break;
		case ActionId.DskKeySourceList:
			var str = String(data.value)
			state.downStreamKey.KeySources = str ? str.split(',').map(Number) : []
			break;
		case ActionId.DskEnable:
			if (dsk !== undefined) {
				dsk.keyEnable = Boolean(data.value![1])
			}
			break;
		case ActionId.DskOnAir:
			if (dsk !== undefined) {
				dsk.keyOnAir = Boolean(data.value![1])
			}
			break;
		case ActionId.DskFillSource:
			if (dsk !== undefined) {
				dsk.source.fill = Number(data.value![1])
			}
			break;
		case ActionId.DskKeySource:
			if (dsk !== undefined) {
				dsk.source.key = Number(data.value![1])
			}
			break;
		case ActionId.DskMaskEnable:
			if (dsk !== undefined) {
				dsk.mask.enabled = Boolean(data.value![1])
			}
			break;
		case ActionId.DskMaskHStart:
			if (dsk !== undefined) {
				dsk.mask.hStart = Number(data.value![1])
			}
			break;
		case ActionId.DskMaskVStart:
			if (dsk !== undefined) {
				dsk.mask.vStart = Number(data.value![1])
			}
			break;
		case ActionId.DskMaskHEnd:
			if (dsk !== undefined) {
				dsk.mask.hEnd = Number(data.value![1])
			}
			break
		case ActionId.DskMaskVEnd:
			if (dsk !== undefined) {
				dsk.mask.vEnd = Number(data.value![1])
			}
			break
		case ActionId.DskPreMultipliedKey:
			if (dsk !== undefined) {
				dsk.control.preMultipliedKey = Boolean(data.value![1])
			}
			break
		case ActionId.DskClip:
			if (dsk !== undefined) {
				dsk.control.clip = Number(data.value![1])
			}
			break
		case ActionId.DskGain:
			if (dsk !== undefined) {
				dsk.control.gain = Number(data.value![1])
			}
			break
		case ActionId.DskInvert:
			if (dsk !== undefined) {
				dsk.control.invert = Boolean(data.value![1])
			}
			break
		case ActionId.DskResize:
			if (dsk !== undefined) {
				dsk.sizePosition.enable = Boolean(data.value![1])
			}
			break
		case ActionId.DskSize:
			if (dsk !== undefined) {
				dsk.sizePosition.size = Number(data.value![1])
			}
			break
		case ActionId.DskXPosition:
			if (dsk !== undefined) {
				dsk.sizePosition.xPosition = Number(data.value![1])
			}
			break
		case ActionId.DskYPosition:
			if (dsk !== undefined) {
				dsk.sizePosition.yPosition = Number(data.value![1])
			}
			break
	}
	return false
}
