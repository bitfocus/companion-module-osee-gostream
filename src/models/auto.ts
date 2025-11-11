import { Model } from '../connection/enums'
import { StreamModelSpec } from './types'

export class ModelSpecAuto extends StreamModelSpec {
	constructor() {
		super()
		this.id = Model.Unknown
		this.label = 'Auto Detect'
	}
}
