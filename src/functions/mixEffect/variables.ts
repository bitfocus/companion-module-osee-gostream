import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { VariableId } from './variableId'
import { TransitionStyleChoice } from '../../model'
import { StreamDeckState } from '../../connection/state'
import { getEnumKeyByValue } from '../../util'
import { sourceID } from '../../connection/enums'

export function create(_state: StreamDeckState): CompanionVariableDefinition[] {
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

export function getValues(state: StreamDeckState): CompanionVariableValues {
	const newValues = {}
	const inputSources = state.device.inputSources.map((item) =>getEnumKeyByValue(sourceID,item))
	const transitionStyle = TransitionStyleChoice.map((item) => item.label)
	newValues[VariableId.PVW_Source] = inputSources[state.effect.PvwSrc]
	newValues[VariableId.PGM_Source] = inputSources[state.effect.PgmSrc]
	newValues[VariableId.TransitionStyle] = transitionStyle[state.effect.selectTransitionStyle.style]

	return newValues
}
