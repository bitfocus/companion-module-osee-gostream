import { ActionType } from './enums'
import { getChoices } from './choices'
import type { GoStreamInstance } from './index'

export function variables(instance: GoStreamInstance): void {
	const variables: any[] = []
	const values = {}
	variables.push({
		name: 'IP address of GoStreamDeck',
		variableId: `device_ip`,
	})
	values['device_ip'] = instance.config.host
	const MeChoice = getChoices(ActionType.Preview)
	for (let i = 0; i < MeChoice.length; i++) {
		variables.push({
			name: `Id of input_${i + 1}`,
			variableId: `pre${i + 1}_input_id`,
		})
		values[`pre${i + 1}_input_id`] = MeChoice[i].label
	}
	variables.push({
		name: 'Play State of PlayBack',
		variableId: `PlayState`,
	})
	values['PlayState'] = 'Play'
	variables.push({
		name: 'Loaded video file',
		variableId: `PlayFile`,
	})
	values['PlayFile'] = ''
	variables.push({
		name: 'Recording duration (hh:mm)',
		variableId: 'record_duration_hm',
	})
	values['record_duration_hm'] = '00:00:00'
	instance.setVariableDefinitions(variables)
	instance.setVariableValues(values)
}

export function updatePlayStatedVariables(instance: GoStreamInstance, state: boolean): void {
	const newValues = {}
	if (state) newValues['PlayState'] = 'Stop'
	else newValues['PlayState'] = 'Play'
	instance.setVariableValues(newValues)
}

export function updatePlayFileVariables(instance: GoStreamInstance, file: string): void {
	const newValues = {}
	newValues['PlayFile'] = file
	instance.setVariableValues(newValues)
}

export function updateRecordVariables(instance: GoStreamInstance, time: string): void {
	const newValues = {}
	newValues['record_duration_hm'] = time
	instance.setVariableValues(newValues)
}
