import { ActionId } from "../actionids/macroActionId";
import { ReqType } from "../enums";
import { TCPHelper } from "../libs/tcp";
import { StreamDeckState } from "../state";
import { GoStreamCmd } from "../streamdeck";

export async function sync(_state: StreamDeckState, tcp: TCPHelper): Promise<boolean> {
	return await tcp.sendCommand(ActionId.MacroInfos, ReqType.Get)
}

export function update(state: StreamDeckState, data: GoStreamCmd): boolean {
	const macroIndex = Number(data.value![0])
	const macrostate = Number(data.value![1])
	switch (data.id as ActionId) {
		case ActionId.MacroInfos: {
			const obj = {
				name: String(data.value![1]),
				description: String(data.value![2]),
				used: true,
				waiting: false,
				recording: false,
				running: false,
			}
			if(data.value?.length!=0)
				state.macro.macros[macroIndex]=obj;
			return true
		}
		case ActionId.MacroRunIndex: {
			const macro = state.macro.macros[macroIndex]
			if (macro !== undefined) {
				macro.running = macrostate === 1 ? true : false
			}
			break
		}
		case ActionId.MacroRecordIndex: {
			const r_macro = state.macro.macros[macroIndex]
			if (r_macro !== undefined) {
				r_macro.recording = macrostate===1?true:false;
			} else {
				state.macro.macros[macroIndex]={
					name: '',
					description: '',
					recording: macrostate===1?true:false,
					used: true,
					running: false,
					waiting: false,
				}
			}
			break
		}
	}
	return false
}