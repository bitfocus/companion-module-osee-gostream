import { ActionId } from './actionId'
import { getOptNumber, getOptString, nextInSequence, sequenceOrderDropdown } from '../../util'
import { ReqType, ActionType, TransitionStyle } from '../../enums'
import { sendCommand, sendCommands } from '../../connection'
import type { CompanionActionDefinitions, SomeCompanionActionInputField } from '@companion-module/base'
import { TransitionStyleChoice, WipeDirectionChoices, SwitchChoices } from '../../model'
import { GoStreamModel } from '../../models/types'
import { MixEffectStateT } from './state'

function createActionName(name: string): string {
	return 'MixEffect: ' + name
}

function setSourceSeqOptions(model: GoStreamModel): SomeCompanionActionInputField[] {
	return [
		{
			id: 'Sources',
			type: 'multidropdown',
			label: 'Sources',
			choices: model.InputSources(),
			// default sequence is all sources:
			default: model.InputSources().map((val) => val.id),
		},
		sequenceOrderDropdown,
	]
}

export function create(model: GoStreamModel, state: MixEffectStateT): CompanionActionDefinitions {
	return {
		[ActionId.PgmIndex]: {
			name: createActionName('Set PGM Source'),
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'Source',
					default: 0,
					choices: model.InputSources(),
				},
			],
			callback: async (action) => {
				const id = getOptNumber(action, 'Source')
				await sendCommand(ActionId.PgmIndex, ReqType.Set, [id])
			},
		},
		[ActionId.PvwIndex]: {
			name: createActionName('Set PVW Source'),
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'Source',
					default: 0,
					choices: model.InputSources(),
				},
			],
			callback: async (action) => {
				const id = getOptNumber(action, 'Source')
				await sendCommand(ActionId.PvwIndex, ReqType.Set, [id])
			},
		},
		[ActionId.PgmIndexSequence]: {
			name: createActionName('Set a PGM Source Sequence'),
			description:
				'Choose a set of input sources to cycle through, either sequentially or randomly. Each button press will advance to the next source. "Random sets" will cycle through the whole set before repeating; "Fully random" allows repeats any time. To automate a sequence add this action to a "Time Interval" Trigger.',
			options: setSourceSeqOptions(model),
			callback: async (action) => {
				const srcSequence = action.options.Sources as number[]
				const newSource = nextInSequence(srcSequence, state.PgmSrc, action)

				await sendCommand(ActionId.PgmIndex, ReqType.Set, [newSource])
			},
		},
		[ActionId.PvwIndexSequence]: {
			name: createActionName('Set a PVW Source Sequence'),
			description:
				'Choose a set of input sources to cycle through, either sequentially or randomly. Each button press will advance to the next source. "Random sets" will cycle through the whole set before repeating; "Fully random" allows repeats any time. To automate a sequence add this action to a "Time Interval" Trigger.',
			options: setSourceSeqOptions(model),
			callback: async (action) => {
				const srcSequence = action.options.Sources as number[]
				const newSource = nextInSequence(srcSequence, state.PvwSrc, action)

				await sendCommand(ActionId.PvwIndex, ReqType.Set, [newSource])
			},
		},
		[ActionId.CutTransition]: {
			name: createActionName('Perform CUT transition'),
			options: [],
			callback: async () => {
				await sendCommand(ActionId.CutTransition, ReqType.Set)
			},
		},
		[ActionId.AutoTransition]: {
			name: createActionName('Perform AUTO transition'),
			options: [],
			callback: async () => {
				await sendCommand(ActionId.AutoTransition, ReqType.Set)
			},
		},
		[ActionId.FTB]: {
			name: createActionName('Perform FTB Transition'),
			options: [],
			callback: async () => {
				await sendCommand(ActionId.FTB, ReqType.Set)
			},
		},
		[ActionId.FtbAudioAFV]: {
			name: createActionName('Perform FTB Transition,Audio follows video and pops in'),
			options: [
				{
					type: 'dropdown',
					label: 'FTB Audio AFV',
					id: 'FtbAudioAFV',
					default: 0,
					choices: SwitchChoices,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'FtbAudioAFV')
				let paramOpt = 0
				if (opt === 2) {
					if (state.fadeToBlack.AFV === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.FtbAudioAFV, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.FtbAudioAFV, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.FtbRate]: {
			name: createActionName('Set rate of FTB'),
			options: [
				{
					type: 'number',
					label: 'FTB Rate(s)',
					id: 'FtbRate',
					default: 2,
					min: 0.5,
					max: 8.0,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.FtbRate, ReqType.Set, [getOptNumber(action, 'FtbRate')])
			},
		},
		[ActionId.Prev]: {
			name: createActionName('Preview Button'),
			options: [
				{
					type: 'dropdown',
					label: 'PREV',
					id: 'prevEnable',
					default: 2,
					choices: SwitchChoices,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'prevEnable')
				let paramOpt = 0
				if (opt === 2) {
					if (state.selectTransitionStyle.PrevState === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.Prev, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.Prev, ReqType.Set, [opt])
				}
			},
		},
		[ActionId.TransitionIndex]: {
			name: createActionName('Set transition style/pattern'),
			options: [
				{
					type: 'dropdown',
					label: 'Transition Style',
					id: 'TransitionStyle',
					choices: TransitionStyleChoice.concat([{ id: -1, label: 'Toggle' }]),
					default: TransitionStyle.MIX,
				},
				{
					type: 'multidropdown',
					label: 'Sequence',
					id: 'TransitionStyleSequence',
					choices: TransitionStyleChoice,
					default: TransitionStyleChoice.map((item) => item.id),
					isVisible: (options) => options.TransitionStyle === -1,
				},
			],
			callback: async (action) => {
				let choice = getOptNumber(action, 'TransitionStyle')
				if (choice === -1) {
					// Toggle: cycle through all selected choices sequentially:
					const sizes = action.options.TransitionStyleSequence as number[]
					const curStyle = state.selectTransitionStyle.style
					choice = nextInSequence(sizes, curStyle) as number // default order is sequential.
				}
				await sendCommand(ActionId.TransitionIndex, ReqType.Set, [choice])
			},
		},
		[ActionId.TransitionRate]: {
			name: createActionName('Change transition rate'),
			options: [
				{
					type: 'dropdown',
					label: 'Transition Style',
					id: 'TransitionStyle',
					default: TransitionStyle.MIX,
					choices: TransitionStyleChoice,
				},
				{
					type: 'number',
					label: 'Transition Rate',
					id: 'TransitionRate',
					default: 2,
					min: 0.5,
					max: 8.0,
					step: 0.5,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionRate, ReqType.Set, [
					getOptNumber(action, 'TransitionStyle'),
					getOptNumber(action, 'TransitionRate'),
				])
			},
		},
		[ActionId.TransitionDipSource]: {
			name: createActionName('Change transition dip source'),
			options: [
				{
					type: 'dropdown',
					label: 'Change Dip Source',
					id: 'TransitionDipSource',
					default: 0,
					choices: model.getChoices(ActionType.TransitionDipSource),
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionDipSource, ReqType.Set, [getOptNumber(action, 'TransitionDipSource')])
			},
		},
		[ActionId.TransitionWipePattern]: {
			name: createActionName('Change transition wipe pattern'),
			options: [
				{
					type: 'number',
					label: 'Wipe Pattern',
					id: 'WipePatternID',
					min: 0,
					max: 17,
					default: 0,
					range: true,
					step: 1,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipePattern, ReqType.Set, [getOptNumber(action, 'WipePatternID')])
			},
		},
		[ActionId.TransitionWipeXPosition]: {
			name: createActionName('Change transition wipe X position'),
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'XPosition',
					default: 0,
					min: -16.0,
					max: 16.0,
					step: 0.2,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipeXPosition, ReqType.Set, [getOptNumber(action, 'XPosition')])
			},
		},
		[ActionId.TransitionWipeYPosition]: {
			name: createActionName('Change transition wipe Y position'),
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'YPosition',
					default: 0,
					min: -9.0,
					max: 9.0,
					step: 0.2,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipeYPosition, ReqType.Set, [getOptNumber(action, 'YPosition')])
			},
		},
		[ActionId.TransitionWipeDirection]: {
			name: createActionName('Change transition wipe style direction'),
			options: [
				{
					type: 'dropdown',
					label: 'Change Wipe Style Direction',
					id: 'WipeDirection',
					default: 0,
					choices: WipeDirectionChoices,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipeDirection, ReqType.Set, [getOptNumber(action, 'WipeDirection')])
			},
		},
		[ActionId.TransitionWipeSymmetry]: {
			name: createActionName('Change transition wipe style symmetry'),
			options: [
				{
					type: 'number',
					label: 'Symmetry',
					id: 'WipeSymmetry',
					default: 50,
					min: 0,
					max: 100,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipeSymmetry, ReqType.Set, [getOptNumber(action, 'WipeSymmetry')])
			},
		},
		[ActionId.TransitionWipeSoftness]: {
			name: createActionName('Change transition wipe style softness'),
			options: [
				{
					type: 'number',
					label: 'Softness',
					id: 'WipeSoftness',
					default: 0,
					min: 0,
					max: 100,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipeSoftness, ReqType.Set, [getOptNumber(action, 'WipeSoftness')])
			},
		},
		[ActionId.TransitionWipeBorder]: {
			name: createActionName('Change transitions wipe style border'),
			options: [
				{
					type: 'number',
					label: 'Border',
					id: 'WipeBorder',
					default: 0,
					min: 0,
					max: 100,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipeBorder, ReqType.Set, [getOptNumber(action, 'WipeBorder')])
			},
		},
		[ActionId.TransitionWipeFillSource]: {
			name: createActionName('Change transition wipe style fill source'),
			options: [
				{
					type: 'dropdown',
					label: 'Fill Source',
					id: 'WipeFillSource',
					default: 0,
					choices: model.getChoices(ActionType.TransitionWipeFillSource),
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.TransitionWipeFillSource, ReqType.Set, [getOptNumber(action, 'WipeFillSource')])
			},
		},
		//---------------------------------------------------------------------------------------
		//  Next Transition block of buttons: On Air (USK), On Air (DSK), KEY (USK), DSK, BKGD
		//----------------->>>>>>
		[ActionId.NextTransitionButtons]: {
			name: createActionName('Set "Next Transition" Button (KEY, DSK, or BKGD)'),
			description:
				'Set a button in the Next Transition group: On/Off/Toggle is the normal "Tie" behavior: its effect on PVW depends on the state of "On Air". The last two options ensure that the key is On/Off PVW regardless of the state of "On Air"',
			options: [
				{
					type: 'dropdown',
					label: 'Layer',
					id: 'KeyButton',
					choices: state.nextTState.getChoices(true),
					default: state.nextTState.getDefaultChoice(),
				},
				{
					type: 'dropdown',
					label: 'Action',
					id: 'ButtonAction',
					choices: [
						{ id: 0, label: 'Off' },
						{ id: 1, label: 'On' },
						{ id: 2, label: 'Toggle' },
						{ id: 3, label: 'Off PVW' },
						{ id: 4, label: 'On PVW' },
					],
					default: 0,
					isVisible: (options) => options.KeyButton != 'BKGD',
				},
				{
					type: 'dropdown',
					label: 'Action',
					id: 'BKGDAction',
					choices: [
						{ id: 0, label: 'Off' },
						{ id: 1, label: 'On' },
						{ id: 2, label: 'Toggle' },
					],
					default: 0,
					isVisible: (options) => options.KeyButton === 'BKGD',
				},
			],
			callback: async (action) => {
				const keyName = getOptString(action, 'KeyButton')
				let operation = 0
				const ntState = state.nextTState.copy()

				if (action.options.KeyButton === 'BKGD') {
					operation = getOptNumber(action, 'BKGDAction')
				} else {
					operation = getOptNumber(action, 'ButtonAction')
				}

				if (isNaN(operation) || operation === undefined || operation < 0 || operation > 4) {
					console.log('Next Transition:Tie key to next transition - Unknown ButtonAction: ' + action.options.operation)
					return
				} else if (keyName === undefined || !state.nextTState.isChoiceValid(keyName, true)) {
					console.log('Next Transition:Tie key to next transition - Unknown KeyButton: ' + action.options.KeyButton)
					return
				} else if (operation === 0) {
					// Off
					ntState[keyName] = false
				} else if (operation === 1) {
					// On
					ntState[keyName] = true
				} else if (operation === 2) {
					// Toggle
					ntState[keyName] = !ntState[keyName]
				} else if (ntState.getOnAirStatus(keyName)) {
					// Off/On in PVW (ops 3, 4)
					// if OnAir, "Key" logic is reversed, so correct for it here
					ntState[keyName] = operation === 3
				} else {
					ntState[keyName] = operation === 4
				}

				await sendCommand(ActionId.NextTransitionButtons, ReqType.Set, [ntState.pack()])
			},
		},
		[ActionId.OnAirButtons]: {
			name: createActionName('Set "On Air" Button (KEY or DSK)'),
			description:
				'Set an "On Air" button. On/Off/Toggle is the "normal" behavior, showing/hiding in PGM and flipping the visibility in PVW. The last three options ensure that the action affects PGM only (although PVW may flicker)',
			options: [
				{
					type: 'dropdown',
					label: 'Layer',
					id: 'KeyButton',
					choices: state.nextTState.getChoices(true),
					default: state.nextTState.getDefaultChoice(),
				},
				{
					type: 'dropdown',
					label: 'Action',
					id: 'ButtonAction',
					choices: [
						{ id: 0, label: 'Off' },
						{ id: 1, label: 'On' },
						{ id: 2, label: 'Toggle' },
						{ id: 3, label: 'Off PGM only' },
						{ id: 4, label: 'On PGM only' },
						{ id: 5, label: 'Toggle PGM only' }, // needed here unlike NextTransition
					],
					default: 0,
				},
			],
			callback: async (action) => {
				const keyName = getOptString(action, 'KeyButton')
				const operation = getOptNumber(action, 'ButtonAction')
				const ntState = state.nextTState.copy()

				if (isNaN(operation) || operation === undefined || operation < 0 || operation > 5) {
					console.log('Next Transition:Key On Air - Unknown ButtonAction: ' + action.options.operation)
					return
				} else if (keyName === undefined || !state.nextTState.isChoiceValid(keyName, false)) {
					console.log('Next Transition:Key On Air - Unknown KeyButton: ' + action.options.KeyButton)
					return
				} else if (operation === 0 || operation == 3) {
					// Off
					ntState.setOnAirStatus(keyName, false)
				} else if (operation === 1 || operation == 4) {
					// On
					ntState.setOnAirStatus(keyName, true)
				} else if (operation === 2 || operation == 5) {
					// Toggle
					ntState.setOnAirStatus(keyName, !ntState.getOnAirStatus(keyName))
				}

				const commands = [ntState.getOnAirCommand(keyName)]
				if (operation >= 3 && ntState.getOnAirStatus(keyName) != state.nextTState.getOnAirStatus(keyName)) {
					// Off/On in PGM (ops 3 - 5): if we're changing the On Air value then:
					//  we need to flip the status of the "next transition" key
					ntState[keyName] = !ntState[keyName]
					commands.push({ id: ActionId.NextTransitionButtons, type: ReqType.Set, value: [ntState.pack()] })
				}

				await sendCommands(commands)
			},
		},
	}
}
