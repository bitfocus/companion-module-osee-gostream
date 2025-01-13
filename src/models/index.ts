import type { DropdownChoice } from '@companion-module/base'
import { type IModelSpec, ModelId } from './types'
import { ModelSpecAuto } from './auto'
import { ModelSpecDeck } from './deck'
import { ModelSpecDuet } from './duet'
import { PortType } from '../enums'

export const ALL_MODELS: IModelSpec[] = [ModelSpecAuto, ModelSpecDeck, ModelSpecDuet]
export const ALL_MODEL_CHOICES: DropdownChoice[] = ALL_MODELS.map(({ id, label }) => ({ id, label }))

export function GetModelSpec(id: ModelId): IModelSpec | undefined {
	return ALL_MODELS.find((m) => m.id === id)
}

export function GetAutoDetectModel(): IModelSpec {
	return ModelSpecAuto
}

export function getInputChoices(model: IModelSpec, type?: PortType): DropdownChoice[] {
	const choices: DropdownChoice[] = []
	const portType = type ? type : PortType.All
	model.inputs.forEach((input) => {
		if (input.type & portType) {
			choices.push({ id: input.id, label: input.longName })
		}
	})
	return choices
}

export function getOutputChoices(model: IModelSpec, type?: PortType): DropdownChoice[] {
	const choices: DropdownChoice[] = []
	const portType = type ? type : PortType.All
	model.outputs.forEach((output) => {
		if (output.type & portType) {
			choices.push({ id: output.id, label: output.longName })
		}
	})
	return choices
}

export const SettingsColorChoices = []
export function getColorChoices(model: IModelSpec): DropdownChoice[] {
	const choices: DropdownChoice[] = []
	const HDMI_colorSpaces = [
		'Auto',
		'RGB Full',
		'RGB Limit',
		'YCbCr422 Full',
		'YCbCr422 Limit',
		'YCbCr444 Full',
		'YCbCr444 Limit',
	]
	// All HW inputs are the same, either SDI (if available) or HDMI
	// just look at first input to determine the list
	if (model.inputs[0].type | PortType.SDI) {
		choices.push({ id: 0, label: 'SDI' })
	}
	const startIndex = choices.length
	if (model.inputs[0].type | PortType.HDMI) {
		const hdmi = HDMI_colorSpaces.map((space, index) => ({ id: index + startIndex, label: 'HDMI ' + space }))
		choices.push(...hdmi)
	}

	return choices
}
