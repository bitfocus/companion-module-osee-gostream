import { PlaybackVariables } from './functions/playback'
import { RecordVariables } from './functions/record'
import { StreamingVariables } from './functions/streaming'
import { SettingsVariables } from './functions/settings'
import type { GoStreamInstance } from './index'
import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'

export function variables(instance: GoStreamInstance): CompanionVariableDefinition[] {
	const vars: CompanionVariableDefinition[] = [
		...PlaybackVariables.create(instance),
		...RecordVariables.create(instance),
		...StreamingVariables.create(instance),
		...SettingsVariables.create(instance),
	]

	vars.push({
		name: 'IP address of GoStreamDeck',
		variableId: `device_ip`,
	})	

	return vars
}

export function updateVariables(instance: GoStreamInstance): void {
	const newValues: CompanionVariableValues = {
		...PlaybackVariables.getValues(instance),
		...RecordVariables.getValues(instance),
		...StreamingVariables.getValues(instance),
		...SettingsVariables.getValues(instance),
	}

	instance.setVariableValues(newValues)
}
