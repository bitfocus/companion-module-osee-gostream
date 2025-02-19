import type { CompanionActionEvent, CompanionFeedbackInfo } from '@companion-module/base'

export function getOptNumber(
	action: CompanionActionEvent | CompanionFeedbackInfo,
	key: string,
	defVal?: number,
): number {
	const rawVal = action.options[key]
	if (defVal !== undefined && rawVal === undefined) return defVal
	const val = Number(rawVal)
	if (isNaN(val)) {
		throw new Error(`Invalid option '${key}'`)
	}
	return val
}

export function getOptString(
	action: CompanionActionEvent | CompanionFeedbackInfo,
	key: string,
	defVal?: string,
): string {
	const rawVal = action.options[key]
	if (defVal !== undefined && rawVal === undefined) return defVal
	const val = String(rawVal)
	if (typeof rawVal !== 'string') {
		throw new Error(`Invalid option '${key}'`)
	}
	return val
}

export function Range(end: number): number[] {
	return [...Array(end).keys()]
}
