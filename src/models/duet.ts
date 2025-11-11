import { Model } from '../connection/enums'
import {StreamModelSpec } from './types'

export class ModelSpecDuet extends StreamModelSpec {
	constructor() {
		super()
		this.id = Model.Duet_SDI
		this.label = 'Duet_SDI'
		
	}
}
