import { ActionId } from "../actionids/recordActionId";
import { ReqType } from "../enums";
import { TCPHelper } from "../libs/tcp";
import { StreamDeckState } from "../state";
import { GoStreamCmd } from "../streamdeck";

export async function sync(state: StreamDeckState, tcp: TCPHelper): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
		{ id: ActionId.RecordStatus, type: ReqType.Get },
		{ id: ActionId.RecordFormat, type: ReqType.Get },
		{ id: ActionId.RecordBitrate, type: ReqType.Get },
		{ id: ActionId.RecordDuration, type: ReqType.Get },
		{ id: ActionId.RecordFree, type: ReqType.Get },
		{ id: ActionId.ISORecordFree, type: ReqType.Get },
	]
	for (let index = 0; index < state.device.RecordISOChannels.length; index++) {
		cmds.push({ id: ActionId.RecordISOChannel, type: ReqType.Get, value: [state.device.RecordISOChannels[index]] });
	}
	return tcp.sendCommands(cmds)
}

export function update(state: StreamDeckState, data: GoStreamCmd): boolean {
	switch (data.id as ActionId) {
		case ActionId.RecordStatus:
			state.record.isRecording = Number(data.value![0])
			break
		case ActionId.RecordFormat:
			let format = String((data.value![0]));
			if (format === 'H.265') {
				state.record.format = 1
			}
			else if (format === 'H.264') {
				state.record.format = 0
			}
			else {

			}
			break
		case ActionId.RecordBitrate:
			state.record.quality = Number(data.value![0])
			break
		case ActionId.RecordFree:
			state.record.recordFree.freeSpace = Number(data.value![0])
			state.record.recordFree.freeTime = Number(data.value![1])
			break
		case ActionId.ISORecordFree:
			state.record.ISORecordFree.freeSpace = Number(data.value![0])
			state.record.ISORecordFree.freeTime = Number(data.value![1])
			break
		case ActionId.RecordDuration:
			state.record.recordTime = Number(data.value![0])
			break
		case ActionId.RecordISOChannel:
			let index = Number(data.value![0]);
			let channel = state.record.channels[index];
			if (channel) channel = Boolean(data.value![1]);
			break;
		case ActionId.ISORecordStartError:
			state.record.isoErrCode = Number(data.value![0])
			break;
	}
	return false
}