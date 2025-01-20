import { ActionId } from './actionId'
import { sendCommands, GoStreamCmd } from '../../connection'
import { ReqType } from '../../enums'
import { Range } from '../../util'
import type { IModelSpec } from '../../models/types'

export type StillGeneratorStateT = {
	slots: string[]
}

export function create(model: IModelSpec): StillGeneratorStateT {
	return {
		slots: Array(model.stillSlots),
	}
}

export async function sync(model: IModelSpec): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
		...Range(model.stillSlots).map((index) => ({ id: ActionId.StillSelection, type: ReqType.Get, value: [index] })),
	]
	return await sendCommands(cmds)
}
export function update(state: StillGeneratorStateT, data: GoStreamCmd): boolean {
	switch (data.id as ActionId) {
		case ActionId.StillSelection: {
			const stype = data.value && data.value[0]
			const stypeValue = data.value && data.value[1]
			state.slots[stype] = stypeValue
			return true
		}
	}
	return false
}
