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
		...MixEffectActions.create(instance),
		...SuperSourceActions.create(instance),
		...StreamingActions.create(instance),
		...RecordActions.create(instance),
		...StillGeneratorActions.create(instance),
		...PlaybackActions.create(instance),
		...AudioMixerActions.create(instance),
		...ColorBackActions.create(instance),
		...DownstreamKeyerActions.create(instance),
		...SettingsActions.create(instance),
		...MacroActions.create(instance),
		...UpstreamKeyerActions.create(instance),
	}
}
