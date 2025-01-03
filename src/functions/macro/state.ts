import { ActionId } from './actionId'
import { sendCommand, GoStreamData } from '../../connection'
import { ReqType } from '../../enums'
import { GoStreamInstance } from '../../index'

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

export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.MacroInfo: {
			const obj = {
				index: Number(data.value[0]),
				name: data.value[1],
				description: data.value[2],
				used: true,
				waiting: false,
				recording: false,
				running: false,
			}
			instance.states.Macro.props.push(obj)
			return true
		}
		case ActionId.MacroRun: {
			const macroIndex = Number(data.value[1])
			const macrostate = data.value[0]
			const macro = instance.states.Macro.props.find((s) => s?.index === macroIndex)
			if (macro !== undefined) {
				macro.running = macrostate === 1 ? true : false
			}
			return true
		}
		case ActionId.MacroRecord: {
			const r_index = Number(data.value[1])
			const r_state = data.value[0]
			const r_macro = instance.states.Macro.props.find((s) => s?.index === r_index)
			if (r_macro !== undefined) {
				r_macro.recording = r_state === 1 ? true : false
			} else {
				instance.states.Macro.props.push({
					name: '',
					description: '',
					recording: r_state,
					used: true,
					running: false,
					waiting: false,
					index: r_index,
				})
			}
			return true
		}
	}
	return false
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.GetMacroInfoAll, ReqType.Get)
}
