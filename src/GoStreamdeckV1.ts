import { GetActionsList } from './actions/index'
import { variables } from './variables'
import { feedbacks } from './feedback'
import { presets } from './presets'
import { Create } from './state'
import { disconnectSocket, connect } from './connection'

class GoStreamDeckV1 {
	instance
	constructor(instance) {
		this.instance = instance
		this.instance.states = Create()
	}
	getVariables() {
		return variables(this.instance)
	}
	getActions() {
		return GetActionsList(this.instance) //actions(this.instance)
	}
	getFeedbacks() {
		return feedbacks(this.instance)
	}
	getPresets() {
		return presets(this.instance)
	}
	connect() {
		return connect(this.instance)
	}
	disconnectSocket() {
		return disconnectSocket()
	}
}

export { GoStreamDeckV1 }
