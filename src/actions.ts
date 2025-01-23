import { SuperSourceActions } from './functions/superSource'
import { MixEffectActions } from './functions/mixEffect'
import { StreamingActions } from './functions/streaming'
import { RecordActions } from './functions/record'
import { StillGeneratorActions } from './functions/stillGenerator'
import { PlaybackActions } from './functions/playback'
import { AudioMixerActions } from './functions/audioMixer'
import { ColorBackActions } from './functions/colorBack'
import { DownstreamKeyerActions } from './functions/downstreamKeyer'
import { SettingsActions } from './functions/settings'
import { MacroActions } from './functions/macro'
import { UpstreamKeyerActions } from './functions/upstreamKeyer'

import type { GoStreamInstance } from './index'
import type { CompanionActionDefinitions } from '@companion-module/base'

export function GetActionsList(instance: GoStreamInstance): CompanionActionDefinitions {
	return {
		...MixEffectActions.create(instance.model, instance.states.MixEffect),
		...SuperSourceActions.create(instance.model, instance.states.SuperSource),
		...StreamingActions.create(instance.model, instance.states.Streaming),
		...RecordActions.create(instance.model, instance.states.Record),
		...StillGeneratorActions.create(instance.model, instance.states.StillGenerator),
		...PlaybackActions.create(instance.model, instance.states.Playback),
		...AudioMixerActions.create(instance.model, instance.states.AudioMixer),
		...ColorBackActions.create(instance.model, instance.states.ColorBack),
		...DownstreamKeyerActions.create(instance.model, instance.states.DownstreamKeyer),
		...SettingsActions.create(instance.model, instance.states.Settings),
		...MacroActions.create(instance.model, instance.states.Macros),
		...UpstreamKeyerActions.create(instance.model, instance.states.UpstreamKeyer),
	}
}
