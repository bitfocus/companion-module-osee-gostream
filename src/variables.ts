import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { GoSteamDeckInstance } from '.'
import { ActionType } from './enums'
import { getChoices } from './choices'

export function variables(_self: GoSteamDeckInstance): void {
	const variables: CompanionVariableDefinition[] = []

	const values: CompanionVariableValues = {}

	variables.push({
		name: 'IP address of GoStreamDeck',
		variableId: `device_ip`,
	})
	values['device_ip'] = _self.config.host;

	let MeChoice = getChoices(ActionType.Preview);

	for (let i = 0; i < MeChoice.length; i++) {
		variables.push({
			name: `Id of input_${i + 1}`,
			variableId: `pre${i + 1}_input_id`,
		})
		values[`pre${i + 1}_input_id`] = MeChoice[i].label;
	}

	_self.setVariableDefinitions(variables);
	_self.setVariableValues(values);
}
