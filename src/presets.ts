import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'

import { ActionType, feedbackId } from './enums'
import { ActionId } from './actions/ActionId'
import { MixEffectPresets } from './functions/mixEffect'
import { StreamingPresets } from './functions/streaming'
import { LivePresets } from './functions/live'
import { getChoices } from './choices'
import {
	AudioInputSourcesChoices,
	AudioMicChoices,
	KeySwitchChoices,
	SettingsOutSourceParamChoices,
	SettingsAuxSourceChoices,
} from './model'
import { MacroFeedbackType } from './feedback'

const ptzSize = '18'
export function presets(): CompanionPresetDefinitions {
	const presets = {
		...MixEffectPresets.create(),
		...StreamingPresets.create(),
		...LivePresets.create(),
	}
	//Prev 和Progra
	//Transitions

	//Keys On Air
	const Keys = KeySwitchChoices
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

	// USK
	presets[`USKOnPvw`] = {
		category: `Keys On Air`,
		name: `Toggle USK on preview`,
		type: 'button',
		style: {
			text: `USK on PVW`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		feedbacks: [
			{
				feedbackId: feedbackId.KeyOnPvw,
				options: {
					KeyOnAir: 1,
				},
				style: {
					bgcolor: combineRgb(0, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
		steps: [
			{
				down: [
					{
						actionId: ActionId.USKOnPreview,
						options: { USKPvwState: 0 },
					},
				],
				up: [],
			},
		],
	}
	//DSK
	const dsk_sources = getChoices(ActionType.DskSourceFill)
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
	const sources = getChoices(ActionType.LumaKeySourceKey)
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

	//PlayBack
	/*presets[`PlayModeRepeatPause_0`] = {
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
	*/
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
