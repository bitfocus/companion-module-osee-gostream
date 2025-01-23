import { GoStreamCmd } from '../../connection'
import type { GoStreamModel } from '../../models/types'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ColorBackStateT = {}

export function create(_model: GoStreamModel): ColorBackStateT {
	return {}
}

export async function sync(_model: GoStreamModel): Promise<boolean> {
	return true
}

export function update(__state: ColorBackStateT, _data: GoStreamCmd): boolean {
	return false
}
