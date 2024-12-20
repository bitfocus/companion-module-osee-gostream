import { ActionId } from './actionId'
import { sendCommand, GoStreamData } from '../../connection'
import { ReqType } from '../../enums'
import { GoStreamInstance } from '../../index'

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

export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.Record:
			instance.states.Record.State = data.value[0] === 1 ? true : false
			return true
	}
	return false
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.Record, ReqType.Get)
}
