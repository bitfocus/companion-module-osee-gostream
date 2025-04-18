import { MixEffectVariables } from './functions/mixEffect'
import { PlaybackVariables } from './functions/playback'
import { RecordVariables } from './functions/record'
import { StreamingVariables } from './functions/streaming'
import { SettingsVariables } from './functions/settings'
import { UpstreamKeyerVariables } from './functions/upstreamKeyer'
import type { GoStreamInstance } from './index'
import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'

export function variables(instance: GoStreamInstance): CompanionVariableDefinition[] {
	const vars: CompanionVariableDefinition[] = [
		...MixEffectVariables.create(instance.model),
		...PlaybackVariables.create(instance.model),
		...RecordVariables.create(instance.model),
		...StreamingVariables.create(instance.model),
		...SettingsVariables.create(instance.model),
		...UpstreamKeyerVariables.create(instance.model),
	]

	vars.push({
		name: 'IP address of GoStreamDeck',
		variableId: `device_ip`,
	})

	return vars
}

export function updateVariables(instance: GoStreamInstance): void {
	const newValues: CompanionVariableValues = {
		...MixEffectVariables.getValues(instance.states.MixEffect),
		...PlaybackVariables.getValues(instance.states.Playback),
		...RecordVariables.getValues(instance.states.Record),
		...StreamingVariables.getValues(instance.states.Streaming),
		...SettingsVariables.getValues(instance.states.Settings),
		...UpstreamKeyerVariables.getValues(instance.states.UpstreamKeyer),
	}

	instance.setVariableValues(newValues)
}
