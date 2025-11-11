import { ActionId } from "../actionids/playbackActionId";
import { ReqType } from "../enums";
import { TCPHelper } from "../libs/tcp";
import { StreamDeckState } from "../state";
import { GoStreamCmd } from "../streamdeck";

function create(state: StreamDeckState, index: number) {
	state.playBack.config[index] = {
		selectMode: '',
		repeatEnable: false,
		playStatus: 0, //0：停止，1：播放，2：暂停
	};
}

export async function sync(state: StreamDeckState, tcp: TCPHelper): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
		{ id: ActionId.PlaybackModeRange, type: ReqType.Get },
	]
	for (let index = 0; index < state.device.playCount; index++) {
		cmds.push({ id: ActionId.PlaybackMode, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.PlayRepeat, type: ReqType.Get, value: [index] });
		cmds.push({ id: ActionId.PlayStatus, type: ReqType.Get, value: [index] });
		create(state, index);
	}
	return await tcp.sendCommands(cmds)
}
export function update(state: StreamDeckState, data: GoStreamCmd): boolean {
	switch (data.id as ActionId) {
		case ActionId.PlaybackModeRange:
			state.playBack.modeRanges = data.value as string[]
			break;
		case ActionId.PlaybackMode:
			var index = Number(data.value![0])
			var config = state.playBack.config[index]
			if (config) config.selectMode = String(data.value![1])

			break
		case ActionId.PlayRepeat:
			var index = Number(data.value![0])
			var config = state.playBack.config[index]
			if (config) config.repeatEnable = Boolean(data.value![1])
			break
		case ActionId.PlayStatus:
			var index = Number(data.value![0])
			var config = state.playBack.config[index]
			if (config) config.playStatus = Number(data.value![1])
			break;
	}
	return false
}