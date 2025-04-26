import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { VariableId } from './variableId'
import { GoStreamModel } from '../../models/types'
import { SuperSourceStateT } from './state'
import { SourceModels, OtherDSKSourceModels, SuperSourceStyleChoices } from '../../model'

export function create(_model: GoStreamModel): CompanionVariableDefinition[] {
	return [
		{
			name: 'SuperSource Source 1',
			variableId: VariableId.SuperSourceSrc1,
		},
		{
			name: 'SuperSource Source 2',
			variableId: VariableId.SuperSourceSrc2,
		},
		{
			name: 'SuperSource Background',
			variableId: VariableId.SuperSourceBG,
		},
		{
			name: 'SuperSource Style',
			variableId: VariableId.SuperSourceSourceStyle,
		},
	]
}

export function getValues(state: SuperSourceStateT): CompanionVariableValues {
	const newValues = {}
	// Note: I had to go back to the the consts because getChoices doesn't give access to shortNames
	const inputSpec = SourceModels.concat(OtherDSKSourceModels)
	// map "In #" to "in #" to improve readability because the capital "I" is too much like a 1.. (and map the rest for consistency)
	// lowercase is also more compact, so it fits better on the buttons.
	const inputSources = inputSpec.map((item) => item.shortName.toLowerCase())
	const SuperSourceStyle = SuperSourceStyleChoices.map((item) => item.label)
	newValues[VariableId.SuperSourceSrc1] = inputSources[state.source1]
	newValues[VariableId.SuperSourceSrc2] = inputSources[state.source2]
	newValues[VariableId.SuperSourceBG] = inputSources[state.background]
	newValues[VariableId.SuperSourceSourceStyle] = SuperSourceStyle[state.controlStyle]

	return newValues
}
