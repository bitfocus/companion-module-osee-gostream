import { ActionId } from './actionId'
import { sendCommand } from '../../connection'
import { ReqType } from '../../enums'

export type State = {
	stream1: boolean
	stream2: boolean
	stream3: boolean
}

export type StreamingState = {
	Streaming: State
}

export function create(): StreamingState {
	return {
		Streaming: {
			stream1: false,
			stream2: false,
			stream3: false,
		},
	}
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.StreamOutput, ReqType.Get, [0])
	await sendCommand(ActionId.StreamOutput, ReqType.Get, [1])
	await sendCommand(ActionId.StreamOutput, ReqType.Get, [2])
}
