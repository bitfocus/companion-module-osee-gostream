import { Model } from '../connection/enums'
import { StreamModelSpec } from './types'

export class ModelSpecDeck extends StreamModelSpec {
	constructor() {
		super()
		this.id = Model.Deck
		this.label = 'Deck'
	}
}
