import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { VariableId } from './variableId'
import { GoStreamModel } from '../../models/types'
import { UpstreamKeyerStateT } from './state'

export function create(_model: GoStreamModel): CompanionVariableDefinition[] {
	return [
		{ name: 'Current (USK) Key Type', variableId: VariableId.KeyTypeVar },
		{ name: 'Current (USK) Key Type abbrev.', variableId: VariableId.KeyTypeVar_short },
	]
}

export function getValues(state: UpstreamKeyerStateT): CompanionVariableValues {
	const newValues: CompanionVariableValues = {}
	newValues[VariableId.KeyTypeVar] = state.UpStreamKeyType
	newValues[VariableId.KeyTypeVar_short] = getKeyTypeAbbrev(state)
	return newValues
}

function getKeyTypeAbbrev(state: UpstreamKeyerStateT): string {
	const keytype = state.UpStreamKeyType
	const fullnames = state.keyTypes(true, false)
	const shortnames = state.keyTypes(true, true)
	return shortnames[fullnames.indexOf(keytype)]
}
