import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'
import { nextTransitionState } from './state'
import { TransitionStyleChoice } from '../../model'
import { GoStreamModel } from '../../models/types'

const NTState = new nextTransitionState()

const rateOptions = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0]
const ptzSize = '18'
export function create(model: GoStreamModel): CompanionPresetDefinitions {
	const presets = {}

	const InputSources = model.InputSources()
	for (const src of InputSources) {
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
		feedbacks: [],
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
				text: `Transition\n style to \n${opt.label}`,
				size: '14',
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
					text: `${opt.label}\n rate to \n${rate}s`,
					size: '14',
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
		feedbacks: [],
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
		feedbacks: [],
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
			feedbacks: [],
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
	// -------------------------------------------------------
	// ----- Next Transitions groups
	// Key/DSK on Air
	for (const key of NTState.getChoices(false)) {
		presets[`keys_Next_Air_${key.id}`] = {
			category: 'Keys On Air',
			name: `Toggle ${key.label} On Air`,
			type: 'button',
			style: {
				text: `${key.label} On Air`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.KeysVisibility,
					options: {
						KeyButton: key.id,
						LayerState: 2,
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
							actionId: ActionId.OnAirButtons,
							options: {
								KeyButton: key.id,
								ButtonAction: 2,
							},
						},
					],
					up: [],
				},
			],
		}
	}

	// Keys on Preview (note "Toggle" doesn't make sense in this context,
	// so make both "on" and "off" buttons:
	for (const key of NTState.getChoices(false)) {
		for (const keystate of [3, 4]) {
			const statename = keystate === 3 ? 'off' : 'on'
			presets[`keys_${statename}_PVW_${key.id}`] = {
				category: 'Keys On PVW',
				name: `Show ${key.label} ${statename} preview`,
				type: 'button',
				style: {
					text: `${key.label} ${statename} PVW`,
					size: ptzSize,
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				feedbacks: [
					{
						feedbackId: FeedbackId.KeysVisibility,
						options: {
							KeyButton: key.id,
							LayerState: 3,
						},
						style: {
							bgcolor: keystate === 3 ? combineRgb(180, 0, 180) : combineRgb(255, 255, 0),
							color: combineRgb(0, 0, 0),
						},
						isInverted: keystate === 3,
					},
				],
				steps: [
					{
						down: [
							{
								actionId: ActionId.NextTransitionButtons,
								options: {
									KeyButton: key.id,
									ButtonAction: keystate,
									BKGDAction: keystate, // not strictly necessary
								},
							},
						],
						up: [],
					},
				],
			}
		}
	}

	// Next Transitions:
	for (const key of NTState.getChoices(true)) {
		presets[`keys_Next_Trans_${key.id}`] = {
			category: 'Keys Next Transition',
			name: `Toggle ${key.label} (Next Transition)`,
			type: 'button',
			style: {
				text: `${key.label}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.KeysVisibility,
					options: {
						KeyButton: key.id,
						LayerState: 0,
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
							actionId: ActionId.NextTransitionButtons,
							options: {
								KeyButton: key.id,
								ButtonAction: 2,
								BKGDAction: 2,
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
