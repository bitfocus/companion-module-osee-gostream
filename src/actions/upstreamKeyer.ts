import { ActionId } from './ActionId'
import { getOptNumber } from './index'
import { getChoices } from '../choices'
import { UpStreamKeyTypeChoices } from '../model'
import { ReqType, ActionType } from '../enums'
import { sendCommand } from '../connection'
import { createLumaKeyActions } from './upstreamKeyActions/lumaKey'
import { createChromaKeyActions } from './upstreamKeyActions/chromaKey'
import { createKeyPatternActions } from './upstreamKeyActions/keyPattern'
import { createPIPActions } from './upstreamKeyActions/pip'
import type { GoStreamInstance } from '../index'
import type { CompanionActionDefinitions } from '@companion-module/base'

export function createUSKActions(_self: GoStreamInstance): CompanionActionDefinitions {
	return {
		[ActionId.UpStreamKeyFillKeyType]: {
			name: 'UpStream Key:Set inputs',
			options: [
				{
					type: 'dropdown',
					label: 'Fill Source',
					id: 'FillSource',
					choices: getChoices(ActionType.LumaKeySourceKey),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Key Source',
					id: 'KeySource',
					choices: getChoices(ActionType.LumaKeySourceKey),
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.UpStreamKeyFillKeyType, ReqType.Set, [
					0,
					getOptNumber(action, 'FillSource'),
					getOptNumber(action, 'KeySource'),
				])
			},
		},
		[ActionId.UpStreamKeyType]: {
			name: 'UpStream Key:Set Key Type',
			options: [
				{
					type: 'dropdown',
					label: 'Key Type:',
					id: 'USKType',
					choices: UpStreamKeyTypeChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				await sendCommand(ActionId.UpStreamKeyType, ReqType.Set, [getOptNumber(action, 'USKType')])
			},
		},
		[ActionId.TransitionSource]: {
			name: 'UpStream Key: Tie USK to next transition',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'USKTieState',
					choices: [
						{ id: 5, label: 'on' },
						{ id: 4, label: 'off' },
						{ id: 0, label: 'toggle' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				let nextState = action.options.USKTieState
				if (nextState === 0) {
					nextState = _self.states.upStreamKeyState.Tied ? 4 : 5
				}
				await sendCommand(ActionId.TransitionSource, ReqType.Set, [nextState])
			},
		},
		[ActionId.USKOnPreview]: {
			name: 'UpStream Key: on preview, change state for USK on preview bus',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'USKPvwState',
					choices: [
						{ id: 5, label: 'on' },
						{ id: 4, label: 'off' },
						{ id: 0, label: 'toggle' },
					],
					default: 0,
				},
			],
			callback: async (action) => {
				let nextState = action.options.USKPvwState

				if (nextState === 0) {
					// Figure out if it is visible in pvw or not
					if (_self.states.upStreamKeyState.Tied && !_self.states.upStreamKeyState.OnAir)
						// it is currently visible, so should be hidden
						nextState = 4
					else if (!_self.states.upStreamKeyState.Tied && _self.states.upStreamKeyState.OnAir)
						// it is currently visible, so should be hidden. As it is on air we do this by tie:ing
						nextState = 5
					else if (_self.states.upStreamKeyState.Tied && _self.states.upStreamKeyState.OnAir)
						// it is currently hidden, so should be visible. As it is on air we do this by unting
						nextState = 4
					else if (!_self.states.upStreamKeyState.Tied && !_self.states.upStreamKeyState.OnAir)
						// it is currently hidden, so should be visible
						nextState = 5
				} else if (_self.states.upStreamKeyState.OnAir) {
					// Invert next state if On Air is true
					nextState = nextState === 5 ? 4 : 5
				}

				await sendCommand(ActionId.TransitionSource, ReqType.Set, [nextState])
				//if(!_self.states.upStreamKeyState.Tied && !_self.states.upStreamKeyState.OnAir) {
				// It is not showing since it is off, tie USK to show it

				//} else if (_self.states.upStreamKeyState.Tied && _self.states.upStreamKeyState.OnAir) {
				// It is not showing since it is on and tied, untie USK to show it
				//	await sendCommand(ActionId.TransitionSource, ReqType.Set, [ nextState ])
				//}
			},
		},
		...createLumaKeyActions(_self),
		...createChromaKeyActions(_self),
		...createKeyPatternActions(_self),
		...createPIPActions(_self),
	}
}
