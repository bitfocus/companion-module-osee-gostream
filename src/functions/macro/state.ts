import { ActionId } from './actionId'
import { sendCommand, GoStreamCmd } from '../../connection'
import { ReqType } from '../../enums'
import type { IModelSpec } from '../../models/types'

export type MacroT = {
	name: string
	description: string
	recording: boolean
	used: boolean
	running: boolean
	waiting: boolean
	index: number
}

export type MacroState = {
	macros: MacroT[]
}

export function create(_model: IModelSpec): MacroState {
	return {
		macros: [],
	}
}

export async function sync(_model: IModelSpec): Promise<boolean> {
	return await sendCommand(ActionId.GetMacroInfoAll, ReqType.Get)
}

export function update(state: MacroState, data: GoStreamCmd): boolean {
	if (!data.value) return false
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
			state.macros.push(obj)
			// Update action lists
			return true
		}
		case ActionId.MacroRun: {
			const macroIndex = Number(data.value[1])
			const macrostate = data.value[0]
			const macro = state.macros.find((s) => s?.index === macroIndex)
			if (macro !== undefined) {
				macro.running = macrostate === 1 ? true : false
			}
			break
		}
		case ActionId.MacroRecord: {
			const r_index = Number(data.value[1])
			const r_state = data.value[0]
			const r_macro = state.macros.find((s) => s?.index === r_index)
			if (r_macro !== undefined) {
				r_macro.recording = r_state === 1 ? true : false
			} else {
				state.macros.push({
					name: '',
					description: '',
					recording: r_state,
					used: true,
					running: false,
					waiting: false,
					index: r_index,
				})
			}
			break
		}
	}
	return false
}
