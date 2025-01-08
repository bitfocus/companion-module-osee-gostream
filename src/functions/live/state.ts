import { ActionId } from './actionId'
import { sendCommand } from '../../connection'
import { ReqType } from '../../enums'

export type State = {
	State: number
}

export type LiveState = {
	Live: State
}

export function create(): LiveState {
	return {
		Live: {
			State: 0,
		},
	}
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.Live, ReqType.Get)
}
