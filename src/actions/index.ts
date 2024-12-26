//import { createProgramPreviewActions } from './programPreview'
//import { createTransitionActions } from './transition'
import { createDSKActions } from './downstreamKeyer'
import { createUSKActions } from './upstreamKeyer'
import { createColorBackActions } from './colorBack'
import { createMacroActions } from './macro'
import { createSettingsActions } from './settings'
import { SuperSourceActions } from '../functions/superSource'
import { MixEffectActions } from '../functions/mixEffect'
import { StreamingActions } from '../functions/streaming'
import { LiveActions } from '../functions/live'
import { RecordActions } from '../functions/record'
import { StillGeneratorActions } from '../functions/stillGenerator'
import { PlaybackActions } from '../functions/playback'
import { AudioMixerActions } from '../functions/audioMixer'

import type { GoStreamInstance } from '../index'
import { type CompanionActionDefinitions, type CompanionActionEvent } from '@companion-module/base'

export function GetActionsList(instance: GoStreamInstance): CompanionActionDefinitions {
	return {
		...MixEffectActions.create(instance),
		...SuperSourceActions.create(instance),
		...StreamingActions.create(instance),
		...LiveActions.create(instance),
		...RecordActions.create(instance),
		...StillGeneratorActions.create(instance),
		...PlaybackActions.create(instance),
		...AudioMixerActions.create(instance),
		// OLD TYPE ACTIONS
		...createUSKActions(instance),
		...createDSKActions(instance),
		...createColorBackActions(instance),
		...createMacroActions(instance),
		...createSettingsActions(instance),
	}
}

export function getOptNumber(action: CompanionActionEvent, key: string, defVal?: number): number {
	const rawVal = action.options[key]
	if (defVal !== undefined && rawVal === undefined) return defVal
	const val = Number(rawVal)
	if (isNaN(val)) {
		throw new Error(`Invalid option '${key}'`)
	}
	return val
}

export function getOptString(action: CompanionActionEvent, key: string, defVal?: string): string {
	const rawVal = action.options[key]
	if (defVal !== undefined && rawVal === undefined) return defVal
	const val = String(rawVal)
	if (typeof rawVal !== 'string') {
		throw new Error(`Invalid option '${key}'`)
	}
	return val
}
