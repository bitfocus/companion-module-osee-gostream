import { MultiSourceActions } from './functions/multiSource'
import { MixEffectActions } from './functions/mixEffect'
import { StreamingActions } from './functions/streaming'
import { RecordActions } from './functions/record'
import { PlaybackActions } from './functions/playback'
import { AudioMixerActions } from './functions/audioMixer'
import { ColorBackActions } from './functions/colorBack'
import { DownstreamKeyerActions } from './functions/downstreamKeyer'
import { MutiViewActions } from './functions/mutiview'
import { MacroActions } from './functions/macro'
import { KeyerActions } from './functions/upstreamKeyer'
import { DeviceInfoActions } from './functions/device'
import type { GoStreamInstance } from './index'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { AutoSwitchingActions } from './functions/autoSwitching'
import { MediaPlayerActions } from './functions/mediaPlayer'
import { IOActions } from './functions/ioSetting'

export function GetActionsList(instance: GoStreamInstance): CompanionActionDefinitions {
	return {
		...DeviceInfoActions.create(instance.deck),
		...MixEffectActions.create(instance.deck),
		...AutoSwitchingActions.create(instance.deck),
		...AudioMixerActions.create(instance.deck,instance.model),
		...MultiSourceActions.create(instance.deck),
		...StreamingActions.create(instance.deck),
		...RecordActions.create(instance.deck,instance.model),
		...PlaybackActions.create(instance.deck),
		...ColorBackActions.create(instance.deck),
		...DownstreamKeyerActions.create(instance.deck),
		...MutiViewActions.create(instance.deck),
		...MacroActions.create(instance.deck),
		...KeyerActions.create(instance.deck),
		...MediaPlayerActions.create(instance.deck),
		...IOActions.create(instance.deck),
	}
}
