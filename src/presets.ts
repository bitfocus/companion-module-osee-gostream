import { CompanionButtonPresetDefinition, CompanionPresetDefinitions, combineRgb } from '@companion-module/base'
import { ActionId, ActionType, feedbackId } from './enums'
import { GoSteamDeckInstance } from './index'
import { getChoices } from './choices'
import { KeySwitchChoices, SettingsAuxSourceChoices, SettingsOutSourceParamChoices, TransitionStyleChoice, UpStreamKeyTypeChoices } from './model'
const rateOptions = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]

export function presets(_self: GoSteamDeckInstance): CompanionPresetDefinitions {
	const presets: { [id: string]: CompanionButtonPresetDefinition | undefined } = {}

	let MeChoice = getChoices(ActionType.Preview);

	for(const src of MeChoice){
		presets[`Preview_${src.id}`] = {
			type: 'button',
			category: 'Preview',
			name: `Preview button for ${src.label}`,
			style: {
				pngalignment: 'center:center',
				text: `${src.label}`,
				alignment: 'center:center',
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.PvwIndex,
							options: {
								Source:src.id
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
				}
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
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.PgmIndex,
							options: {
								Source:src.id
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
				}
			],
		}


	}

	presets[`transition_cut`] = {
		category: `Transitions`,
		name: `CUT`,
		type: 'button',
		style: {
			text: 'CUT',
			size: 'auto',
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
			size: 'auto',
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

	let TranChoices= TransitionStyleChoice;
	for(const opt of TranChoices){
		presets[`transition_style_${opt.id}`] = {
			category: `Transitions`,
			name: `Transition style ${opt.label}`,
			type: 'button',
			style: {
				text: opt.label,
				size: 'auto',
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
				name: `Transition ${opt.label} rate ${rate}`,
				type: 'button',
				style: {
					text: `${opt.label} ${rate}`,
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				feedbacks: [
					{
						feedbackId: feedbackId.TransitionRate,
						options: {
							TransitionStyle: opt.id,
							TransitionRate:rate,
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
									TransitionRate:rate,
								},
							},
						],
						up: [],
					},
				],
			}
		}
	}

	let Keys=KeySwitchChoices;
	for(const key of Keys){
		presets[`keys_Next_${key.id}`] = {
			category: 'KEYs Next',
			name: `Toggle ${key.label} Switch`,
			type: 'button',
			style: {
				text: `${key.label}`,
				size: '24',
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
		if(key.label!="BKGD"){
			presets[`keys_Next_Air_${key.id}`] = {
				category: 'KEYs Next',
				name: `Toggle upstream KEY ${key.label} Next`,
				type: 'button',
				style: {
					text: `${key.label} On AIR`,
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				feedbacks: [
					{
						feedbackId:key.label==="Key"? feedbackId.KeyOnAir:feedbackId.DskOnAir,
						options: {
							KeyOnAir: "1",
							DSKOnAir:"1",
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
								actionId:key.label==="Key"? ActionId.KeyOnAir:ActionId.DskOnAir,
								options: {
									KeyOnAir: "1",
									DSKOnAir:"1",
								},
							},
						],
						up: [],
					},
				],
			}
		}
	}

	//UpStreamKey
	for(const UpKey of UpStreamKeyTypeChoices){
		presets[`UpStreamKey_${UpKey.id}`] = {
			category: 'UpStreamKeyType',
			name: `Upstream key: Set Key Type ${UpKey.label}`,
			type: 'button',
			style: {
				text: `${UpKey.label}`,
				size: '24',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: feedbackId.UpStreamKeyType,
					options: {
						USKType: UpKey.id,
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
							options: {
								USKType: UpKey.id,
							},
						},
					],
					up: [],
				},
			],
		}
		
		let _ActionId = ActionId.LumaKeySourceFill;

		switch(UpKey.id){
			case "0":
				_ActionId= ActionId.LumaKeySourceFill;
			break;
			case "1":
				_ActionId= ActionId.ChromaKeyFill;
			break;
			case "2":
				_ActionId= ActionId.KeyPatternSourceFill;
			break;
			case "3":
				_ActionId= ActionId.PipSource;
			break;
		}
		var sources= getChoices(ActionType.LumaKeySourceKey);
		for(const source of sources){
			presets[`UpStreamKey_${source.id}_${UpKey.id}`] = {
				category: `${UpKey.label}`,
				name: `Upstream key: Set ${UpKey.label} Source Fill`,
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
							USKKeyType:UpKey.id,
							USKSourceFill:source.id,
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
								actionId: _ActionId,
								options: {
									KeyFill: [source.id],
								},
							},
						],
						up: [],
					},
				],
			}
		}
	}


	for(const param of SettingsOutSourceParamChoices){
		for(const source of getChoices(ActionType.SettingsoutSource)){
			presets[`Setting_Type_${param.id}_OutSource_${source.id}`] = {
				category: 'SettingsOutSource',
				name: `Settings ${param.label} OutSource ${source.label}`,
				type: 'button',
				style: {
					text: `${source.label}`,
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				feedbacks: [
					{
						feedbackId: feedbackId.SettingOutSource,
						options: {
							OutId: param.id,
							OutSource:source.id,
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
									OutSource:source.id,
								},
							},
						],
						up: [],
					},
				],
			}
		}
	}
	
	for (let macro = 0; macro < 100; macro++) {
		presets[`macro_run_${macro}`] = {
			category: 'MACROS',
			name: `Run button for macro ${macro + 1}`,
			type: 'button',
			style: {
				text: `macro_${macro + 1}`,
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: feedbackId.Macro,
					options: {
						macroIndex: macro,
					},
					style: {
						bgcolor: combineRgb(0, 0, 238),
						color: combineRgb(255, 255, 255),
					},
				},
			],
			steps: [
				{
					down: [
						{
							actionId: ActionId.MacroStartRun,
							options: {
								MacroIndex: macro,
							},
						},
					],
					up: [],
				},
			],
		}
	}

	presets[`ftb_auto`] = {
		category: `Fade to black`,
		name: `Auto fade`,
		type: 'button',
		style: {
			text: `FTB Auto`,
			size: 'auto',
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
					bgcolor: combineRgb(0, 255, 0),
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
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: feedbackId.FadeToBlackRate,
					options: {
						FtbRate:rate,
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
								FtbRate:rate,
							},
						},
					],
					up: [],
				},
			],
		}
	}

	for(const aux of SettingsAuxSourceChoices){
		presets[`aux_${aux.id}`] = {
			category: `AUX`,
			name: `AUX ${aux.id} button for ${aux.label}`,
			type: 'button',
			style: {
				text: `${aux.label}`,
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: feedbackId.AuxBG,
					options: {
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
								auxSourceID:aux.id,
							},
						},
					],
					up: [],
				},
			],
		}
	}

	/* presets['start_selected_event'] = {
		type: 'button',
		category: 'Program',
		name: 'Starts selected event',
		style: {
			png64: icons.PlaybackStart,
			pngalignment: 'center:top',
			text: 'START',
			alignment: 'center:bottom',
			size: '7',
			color: combineRgb(75, 255, 171),
			bgcolor: combineRgb(0, 0, 0),
		},
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
		feedbacks: [],
	} */
	return presets
}
