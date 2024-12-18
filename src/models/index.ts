import type { DropdownChoice } from '@companion-module/base'
import { type IModelSpec, ModelId } from './types'
import { ModelSpecAuto } from './auto'
import { ModelSpecDeck } from './deck'
import { ModelSpecDuet } from './duet'

export const ALL_MODELS: IModelSpec[] = [ModelSpecAuto, ModelSpecDeck, ModelSpecDuet]

export const ALL_MODEL_CHOICES: DropdownChoice[] = ALL_MODELS.map(({ id, label }) => ({ id, label }))

export function GetModelSpec(id: ModelId): IModelSpec | undefined {
	return ALL_MODELS.find((m) => m.id === id)
}

export function GetAutoDetectModel(): IModelSpec {
	return ModelSpecAuto
}
