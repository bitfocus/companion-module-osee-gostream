import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { VariableId } from './variableId'
import { GoStreamModel } from '../../models/types'
import { UpstreamKeyerStateT } from './state'

export function create(_model: GoStreamModel): CompanionVariableDefinition[] {
	return [{ name: 'Current (USK) Key Type', variableId: VariableId.KeyTypeVar }]
}

export function getValues(state: UpstreamKeyerStateT): CompanionVariableValues {
	const newValues: CompanionVariableValues = {}
	newValues[VariableId.KeyTypeVar] = state.UpStreamKeyType
	return newValues
}
