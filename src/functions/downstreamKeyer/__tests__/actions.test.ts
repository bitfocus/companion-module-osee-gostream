import { ActionId } from '../actionId'
import * as DSKActions from '../actions'
import * as DSKState from '../state'
import * as Models from '../../../models'
import { Model } from '../../../models/types'
import type { CompanionInputFieldDropdown } from '@companion-module/base'
import { sourcesDomainRange } from './constants'

test('Make sure all actions have an action definition', () => {
	const model = Models.GetModelSpec(Model.Duet)!
	const state = DSKState.create(model)
	const actionDefs = DSKActions.create(model, state)
	expect(Object.keys(actionDefs).length).toBe(Object.keys(ActionId).length)
})

test('Check DskSourceFillKey choices', () => {
	const model = Models.GetModelSpec(Model.Duet)!
	const state = DSKState.create(model)
	const actionDefs = DSKActions.create(model, state)
	const dropdownChoices = <CompanionInputFieldDropdown>actionDefs[ActionId.DskSourceFillKey]!.options[0]
	expect(dropdownChoices.choices.length).toBe(sourcesDomainRange.length)
	const actualSources = dropdownChoices.choices.map((item) => item.label)
	expect(JSON.stringify(actualSources)).toBe(JSON.stringify(sourcesDomainRange))
})
