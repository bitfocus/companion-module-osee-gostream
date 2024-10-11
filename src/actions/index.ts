import { createProgramPreviewActions } from './programPreview'
import { createTransitionActions } from './transition'
import { createDSKActions } from './downstreamKeyer'
import { createSuperSourceActions } from './superSource'
import { createAudioMixerActions } from './audioMixer'
import { createColorBackActions } from './colorBack'
import { createStillGeneratorActions } from './stillGenerator'
import { createMacroActions } from './macro'
import { createStreamingActions } from './streaming'
import { createPlaybackActions } from './playback'
import { createSettingsActions } from './settings'
import { createRecordActions } from './record'
import { createLiveActions } from './live'
import { type GoStreamDeckInstance } from '../index'
import { type CompanionActionDefinitions, type CompanionActionEvent } from '@companion-module/base'

export function GetActionsList(_self: GoStreamDeckInstance): CompanionActionDefinitions {
	return {
		...createProgramPreviewActions(_self),
		...createTransitionActions(_self),
		...createDSKActions(_self),
		...createSuperSourceActions(_self),
		...createAudioMixerActions(_self),
		...createColorBackActions(_self),
		...createStillGeneratorActions(_self),
		...createMacroActions(_self),
		...createStreamingActions(_self),
		...createPlaybackActions(_self),
		...createSettingsActions(_self),
		...createRecordActions(_self),
		...createLiveActions(_self),
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
