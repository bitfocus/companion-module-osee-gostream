import { ActionId } from './actionId'
import { sendCommands } from '../../connection'
import { ReqType } from '../../enums'

export type State = {
	onAir: boolean
	fill: number
	key: number
	invert: boolean
	mask: boolean
	shapedKey: boolean
}

export type DownstreamKeyerState = {
	DownstreamKeyer: State
}

export function create(): DownstreamKeyerState {
	return {
		DownstreamKeyer: {
			onAir: false,
			fill: 0,
			key: 0,
			invert: false,
			mask: false,
			shapedKey: false,
		},
	}
}

export async function sync(): Promise<void> {
	const cmds = [
		{ id: ActionId.DskOnAir, type: ReqType.Get },
		{ id: ActionId.DskSourceFill, type: ReqType.Get },
		{ id: ActionId.DskSourceKey, type: ReqType.Get },
		{ id: ActionId.DskMaskEnable, type: ReqType.Get },
		{ id: ActionId.DskControlShapedKey, type: ReqType.Get },
		{ id: ActionId.DskControlInvert, type: ReqType.Get },
	]
	await sendCommands(cmds)
}
