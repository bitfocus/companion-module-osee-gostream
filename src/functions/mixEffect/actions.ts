import { Effect } from "../../connection/actionids"
import { getOptNumber, getEnumKeyByValue } from '../../util'

import type { CompanionActionDefinitions } from '@companion-module/base'
import { TransitionStyleChoice, WipeDirectionChoices, MixEfectSwitchChoices } from '../../model'
import { StreamDeck } from '../../connection/streamdeck'
import { EffectStyle, Model, sourceID } from '../../connection/enums'


function createActionName(name: string): string {
	return 'MixEffect: ' + name
}
export function create(deck: StreamDeck): CompanionActionDefinitions {
	let actions: CompanionActionDefinitions = {
		[Effect.ActionId.TransitionStyle]: {
			name: createActionName('Set transition style'),
			options: [
				{
					type: 'dropdown',
					label: 'Transition Style',
					id: 'transitionStyle',
					default: EffectStyle.Mix,
					choices: TransitionStyleChoice,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'transitionStyle');
				let style = "";
				switch (opt) {
					case 0:
					default:
						style = "Mix"
						break;
					case 1:
						style = "Dip"
						break;
					case 2:
						style = "Wipe"
						break;

				}
				await deck.setTransitionStyle(style)
			},
		},
		[Effect.ActionId.AutoTransition]: {
			name: createActionName('Perform AUTO transition'),
			options: [],
			callback: async () => {
				await deck.setAutoTransition();
			},
		},
		[Effect.ActionId.CutTransition]: {
			name: createActionName('Perform CUT transition'),
			options: [],
			callback: async () => {
				await deck.setCutTransition();
			},
		},
		[Effect.ActionId.PgmIndex]: {
			name: createActionName('Set PGM Source'),
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'Source',
					default: sourceID.IN1,
					choices: deck.state !== undefined ? deck.state.device.inputSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : []
				},
			],
			callback: async (action) => {
				const id = getOptNumber(action, 'Source')
				await deck.changePGMIndex(id);
			},
		},
		[Effect.ActionId.PvwIndex]: {
			name: createActionName('Set PVW Source'),
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'Source',
					default: sourceID.IN1,
					choices: deck.state !== undefined ? deck.state.device.inputSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : []
				},
			],
			callback: async (action) => {
				const id = getOptNumber(action, 'Source')
				await deck.changePVWIndex(id);
			},
		},
		[Effect.ActionId.PreviewTransition]: {
			name: createActionName('Preview Button'),
			options: [
				{
					type: 'dropdown',
					label: 'PREV',
					id: 'prevEnable',
					default: 2,
					choices: MixEfectSwitchChoices,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'prevEnable')
				if (opt === 2) opt = deck.state?.effect.selectTransitionStyle.PrevState === true ? 0 : 1
				await deck.setPrevEnabled(opt)
			},
		},
		[Effect.ActionId.TransitionRate]: {
			name: createActionName('Change transition rate'),
			options: [
				{
					type: 'dropdown',
					label: 'Transition Style',
					id: 'transitionStyle',
					default: EffectStyle.Mix,
					choices: TransitionStyleChoice,
				},
				{
					type: 'number',
					label: 'Transition Rate',
					id: 'transitionRate',
					default: 2,
					min: 0.5,
					max: 8.0,
					step: 0.5,
					range: true,
				},
			],
			callback: async (action) => {
				const style = getOptNumber(action, 'transitionStyle')
				const rate = getOptNumber(action, 'transitionRate')
				await deck.setStyleRate(style, rate);
			},
		},
		[Effect.ActionId.TransitionDipFillSource]: {
			name: createActionName('set dip source'),
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'transitionDipSource',
					default: sourceID.Color,
					choices: deck.state !== undefined ? deck.state.effect.dipFillSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : []
				},
			],
			callback: async (action) => {
				let id = getOptNumber(action, 'transitionDipSource');
				await deck.setTranstionDipFillSource(id);
			},
		},
		[Effect.ActionId.TransitionWipeDirection]: {
			name: createActionName('Change transition wipe style direction'),
			options: [
				{
					type: 'dropdown',
					label: 'set wipe direction',
					id: 'wipeDirection',
					default: 0,
					choices: WipeDirectionChoices,
				},
			],
			callback: async (action) => {
				await deck.setTransitionWipeDirection(getOptNumber(action, 'wipeDirection'));
			},
		},
	}
	if (deck.state?.device.deviceModel !== Model.Duet_8ISO) {
		actions[Effect.ActionId.Ftb] = {
			name: createActionName('Perform FTB Transition'),
			options: [],
			callback: async () => {
				await deck.setFtbTransition();
			},
		}
		actions[Effect.ActionId.FtbRate] = {
			name: createActionName('set FTB rate'),
			options: [
				{
					type: 'number',
					label: 'FTB Rate(s)',
					id: 'ftbRate',
					default: 2,
					min: 0.5,
					max: 8.0,
					range: true,
				},
			],
			callback: async (action) => {
				await deck.setFtbRate(getOptNumber(action, 'ftbRate'));
			},
		}
		actions[Effect.ActionId.FtbAfv] = {
			name: createActionName('set FTB AFV'),
			options: [
				{
					type: 'dropdown',
					label: 'AFV',
					id: 'ftbAudioAFV',
					default: 0,
					choices: MixEfectSwitchChoices,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'ftbAudioAFV')
				if (opt === 2) opt = deck.state?.effect.fadeToBlack.AFV === true ? 0 : 1
				await deck.setFtbAfvEnabled(opt);
			},
		}
		actions[Effect.ActionId.TransitionWipeXPosition] = {
			name: createActionName('set Wipe X Position'),
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'xPosition',
					default: 0,
					min: -16.0,
					max: 16.0,
					step: 0.2,
					range: true,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'xPosition')
				await deck.setTransitionWipeXPosition(opt);
			},
		}
		actions[Effect.ActionId.TransitionWipeYPosition] = {
			name: createActionName('set Wipe Y Position'),
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'yPosition',
					default: 0,
					min: -9.0,
					max: 9.0,
					step: 0.2,
					range: true,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'yPosition')
				await deck.setTransitionWipeYPosition(opt);
			},
		}
		actions[Effect.ActionId.TransitionWipeSymmetry] = {
			name: createActionName('set wipe symmetry'),
			options: [
				{
					type: 'number',
					label: 'Symmetry',
					id: 'symmetry',
					default: 0,
					min: 0,
					max: 100,
					step: 1,
					range: true,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'symmetry')
				await deck.setTransitionWipeSymmetry(opt);
			},
		}
		actions[Effect.ActionId.TransitionWipeSoftness] = {
			name: createActionName('set wipe Softness'),
			options: [
				{
					type: 'number',
					label: 'Softness',
					id: 'softness',
					default: 0,
					min: 0,
					max: 100,
					step: 1,
					range: true,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'softness')
				await deck.setTransitionWipeSoftness(opt);
			},
		}
		actions[Effect.ActionId.TransitionWipeBorder] = {
			name: createActionName('set wipe border'),
			options: [
				{
					type: 'number',
					label: 'Border',
					id: 'border',
					default: 0,
					min: 0,
					max: 100,
					step: 1,
					range: true,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'border')
				await deck.setTransitionWipeBorder(opt);
			},
		}
		actions[Effect.ActionId.TransitionWipeFillSource] = {
			name: createActionName('set wipe Fill Source'),
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'transitionWipeSource',
					default: sourceID.Color,
					choices: deck.state !== undefined ? deck.state.effect.wipeFillSource.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)) })) : []
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'transitionWipeSource')
				await deck.setTransitionWipeFillSource(opt);
			},
		}
	}
	return actions;
}
