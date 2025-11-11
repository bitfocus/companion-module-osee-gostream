import type { DropdownChoice } from '@companion-module/base'
import { type StreamModelSpec } from './types'
import { ModelSpecAuto } from './auto'
import { ModelSpecDuet8ISO } from './duet_8iso'
import { ModelSpecDeck } from './deck'
import { ModelSpecDuet } from './duet'
import { Model } from '../connection/enums'


export const ALL_MODELS: StreamModelSpec[] = [new ModelSpecAuto(), new ModelSpecDuet8ISO(),new ModelSpecDeck(), new ModelSpecDuet()]
export const ALL_MODEL_CHOICES: DropdownChoice[] = ALL_MODELS.map(({ id, label }) => ({ id, label }))

export function GetModelSpec(id: Model): StreamModelSpec | undefined {
	return ALL_MODELS.find((m) => m.id === id)
}

export function GetAutoDetectModel(): StreamModelSpec {
	return ALL_MODELS[0]
}