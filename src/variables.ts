import { AudioMixerVariables } from './functions/audioMixer'
import { MixEffectVariables } from './functions/mixEffect'
import { PlaybackVariables } from './functions/playback'
import { RecordVariables } from './functions/record'
import { StreamingVariables } from './functions/streaming'
import { MutiViewVariables } from './functions/mutiview'
import { MultiSourceVariables } from './functions/multiSource'
import { KeyerVariables } from './functions/upstreamKeyer'
import type { GoStreamInstance } from './index'

import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'

export function variables(instance: GoStreamInstance): CompanionVariableDefinition[] {
	const vars: CompanionVariableDefinition[] = [
		...AudioMixerVariables.create(instance.deck.state),
		...MixEffectVariables.create(instance.deck.state),
		...PlaybackVariables.create(instance.deck.state),
		...RecordVariables.create(instance.deck.state),
		...StreamingVariables.create(instance.deck.state),
		...MutiViewVariables.create(instance.deck.state),
		...MultiSourceVariables.create(instance.deck.state),
		...KeyerVariables.create(instance.deck.state),
	]

	vars.push({
		name: 'IP address of GoStreamDeck',
		variableId: `device_ip`,
	})

	return vars
}

export function updateVariables(instance: GoStreamInstance): void {
	const newValues: CompanionVariableValues = {
		...AudioMixerVariables.getValues(instance.deck.state),
		...MixEffectVariables.getValues(instance.deck.state),
		...PlaybackVariables.getValues(instance.deck.state),
		...RecordVariables.getValues(instance.deck.state),
		...StreamingVariables.getValues(instance.deck.state),
		...MutiViewVariables.getValues(instance.deck.state),
		...MultiSourceVariables.getValues(instance.deck.state),
		...KeyerVariables.getValues(instance.deck.state),
	}

	instance.setVariableValues(newValues)
}
