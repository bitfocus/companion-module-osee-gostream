import { CompanionPresetDefinitions } from '@companion-module/base'

import { MixEffectPresets } from './functions/mixEffect'
import { StreamingPresets } from './functions/streaming'
import { LivePresets } from './functions/live'
import { AudioMixerPresets } from './functions/audioMixer'
import { DownstreamKeyerPresets } from './functions/downstreamKeyer'
import { MacroPresets } from './functions/macro'
import { SuperSourcePresets } from './functions/superSource'
import { PlaybackPresets } from './functions/playback'
import { UpstreamKeyerPresets } from './functions/upstreamKeyer'

export function presets(): CompanionPresetDefinitions {
	const presets = {
		...MixEffectPresets.create(),
		...StreamingPresets.create(),
		...LivePresets.create(),
		...AudioMixerPresets.create(),
		...DownstreamKeyerPresets.create(),
		...MacroPresets.create(),
		...SuperSourcePresets.create(),
		...PlaybackPresets.create(),
		...UpstreamKeyerPresets.create(),
	}

	//Audio Mixer

	//Macro

	//FTB

	//Playback
	//

	return presets
}
