import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { VariableId } from './variableId'
import { SourceModels, OtherSourceModels } from '../../model'
import { GoStreamModel } from '../../models/types'
import { UpstreamKeyerStateT, USKKeyTypes, USKKeySourceType } from './state'

export function create(_model: GoStreamModel): CompanionVariableDefinition[] {
	return [
		{ name: 'Current (USK) Key Type', variableId: VariableId.KeyTypeVar },
		{ name: 'Current (USK) Key Type abbrev.', variableId: VariableId.KeyTypeVar_short },

		{ name: 'PiP Source', variableId: VariableId.PIPFillSource },
		{ name: 'Luma key fill Source', variableId: VariableId.LumaFillSource },
		{ name: 'Chroma key Source', variableId: VariableId.ChromaFillSource },
		{ name: 'Pattern Source', variableId: VariableId.PatternFillSource },
		{ name: 'Current (USK) Key Fill Source', variableId: VariableId.USKFillSource },
		{ name: 'PiP Size', variableId: VariableId.PIPSize },
	]
}

export function getValues(state: UpstreamKeyerStateT): CompanionVariableValues {
	const newValues: CompanionVariableValues = {}
	// need to go to the constants rather than getChoices() in order to access shortName
	const sourceNames = SourceModels.concat(OtherSourceModels).map((item) => item.shortName.toLowerCase())
	const fillSource = (ktype: USKKeyTypes) => state.keyInfo[ktype].sources[USKKeySourceType.Fill]

	newValues[VariableId.KeyTypeVar] = state.UpStreamKeyType
	newValues[VariableId.KeyTypeVar_short] = getKeyTypeAbbrev(state)
	newValues[VariableId.PIPSize] = String(state.keyInfo[USKKeyTypes.Pip].size)

	newValues[VariableId.PIPFillSource] = sourceNames[fillSource(USKKeyTypes.Pip)]
	newValues[VariableId.LumaFillSource] = sourceNames[fillSource(USKKeyTypes.Luma)]
	newValues[VariableId.ChromaFillSource] = sourceNames[fillSource(USKKeyTypes.Chroma)]
	newValues[VariableId.PatternFillSource] = sourceNames[fillSource(USKKeyTypes.KeyPattern)]
	newValues[VariableId.USKFillSource] = sourceNames[fillSource(state.encodeKeyType())]
	return newValues
}

function getKeyTypeAbbrev(state: UpstreamKeyerStateT): string {
	const keytype = state.UpStreamKeyType
	const fullnames = state.keyTypes(true, false)
	const shortnames = state.keyTypes(true, true)
	return shortnames[fullnames.indexOf(keytype)]
}
