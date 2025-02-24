import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'
import { TransitionStyleChoice } from '../../model'
import { GoStreamModel } from '../../models/types'

const rateOptions = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]
const ptzSize = '18'
export function create(model: GoStreamModel): CompanionPresetDefinitions {
	const presets = {}

	const MeChoice = model.InputSources().map((item) => ({ id: item.id, label: item.name }))
	for (const src of MeChoice) {
		presets[`Preview_${src.id}`] = {
			type: 'button',
			category: 'Preview',
			name: `Preview button for ${src.label}`,
			style: {
				pngalignment: 'center:center',
				text: `${src.label}`,
				alignment: 'center:center',
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.PvwIndex,
							options: {
								Source: src.id,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: FeedbackId.PreviewBG,
					options: {
						Source: src.id,
					},
					style: {
						bgcolor: combineRgb(0, 255, 0),
						color: combineRgb(255, 255, 255),
					},
				},
			],
		}
		presets[`Program_${src.id}`] = {
			type: 'button',
			category: 'Program',
			name: `Program button for ${src.label}`,
			style: {
				pngalignment: 'center:center',
				text: `${src.label}`,
				alignment: 'center:center',
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.PgmIndex,
							options: {
								Source: src.id,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: FeedbackId.ProgramBG,
					options: {
						Source: src.id,
					},
					style: {
						bgcolor: combineRgb(0, 255, 0),
						color: combineRgb(255, 255, 255),
					},
				},
			],
		}
	}
	presets[`transition_cut`] = {
		category: `Transitions`,
		name: `CUT`,
		type: 'button',
		style: {
			text: 'CUT',
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		feedbacks: [
			{
				feedbackId: FeedbackId.Cut,
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
						actionId: ActionId.CutTransition,
						options: {},
					},
				],
				up: [],
			},
		],
	}
	presets[`transition_auto`] = {
		category: `Transitions`,
		name: `AUTO`,
		type: 'button',
		style: {
			text: 'AUTO',
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		feedbacks: [
			{
				feedbackId: FeedbackId.InTransition,
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
						actionId: ActionId.AutoTransition,
						options: {},
					},
				],
				up: [],
			},
		],
	}
	const TranChoices = TransitionStyleChoice
	for (const opt of TranChoices) {
		presets[`transition_style_${opt.id}`] = {
			category: `Transitions`,
			name: `Transition: Change Transition style to ${opt.label}`,
			type: 'button',
			style: {
				text: opt.label,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.TransitionStyle,
					options: {
						TransitionStyle: opt.id,
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
							actionId: ActionId.TransitionIndex,
							options: {
								TransitionStyle: opt.id,
							},
						},
					],
					up: [],
				},
			],
		}
		for (const rate of rateOptions) {
			presets[`transition_rate_${opt.id}_${rate}`] = {
				category: `Transitions`,
				name: `Transition: ${opt.label} rate ${rate}`,
				type: 'button',
				style: {
					text: `${opt.label} ${rate}`,
					size: ptzSize,
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				feedbacks: [
					{
						feedbackId: FeedbackId.TransitionRate,
						options: {
							TransitionStyle: opt.id,
							TransitionRate: rate,
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
								actionId: ActionId.TransitionRate,
								options: {
									TransitionStyle: opt.id,
									TransitionRate: rate,
								},
							},
						],
						up: [],
					},
				],
			}
		}
	}
	presets[`transition_Prev`] = {
		category: `Transitions`,
		name: `Transition:PREV`,
		type: 'button',
		style: {
			text: 'PREV',
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		feedbacks: [
			{
				feedbackId: FeedbackId.Prev,
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
						actionId: ActionId.Prev,
						options: { prevEnable: 2 },
					},
				],
				up: [],
			},
		],
	}
	presets[`transition_BG`] = {
		category: `Transitions`,
		name: `Transition: Change selection`,
		type: 'button',
		style: {
			text: 'BG',
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		feedbacks: [
			{
				feedbackId: FeedbackId.TransitionSelection,
				options: { MatchState: 1, Background: true, Key: false },
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
						actionId: ActionId.TransitionSourceBG,
						options: { Background: true, Key: false },
					},
				],
				up: [],
			},
		],
	}
	presets[`transition_Key`] = {
		category: `Transitions`,
		name: `Transition: Change selection`,
		type: 'button',
		style: {
			text: 'Key',
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		feedbacks: [
			{
				feedbackId: FeedbackId.TransitionSelection,
				options: { MatchState: 1, Background: false, Key: true },
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
						actionId: ActionId.TransitionSourceBG,
						options: { Background: false, Key: true },
					},
				],
				up: [],
			},
		],
	}
	presets[`transition_BG&Key`] = {
		category: `Transitions`,
		name: `Transition: Change selection`,
		type: 'button',
		style: {
			text: 'BG&Key',
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		feedbacks: [
			{
				feedbackId: FeedbackId.TransitionSelection,
				options: { MatchState: 1, Background: true, Key: true },
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
						actionId: ActionId.TransitionSourceBG,
						options: { Background: true, Key: true },
					},
				],
				up: [],
			},
		],
	}
	presets[`ftb_AFV`] = {
		category: `Fade to black`,
		name: `FTB:Audio Follow Video Enable`,
		type: 'button',
		style: {
			text: `AFV`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		feedbacks: [
			{
				feedbackId: FeedbackId.FTBAFV,
				options: {
					state: 1,
				},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
			{
				feedbackId: FeedbackId.FTBAFV,
				options: {
					state: 0,
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
						actionId: ActionId.FtbAudioAFV,
						options: { FtbAudioAFV: 2 },
					},
				],
				up: [],
			},
		],
	}
	presets[`ftb_auto`] = {
		category: `Fade to black`,
		name: `Autofade`,
		type: 'button',
		style: {
			text: `FTB`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		feedbacks: [
			{
				feedbackId: FeedbackId.FadeToBlackIsBlack,
				options: {
					state: 'off',
				},
				style: {
					bgcolor: combineRgb(0, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
			{
				feedbackId: FeedbackId.FadeToBlackIsBlack,
				options: {
					state: 'on',
				},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
			{
				feedbackId: FeedbackId.FadeToBlackIsBlack,
				options: {
					state: 'fading',
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
						actionId: ActionId.FTB,
						options: {},
					},
				],
				up: [],
			},
		],
	}
	for (const rate of rateOptions) {
		presets[`ftb_rate_${rate}`] = {
			category: `Fade to black`,
			name: `Rate ${rate}`,
			type: 'button',
			style: {
				text: `Rate ${rate}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.FadeToBlackRate,
					options: {
						FtbRate: rate,
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
							actionId: ActionId.FtbRate,
							options: {
								FtbRate: rate,
							},
						},
					],
					up: [],
				},
			],
		}
	}

	return presets
}
