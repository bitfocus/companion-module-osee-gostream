import { MutiSource } from "../../connection/actionids"
import { getEnumKeyByValue, getOptNumber } from '../../util'
import { MultiSourceEnableChoices, GetMultiSourceWindowChoices, MultiSourceStyleChoices } from '../../model'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { StreamDeck } from '../../connection/streamdeck'
import { Model, sourceID } from '../../connection/enums'

export function create(deck: StreamDeck): CompanionActionDefinitions {
	let actions: CompanionActionDefinitions = {
		[MutiSource.ActionId.MultiSourceWindowCropProperties]: {
			name: 'MultiSource: set window crop',
			options: [
				{
					type: 'dropdown',
					label: 'window:',
					id: 'windowID',
					choices: GetMultiSourceWindowChoices(deck.state),
					default: 0,
				},
				{
					id: 'props',
					type: 'multidropdown',
					label: 'Select properties',
					choices: [
						{ id: 'cropLeft', label: 'cropLeft' },
						{ id: 'cropRight', label: 'cropRight' },
						{ id: 'cropTop', label: 'cropTop' },
						{ id: 'cropBottom', label: 'cropBottom' },
					],
					minSelection: 1,
					default: ['cropLeft', 'cropRight', 'cropTop', 'cropBottom'],
				},
				{
					type: 'number',
					label: 'CropLeft',
					id: 'cropLeft',
					default: 0,
					min: 0,
					max: 100,
					step: 1,
					range: true,
					isVisible: (options) => (<string[]>options.props!).includes('cropLeft'),
				},
				{
					type: 'number',
					label: 'CropRight',
					id: 'cropRight',
					default: 0,
					min: 0,
					max: 100,
					step: 1,
					range: true,
					isVisible: (options) => (<string[]>options.props!).includes('cropRight'),
				},
				{
					type: 'number',
					label: 'CropTop',
					id: 'cropTop',
					default: 0,
					min: 0,
					max: 100,
					step: 1,
					range: true,
					isVisible: (options) => (<string[]>options.props!).includes('cropTop'),
				},
				{
					type: 'number',
					label: 'CropBottom',
					id: 'cropBottom',
					default: 0,
					min: 0,
					max: 100,
					step: 1,
					range: true,
					isVisible: (options) => (<string[]>options.props!).includes('cropBottom'),
				},
			],
			callback: async (action) => {
				const props = <string[]>action.options.props
				const winID = getOptNumber(action, 'windowID')
				if (props.includes('cropLeft')) {
					let paramOpt = getOptNumber(action, 'cropLeft')
					await deck.setMultiSourceWindowCropLeft(winID, paramOpt);
				}
				if (props.includes('cropRight')) {
					let paramOpt = getOptNumber(action, 'cropRight')
					await deck.setMultiSourceWindowCropRight(winID, paramOpt);
				}
				if (props.includes('cropTop')) {
					let paramOpt = getOptNumber(action, 'cropTop')
					await deck.setMultiSourceWindowCropTop(winID, paramOpt);
				}
				if (props.includes('cropBottom')) {
					let paramOpt = getOptNumber(action, 'cropBottom')
					await deck.setMultiSourceWindowCropBottom(winID, paramOpt);
				}
			},
		},
	};
	if (deck.state?.device.deviceModel === Model.Duet_8ISO) {
		actions[MutiSource.ActionId.MultiSourceWindowProperties] = {
			name: 'MultiSource: set window properties',
			options: [
				{
					type: 'dropdown',
					label: 'window:',
					id: 'windowID',
					choices: GetMultiSourceWindowChoices(deck.state),
					default: 0,
				},
				{
					id: 'props',
					type: 'multidropdown',
					label: 'Select properties',
					choices: [
						{ id: 'enable', label: 'enable' },
						{ id: 'source', label: 'source' },
						{ id: 'xPosition', label: 'xPosition' },
						{ id: 'yPosition', label: 'yPosition' },
						{ id: 'size', label: 'size' },
						{ id: 'cropLeft', label: 'cropLeft' },
						{ id: 'cropRight', label: 'cropRight' },
						{ id: 'cropTop', label: 'cropTop' },
						{ id: 'cropBottom', label: 'cropBottom' },
					],
					minSelection: 1,
					default: ['enable', 'source', 'xPosition', 'yPosition', 'size', 'cropLeft', 'cropRight', 'cropTop', 'cropBottom'],
				},
				{
					type: 'dropdown',
					label: 'Enable:',
					id: 'multiSourceWindowEnable',
					choices: MultiSourceEnableChoices,
					default: 0,
					isVisible: (options) => (<string[]>options.props!).includes('enable'),
				},
				{
					type: 'dropdown',
					label: 'Source:',
					id: 'multiSourceWindowSource',
					choices: deck.state?.mutiSource.multiSourceWindowsSources ? deck.state.mutiSource.multiSourceWindowsSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)), })) : [],
					default: sourceID.IN1,
					isVisible: (options) => (<string[]>options.props!).includes('source'),
				},
				{
					type: 'number',
					label: 'X Position',
					id: 'multiX',
					default: -8,
					min: -32,
					max: 32,
					step: 0.1,
					range: true,
					isVisible: (options) => (<string[]>options.props!).includes('xPosition'),
				},
				{
					type: 'number',
					label: 'Y Position',
					id: 'multiY',
					default: -8,
					min: -32,
					max: 32,
					step: 0.1,
					range: true,
					isVisible: (options) => (<string[]>options.props!).includes('yPosition'),
				},
				{
					type: 'number',
					label: 'Size',
					id: 'multiSize',
					default: 33,
					min: 15,
					max: 100,
					step: 1,
					range: true,
					isVisible: (options) => (<string[]>options.props!).includes('size'),
				},
				{
					type: 'number',
					label: 'CropLeft',
					id: 'cropLeft',
					default: 0,
					min: 0,
					max: 100,
					step: 1,
					range: true,
					isVisible: (options) => (<string[]>options.props!).includes('cropLeft'),
				},
				{
					type: 'number',
					label: 'CropRight',
					id: 'cropRight',
					default: 0,
					min: 0,
					max: 100,
					step: 1,
					range: true,
					isVisible: (options) => (<string[]>options.props!).includes('cropRight'),
				},
				{
					type: 'number',
					label: 'CropBottom',
					id: 'cropTop',
					default: 0,
					min: 0,
					max: 100,
					step: 1,
					range: true,
					isVisible: (options) => (<string[]>options.props!).includes('cropTop'),
				},
				{
					type: 'number',
					label: 'CropBottom',
					id: 'cropBottom',
					default: 0,
					min: 0,
					max: 100,
					step: 1,
					range: true,
					isVisible: (options) => (<string[]>options.props!).includes('cropBottom'),
				},
			],
			callback: async (action) => {
				const props = <string[]>action.options.props
				const winID = getOptNumber(action, 'windowID')
				if (props.includes('enable')) {
					let info = deck.state?.mutiSource.eightWins[winID];
					let paramOpt = getOptNumber(action, 'multiSourceWindowEnable')
					if (paramOpt === 2) paramOpt = info?.enable ? 0 : 1
					await deck.setMultiSourceWindowEnable(winID, paramOpt);
				}
				if (props.includes('source')) {
					await deck.setMultiSourceWindowSource(winID, getOptNumber(action, 'multiSourceWindowSource'));
				}
				if (props.includes('xPosition')) {
					await deck.setMultiSourceWindowXPosition(winID, getOptNumber(action, 'multiX'));
				}
				if (props.includes('yPosition')) {
					deck.setMultiSourceWindowYPosition(winID, getOptNumber(action, 'multiY'))
				}
				if (props.includes('size')) {
					await deck.setMultiSourceWindowSize(winID, getOptNumber(action, 'multiSize'));
				}
				if (props.includes('cropLeft')) {
					await deck.setMultiSourceWindowCropLeft(winID, getOptNumber(action, 'cropLeft'));
				}
				if (props.includes('cropRight')) {
					await deck.setMultiSourceWindowCropRight(winID, getOptNumber(action, 'cropRight'));
				}
				if (props.includes('cropTop')) {
					await deck.setMultiSourceWindowCropTop(winID, getOptNumber(action, 'cropTop'))
				}
				if (props.includes('cropBottom')) {
					await deck.setMultiSourceWindowCropTop(winID, getOptNumber(action, 'cropBottom'))
				}
			},
		}
		actions[MutiSource.ActionId.MultiSourceWindowEnable] = {
			name: 'MultiSource: set window enable',
			options: [
				{
					type: 'dropdown',
					label: 'window:',
					id: 'windowID',
					choices: GetMultiSourceWindowChoices(deck.state),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable:',
					id: 'multiSourceWindowEnable',
					choices: MultiSourceEnableChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				const winId = getOptNumber(action, 'windowID')
				let opt = getOptNumber(action, 'multiSourceWindowEnable')
				var info = deck.state?.mutiSource.eightWins[winId];
				if (opt === 2) opt = info?.enable === true ? 0 : 1;

				await deck.setMultiSourceWindowEnable(winId, opt);
			},
		}
		actions[MutiSource.ActionId.MultiSourceWindowSource] = {
			name: 'MultiSource: set window source',
			options: [
				{
					type: 'dropdown',
					label: 'window:',
					id: 'windowID',
					choices: GetMultiSourceWindowChoices(deck.state),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source:',
					id: 'multiSourceWindowSource',
					choices: deck.state?.mutiSource.multiSourceWindowsSources ? deck.state.mutiSource.multiSourceWindowsSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)), })) : [],
					default: sourceID.IN1,
				},
			],
			callback: async (action) => {
				const winId = getOptNumber(action, 'windowID')
				const opt = getOptNumber(action, 'multiSourceWindowSource')
				await deck.setMultiSourceWindowSource(winId, opt);
			},
		}
		actions[MutiSource.ActionId.MultiSourceWindowXPosition] = {
			name: 'MultiSource: set window x position',
			options: [
				{
					type: 'dropdown',
					label: 'window:',
					id: 'windowID',
					choices: GetMultiSourceWindowChoices(deck.state),
					default: 0,
				},
				{
					type: 'number',
					label: 'X Position',
					id: 'multiX',
					default: -8,
					min: -32,
					max: 32,
					step: 0.1,
					range: true,
				},
			],
			callback: async (action) => {
				const winId = getOptNumber(action, 'windowID')
				const opt = getOptNumber(action, 'multiX')
				await deck.setMultiSourceWindowXPosition(winId, opt)
			},
		}
		actions[MutiSource.ActionId.MultiSourceWindowYPosition] = {
			name: 'MultiSource: set window y position',
			options: [
				{
					type: 'dropdown',
					label: 'window:',
					id: 'windowID',
					choices: GetMultiSourceWindowChoices(deck.state),
					default: 0,
				},
				{
					type: 'number',
					label: 'Y Position',
					id: 'multiY',
					default: -8,
					min: -32,
					max: 32,
					step: 0.1,
					range: true,
				},
			],
			callback: async (action) => {
				const winId = getOptNumber(action, 'windowID')
				const opt = getOptNumber(action, 'multiY')
				await deck.setMultiSourceWindowYPosition(winId, opt);
			},
		}
		actions[MutiSource.ActionId.MultiSourceWindowSize] = {
			name: 'MultiSource: set size position',
			options: [
				{
					type: 'dropdown',
					label: 'window:',
					id: 'windowID',
					choices: GetMultiSourceWindowChoices(deck.state),
					default: 0,
				},
				{
					type: 'number',
					label: 'Size',
					id: 'multiSize',
					default: 33,
					min: 15,
					max: 100,
					step: 1,
					range: true,
				},
			],
			callback: async (action) => {
				const winId = getOptNumber(action, 'windowID')
				const opt = getOptNumber(action, 'multiSize')
				await deck.setMultiSourceWindowSize(winId, opt)
			},
		}
	} else {
		actions[MutiSource.ActionId.MultiSourceEnable] = {
			name: 'MultiSource: set multiSource enable',
			options: [
				{
					type: 'dropdown',
					label: 'Enable:',
					id: 'multiSourceEnable',
					choices: MultiSourceEnableChoices,
					default: 0,
				},
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'multiSourceEnable')
				var info = deck.state?.mutiSource
				if (opt === 2) opt = info?.enable === true ? 0 : 1;

				await deck.setMultiSourceEnable(opt);
			},
		}
		actions[MutiSource.ActionId.MultiSourceWindowSource] = {
			name: 'MultiSource: Set multiSource Source',
			options: [
				{
					type: 'dropdown',
					label: 'Select Source',
					id: 'windowID',
					choices: [
						{ id: 0, label: 'Source 1' },
						{ id: 1, label: 'Source 2' },
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source:',
					id: 'multiSourceWindowSource',  
					choices: deck.state?.mutiSource.multiSourceWindowsSources ? deck.state.mutiSource.multiSourceWindowsSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)), })) : [],
					default: sourceID.IN1,
				},
			],
			callback: async (action) => {
				const winId = getOptNumber(action, 'windowID')
				const opt = getOptNumber(action, 'multiSourceWindowSource')
				await deck.setMultiSourceWindowSource(winId, opt);
			},
		}
                                                                                           
		actions[MutiSource.ActionId.MultiSourceFillSource] = {
			name: 'MultiSource: Set multiSource Background',
			options: [
				{
					type: 'dropdown',
					label: 'Source:',
					id: 'keySource',
					choices: deck.state?.mutiSource.fillSources ? deck.state.mutiSource.fillSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)), })) : [],
					default: sourceID.IN1,
				},
			],
			callback: async (action) => {
				// const winId = getOptNumber(action, 'windowID')
				const opt = getOptNumber(action, 'keySource')
				await deck.setMultiSourceFillSource(opt); 
			},
		}

		actions[MutiSource.ActionId.MultiSourceControlStyle] = {
			name: 'MultiSource: Set multiSource control',
			options: [
				{
					type: 'dropdown',
					label: 'Layout:',
					id: 'style',
					choices: MultiSourceStyleChoices,
					default: sourceID.IN1,
				},
				{
					type: 'number',
					label: 'Y Position',
					id: 'multiY',
					default: 0,
					min: -4.50,
					max: 4.50,
					step: 0.1,
					range: true,
				},
			],
			callback: async (action) => {
				const style = getOptNumber(action, 'style')
				const opt = getOptNumber(action, 'multiY')
				await deck.setMultiSourceControlStyle(style);
				await deck.setMultiSourceControlYPosition(opt);  //无效
			},
		}
		// actions[MutiSource.ActionId.MultiSourceWindowCropEnable] = {
		// 	name: 'MultiSource: Set multiSource Crop Enable',
		// 	options: [
		// 		{
		// 			type: 'dropdown',
		// 			label: 'mask:',
		// 			id: 'windowID',
		// 			choices: [
		// 				{ id: 0, label: 'mask1' },
		// 				{ id: 1, label: 'mask2' },
		// 			],
		// 			default: 0,
		// 		},
		// 		{
		// 			type: 'dropdown',
		// 			label: 'Enable:',
		// 			id: 'multiSourceWindowEnable',
		// 			choices: MultiSourceEnableChoices,
		// 			default: 0,
		// 		},
		// 	],
		// 	callback: async (action) => {
		// 		const id = getOptNumber(action, 'windowID')
		// 		let opt = getOptNumber(action, 'multiSourceWindowEnable')
		// 		if (opt === 2)
		// 			opt = deck.state?.mutiSource.fourWins[id]?.cropEnable === true ? 0 : 1
		// 		await deck.setMultiSourceWindowCropEnable(id, opt); //无效
		// 	},
		// }
		actions[MutiSource.ActionId.MultiSourceWindowBorderProperties] = {
			name: 'MultiSource: set window broder',
			options: [
				{
					type: 'dropdown',
					label: 'window:',
					id: 'windowID',
					choices: GetMultiSourceWindowChoices(deck.state),
					default: 0,
				},
				{
					id: 'props',
					type: 'multidropdown',
					label: 'Select properties',
					choices: [
						{ id: 'border', label: 'Border' },
						{ id: 'hue', label: 'Hue' },
						{ id: 'saturation', label: 'Saturation' },
						{ id: 'brightness', label: 'Brightness' },
					],
					minSelection: 1,
					default: ['border', 'hue', 'saturation', 'brightness'],
				},
				{
					type: 'number',
					label: 'Border',
					id: 'border',
					default: 0,
					min: 0,
					max: 10,
					step: 1,
					range: true,
					isVisible: (options) => (<string[]>options.props!).includes('border'),
				},
				{
					type: 'number',
					label: 'Hue',
					id: 'hue',
					default: 0,
					min: 0,
					max: 359,
					step: 1,
					range: true,
					isVisible: (options) => (<string[]>options.props!).includes('hue'),
				},
				{
					type: 'number',
					label: 'Saturation',
					id: 'saturation',
					default: 0,
					min: 0,
					max: 100,
					step: 1,
					range: true,
					isVisible: (options) => (<string[]>options.props!).includes('saturation'),
				},
				{
					type: 'number',
					label: 'Brightness',
					id: 'brightness',
					default: 0,
					min: 0,
					max: 100,
					step: 1,
					range: true,
					isVisible: (options) => (<string[]>options.props!).includes('brightness'),
				},
			],
			callback: async (action) => {
				const props = <string[]>action.options.props
				const winID = getOptNumber(action, 'windowID')
				if (props.includes('border')) {
					let paramOpt = getOptNumber(action, 'border')
					await deck.setMultiSourceWindowBorderWidth(winID, paramOpt);
				}
				if (props.includes('hue')) {
					let paramOpt = getOptNumber(action, 'hue')
					await deck.setMultiSourceWindowBorderHue(winID, paramOpt);
				}
				if (props.includes('saturation')) {
					let paramOpt = getOptNumber(action, 'saturation')
					await deck.setMultiSourceWindowBorderSaturation(winID, paramOpt);
				}
				if (props.includes('brightness')) {
					let paramOpt = getOptNumber(action, 'brightness')
					await deck.setMultiSourceWindowBorderBrightness(winID, paramOpt);
				}
			},
		}
	}

	return actions
}
