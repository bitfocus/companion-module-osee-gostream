import * as ActionFunctions from '../actions'
import * as Models from '../../../models'
import * as ActionState from '../state'
import { ActionId } from '../actionId'
import { Model } from '../../../models/types'

import type { CompanionInputFieldDropdown } from '@companion-module/base'

const correctSources = ['In 1', 'In 2', 'In 3', 'In 4', 'Aux', 'S/SRC', 'Still 1', 'Still 2']

test('Make sure correct items in input dropdown', () => {
	// Duet
	let model = Models.GetModelSpec(Model.Duet)
	let state = ActionState.create(model!)
	let actionDefs = ActionFunctions.create(model!, state)
	let dropdownChoices = <CompanionInputFieldDropdown>actionDefs[ActionId.PvwIndex]!.options[0]
	expect(dropdownChoices.choices.length).toBe(correctSources.length)
	let actualSources = dropdownChoices.choices.map((item) => item.label)
	expect(JSON.stringify(actualSources)).toBe(JSON.stringify(correctSources))

	// Deck
	model = Models.GetModelSpec(Model.Deck)
	state = ActionState.create(model!)
	actionDefs = ActionFunctions.create(model!, state)
	dropdownChoices = <CompanionInputFieldDropdown>actionDefs[ActionId.PvwIndex]!.options[0]
	expect(dropdownChoices.choices.length).toBe(correctSources.length)
	actualSources = dropdownChoices.choices.map((item) => item.label)
	expect(JSON.stringify(actualSources)).toBe(JSON.stringify(correctSources))
})
