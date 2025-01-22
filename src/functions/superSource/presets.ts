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
			text: 'SSEnable',
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
			name: `SuperSource Source1 ${ss.label}`,
			type: 'button',
			style: {
				text: `SS1_${ss.label}`,
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
							actionId: ActionId.SuperSourceSource1,
							options: { SuperSourceSource1: ss.id },
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
			name: `SuperSource Source2 ${ss.label}`,
			type: 'button',
			style: {
				text: `SS2_${ss.label}`,
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
							actionId: ActionId.SuperSourceSource2,
							options: { SuperSourceSource2: ss.id },
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
			name: `SuperSource Background ${ss.label}`,
			type: 'button',
			style: {
				text: `SSBG_${ss.label}`,
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
							actionId: ActionId.SuperSourceBackground,
							options: { SuperSourceBackground: ss.id },
						},
					],
					up: [],
				},
			],
		}
	}
	const ss_styles = SuperSourceStyleChoices
	for (const style of ss_styles) {
		presets[`SuperSource_style_${style.id}`] = {
			category: `SuperSource`,
			name: `SuperSource style ${style.label}`,
			type: 'button',
			style: {
				text: `SS_${style.label}`,
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
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
