import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'
import { SettingsAuxSourceChoices } from './../../model'
import { GoStreamModel } from '../../models/types'

const ptzSize = '18'
export function create(model: GoStreamModel): CompanionPresetDefinitions {
	const presets = {}
	for (const aux of SettingsAuxSourceChoices) {
		presets[`aux_${aux.id}`] = {
			category: `AUX Sources`,
			name: `AUX ${aux.id} button for ${aux.label}`,
			type: 'button',
			style: {
				text: `${aux.label}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.AuxBG,
					options: {
						auxSourceID: aux.id,
					},
					style: {
						bgcolor: combineRgb(255, 255, 0),
						color: combineRgb(0, 0, 0),
					},
				},
			],
			steps: [
				{
					down: [
						{
							actionId: ActionId.AuxSource,
							options: {
								auxSourceID: aux.id,
							},
						},
					],
					up: [],
				},
			],
		}
	}

	for (const port of model.outputPorts) {
		for (const source of model.OutputSources()) {
			presets['outSource_' + port.name + '_source_' + source.name] = {
				category: 'Settings',
				name: 'Settings ' + port.name + ' OutSource ' + source.name,
				type: 'button',
				style: {
					text: source.name,
					size: ptzSize,
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				feedbacks: [
					{
						feedbackId: FeedbackId.SettingOutSource,
						options: {
							OutId: port.id,
							OutSource: source.id,
						},
						style: {
							color: combineRgb(255, 255, 255),
							bgcolor: combineRgb(255, 0, 0),
						},
					},
				],
				steps: [
					{
						down: [
							{
								actionId: ActionId.OutSource,
								options: {
									OutId: port.id,
									OutSource: source.id,
								},
							},
						],
						up: [],
					},
				],
			}
		}
	}
	return presets
}
