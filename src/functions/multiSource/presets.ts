import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { MutiSource } from "../../connection/actionids"
import { FeedbackId } from './feedbackId'
// import { ActionType } from './../../enums'
import { GetMultiSourceWindowChoices } from '../../model'
import { getEnumKeyByValue } from '../../util'
import { StreamDeck } from '../../connection/streamdeck'
import { sourceID } from '../../connection/enums'

// const ptzSize = '18'
export function create(deck: StreamDeck): CompanionPresetDefinitions {
	const presets = {}

	const winChoices = GetMultiSourceWindowChoices(deck.state);
	for (const win of winChoices) {
		presets[`MultiSource_Enable_${win.id}`] = {
			category: `MultiSource`,
			name: `Set the ${win.label} enable in MultiSource`,
			type: 'button',
			style: {
				text: `${win.label} of Enable`,
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.MultiSourceWinEnable,
					options: { windowID: win.id, multiSourceWindowEnable: 1 },
					style: {
						bgcolor: combineRgb(255, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
			],
			steps: [
				{
					down: [
						{
							actionId: MutiSource.ActionId.MultiSourceWindowEnable,
							options: { windowID: win.id, multiSourceWindowEnable: 2 },
						},
					],
					up: [],
				},
			],
		}
	}
	const sources = deck.state?.mutiSource.multiSourceWindowsSources ? deck.state.mutiSource.multiSourceWindowsSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : []
	for (const win of winChoices) {
		for (const _source of sources) {
			presets[`MultiSource_Source_${win.id}_${_source.id}`] = {
				category: `MultiSource`,
				name: `Set the ${win.label} source in MultiSource`,
				type: 'button',
				style: {
					text: `${_source.label} to ${win.label}`,
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				feedbacks: [
					{
						feedbackId: FeedbackId.MultiSourceWinSelectSource,
						options: { windowID: win.id, multiSourceWindowSource: _source.id },
						style: {
							bgcolor: combineRgb(255, 0, 0),
							color: combineRgb(255, 255, 255),
						},
					},
				],
				steps: [
					{
						down: [
							{
								actionId: MutiSource.ActionId.MultiSourceWindowSource,
								options: { windowID: win.id, multiSourceWindowSource: _source.id },
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
