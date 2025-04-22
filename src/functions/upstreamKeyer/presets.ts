import { ActionId } from './actionId'
import * as MixEffect from './../mixEffect/actionId'
import { FeedbackId } from './feedbackId'
import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionType } from './../../enums'
import { GoStreamModel } from '../../models/types'

export function create(model: GoStreamModel): CompanionPresetDefinitions {
	const presets = {}
	const sources = model.getChoices(ActionType.LumaKeySourceKey)
	for (const source of sources) {
		let id = Number(source.id) + 1
		if (id === sources.length) id = 0
		presets[`UpStreamKeylumakeySourceAndKey_${source.id}`] = {
			category: `USK: lumakey`,
			name: `Set source ${source.label}`,
			type: 'button',
			style: {
				text: `${source.label}`,
				size: '24',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.KeySourceFill,
					options: {
						USKKeyType: 0,
						USKSourceFill: source.id,
					},
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
							actionId: ActionId.UpStreamKeyFillKeyType,
							options: {
								FillSource: source.id,
								KeySource: id,
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`UpStreamKeyChromaFillSource_${source.id}`] = {
			category: `USK: chromakey`,
			name: `Set fill source ${source.label}`,
			type: 'button',
			style: {
				text: `Chroma fill\\n${source.label}`,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.KeySourceFill,
					options: {
						USKKeyType: 1,
						USKSourceFill: source.id,
					},
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
							actionId: ActionId.UpStreamKeyType,
							headline: 'First change upstream key type to Chroma',
							options: {
								USKType: 'Chroma Key',
							},
						},
						{
							actionId: ActionId.UpStreamKeyFillKeyType,
							headline: 'then after a short delay set the fillsource',
							delay: 200,
							options: {
								FillSource: source.id,
								KeySource: source.id,
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`UpStreamKeyKeyPatternFillSource_${source.id}`] = {
			category: `USK: keypattern`,
			name: `Set fill source ${source.label}`,
			type: 'button',
			style: {
				text: `Keypattern fill\\n${source.label}`,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.KeySourceFill,
					options: {
						USKKeyType: 2,
						USKSourceFill: source.id,
					},
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
							actionId: ActionId.UpStreamKeyType,
							headline: 'First change upstream key type to keypattern',
							options: {
								USKType: 'Key Pattern',
							},
						},
						{
							actionId: ActionId.UpStreamKeyFillKeyType,
							headline: 'then after a short delay set the fillsource',
							delay: 200,
							options: {
								FillSource: source.id,
								KeySource: source.id,
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`UpStreamKeyPIPFillSource_${source.id}`] = {
			category: `USK: PIP`,
			name: `Set fill source ${source.label}`,
			type: 'button',
			style: {
				text: `Pip fill\\n${source.label}`,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.KeySourceFill,
					options: {
						USKKeyType: 3,
						USKSourceFill: source.id,
					},
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
							actionId: ActionId.UpStreamKeyType,
							headline: 'First change upstream key type to pip',
							options: {
								USKType: 'PIP',
							},
						},
						{
							actionId: ActionId.UpStreamKeyFillKeyType,
							headline: 'then after a short delay set the fillsource',
							delay: 200,
							options: {
								FillSource: source.id,
								KeySource: source.id,
							},
						},
					],
					up: [],
				},
			],
		}
	}

	// PIP presets
	presets[`PIP_upper_left`] = {
		category: `USK: PIP`,
		name: `PIP on air: Upper left corner`,
		type: 'button',
		style: {
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			png64:
				'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA00lEQVR4nO3aQQqDMAAAQS3+/8vppaW2KAv2oMjMRfQUlkSIcR5jTOx7nD2AqxMoCBQECgIFgYJAQaAgUBAoCBQECgIFgYJAYXldfRTaNi/rm9OGcU1jmj4z6OvhQbcM7B0UBAoCBYGCQEGgIFAQKAgUBAq/W41bbhf+YQYFgYJAQaAgUBAoCBQECgIFgYJAQaAgUBAoCBQECgIFgYJAQaAgUBAoCBQECgKF9cmqX4E3vAM5ct5hiQWBgkBBoCBQECgIFAQKAgWBgkBBoCBQECgIFJ6smgeakSiJdAAAAABJRU5ErkJggg==',
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.UpStreamKeyType,
						options: {
							USKType: 'PIP',
						},
					},
					{
						actionId: ActionId.PipSize,
						options: {
							PipSize: 0.25,
						},
					},
					{
						actionId: ActionId.PipXPosition,
						options: {
							operation: 0, 
							PipXPosition: -11.8,
						},
					},
					{
						actionId: ActionId.PipYPosition,
						options: {
							operation: 0, 
							PipYPosition: -6.6,
						},
					},
					{
						actionId: MixEffect.ActionId.OnAirButtons,
						options: {
							KeyButton: 'KEY',
							ButtonAction: 1,
						},
					},
				],
				up: [],
			},
		],
	}

	presets[`PIP_upper_right`] = {
		category: `USK: PIP`,
		name: `PIP on air: Upper right corner`,
		type: 'button',
		style: {
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			png64:
				'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA00lEQVR4nO3auwqDMABA0Vj8/19Olz4clDu0oMg5i7iFSxKIZplzDo49zh7A1QkUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgsL6ePgrtW9bty2nDuKY5xncG3dEvq+IzWexBQaAgUBAoCBQECgIFgYJAQaBw56PGX86WZlAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFDY/ll1FXjHO5ArwAcssSBQECgIFAQKAgWBgkBBoCBQECgIFAQKAgWBwhPfvweaF9Ol9gAAAABJRU5ErkJggg==',
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.UpStreamKeyType,
						options: {
							USKType: 'PIP',
						},
					},
					{
						actionId: ActionId.PipSize,
						options: {
							PipSize: 0.25,
						},
					},
					{
						actionId: ActionId.PipXPosition,
						options: {
							operation: 0, 
							PipXPosition: 11.8,
						},
					},
					{
						actionId: ActionId.PipYPosition,
						options: {
							operation: 0, 
							PipYPosition: -6.6,
						},
					},
					{
						actionId: MixEffect.ActionId.OnAirButtons,
						options: {
							KeyButton: 'KEY',
							ButtonAction: 1,
						},
					},
				],
				up: [],
			},
		],
	}
	presets[`PIP_lower_left`] = {
		category: `USK: PIP`,
		name: `PIP on air: Lower left corner`,
		type: 'button',
		style: {
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			png64:
				'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA0klEQVR4nO3aMQqEMAAAwXj4/y/nmjsQUbawUGSmkXRhiYEYlznn4Nzn7gk8nUBBoCBQECgIFAQKAgWBgkBBoCBQECgIFAQK6+/po9CxZd0ObpvGM80xvGJJoCBQECgIFAQKAgWBgkBBoCBQECgIFAQKAgWBgkBBoCBQECgIFAQKAgWBgkBh3Y2vXEG/8mbWCgoCBYGCQEGgIFAQKAgUBAoChf1R45XHhSu2gfwKfOAfyMo5YQ8KAgWBgkBBoCBQECgIFAQKAgWBgkBBoCBQECh8AeTKB5pOGd6uAAAAAElFTkSuQmCC',
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.UpStreamKeyType,
						options: {
							USKType: 'PIP',
						},
					},
					{
						actionId: ActionId.PipSize,
						options: {
							PipSize: 0.25,
						},
					},
					{
						actionId: ActionId.PipXPosition,
						options: {
							operation: 0, 
							PipXPosition: -11.8,
						},
					},
					{
						actionId: ActionId.PipYPosition,
						options: {
							operation: 0, 
							PipYPosition: 6.6,
						},
					},
					{
						actionId: MixEffect.ActionId.OnAirButtons,
						options: {
							KeyButton: 'KEY',
							ButtonAction: 1,
						},
					},
				],
				up: [],
			},
		],
	}
	presets[`PIP_lower_right`] = {
		category: `USK: PIP`,
		name: `PIP on air: Lower right corner`,
		type: 'button',
		style: {
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			png64:
				'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1ElEQVR4nO3aMQqDQBRAQQ17/ytvmhgslFckoAkzjQgWy0MF3b/OORfOPa5ewN0JFAQKAgWBgkBBoCBQECgIFAQKAgWBgkBBoDBeRz+Fjq1jf3LZMu5pLotHLAkUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKIy+5Gd9sp3+3mV2BwWBgkBBoCBQECgIFAQKAgWBwj9/anxlKHUfyCjwgS2QEeAT3kFBoCBQECgIFAQKAgWBgkBBoCBQECgIFAQKAoUnF/4HmoKO4UMAAAAASUVORK5CYII=',
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.UpStreamKeyType,
						options: {
							USKType: 'PIP',
						},
					},
					{
						actionId: ActionId.PipSize,
						options: {
							PipSize: 0.25,
						},
					},
					{
						actionId: ActionId.PipXPosition,
						options: {
							operation: 0, 
							PipXPosition: 11.8,
						},
					},
					{
						actionId: ActionId.PipYPosition,
						options: {
							operation: 0, 
							PipYPosition: 6.6,
						},
					},
					{
						actionId: MixEffect.ActionId.OnAirButtons,
						options: {
							KeyButton: 'KEY',
							ButtonAction: 1,
						},
					},
				],
				up: [],
			},
		],
	}
	return presets
}
