import { ActionId } from './actionId'
import { sendCommand, GoStreamData } from '../../connection'
import { ReqType } from '../../enums'
import { GoStreamInstance } from '../../index'

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

export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.Live: {
			console.log('STATES', JSON.stringify(instance.states))
			instance.states.Live.State = data.value[0]
			return true
		}
	}
	return false
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.Live, ReqType.Get)
}
