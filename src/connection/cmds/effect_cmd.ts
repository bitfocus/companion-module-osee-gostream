import { ActionId } from "../actionids/effectActionId";
import { Model, ReqType } from "../enums";
import { TCPHelper } from "../libs/tcp";
import { StreamDeckState } from "../state";
import { GoStreamCmd } from "../streamdeck";

export async function sync(state: StreamDeckState, tcp: TCPHelper): Promise<boolean> {
	//8路暂无FTB
	const cmds: GoStreamCmd[] = [
		{ id: ActionId.PgmIndex, type: ReqType.Get },
		{ id: ActionId.PvwIndex, type: ReqType.Get },
		{ id: ActionId.PreviewTransition, type: ReqType.Get },
		{ id: ActionId.TransitionStatus, type: ReqType.Get },
		{ id: ActionId.TransitionStyle, type: ReqType.Get },
		{ id: ActionId.TransitionDipFillSource, type: ReqType.Get },
		{ id: ActionId.TransitionDipFillSourceList, type: ReqType.Get },
		{ id: ActionId.TransitionDipRate, type: ReqType.Get },
		{ id: ActionId.TransitionMixRate, type: ReqType.Get },
		{ id: ActionId.TransitionWipeRate, type: ReqType.Get },
		{ id: ActionId.TransitionWipeDirection, type: ReqType.Get },
	]
	if(state.device.deviceModel!==Model.Duet_8ISO){
		cmds.push({ id: ActionId.TransitionWipeXPosition, type: ReqType.Get })
		cmds.push({ id: ActionId.TransitionWipeYPosition, type: ReqType.Get })
		cmds.push({ id: ActionId.TransitionWipeSymmetry, type: ReqType.Get })
		cmds.push({ id: ActionId.TransitionWipeSoftness, type: ReqType.Get })
		cmds.push({ id: ActionId.TransitionWipeBorder, type: ReqType.Get })
		cmds.push({ id: ActionId.TransitionWipeFillSourceList, type: ReqType.Get })
		cmds.push({ id: ActionId.TransitionWipeFillSource, type: ReqType.Get })
		cmds.push({ id: ActionId.FtbRate, type: ReqType.Get })
		cmds.push({ id: ActionId.FtbAfv, type: ReqType.Get })
		cmds.push({ id: ActionId.FtbStatus, type: ReqType.Get })
	}
	return await tcp.sendCommands(cmds)
}

export function update(state: StreamDeckState, data: GoStreamCmd): boolean {
	switch (data.id as ActionId) {
		case ActionId.PvwIndex:
			state.effect.PvwSrc = Number(data.value![0])
			break
		case ActionId.PgmIndex:
			state.effect.PgmSrc = Number(data.value![0])
			break
		case ActionId.TransitionStatus:
			state.effect.transitionPosition.inTransition = data.value![0] === 1 ? true : false
			break
		case ActionId.PreviewTransition:
			state.effect.selectTransitionStyle.PrevState = Boolean(data.value![0])
			break
		case ActionId.TransitionStyle: {
			const selectValue = String(data.value![0])
			let value = 0;
			switch (selectValue) {
				case "Mix":
					value = 0
					break;
				case "Dip":
					value = 1;
					break;
				case "Wipe":
					value = 2;
					break;

			}
			state.effect.selectTransitionStyle.style = value
			break
		}
		case ActionId.TransitionDipFillSource:
			state.effect.selectTransitionStyle.dip.selectDipSource = Number(data.value![0]);
			break;
		case ActionId.TransitionDipFillSourceList:
			var str = String(data.value)
			state.effect.dipFillSources = str ? str.split(',').map(Number) : []
			break;
		case ActionId.TransitionDipRate:
			state.effect.selectTransitionStyle.dip.rate = Number(data.value![0])
			break;
		case ActionId.TransitionWipeRate:
			state.effect.selectTransitionStyle.wipe.rate = Number(data.value![0])
			break;
		case ActionId.TransitionMixRate:
			state.effect.selectTransitionStyle.mix.rate = Number(data.value![0])
			break;
		// 4 路
		case ActionId.TransitionWipeXPosition:
			state.effect.selectTransitionStyle.wipe.x = Number(data.value![0])
			break;
		case ActionId.TransitionWipeYPosition:
			state.effect.selectTransitionStyle.wipe.y = Number(data.value![0])
			break;
		case ActionId.TransitionWipeDirection:
			state.effect.selectTransitionStyle.wipe.direction = Number(data.value![0])
			break;
		case ActionId.TransitionWipeSymmetry:
			state.effect.selectTransitionStyle.wipe.symmetry = Number(data.value![0])
			break;
		case ActionId.TransitionWipeSoftness:
			state.effect.selectTransitionStyle.wipe.softness = Number(data.value![0])
			break;
		case ActionId.TransitionWipeBorder:
			state.effect.selectTransitionStyle.wipe.borderWidth = Number(data.value![0])
			break;
		case ActionId.TransitionWipeFillSourceList:
			var str = String(data.value)
			state.effect.wipeFillSource = str ? str.split(',').map(Number) : []
			break;
		case ActionId.TransitionWipeFillSource:
			var str = String(data.value)
			state.effect.selectTransitionStyle.wipe.selectWipeSource = Number(data.value![0])
			break;
		case ActionId.FtbStatus: {
			const value = Number(data.value![0])
			if (value === 0) {
				state.effect.fadeToBlack.isFullyBlack = false
				state.effect.fadeToBlack.inTransition = false
			} else if (value === 1) {
				state.effect.fadeToBlack.inTransition = false
				state.effect.fadeToBlack.isFullyBlack = true
			} else if (value === 2) {
				state.effect.fadeToBlack.inTransition = true
			}
			break
		}
		case ActionId.FtbRate:
			state.effect.fadeToBlack.rate = Number(data.value![0])
			break
		case ActionId.FtbAfv:
			state.effect.fadeToBlack.AFV = Boolean(data.value![0])
			break
	}
	return false
}