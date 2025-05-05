import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { VariableId } from './variableId'
import { GoStreamModel } from '../../models/types'
import { MixEffectStateT } from './state'
import { TransitionStyleChoice } from '../../model'

export function create(_model: GoStreamModel): CompanionVariableDefinition[] {
	return [
		{
			name: 'Preview Source',
			variableId: VariableId.PVW_Source,
		},
		{
			name: 'Program Source',
			variableId: VariableId.PGM_Source,
		},
		{
			name: 'Auto-transition Style',
			variableId: VariableId.TransitionStyle,
		},
	]
}

export function getValues(state: MixEffectStateT): CompanionVariableValues {
	const newValues = {}
	// map "In #" to "in #" to improve readability because the capital "I" is too much like a 1.. (and map the rest for consistency)
	// lowercase is also more compact, so it fits better on the buttons.
	const inputSources = state.model.InputSources().map((item) => item.label.toLowerCase())
	const transitionStyle = TransitionStyleChoice.map((item) => item.label)
	newValues[VariableId.PVW_Source] = inputSources[state.PvwSrc]
	newValues[VariableId.PGM_Source] = inputSources[state.PgmSrc]
	newValues[VariableId.TransitionStyle] = transitionStyle[state.selectTransitionStyle.style]

	return newValues
}
