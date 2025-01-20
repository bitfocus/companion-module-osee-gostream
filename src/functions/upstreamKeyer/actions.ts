import { ActionId } from './actionId'
import { getOptNumber } from './../../util'
import { getChoices } from './../../choices'
import { UpStreamKeyTypeChoices, KeySwitchChoices } from './../../model'
import { ReqType, ActionType } from './../../enums'
import { sendCommand } from './../../connection'
import { createLumaKeyActions } from './keyTypes/lumaKey'
import { createChromaKeyActions } from './keyTypes/chromaKey'
import { createKeyPatternActions } from './keyTypes/keyPattern'
import { createPIPActions } from './keyTypes/pip'
import type { GoStreamInstance } from './../../index'
import type { CompanionActionDefinitions } from '@companion-module/base'

export function create(instance: GoStreamInstance): CompanionActionDefinitions {
	return {
		[ActionId.KeyOnAir]: {
			name: 'Next Transition:Set KeyOnAir',
			options: [
				{
					type: 'dropdown',
					label: 'Key OnAir',
					id: 'KeyOnAir',
					choices: [
						{ id: 0, label: 'Off' },
						{ id: 1, label: 'On Air' },
						{ id: 2, label: 'Toggle' },
					],
					default: 2,
				},
			],
			callback: async (action) => {
				const opt = getOptNumber(action, 'KeyOnAir')
				let paramOpt = 0
				if (opt === 2) {
					if (instance.states.UpstreamKeyer.transitionKey.KeyOnAir === true) {
						paramOpt = 0
					} else {
						paramOpt = 1
					}
					await sendCommand(ActionId.KeyOnAir, ReqType.Set, [paramOpt])
				} else {
					await sendCommand(ActionId.KeyOnAir, ReqType.Set, [opt])
				}
			},
		},
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
					if (instance.states.UpstreamKeyer.Tied && !instance.states.UpstreamKeyer.OnAir)
						// it is currently visible, so should be hidden
						nextState = 4
					else if (!instance.states.UpstreamKeyer.Tied && instance.states.UpstreamKeyer.OnAir)
						// it is currently visible, so should be hidden. As it is on air we do this by tie:ing
						nextState = 5
					else if (instance.states.UpstreamKeyer.Tied && instance.states.UpstreamKeyer.OnAir)
						// it is currently hidden, so should be visible. As it is on air we do this by unting
						nextState = 4
					else if (!instance.states.UpstreamKeyer.Tied && !instance.states.UpstreamKeyer.OnAir)
						// it is currently hidden, so should be visible
						nextState = 5
				} else if (instance.states.UpstreamKeyer.OnAir) {
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
		[ActionId.TransitionSource]: {
			name: 'Next Transition:Set Transition Key Switch',
			options: [
				{
					type: 'dropdown',
					label: 'Switch',
					id: 'KeySwitch',
					choices: KeySwitchChoices,
					default: 2,
				},
			],
			callback: async (action) => {
				const seleOptions = action.options.KeySwitch
				if (seleOptions && Array.isArray(seleOptions)) {
					const arrayOptions = Array.from(seleOptions)
					const keyState = instance.states.TKeyeState
					let num = 0
					if (keyState.M_Key === true) {
						num += 1
					}
					if (keyState.DSK === true) {
						num += 1 << 1
					}
					if (keyState.BKGD === true) {
						num += 1 << 2
					}
					//console.log(num);
					if (arrayOptions.includes(0)) {
						if (keyState.M_Key === true) {
							num -= 1
						} else {
							num += 1
						}
					}
					if (arrayOptions.includes(1)) {
						if (keyState.DSK === true) {
							num -= 1 << 1
						} else {
							num += 1 << 1
						}
					}
					if (arrayOptions.includes(2)) {
						if (keyState.BKGD === true) {
							num -= 1 << 2
						} else {
							num += 1 << 2
						}
					}
					await sendCommand(ActionId.TransitionSource, ReqType.Set, [num])
				}
			},
		},
		...createLumaKeyActions(instance),
		...createChromaKeyActions(instance),
		...createKeyPatternActions(instance),
		...createPIPActions(instance),
	}
}
