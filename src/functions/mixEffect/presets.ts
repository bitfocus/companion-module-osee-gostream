import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { Effect } from "../../connection/actionids"
import { FeedbackId } from './feedbackId'
// import { nextTransitionState } from './state'
import { TransitionStyleChoice } from '../../model'
// import { GoStreamState } from '../../state'
import { getEnumKeyByValue } from '../../util'
import { StreamDeck } from '../../connection/streamdeck'
import { sourceID } from '../../connection/enums'
// import { sourceID } from '../../enums'


// const NTState = new nextTransitionState()

const rateOptions = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0]
const ptzSize = '18'
export function create(deck: StreamDeck): CompanionPresetDefinitions {
	const presets = {}

	const InputSources = deck.state?deck.state.device.inputSources?.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s))})):[];
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
							actionId:Effect. ActionId.PvwIndex,
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
							actionId: Effect.ActionId.PgmIndex,
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
						actionId: Effect.ActionId.CutTransition,
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
						actionId: Effect.ActionId.AutoTransition,
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
						transitionStyle: opt.id,
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
							actionId: Effect.ActionId.TransitionStyle,
							options: {
								transitionStyle: opt.id,
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
							transitionStyle: opt.id,
							transitionRate: rate,
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
								actionId: Effect.ActionId.TransitionRate,
								options: {
									transitionStyle: opt.id,
									transitionRate: rate,
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
						actionId: Effect.ActionId.PreviewTransition,
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
						actionId: Effect.ActionId.FtbAfv,
						options: { ftbAudioAFV: 2 },
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
						actionId: Effect.ActionId.Ftb,
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
					feedbackId: FeedbackId.FTBRate,
					options: {
						ftbRate: rate,
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
							actionId: Effect.ActionId.FtbRate,
							options: {
								ftbRate: rate,
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
