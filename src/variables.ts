import { PlaybackVariables } from './functions/playback'
import { RecordVariables } from './functions/record'
import { StreamingVariables } from './functions/streaming'
import { SettingsVariables } from './functions/settings'
import type { GoStreamInstance } from './index'
import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'

export function variables(instance: GoStreamInstance): CompanionVariableDefinition[] {
	const vars: CompanionVariableDefinition[] = [
		...PlaybackVariables.create(instance.model),
		...RecordVariables.create(instance.model),
		...StreamingVariables.create(instance.model),
		...SettingsVariables.create(instance.model),
	]

	vars.push({
		name: 'IP address of GoStreamDeck',
		variableId: `device_ip`,
	})

	return vars
}

export function updateVariables(instance: GoStreamInstance): void {
	const newValues: CompanionVariableValues = {
		...PlaybackVariables.getValues(instance.states.Playback),
		...RecordVariables.getValues(instance.states.Record),
		...StreamingVariables.getValues(instance.states.Streaming),
		...SettingsVariables.getValues(instance.states.Settings),
	}

	instance.setVariableValues(newValues)
}
