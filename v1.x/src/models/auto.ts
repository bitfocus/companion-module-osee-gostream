import { MODEL_AUTO_DETECT, GoStreamModel } from './types'

export class AutoModel extends GoStreamModel {
	constructor() {
		super()
		this.id = MODEL_AUTO_DETECT
		this.label = 'Auto Detect'
		this.outputs = []
		this.inputs = []
		this.streams = 0
		this.transitionTypes = 0
		this.stillSlots = 0
	}
}
