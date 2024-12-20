import { ActionId } from './actionId'
import { sendCommand, GoStreamData } from '../../connection'
import { ReqType } from '../../enums'
import { GoStreamInstance } from '../../index'

export type State = {
	Still1: string
	Still2: string
}

export type StillGeneratorState = {
	StillGenerator: State
}

export function create(): StillGeneratorState {
	return {
		StillGenerator: {
			Still1: '',
			Still2: '',
		},
	}
}

export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.StillSelection: {
			const stype = data.value[0]
			const stypeValue = data.value[1]
			if (stype === 0) {
				instance.states.StillGenerator.Still1 = stypeValue
			} else {
				instance.states.StillGenerator.Still2 = stypeValue
			}
			return true
		}
	}
	return false
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.StillSelection, ReqType.Get, [0])
	await sendCommand(ActionId.StillSelection, ReqType.Get, [1])
}
