import type { DropdownChoice } from '@companion-module/base'
import { type GoStreamModel, type IPortSpec } from './types'
//import { AutoModel } from './auto'
//import { GoStreamDeck } from './deck'
//import { GoStreamDuet } from './duet'
import { PortType } from '../enums'

//export const ALL_MODELS: GoStreamModel[] = [AutoModel, GoStreamDeck, GoStreamDuet]
export const ALL_MODEL_CHOICES: DropdownChoice[] = [
	{ id: 0, label: 'Auto' },
	{ id: 1, label: 'Deck' },
	{ id: 2, label: 'Duet' },
]

/*export function GetModelSpec(id: ModelId): GoStreamModel | undefined {
	return ALL_MODEL_CHOICES.find((m) => m.id === id)
}

export function GetAutoDetectModel(): GoStreamModel {
	return AutoModel
}*/

export function getInputChoices(model: GoStreamModel, type?: PortType): DropdownChoice[] {
	const choices: DropdownChoice[] = []
	const portType = type ? type : PortType.All
	model.inputs.forEach((input) => {
		if (input.type & portType) {
			choices.push({ id: input.id, label: input.longName })
		}
	})
	return choices
}

export function getInputs(model: GoStreamModel, type?: PortType): IPortSpec[] {
	const portType = type ? type : PortType.All
	const ret = model.inputs.filter((input) => input.type & portType)
	return ret
}

export function getOutputChoices(model: GoStreamModel, type?: PortType): DropdownChoice[] {
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
export function getColorChoices(model: GoStreamModel): DropdownChoice[] {
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
