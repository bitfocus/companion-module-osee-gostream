import { ActionId } from './actionId'
import { sendCommands, GoStreamCmd } from '../../connection'
import { ReqType } from '../../enums'
import { Range } from '../../util'
import type { GoStreamModel } from '../../models/types'

export type StillGeneratorStateT = {
	slots: number[]
}

export function create(model: GoStreamModel): StillGeneratorStateT {
	return {
		slots: Array(model.stillSlots),
	}
}

export async function sync(model: GoStreamModel): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
		...Range(model.stillSlots).map((index) => ({ id: ActionId.StillSelection, type: ReqType.Get, value: [index] })),
	]
	return await sendCommands(cmds)
}
export function update(state: StillGeneratorStateT, data: GoStreamCmd): boolean {
	switch (data.id as ActionId) {
		case ActionId.StillSelection: {
			state.slots[Number(data.value![0])] = Number(data.value![1])
			return true
		}
	}
	return false
}
