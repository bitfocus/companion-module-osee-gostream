import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { VariableId } from './variableId'
import { StreamDeckState } from '../../connection/state'
import { sourceID } from '../../connection/enums'
import { getEnumKeyByValue } from '../../util'


export function create(_state: StreamDeckState): CompanionVariableDefinition[] {
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

export function getValues(state: StreamDeckState): CompanionVariableValues {
	const newValues = {}
	// Note: I had to go back to the the consts because getChoices doesn't give access to shortNames
	// const inputSpec = SourceModels.concat(OtherDSKSourceModels)
	const inputSpec=state.mutiSource.multiSourceWindowsSources;
	// map "In #" to "in #" to improve readability because the capital "I" is too much like a 1.. (and map the rest for consistency)
	// lowercase is also more compact, so it fits better on the buttons.
	const inputSources =inputSpec? inputSpec.map((item) =>getEnumKeyByValue(sourceID,item)):[]
	// const SuperSourceStyle = SuperSourceStyleChoices.map((item) => item.label)
	newValues[VariableId.SuperSourceSrc1] = inputSources[0]
	newValues[VariableId.SuperSourceSrc2] = inputSources[0]
	newValues[VariableId.SuperSourceBG] = inputSources[0]
	// newValues[VariableId.SuperSourceSourceStyle] = SuperSourceStyle[0]

	return newValues
}
