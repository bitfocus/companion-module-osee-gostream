import type { CompanionActionEvent, CompanionFeedbackInfo } from '@companion-module/base'
import { DropdownChoice, DropdownChoiceId } from '@companion-module/base'

type DropdownSpec = {
	choices: DropdownChoice[]
	default: DropdownChoiceId
}
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
	if (typeof val !== 'string') {
		throw new Error(`Invalid option '${key}'`)
	}
	return val
}

export function Range(end: number): number[] {
	return [...Array(end).keys()]
}

/* makeChoices returns {choices: [], default: x} 
  so use ... (spread operator) to include the value in the dropdown description */
export function makeChoices(values: (number | string)[]): DropdownSpec {
	return {
		choices: values.map((size) => {
			return { id: size, label: String(size) }
		}),
		default: values[0],
	}
}
