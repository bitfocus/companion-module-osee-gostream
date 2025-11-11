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
import { AudioMixerFeedbacks } from './functions/audioMixer'

export function feedbacks(instance: GoStreamInstance): CompanionFeedbackDefinitions {
	return {
		...UpstreamKeyerFeedbacks.create(instance.model, instance.states.UpstreamKeyer),
		...RecordFeedbacks.create(instance.model, instance.states.Record),
		...SuperSourceFeedbacks.create(instance.model, instance.states.SuperSource),
		...MixEffectFeedbacks.create(instance.model, instance.states.MixEffect),
		...StreamingFeedbacks.create(instance.model, instance.states.Streaming),
		...StillGeneratorFeedbacks.create(instance.model, instance.states.StillGenerator),
		...DownstreamKeyerFeedbacks.create(instance.model, instance.states.DownstreamKeyer),
		...MacroFeedbacks.create(instance.model, instance.states.Macro),
		...PlaybackFeedbacks.create(instance.model, instance.states.Playback),
		...SettingsFeedbacks.create(instance.model, instance.states.Settings),
		...AudioMixerFeedbacks.create(instance.model, instance.states.AudioMixer),
	}
}
