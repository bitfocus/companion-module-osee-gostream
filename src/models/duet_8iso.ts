import { Model } from '../connection/enums'
import { StreamModelSpec } from './types'


export class ModelSpecDuet8ISO extends StreamModelSpec {
	constructor() {
		super()
		this.id = Model.Duet_8ISO
		this.label = 'Duet_8_ISO'
		this.audioMix.effectEnable=true
	}
}