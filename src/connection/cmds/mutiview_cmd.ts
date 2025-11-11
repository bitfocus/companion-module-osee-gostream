import { ActionId } from "../actionids/multiViewActionId";
import { ReqType } from "../enums";
import { TCPHelper } from "../libs/tcp";
import { StreamDeckState } from "../state";
import { GoStreamCmd } from "../streamdeck";

export async function sync(_state: StreamDeckState, tcp: TCPHelper): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
		{ id: ActionId.MultiViewLayout, type: ReqType.Get },
		// { id: ActionId.MultiViewWindowsSize, type: ReqType.Get },
		{ id: ActionId.MultiViewWindows, type: ReqType.Get },
		// { id: ActionId.MultiViewWindowsSourceList, type: ReqType.Get },
	]
	return tcp.sendCommands(cmds)
}

export function update(state: StreamDeckState, data: GoStreamCmd): boolean {
	switch (data.id as ActionId) {
		case ActionId.MultiViewLayout: {
			state.mutiView.layoutStyle= Number(data.value![0])
			break;
		}
		// case ActionId.MultiViewWindowsSize:
		// 	state.mutiView.mutiViewWinSize = Number(data.value![0])
		// 	break
		case ActionId.MultiViewWindows:
			
			break
		// case ActionId.MultiViewWindowsSourceList: {
		// 	state.mutiView.mutiViewWinSources = data.value as sourceID[]
		// 	break
		// }
	}
	return false
}