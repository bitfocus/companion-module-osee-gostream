import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'
import { ActionType } from './../../enums'
import { SuperSourceStyleChoices } from '../../model'
import { GoStreamModel } from '../../models/types'

const ptzSize = '18'
export function create(model: GoStreamModel): CompanionPresetDefinitions {
	const presets = {}
	presets[`SuperSource_Enable`] = {
		category: `SuperSource`,
		name: `SuperSource Enable`,
		type: 'button',
		style: {
			text: 'SS Enable',
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		feedbacks: [
			{
				feedbackId: FeedbackId.SuperSourceEnable,
				options: {},
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
						actionId: ActionId.SuperSourceEnable,
						options: { SuperSourceEnable: 2 },
					},
				],
				up: [],
			},
		],
	}
	const SourceChoices = model.getChoices(ActionType.SuperSourceSource)
	for (const ss of SourceChoices) {
		presets[`SuperSource_Source1_${ss.id}`] = {
			category: `SuperSource`,
			name: `Set source of SuperSource1 to ${ss.label}`,
			type: 'button',
			style: {
				text: `${ss.label} to SS1`,
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.SuperSourceSelect,
					options: { typeid: 0, SourceID: ss.id },
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
							actionId: ActionId.SuperSourceSource,
							options: { typeid: 0, SourceID: ss.id },
						},
					],
					up: [],
				},
			],
		}
	}
	for (const ss of SourceChoices) {
		presets[`SuperSource_Source2_${ss.id}`] = {
			category: `SuperSource`,
			name: `Set source of SuperSource2 to ${ss.label}`,
			type: 'button',
			style: {
				text: `${ss.label} to SS2`,
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.SuperSourceSelect,
					options: { typeid: 1, SourceID: ss.id },
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
							actionId: ActionId.SuperSourceSource,
							options: { typeId: 1, SourceID: ss.id },
						},
					],
					up: [],
				},
			],
		}
	}
	for (const ss of SourceChoices) {
		presets[`SuperSource_bg_${ss.id}`] = {
			category: `SuperSource`,
			name: `Set SuperSource background source to ${ss.label}`,
			type: 'button',
			style: {
				text: `${ss.label} to SSBG`,
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.SuperSourceSelect,
					options: { typeid: 2, SourceID: ss.id },
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
							actionId: ActionId.SuperSourceSource,
							options: { typeid: 2, SourceID: ss.id },
						},
					],
					up: [],
				},
			],
		}
	}
	const ss_styles = SuperSourceStyleChoices
	const ss_png64 = [
		'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',
	]

	for (const style of ss_styles) {
		presets[`SuperSource_style_${style.id}`] = {
			category: `SuperSource`,
			name: `SuperSource style ${style.label}`,
			type: 'button',
			style: {
				text: ``,
				size: 'auto',
				show_topbar: false,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
				png64: ss_png64[style.id],
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.SuperSourceControlStyle,
					options: { styleid: style.id },
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
							actionId: ActionId.SuperSourceControlStyle,
							options: { SuperSourceStyle: style.id },
						},
					],
					up: [],
				},
			],
		}
	}
	return presets
}
