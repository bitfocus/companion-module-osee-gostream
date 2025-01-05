import { ActionId } from './actionId'
import { sendCommand } from '../../connection'
import { ReqType } from '../../enums'

export type MacroProp = {
	name: string
	description: string
	recording: boolean
	used: boolean
	running: boolean
	waiting: boolean
	nndex: number
}
export type State = {
	props: MacroProp[]
}

export type MacroState = {
	Macro: State
}

export function create(): MacroState {
	return {
		Macro: {
			props: [],
		},
	}
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.GetMacroInfoAll, ReqType.Get)
}
