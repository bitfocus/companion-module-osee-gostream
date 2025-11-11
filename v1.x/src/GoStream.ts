import { variables } from './variables'
import { feedbacks } from './feedbacks'
import { presets } from './presets'
import { create } from './state'
import { disconnectSocket, connect } from './connection'
import { GoStreamInstance } from './index'
import {
	CompanionFeedbackDefinitions,
	CompanionPresetDefinitions,
	CompanionVariableDefinition,
	TCPHelper,
} from '@companion-module/base'

export class GoStream {
	instance
	connection: TCPHelper | null
	constructor(instance: GoStreamInstance) {
		this.instance = instance
		this.instance.states = create(instance.model)
		this.connection = null
	}
	getVariables(): CompanionVariableDefinition[] {
		return variables(this.instance)
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
