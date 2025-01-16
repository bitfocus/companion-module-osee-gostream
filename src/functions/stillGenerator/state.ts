import { ActionId } from './actionId'
import { sendCommands } from '../../connection'
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
	const cmds = [
		{ id: ActionId.StillSelection, type: ReqType.Get, value: [0] },
		{ id: ActionId.StillSelection, type: ReqType.Get, value: [1] },
	]
	await sendCommands(cmds)
}
