import { ActionId } from './actionId'
import { sendCommand } from '../../connection'
import { ReqType } from '../../enums'

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

export async function sync(): Promise<void> {
	await sendCommand(ActionId.StillSelection, ReqType.Get, [0])
	await sendCommand(ActionId.StillSelection, ReqType.Get, [1])
}
