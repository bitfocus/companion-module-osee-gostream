import { AudioMixerVariables } from './functions/audioMixer'
import { MixEffectVariables } from './functions/mixEffect'
import { PlaybackVariables } from './functions/playback'
import { RecordVariables } from './functions/record'
import { StreamingVariables } from './functions/streaming'
import { SettingsVariables } from './functions/settings'
import { SuperSourceVariables } from './functions/superSource'
import { UpstreamKeyerVariables } from './functions/upstreamKeyer'
import type { GoStreamInstance } from './index'
import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'

export function variables(instance: GoStreamInstance): CompanionVariableDefinition[] {
	const vars: CompanionVariableDefinition[] = [
		...AudioMixerVariables.create(instance.model),
		...MixEffectVariables.create(instance.model),
		...PlaybackVariables.create(instance.model),
		...RecordVariables.create(instance.model),
		...StreamingVariables.create(instance.model),
		...SettingsVariables.create(instance.model),
		...SuperSourceVariables.create(instance.model),
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
		...AudioMixerVariables.getValues(instance.states.AudioMixer),
		...MixEffectVariables.getValues(instance.states.MixEffect),
		...PlaybackVariables.getValues(instance.states.Playback),
		...RecordVariables.getValues(instance.states.Record),
		...StreamingVariables.getValues(instance.states.Streaming),
		...SettingsVariables.getValues(instance.states.Settings),
		...SuperSourceVariables.getValues(instance.states.SuperSource),
		...UpstreamKeyerVariables.getValues(instance.states.UpstreamKeyer),
	}

	instance.setVariableValues(newValues)
}
