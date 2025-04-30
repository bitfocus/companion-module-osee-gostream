import type { CompanionActionEvent, CompanionFeedbackInfo } from '@companion-module/base'
import { DropdownChoice, DropdownChoiceId, SomeCompanionActionInputField } from '@companion-module/base'

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
export function makeChoices(values: (number | string)[], moreOptions: DropdownChoice[] = []): DropdownSpec {
	return {
		choices: values
			.map((item) => {
				return { id: item, label: String(item) }
			})
			.concat(moreOptions),
		default: values[0],
	}
}

// return a randomly selected index for the specified array.
export function getRandomIndex(arr: any[]): number {
	// random returns [0..1) so the upper bound is exclusive.
	// Array length is one larger than the highest valid index, so this works perfectly:
	return Math.floor(Math.random() * arr.length)
}

export enum sequenceOp {
	Sequential = 0,
	RandomWithoutReplacement = 1,
	RandomWithReplacement = 2,
}

// generally, use `sequenceOrderDropdown` not this const in action definitions
export const sequenceOpChoices = [
	{ id: sequenceOp.Sequential, label: 'sequential' },
	{ id: sequenceOp.RandomWithoutReplacement, label: 'random sets' },
	{ id: sequenceOp.RandomWithReplacement, label: 'fully random' },
]

// "clients" should add this to an action definition for use with `nextInSequence`
export const sequenceOrderDropdown: SomeCompanionActionInputField = {
	id: 'Order',
	type: 'dropdown',
	label: 'Order',
	choices: sequenceOpChoices,
	default: 0,
}

// a static dict to store remaining selection when drawing randomly without replacement.
nextInSequence.remaining = new Map<string, DropdownChoiceId[]>()

// Pick the next item in a set either sequentially or randomly.
export function nextInSequence(
	optSequence: DropdownChoiceId[], // the full ordered set
	currentOpt: DropdownChoiceId, // the currently selected item, from state (may not be in srcSequence)
	action: CompanionActionEvent | sequenceOp = sequenceOp.Sequential, // traversal order
	uniqueID = '', //  if picking without replacement, but not providing the CompanionActionEvent, then provide a unique ID to associate with the current status
): DropdownChoiceId {
	let currentOptPos = optSequence.indexOf(currentOpt) // the position or -1
	let newIdx = currentOptPos
	let newOption: DropdownChoiceId
	let order: sequenceOp

	// Parse the third argument
	if (typeof action === 'number') {
		order = action
		if (order === sequenceOp.RandomWithoutReplacement && uniqueID == '') {
			console.log(
				'nextInSequence: RandomWithoutReplacement must either be part of an action or uniqueID must be supplied',
			)
			throw new Error(
				'nextInSequence: RandomWithoutReplacement must either be part of an action or uniqueID must be supplied',
			)
		}
	} else if ('Order' in action.options) {
		order = action.options.Order as number
		uniqueID = action.id
	} else {
		console.log('nextInSequence: Order not specified implicitly or explicitly')
		throw new Error('nextInSequence: Order not specified implicitly or explicitly')
	}

	// retrieve or initialize the data store for RandomWithoutReplacement
	let remaining = nextInSequence.remaining.get(uniqueID)
	if (remaining === undefined) {
		remaining = []
		if (order === sequenceOp.RandomWithoutReplacement) {
			nextInSequence.remaining.set(uniqueID, remaining)
		}
	}

	switch (order) {
		case sequenceOp.Sequential:
			newIdx += 1
			if (newIdx >= optSequence.length) {
				newIdx = 0
			}
			break
		case sequenceOp.RandomWithReplacement:
			newIdx = getRandomIndex(optSequence)
			break
		case sequenceOp.RandomWithoutReplacement:
			// When "bucket" is empty, start over:
			if (remaining.length === 0) {
				// modify the caller's array.
				remaining.splice(0, 1, ...optSequence) // makes a shallow copy, which protects srcSequence
				// currentSrcPos is correct now.
			}
			if (remaining.length != optSequence.length || optSequence.length <= 2) {
				// current bucket was not just refilled, just pick randomly.
				//  Also handle an edge case: if there are only two items in the full sequence then forcing a change
				//   when the bucket is refilled will result in sequential (i.e nonrandom) selection.
				newIdx = -1 // force the while-loop, below, to loop exactly once
				currentOptPos = -1 // forces a single loop and clears default value
			}
			// 'remaining' contains a list of remaing choices to select from, but...
			// when selecting w/o replacement, it could select the current source at the beginning of a new set.
			// Make sure that the source always changes (i.e. don't accept current source as the next random value)
			while (newIdx === currentOptPos) {
				newIdx = getRandomIndex(remaining)
			}
			// remove the selected item from the "bucket" and return it
			newOption = remaining[newIdx]
			remaining.splice(newIdx, 1)
			return newOption
		default:
			throw new Error('Function nextInSequence called with illegal value ' + order)
	}
	return optSequence[newIdx]
}
