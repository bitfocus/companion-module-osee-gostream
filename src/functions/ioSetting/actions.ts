import { IOSetting } from "../../connection/actionids"
import { getEnumKeyByValue, getOptNumber, getOptString } from '../../util'
import type { CompanionActionDefinitions, SomeCompanionActionInputField } from '@companion-module/base'
import { StreamDeck } from '../../connection/streamdeck'
import { Model, sourceID } from '../../connection/enums'


function getSourceRangeOptions(ids: sourceID[], sourceRanges: {[sID:number]:sourceID[]}): SomeCompanionActionInputField[] {
	return ids.map((id) => {
		let info = sourceRanges[id]
		return {
			type: 'dropdown',
			label: 'Source',
			id: 'SourceId_' + id,
			choices:  info.map(m=>{return { id: m, label: getEnumKeyByValue(sourceID, m)}}),
			default:info[0],
			isVisible: (options, data) => options.outputID === data.souceid,
			isVisibleData: { souceid: id },
		};
	});
}

export function create(deck: StreamDeck): CompanionActionDefinitions {
	let actions: CompanionActionDefinitions =
	{
		//in
		[IOSetting.ActionId.InputColorSpace]:{
			name: 'Inputs: set Input ColorSpace',
			options: [
				{
					type: 'dropdown',
					label: 'Input',
					id: 'inputID',
					choices:deck.state?deck.state?.device.InputColorSpaceSources.map((s)=>({id:s,label:getEnumKeyByValue(sourceID,s)})):[],
					default: deck.state? deck.state.device.InputColorSpaceSources[0]:sourceID.IN1,
				},
				{
					type: 'dropdown',
					label: 'ColorSpace',
					id: 'colorSpace',
					choices:deck.state?deck.state?.outputSetting.colorSpaceRange.map((s)=>({id:s,label:s})):[],
					default: deck.state?deck.state?.outputSetting.colorSpaceRange[0]:0,
				}
			],
			callback: async (action) => {
				let opt=getOptNumber(action, 'inputID');
				let colorSpace=getOptString(action,'colorSpace')
				await deck.setInputColorSpace(opt,colorSpace)
			},
		},
		//out
		[IOSetting.ActionId.OutFormat]: {
			name: 'Outputs: set out format',
			options: [
				{
					type: 'dropdown',
					label: 'Format',
					id: 'format',
					choices:deck.state?deck.state?.outputSetting.outFormatRange.map((s)=>({id:s,label:s})):[],
					default: deck.state?deck.state.outputSetting.outFormatRange[0]:0,
				}
			],
			callback: async (action) => {
				let opt=getOptString(action, 'format');
				await deck.setOutFormat(opt)
			},
		},
		[IOSetting.ActionId.OutSource]: {
			name: 'Outputs: set video map',
			options: [
				{
					type: 'dropdown',
					label: 'Output',
					id: 'outputID',
					choices:deck.state? deck.state.device.VideoOutSources.map((s)=>({id:s,label:getEnumKeyByValue(sourceID,s)})):[],
					default: deck.state? deck.state.device.VideoOutSources[0]:sourceID.IN1,
				},
				...getSourceRangeOptions(
					deck.state?deck.state.device.VideoOutSources:[],
					deck.state?deck.state.outputSetting.videoSourcesRange:[]
				)
			],
			callback: async (action) => {
				let opt=getOptNumber(action, 'outputID');
				await deck.setOutSource(opt,getOptNumber(action, 'SourceId_' + opt))
			},
		},
		[IOSetting.ActionId.OutputColorSpace]: {
			name: 'Outputs: set Output color space map',
			options: [
				{
					type: 'dropdown',
					label: 'Output',
					id: 'outputID',
					choices:deck.state?deck.state?.device.OutPutColorSpaceSources.map((s)=>({id:s,label:getEnumKeyByValue(sourceID,s)})):[],
					default: deck.state?deck.state?.device.OutPutColorSpaceSources[0]:0,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'sourceID',
					choices:deck.state?deck.state?.outputSetting.colorSpaceRange.map((s)=>({id:s,label:s})):[],
					default: deck.state?deck.state?.outputSetting.colorSpaceRange[0]:0,
				}
			],
			callback: async (action) => {
				let opt = getOptNumber(action, 'outputID');
				await deck.setOutPutColorSpace(opt,getOptString(action, 'sourceID'))
			},
		}
	}
	if(deck.state?.device.deviceModel===Model.Duet_8ISO){
		//in
		actions[IOSetting.ActionId.InputMode]= {
			name: 'Inputs: set input assignment mode',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'modeID',
					choices:[
						{id:0,label:"4 Physical Ports"},
						{id:1,label:"8 Physical Ports 1"},
						{id:2,label:"8 Physical Ports 2"},
						{id:3,label:"8 Physical Ports 3"}
					],
					default: 0,
				},
			],
			callback: async (action) => {
				await deck.setInputMode(getOptNumber(action, 'modeID'))
			},
		}
		// actions[IOSetting.ActionId.AudioMixerOutSource]= {
		// 	name: 'Outputs: set audio map',
		// 	options: [
		// 		{
		// 			type: 'dropdown',
		// 			label: 'Output',
		// 			id: 'outputID',
		// 			choices:deck.state? deck.state.device.AudioOutSources.map((s)=>({id:s,label:getEnumKeyByValue(sourceID,s)})):[],
		// 			default: sourceID.IN1,
		// 		},
		// 		{
		// 			type: 'dropdown',
		// 			label: 'Source',
		// 			id: 'sourceID',
		// 			choices:deck.state? deck.state?.outputSetting.audioSourcesRange.map((s)=>({id:s,label:getEnumKeyByValue(sourceID,s)})):[],
		// 			default:sourceID.IN1,
		// 		}
		// 	],
		// 	callback: async (action) => {
		// 		let opt=getOptNumber(action, 'outputID');
		// 		await deck.setAudioMixerOutSource(opt,getOptNumber(action, 'sourceID'))
		// 	},
		// }
	}else
	{

	}
	return actions
}
