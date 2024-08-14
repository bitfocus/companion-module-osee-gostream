import {
	CompanionActionDefinitions,
	CompanionFeedbackDefinitions,
	CompanionPresetDefinitions,
} from '@companion-module/base'
import { GoSteamDeckInstance, GoSteamDeckClient } from '.'

import { actions } from './actions'
import { feedbacks } from './feedback'
import { presets } from './presets'
import { variables } from './variables'
import { connect, disconnectSocket } from './connection'
import { Create } from './state'

export class GoSteamDeckV1 implements GoSteamDeckClient {
	instance: GoSteamDeckInstance

	constructor(instance: GoSteamDeckInstance) {
		this.instance = instance;
		this.instance.states=Create();
	}

	getVariables(): void {
		variables(this.instance)
	}

	getActions(): CompanionActionDefinitions {
		return actions(this.instance)
	}

	getFeedbacks(): CompanionFeedbackDefinitions {
		return feedbacks(this.instance)
	}

	getPresets(): CompanionPresetDefinitions {
		return presets(this.instance)
	}

	connect(): void {
		connect(this.instance)
	}

	disconnectSocket(): void {
		disconnectSocket()
	}
}
