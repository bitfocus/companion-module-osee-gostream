import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { VariableId } from './variableId'
import { AudioMixerStateT } from './state'
import { GoStreamModel } from '../../models/types'
import { ActionType } from '../../enums'

export function create(model: GoStreamModel): CompanionVariableDefinition[] {
	return [
		{
			// note: this will be a list of all enabled sources
			name: 'Audio Sources Enabled',
			variableId: VariableId.AudioEnabled,
		},
		{
			name: 'Audio: Headphones Source',
			variableId: VariableId.HeadphoneSource,
		},
		...model.getChoices(ActionType.AudioFader).map(({ label }) => {
			return { name: `Audio ${label} fader`, variableId: `${VariableId.AudioFader}${label}` }
		}),
	]
}

export function getValues(state: AudioMixerStateT): CompanionVariableValues {
	const newValues = {}

	// Input Enabled taken from ActionId.AudioEnable1 and FeedbackId.AudioEnable...
	const inputSpec = state.model.getChoices(ActionType.AudioEnableSource)
	// map "In #" to "in #" to improve readability because the capital "I" is too much like a 1.. (and map the rest for consistency)
	// lowercase is also more compact, so it fits better on the buttons.
	const inputSources = inputSpec.filter((_, index) => state.state[index]).map((item) => item.label.toLowerCase())

	// Headphones taken from ActionId.AudioMonitorSource and FeedbackId.AudioMonitorSource
	// note: we need to copy the array because sort() is in-place (and toSorted() may not be universally supported)
	const headphoneSpec = Array.from(state.model.getChoices(ActionType.AudioMonitorSource))
	const headphoneSource = headphoneSpec.sort((a, b) => Number(a.id) - Number(b.id)).map((item) => item.label)

	newValues[VariableId.AudioEnabled] = inputSources.join(', ')
	newValues[VariableId.HeadphoneSource] = headphoneSource[state.monitorSource]

	state.model.getChoices(ActionType.AudioFader).forEach(({ id, label }) => {
		newValues[`${VariableId.AudioFader}${label}`] = state.fader[id]
	})

	return newValues
}
