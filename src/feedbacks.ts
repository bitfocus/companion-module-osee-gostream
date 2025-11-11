import { CompanionFeedbackDefinitions } from '@companion-module/base'
import type { GoStreamInstance } from './index'
import { MultiSourceFeedbacks } from './functions/multiSource'
import { MixEffectFeedbacks } from './functions/mixEffect'
import { StreamingFeedbacks } from './functions/streaming'
import { RecordFeedbacks } from './functions/record'
import { DownstreamKeyerFeedbacks } from './functions/downstreamKeyer'
import { MacroFeedbacks } from './functions/macro'
import { PlaybackFeedbacks } from './functions/playback'
import { MutiViewFeedbacks } from './functions/mutiview'
import { KeyerFeedbacks } from './functions/upstreamKeyer'
import { AudioMixerFeedbacks } from './functions/audioMixer'
import { AutoSwitchingFeedbacks } from './functions/autoSwitching'

export function feedbacks(instance: GoStreamInstance): CompanionFeedbackDefinitions {
	return {
		...KeyerFeedbacks.create(instance.deck),
		...RecordFeedbacks.create(instance.deck),
		...MultiSourceFeedbacks.create(instance.deck),
		...MixEffectFeedbacks.create(instance.deck),
		...StreamingFeedbacks.create(instance.deck),
		...DownstreamKeyerFeedbacks.create(instance.deck),
		...MacroFeedbacks.create(instance.deck),
		...PlaybackFeedbacks.create(instance.deck),
		...MutiViewFeedbacks.create(instance.deck),
		...AudioMixerFeedbacks.create(instance.deck),
		...AutoSwitchingFeedbacks.create(instance.deck),
	}
}
