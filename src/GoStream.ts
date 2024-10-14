import { variables } from './variables'
import { feedbacks } from './feedback'
import { presets } from './presets'
import { Create } from './state'
import { disconnectSocket, connect } from './connection'
import { GoStreamInstance } from './index'
import { CompanionFeedbackDefinitions, CompanionPresetDefinitions } from '@companion-module/base'

export class GoStream {
	instance
	constructor(instance: GoStreamInstance) {
		this.instance = instance
		this.instance.states = Create()
	}
	getVariables(): void {
		variables(this.instance)
	}
	getFeedbacks(): CompanionFeedbackDefinitions {
		return feedbacks(this.instance)
	}
	getPresets(): CompanionPresetDefinitions {
		return presets()
	}
	connect(): void {
		connect(this.instance)
	}
	disconnectSocket(): void {
		disconnectSocket()
	}
}
