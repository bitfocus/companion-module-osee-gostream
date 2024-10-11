import { combineRgb } from '@companion-module/base'
import { ActionType, feedbackId } from './enums'
import { ActionId } from './actions/ActionId'
import { getChoices } from './choices'
import {
	TransitionStyleChoice,
	AudioInputSourcesChoices,
	AudioMicChoices,
	KeySwitchChoices,
	SettingsOutSourceParamChoices,
	SettingsAuxSourceChoices,
	StreamingChoices,
} from './model'
import { MacroFeedbackType } from './feedback'
const rateOptions = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]
const ptzSize = '18'
function presets(_self) {
	const presets = {}
	//Prev 和Program
	let MeChoice = getChoices(ActionType.Preview)
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
					feedbackId: feedbackId.PreviewBG,
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
					feedbackId: feedbackId.ProgramBG,
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
				feedbackId: feedbackId.Cut,
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
				feedbackId: feedbackId.InTransition,
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
	//Transitions
	let TranChoices = TransitionStyleChoice
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
					feedbackId: feedbackId.TransitionStyle,
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
						feedbackId: feedbackId.TransitionRate,
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
				feedbackId: feedbackId.Prev,
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
				feedbackId: feedbackId.TransitionSelection,
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
				feedbackId: feedbackId.TransitionSelection,
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
				feedbackId: feedbackId.TransitionSelection,
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
	//Keys On Air
	let Keys = KeySwitchChoices
	for (const key of Keys) {
		if (key.label != 'BKGD') {
			presets[`keys_Next_Air_${key.id}`] = {
				category: 'Keys On Air',
				name: `Toggle upstream KEY ${key.label} OnAir`,
				type: 'button',
				style: {
					text: `${key.label}`,
					size: ptzSize,
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				feedbacks: [
					{
						feedbackId: key.label === 'Key' ? feedbackId.KeyOnAir : feedbackId.DskOnAir,
						options: {
							KeyOnAir: 1,
							DSKOnAir: 1,
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
								actionId: key.label === 'Key' ? ActionId.KeyOnAir : ActionId.DskOnAir,
								options: {
									KeyOnAir: 2,
									DSKOnAir: 2,
								},
							},
						],
						up: [],
					},
				],
			}
		}
	}
	//Key Next
	for (const key of Keys) {
		presets[`keys_Next_${key.id}`] = {
			category: 'Key Next',
			name: `Toggle ${key.label} Switch`,
			type: 'button',
			style: {
				text: `${key.label}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: feedbackId.TransitionKeySwitch,
					options: {
						KeySwitch: [key.id],
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
							actionId: ActionId.TransitionSource,
							options: {
								KeySwitch: [key.id],
							},
						},
					],
					up: [],
				},
			],
		}
		// if (key.label != "BKGD") {
		// 	presets[`keys_Next_Air_${key.id}`] = {
		// 		category: 'KEYs Next',
		// 		name: `Toggle upstream KEY ${key.label} OnAir`,
		// 		type: 'button',
		// 		style: {
		// 			text: `${key.label} On AIR`,
		// 			size: ptzSize,
		// 			color: combineRgb(255, 255, 255),
		// 			bgcolor: combineRgb(0, 0, 0),
		// 		},
		// 		feedbacks: [
		// 			{
		// 				feedbackId: key.label === "Key" ? feedbackId.KeyOnAir : feedbackId.DskOnAir,
		// 				options: {
		// 					KeyOnAir: 1,
		// 					DSKOnAir: 1,
		// 				},
		// 				style: {
		// 					bgcolor: combineRgb(255, 255, 0),
		// 					color: combineRgb(0, 0, 0),
		// 				},
		// 			},
		// 		],
		// 		steps: [
		// 			{
		// 				down: [
		// 					{
		// 						actionId: key.label === "Key" ? ActionId.KeyOnAir : ActionId.DskOnAir,
		// 						options: {
		// 							KeyOnAir: 2,
		// 							DSKOnAir: 2,
		// 						},
		// 					},
		// 				],
		// 				up: [],
		// 			},
		// 		],
		// 	}
		// }
	}
	//DSK
	let dsk_sources = getChoices(ActionType.DskSourceFill)
	for (const s of dsk_sources) {
		let id = Number(s.id) + 1
		if (id === dsk_sources.length) id = 0
		presets[`DskFillKey_${s.id}`] = {
			category: `DSK`,
			name: `DSK Source Fill And Key ${s.label}`,
			type: 'button',
			style: {
				text: `${s.label}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: feedbackId.DskSourceFill,
					options: {
						TypeID: 1,
						DSKFill: s.id,
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
							actionId: ActionId.DskSourceFillKey,
							options: { DSKFill: s.id, DSKKey: id },
						},
					],
					up: [],
				},
			],
		}
	}
	//分开配置的删除
	// for(const s of dsk_sources){
	// 	presets[`DskFill_${s.id}`] = {
	// 		category: `DSK`,
	// 		name: `DSK Source Fill ${s.label}`,
	// 		type: 'button',
	// 		style: {
	// 			text: `${s.label}`,
	// 			size: ptzSize,
	// 			color: combineRgb(255, 255, 255),
	// 			bgcolor: combineRgb(0, 0, 0),
	// 		},
	// 		feedbacks: [
	// 			{
	// 				feedbackId: feedbackId.DskSourceFill,
	// 				options: {
	// 					TypeID:1,
	// 					DSKFill:s.id,
	// 				},
	// 				style: {
	// 					bgcolor: combineRgb(255, 0, 0),
	// 					color: combineRgb(255, 255, 255),
	// 				},
	// 			},
	// 		],
	// 		steps: [
	// 			{
	// 				down: [
	// 					{
	// 						actionId: ActionId.DskSourceFill,
	// 						options: { DSKFill: s.id },
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 	}
	// }
	// for(const s of dsk_sources){
	// 	presets[`DskKeyFill_${s.id}`] = {
	// 		category: `DSK`,
	// 		name: `DSK Source Key ${s.label}`,
	// 		type: 'button',
	// 		style: {
	// 			text: `K_${s.label}`,
	// 			size: ptzSize,
	// 			color: combineRgb(255, 255, 255),
	// 			bgcolor: combineRgb(0, 0, 0),
	// 		},
	// 		feedbacks: [
	// 			{
	// 				feedbackId: feedbackId.DskSourceFill,
	// 				options: {
	// 					TypeID:0,
	// 					DSKFill:s.id,
	// 				},
	// 				style: {
	// 					bgcolor: combineRgb(255, 0, 0),
	// 					color: combineRgb(255, 255, 255),
	// 				},
	// 			},
	// 		],
	// 		steps: [
	// 			{
	// 				down: [
	// 					{
	// 						actionId: ActionId.DskSourceKey,
	// 						options: { DSKKey: s.id },
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 	}
	// }
	//Still
	for (let Still = 0; Still < 31; Still++) {
		presets[`Still_Selection_${Still}`] = {
			category: 'Still',
			name: `Still: Slect pic index`,
			type: 'button',
			style: {
				text: `Still${Still + 1}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: feedbackId.Still,
					options: {
						Stillindex: 0,
						PicIndex: Still,
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
							actionId: ActionId.StillSelection,
							options: {
								Stillindex: 0,
								PicIndex: Still,
							},
						},
					],
					up: [],
				},
			],
		}
	}
	//SuperSource
	// presets[`SuperSource_Enable`] = {
	// 	category: `SuperSource`,
	// 	name: `SuperSource Enable`,
	// 	type: 'button',
	// 	style: {
	// 		text: 'SSEnable',
	// 		size: ptzSize,
	// 		color: combineRgb(255, 255, 255),
	// 		bgcolor: combineRgb(0, 0, 0),
	// 	},
	// 	feedbacks: [
	// 		{
	// 			feedbackId: feedbackId.SuperSourceEnable,
	// 			options: {},
	// 			style: {
	// 				bgcolor: combineRgb(255, 0, 0),
	// 				color: combineRgb(255, 255, 255),
	// 			},
	// 		},
	// 	],
	// 	steps: [
	// 		{
	// 			down: [
	// 				{
	// 					actionId: ActionId.SuperSourceEnable,
	// 					options: { SuperSourceEnable: 2 },
	// 				},
	// 			],
	// 			up: [],
	// 		},
	// 	],
	// }
	// let SourceChoices=getChoices(ActionType.SuperSourceSource);
	// for(const ss of SourceChoices){
	// 	presets[`SuperSource_Source1_${ss.id}`] = {
	// 		category: `SuperSource`,
	// 		name: `SuperSource Source1 ${ss.label}`,
	// 		type: 'button',
	// 		style: {
	// 			text: `SS1_${ss.label}`,
	// 			size: 'auto',
	// 			color: combineRgb(255, 255, 255),
	// 			bgcolor: combineRgb(0, 0, 0),
	// 		},
	// 		feedbacks: [
	// 			{
	// 				feedbackId: feedbackId.SuperSourceSelect,
	// 				options: {typeid:0,SourceID:ss.id},
	// 				style: {
	// 					bgcolor: combineRgb(255, 0, 0),
	// 					color: combineRgb(255, 255, 255),
	// 				},
	// 			},
	// 		],
	// 		steps: [
	// 			{
	// 				down: [
	// 					{
	// 						actionId: ActionId.SuperSourceSource1,
	// 						options: { SuperSourceSource1: ss.id },
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 	}
	// }
	// for(const ss of SourceChoices){
	// 	presets[`SuperSource_Source2_${ss.id}`] = {
	// 		category: `SuperSource`,
	// 		name: `SuperSource Source2 ${ss.label}`,
	// 		type: 'button',
	// 		style: {
	// 			text: `SS2_${ss.label}`,
	// 			size: 'auto',
	// 			color: combineRgb(255, 255, 255),
	// 			bgcolor: combineRgb(0, 0, 0),
	// 		},
	// 		feedbacks: [
	// 			{
	// 				feedbackId: feedbackId.SuperSourceSelect,
	// 				options: {typeid:1,SourceID:ss.id},
	// 				style: {
	// 					bgcolor: combineRgb(255, 0, 0),
	// 					color: combineRgb(255, 255, 255),
	// 				},
	// 			},
	// 		],
	// 		steps: [
	// 			{
	// 				down: [
	// 					{
	// 						actionId: ActionId.SuperSourceSource2,
	// 						options: { SuperSourceSource2: ss.id },
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 	}
	// }
	// for(const ss of SourceChoices){
	// 	presets[`SuperSource_bg_${ss.id}`] = {
	// 		category: `SuperSource`,
	// 		name: `SuperSource Background ${ss.label}`,
	// 		type: 'button',
	// 		style: {
	// 			text: `SSBG_${ss.label}`,
	// 			size: 'auto',
	// 			color: combineRgb(255, 255, 255),
	// 			bgcolor: combineRgb(0, 0, 0),
	// 		},
	// 		feedbacks: [
	// 			{
	// 				feedbackId: feedbackId.SuperSourceSelect,
	// 				options: {typeid:2,SourceID:ss.id},
	// 				style: {
	// 					bgcolor: combineRgb(255, 0, 0),
	// 					color: combineRgb(255, 255, 255),
	// 				},
	// 			},
	// 		],
	// 		steps: [
	// 			{
	// 				down: [
	// 					{
	// 						actionId: ActionId.SuperSourceBackground,
	// 						options: { SuperSourceBackground: ss.id },
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 	}
	// }
	// var ss_styles=SuperSourceStyleChoices;
	// for(const style of ss_styles){
	// 	presets[`SuperSource_style_${style.id}`] = {
	// 		category: `SuperSource`,
	// 		name: `SuperSource style ${style.label}`,
	// 		type: 'button',
	// 		style: {
	// 			text: `SS_${style.label}`,
	// 			size: 'auto',
	// 			color: combineRgb(255, 255, 255),
	// 			bgcolor: combineRgb(0, 0, 0),
	// 		},
	// 		feedbacks: [
	// 			{
	// 				feedbackId: feedbackId.SuperSourceControlStyle,
	// 				options: {styleid:style.id},
	// 				style: {
	// 					bgcolor: combineRgb(255, 0, 0),
	// 					color: combineRgb(255, 255, 255),
	// 				},
	// 			},
	// 		],
	// 		steps: [
	// 			{
	// 				down: [
	// 					{
	// 						actionId: ActionId.SuperSourceControlStyle,
	// 						options: { SuperSourceStyle: style.id },
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 	}
	// }
	//UpStreamKey
	var sources = getChoices(ActionType.LumaKeySourceKey)
	for (const source of sources) {
		let id = Number(source.id) + 1
		if (id === sources.length) id = 0
		//console.log(source.label);
		presets[`UpStreamKeylumakeySourceAndKey_${source.id}`] = {
			category: `lumakey`,
			name: `Upstream key: Set lumakey Source ${source.label}`,
			type: 'button',
			style: {
				text: `${source.label}`,
				size: '24',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: feedbackId.KeySourceFill,
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
	}
	// for (const UpKey of UpStreamKeyTypeChoices) {
	// 	presets[`UpStreamKey_${UpKey.id}`] = {
	// 		category: 'UpStreamKeyType',
	// 		name: `Upstream key: Set Key Type ${UpKey.label}`,
	// 		type: 'button',
	// 		style: {
	// 			text: `${UpKey.label}`,
	// 			size: '24',
	// 			color: combineRgb(255, 255, 255),
	// 			bgcolor: combineRgb(0, 0, 0),
	// 		},
	// 		feedbacks: [
	// 			{
	// 				feedbackId: feedbackId.UpStreamKeyType,
	// 				options: {
	// 					USKType: UpKey.id,
	// 				},
	// 				style: {
	// 					bgcolor: combineRgb(255, 0, 0),
	// 					color: combineRgb(255, 255, 255),
	// 				},
	// 			},
	// 		],
	// 		steps: [
	// 			{
	// 				down: [
	// 					{
	// 						actionId: ActionId.UpStreamKeyType,
	// 						options: {
	// 							USKType: UpKey.id,
	// 						},
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 	}
	// 	let _ActionId = ActionId.LumaKeySourceFill;
	// 	switch (UpKey.id) {
	// 		case 0:
	// 			_ActionId = ActionId.LumaKeySourceFill;
	// 			break;
	// 		case 1:
	// 			_ActionId = ActionId.ChromaKeyFill;
	// 			break;
	// 		case 2:
	// 			_ActionId = ActionId.KeyPatternSourceFill;
	// 			break;
	// 		case 3:
	// 			_ActionId = ActionId.PipSource;
	// 			break;
	// 	}
	// 	var sources = getChoices(ActionType.LumaKeySourceKey);
	// 	for (const source of sources) {
	// 		presets[`UpStreamKey_${source.id}_${UpKey.id}`] = {
	// 			category: `${UpKey.label}`,
	// 			name: `Upstream key: Set ${UpKey.label} Source Fill ${source.label}`,
	// 			type: 'button',
	// 			style: {
	// 				text: `${source.label}`,
	// 				size: '24',
	// 				color: combineRgb(255, 255, 255),
	// 				bgcolor: combineRgb(0, 0, 0),
	// 			},
	// 			feedbacks: [
	// 				{
	// 					feedbackId: feedbackId.KeySourceFill,
	// 					options: {
	// 						USKKeyType: UpKey.id,
	// 						USKSourceFill: source.id,
	// 					},
	// 					style: {
	// 						bgcolor: combineRgb(255, 0, 0),
	// 						color: combineRgb(255, 255, 255),
	// 					},
	// 				},
	// 			],
	// 			steps: [
	// 				{
	// 					down: [
	// 						{
	// 							actionId: _ActionId,
	// 							options: {
	// 								KeyFill: [source.id],
	// 							},
	// 						},
	// 					],
	// 					up: [],
	// 				},
	// 			],
	// 		}
	// 	}
	// }
	//Audio Mixer
	presets[`AudioMixer_Trans`] = {
		category: 'AudioMixer',
		name: `Audio Mixer: Set AudioTransition Enable`,
		type: 'button',
		style: {
			text: `AudioFade`,
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		feedbacks: [
			{
				feedbackId: feedbackId.AudioTransition,
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
						actionId: ActionId.AudioTransition,
						options: {
							AudioTrans: 2,
						},
					},
				],
				up: [],
			},
		],
	}
	for (const mic of AudioMicChoices) {
		presets[`AudioMixer_Enable_${mic.id}`] = {
			category: 'AudioMixer',
			name: `Audio Mixer: Set Audio ${mic.label} Enable`,
			type: 'button',
			style: {
				text: `${mic.label}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: feedbackId.AudioEnable,
					options: {
						AudioEnable: 1,
						ASource: mic.id,
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
							actionId: ActionId.AudioEnable,
							options: {
								ASource: mic.id,
								AudioEnable: 2,
							},
						},
					],
					up: [],
				},
			],
		}
	}
	for (const audio_in of AudioInputSourcesChoices) {
		presets[`AudioMixer_Enable_${audio_in.id}`] = {
			category: 'AudioMixer',
			name: `Audio Mixer: Set Audio ${audio_in.label} Enable`,
			type: 'button',
			style: {
				text: `${audio_in.label}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: feedbackId.AudioEnable,
					options: {
						ASource: audio_in.id,
						AudioEnable: 0,
					},
					style: {
						bgcolor: combineRgb(0, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
				{
					feedbackId: feedbackId.AudioEnable,
					options: {
						ASource: audio_in.id,
						AudioEnable: 1,
					},
					style: {
						bgcolor: combineRgb(255, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
				{
					feedbackId: feedbackId.AudioEnable,
					options: {
						ASource: audio_in.id,
						AudioEnable: 2,
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
							actionId: ActionId.AudioEnable1,
							options: {
								ASource: audio_in.id,
								AudioEnable: 3,
							},
						},
					],
					up: [],
				},
			],
		}
	}
	//Macro
	for (let macro = 0; macro < 100; macro++) {
		presets[`macro_run_${macro}`] = {
			category: 'MACROS',
			name: `Run button for macro ${macro + 1}`,
			type: 'button',
			style: {
				text: `macro${macro + 1}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				// {
				// 	feedbackId: feedbackId.Macro,
				// 	options: {
				// 		macroIndex: macro,
				// 	},
				// 	style: {
				// 		bgcolor: combineRgb(0, 0, 238),
				// 		color: combineRgb(255, 255, 255),
				// 	},
				// },
				{
					feedbackId: feedbackId.Macro,
					options: {
						MacroIndex: macro,
						state: MacroFeedbackType.IsUsed,
					},
					style: {
						bgcolor: combineRgb(0, 0, 238),
						color: combineRgb(255, 255, 255),
					},
				},
				{
					feedbackId: feedbackId.Macro,
					options: {
						MacroIndex: macro,
						state: MacroFeedbackType.IsRunning,
					},
					style: {
						bgcolor: combineRgb(0, 238, 0),
						color: combineRgb(255, 255, 255),
					},
				},
				{
					feedbackId: feedbackId.Macro,
					options: {
						MacroIndex: macro,
						state: MacroFeedbackType.IsWaiting,
					},
					style: {
						bgcolor: combineRgb(238, 238, 0),
						color: combineRgb(255, 255, 255),
					},
				},
				{
					feedbackId: feedbackId.Macro,
					options: {
						MacroIndex: macro,
						state: MacroFeedbackType.IsRecording,
					},
					style: {
						bgcolor: combineRgb(238, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
			],
			steps: [
				{
					down: [
						{
							actionId: ActionId.MacroRun,
							options: {
								StatusID: 1,
								MacroIndex: macro,
							},
						},
					],
					up: [],
				},
			],
		}
	}
	//FTB
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
				feedbackId: feedbackId.FadeToBlackIsBlack,
				options: {
					state: 'off',
				},
				style: {
					bgcolor: combineRgb(0, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
			{
				feedbackId: feedbackId.FadeToBlackIsBlack,
				options: {
					state: 'on',
				},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
			{
				feedbackId: feedbackId.FadeToBlackIsBlack,
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
					feedbackId: feedbackId.FadeToBlackRate,
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
				feedbackId: feedbackId.FTBAFV,
				options: {
					state: 1,
				},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
			{
				feedbackId: feedbackId.FTBAFV,
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
	//Streaming
	for (const st of StreamingChoices) {
		presets[`StreamingSwitch_${st.id}`] = {
			type: 'button',
			category: 'Streaming',
			name: 'Push Streaming',
			style: {
				text: `${st.label}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.StreamOutput,
							options: {
								StreamID: st.id,
								EnableId: 2,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: feedbackId.StreamOutput,
					options: {
						StreamID: st.id,
					},
					style: {
						bgcolor: combineRgb(255, 255, 0),
						color: combineRgb(0, 0, 0),
					},
				},
			],
		}
	}
	//Playback
	// presets[`PalyMode_0`] = {
	// 	type: 'button',
	// 	category: 'Playback',
	// 	name: 'Set Playback mode',
	// 	style: {
	// 		text: `play in one group`,
	// 		size: ptzSize,
	// 		color: combineRgb(255, 255, 255),
	// 		bgcolor: combineRgb(0, 0, 0),
	// 	},
	// 	steps: [
	// 		{
	// 			down: [
	// 				{
	// 					actionId: ActionId.PlaybackMode,
	// 					options: {
	// 						ModeID:0,
	// 					},
	// 				},
	// 			],
	// 			up: [],
	// 		},
	// 	],
	// 	feedbacks: [
	// 		{
	// 			feedbackId: feedbackId.PlaybackMode,
	// 			options: {
	// 				ModeID:0,
	// 			},
	// 			style: {
	// 				bgcolor: combineRgb(255, 255, 0),
	// 				color: combineRgb(0, 0, 0),
	// 			},
	// 		},
	// 	],
	// }
	// presets[`PalyMode_1`] = {
	// 	type: 'button',
	// 	category: 'Playback',
	// 	name: 'Set Playback mode',
	// 	style: {
	// 		text: `play cross group`,
	// 		size: ptzSize,
	// 		color: combineRgb(255, 255, 255),
	// 		bgcolor: combineRgb(0, 0, 0),
	// 	},
	// 	steps: [
	// 		{
	// 			down: [
	// 				{
	// 					actionId: ActionId.PlaybackMode,
	// 					options: {
	// 						ModeID:1,
	// 					},
	// 				},
	// 			],
	// 			up: [],
	// 		},
	// 	],
	// 	feedbacks: [
	// 		{
	// 			feedbackId: feedbackId.PlaybackMode,
	// 			options: {
	// 				ModeID:1,
	// 			},
	// 			style: {
	// 				bgcolor: combineRgb(255, 255, 0),
	// 				color: combineRgb(0, 0, 0),
	// 			},
	// 		},
	// 	],
	// }
	// presets[`PalyMode_Repeat_1`] = {
	// 	type: 'button',
	// 	category: 'Playback',
	// 	name: 'Set Playback Repeat',
	// 	style: {
	// 		text: `Repeat`,
	// 		size: ptzSize,
	// 		color: combineRgb(255, 255, 255),
	// 		bgcolor: combineRgb(0, 0, 0),
	// 	},
	// 	steps: [
	// 		{
	// 			down: [
	// 				{
	// 					actionId: ActionId.PlaybackRepeat,
	// 					options: {
	// 						EnableID:2,
	// 					},
	// 				},
	// 			],
	// 			up: [],
	// 		},
	// 	],
	// 	feedbacks: [
	// 		{
	// 			feedbackId: feedbackId.PlaybackRepeat,
	// 			options: {},
	// 			style: {
	// 				bgcolor: combineRgb(255, 255, 0),
	// 				color: combineRgb(0, 0, 0),
	// 			},
	// 		},
	// 	],
	// }
	// presets[`PalyMode_Pause_1`] = {
	// 	type: 'button',
	// 	category: 'Playback',
	// 	name: 'Set Playback Pause',
	// 	style: {
	// 		text: `Pause`,
	// 		size: ptzSize,
	// 		color: combineRgb(255, 255, 255),
	// 		bgcolor: combineRgb(0, 0, 0),
	// 	},
	// 	steps: [
	// 		{
	// 			down: [
	// 				{
	// 					actionId: ActionId.PlaybackPause,
	// 					options: {
	// 						EnableID:2,
	// 					},
	// 				},
	// 			],
	// 			up: [],
	// 		},
	// 	],
	// 	feedbacks: [
	// 		{
	// 			feedbackId: feedbackId.PlaybackPause,
	// 			options: {},
	// 			style: {
	// 				bgcolor: combineRgb(255, 255, 0),
	// 				color: combineRgb(0, 0, 0),
	// 			},
	// 		},
	// 	],
	// }
	// presets[`PalyMode_Bar_1`] = {
	// 	type: 'button',
	// 	category: 'Playback',
	// 	name: 'Set Playback Bar',
	// 	style: {
	// 		text: `Bar`,
	// 		size: ptzSize,
	// 		color: combineRgb(255, 255, 255),
	// 		bgcolor: combineRgb(0, 0, 0),
	// 	},
	// 	steps: [
	// 		{
	// 			down: [
	// 				{
	// 					actionId: ActionId.PlaybackBar,
	// 					options: {
	// 						EnableID:2,
	// 					},
	// 				},
	// 			],
	// 			up: [],
	// 		},
	// 	],
	// 	feedbacks: [
	// 		{
	// 			feedbackId: feedbackId.PlaybackBar,
	// 			options: {},
	// 			style: {
	// 				bgcolor: combineRgb(255, 255, 0),
	// 				color: combineRgb(0, 0, 0),
	// 			},
	// 		},
	// 	],
	// }
	//Record
	presets[`Record_0`] = {
		type: 'button',
		category: 'Record',
		name: 'Record',
		style: {
			text: `Record\\n$(gostreamdeck:record_duration_hm)`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.Record,
						options: {
							Record: 2,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: feedbackId.Record,
				options: {},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}
	//PlayBack
	presets[`PlayModeRepeatPause_0`] = {
		type: 'button',
		category: 'Playback',
		name: 'Set Playback Info',
		style: {
			text: `$(gostreamdeck:PlayState)`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.PlayModeRepeatPause,
						options: {
							ModeID: 0,
							repeatId: 1,
							pauseId: 2,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: feedbackId.PlaybackPause,
				options: {},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}
	//live
	presets[`Live_0`] = {
		type: 'button',
		category: 'Live',
		name: 'Live',
		style: {
			text: `Live`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.Live,
						options: {
							LiveEnable: 2,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: feedbackId.Live,
				options: {
					statesId: 0,
				},
				style: {
					bgcolor: combineRgb(0, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
			{
				feedbackId: feedbackId.Live,
				options: {
					statesId: 1,
				},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
			{
				feedbackId: feedbackId.Live,
				options: {
					statesId: 2,
				},
				style: {
					bgcolor: combineRgb(255, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	}
	//Settings
	for (const aux of SettingsAuxSourceChoices) {
		presets[`aux_${aux.id}`] = {
			category: `AUXSource`,
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
					feedbackId: feedbackId.AuxBG,
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
	for (const param of SettingsOutSourceParamChoices) {
		for (const source of getChoices(ActionType.SettingsoutSource)) {
			presets[`Setting_Type_${param.id}_OutSource_${source.id}`] = {
				category: 'Settings',
				name: `Settings ${param.label} OutSource ${source.label}`,
				type: 'button',
				style: {
					text: `${source.label}`,
					size: ptzSize,
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				feedbacks: [
					{
						feedbackId: feedbackId.SettingOutSource,
						options: {
							OutId: param.id,
							OutSource: source.id,
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
								actionId: ActionId.OutSource,
								options: {
									OutId: param.id,
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

export { presets }
