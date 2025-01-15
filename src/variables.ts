import { ActionType } from './enums'
import { getChoices } from './choices'
import { PlaybackVariables } from './functions/playback'
import { RecordVariables } from './functions/record'
import { StreamingVariables } from './functions/streaming'
import type { GoStreamInstance } from './index'
import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'

export function variables(instance: GoStreamInstance): CompanionVariableDefinition[] {
	const vars: CompanionVariableDefinition[] = [
		...PlaybackVariables.create(instance),
		...RecordVariables.create(instance),
		...StreamingVariables.create(instance),
	]

	vars.push({
		name: 'IP address of GoStreamDeck',
		variableId: `device_ip`,
	})
	const MeChoice = getChoices(ActionType.Preview)
	for (let i = 0; i < MeChoice.length; i++) {
		vars.push({
			name: `Id of input_${i + 1}`,
			variableId: `pre${i + 1}_input_id`,
		})
	}

	return vars
}

export function updateVariables(instance: GoStreamInstance): void {
	const newValues: CompanionVariableValues = {
		...PlaybackVariables.getValues(instance),
		...RecordVariables.getValues(instance),
		...StreamingVariables.getValues(instance),
	}

	instance.setVariableValues(newValues)
}
