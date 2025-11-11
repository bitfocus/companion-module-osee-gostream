import { StreamDeck } from '../../connection/streamdeck';
import { MutiView } from "../../connection/actionids"
import type { CompanionActionDefinitions } from '@companion-module/base'


export function create(deck: StreamDeck): CompanionActionDefinitions {
	return {
		[MutiView.ActionId.MultiViewLayout]: {
			name: 'settings: set MultiView layout',
			options: [],
			callback: async () => {
				let style= deck.state?.mutiView.layoutStyle===0?1:0;
                await deck.setMultiViewLayout(style);
			},
		},
		// [ActionId.MultiViewWindows]: {
		// 	name: 'MultiView: set M/V window source',
		// 	options: [
		// 		{
		// 			type: 'dropdown',
		// 			label: 'Src',
		// 			id: 'SrcID',
		// 			choices: [],
		// 			default: 0,
		// 		},
		// 		{
		// 			type: 'dropdown',
		// 			label: 'Mv Meter Enable',
		// 			id: 'MvMeterEnable',
		// 			choices: SettingEnableChoices,
		// 			default: 0,
		// 		},
		// 	],
		// 	callback: async (action) => {
		// 		const src = getOptNumber(action, 'SrcID')
		// 		let enable = getOptNumber(action, 'MvMeterEnable')
		// 		// if (enable === 2) {
		// 		// 	// Toggle
		// 		// 	enable = state.mvMeter[src] === 1 ? 0 : 1
		// 		// }
		// 		await sendCommand(ActionId.MultiViewWindows, ReqType.Set, [src, enable])
		// 	},
		// },
	}
}
