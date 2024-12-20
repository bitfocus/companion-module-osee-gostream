import { ActionId } from './actionId'
import { sendCommand, GoStreamData } from '../../connection'
import { ReqType } from '../../enums'
import { GoStreamInstance } from '../../index'

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

export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.StreamOutput: {
			const streamtype = data.value[0]
			if (streamtype === 0) {
				instance.states.Streaming.stream1 = data.value[1] === 1 ? true : false
			} else if (streamtype === 1) {
				instance.states.Streaming.stream2 = data.value[1] === 1 ? true : false
			} else if (streamtype === 2) {
				instance.states.Streaming.stream3 = data.value[1] === 1 ? true : false
			}
			return true
		}
	}
	return false
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.StreamOutput, ReqType.Get, [0])
	await sendCommand(ActionId.StreamOutput, ReqType.Get, [1])
	await sendCommand(ActionId.StreamOutput, ReqType.Get, [2])
}
