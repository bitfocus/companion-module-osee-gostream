import { CompanionFeedbackDefinitions } from '@companion-module/base'
import type { GoStreamInstance } from './index'
import { SuperSourceFeedbacks } from './functions/superSource'
import { MixEffectFeedbacks } from './functions/mixEffect'
import { StreamingFeedbacks } from './functions/streaming'
import { RecordFeedbacks } from './functions/record'
import { StillGeneratorFeedbacks } from './functions/stillGenerator'
import { DownstreamKeyerFeedbacks } from './functions/downstreamKeyer'
import { MacroFeedbacks } from './functions/macro'
import { PlaybackFeedbacks } from './functions/playback'
import { SettingsFeedbacks } from './functions/settings'
import { UpstreamKeyerFeedbacks } from './functions/upstreamKeyer'

export function feedbacks(instance: GoStreamInstance): CompanionFeedbackDefinitions {
	return {
		...UpstreamKeyerFeedbacks.create(instance),
		...RecordFeedbacks.create(instance),
		...SuperSourceFeedbacks.create(instance),
		...MixEffectFeedbacks.create(instance),
		...StreamingFeedbacks.create(instance),
		...StillGeneratorFeedbacks.create(instance),
		...DownstreamKeyerFeedbacks.create(instance),
		...MacroFeedbacks.create(instance),
		...PlaybackFeedbacks.create(instance),
		...SettingsFeedbacks.create(instance),
	}
}
