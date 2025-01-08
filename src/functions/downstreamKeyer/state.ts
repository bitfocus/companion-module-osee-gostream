import { ActionId } from './actionId'
import { sendCommand } from '../../connection'
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
	await sendCommand(ActionId.DskOnAir, ReqType.Get)
	await sendCommand(ActionId.DskSourceFill, ReqType.Get)
	await sendCommand(ActionId.DskSourceKey, ReqType.Get)
	await sendCommand(ActionId.DskMaskEnable, ReqType.Get)
	await sendCommand(ActionId.DskControlShapedKey, ReqType.Get)
	await sendCommand(ActionId.DskControlInvert, ReqType.Get)
}
