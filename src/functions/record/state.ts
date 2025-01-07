import { ActionId } from './actionId'
import { sendCommand } from '../../connection'
import { ReqType } from '../../enums'

export type State = {
	State: number
	RecordTime: string
}

export type RecordState = {
	Record: State
}

export function create(): RecordState {
	return {
		Record: {
			State: 0,
			RecordTime: '',
		},
	}
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.Record, ReqType.Get)
}
