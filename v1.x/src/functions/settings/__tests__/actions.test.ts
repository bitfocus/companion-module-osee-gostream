import * as ActionFunctions from '../actions'
import * as Models from '../../../models'
import * as ActionState from '../state'
import { ActionId } from '../actionId'
import { Model } from '../../../models/types'
import { correctOutputSources } from './constants'
import type { CompanionInputFieldDropdown } from '@companion-module/base'

test('Make sure correct items in input dropdown', () => {
	// Duet
	let model = Models.GetModelSpec(Model.Duet)
	let state = ActionState.create(model!)
	let actionDefs = ActionFunctions.create(model!, state)
	let dropdownChoices = <CompanionInputFieldDropdown>actionDefs[ActionId.OutSource]!.options[1]
	expect(dropdownChoices.choices.length).toBe(correctOutputSources.length)
	let actualSources = dropdownChoices.choices.map((item) => item.label)
	expect(JSON.stringify(actualSources)).toBe(JSON.stringify(correctOutputSources))

	// Deck
	model = Models.GetModelSpec(Model.Deck)
	state = ActionState.create(model!)
	actionDefs = ActionFunctions.create(model!, state)
	dropdownChoices = <CompanionInputFieldDropdown>actionDefs[ActionId.OutSource]!.options[1]
	expect(dropdownChoices.choices.length).toBe(correctOutputSources.length)
	actualSources = dropdownChoices.choices.map((item) => item.label)
	expect(JSON.stringify(actualSources)).toBe(JSON.stringify(correctOutputSources))
})
