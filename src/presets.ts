import { CompanionPresetDefinitions } from '@companion-module/base'
import type { GoStreamInstance } from './index'
import { MixEffectPresets } from './functions/mixEffect'
import { StreamingPresets } from './functions/streaming'
import { AudioMixerPresets } from './functions/audioMixer'
import { DownstreamKeyerPresets } from './functions/downstreamKeyer'
import { MacroPresets } from './functions/macro'
import { MultiSourcePresets } from './functions/multiSource'
import { PlaybackPresets } from './functions/playback'
import { RecordPresets } from './functions/record'
import { KeyerPresets } from './functions/upstreamKeyer'
import { MutiViewPresets } from './functions/mutiview'
import { AutoSwitchingPresets } from './functions/autoSwitching'

export function presets(instance: GoStreamInstance): CompanionPresetDefinitions {
	return {
		...AudioMixerPresets.create(instance.deck),
		...AutoSwitchingPresets.create(instance.deck),
		...MixEffectPresets.create(instance.deck),
		...StreamingPresets.create(instance.deck),
		...PlaybackPresets.create(instance.deck),
		...RecordPresets.create(instance.deck),
		...MultiSourcePresets.create(instance.deck),
		...DownstreamKeyerPresets.create(instance.deck),
		...MacroPresets.create(instance.deck),
		...KeyerPresets.create(instance.deck),
		...MutiViewPresets.create(instance.deck),
	}
}
