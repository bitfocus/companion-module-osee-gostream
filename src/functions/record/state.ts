import { ActionId } from './actionId'
import { sendCommand } from '../../connection'
import { ReqType } from '../../enums'

export type State = {
	State: number
}

export type RecordState = {
	Record: State
}

export function create(): RecordState {
	return {
		Record: {
			State: 0,
		},
	}
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.Record, ReqType.Get)
}
