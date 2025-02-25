import { CompanionPresetDefinitions } from '@companion-module/base'
import type { GoStreamInstance } from './index'
import { MixEffectPresets } from './functions/mixEffect'
import { StreamingPresets } from './functions/streaming'
import { AudioMixerPresets } from './functions/audioMixer'
import { DownstreamKeyerPresets } from './functions/downstreamKeyer'
import { MacroPresets } from './functions/macro'
import { SuperSourcePresets } from './functions/superSource'
import { PlaybackPresets } from './functions/playback'
import { UpstreamKeyerPresets } from './functions/upstreamKeyer'
import { RecordPresets } from './functions/record'
import { SettingsPresets } from './functions/settings'

export function presets(instance: GoStreamInstance): CompanionPresetDefinitions {
	return {
		...MixEffectPresets.create(instance.model),
		...StreamingPresets.create(instance.model),
		...AudioMixerPresets.create(instance.model),
		...DownstreamKeyerPresets.create(instance.model),
		...MacroPresets.create(instance.model),
		...SuperSourcePresets.create(instance.model),
		...PlaybackPresets.create(instance.model),
		...RecordPresets.create(instance.model),
		...UpstreamKeyerPresets.create(instance.model),
		...SettingsPresets.create(instance.model),
	}
}
