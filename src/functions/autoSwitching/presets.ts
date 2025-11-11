import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { AudioSwitch } from "../../connection/actionids"
import { FeedbackId } from './feedbackId'
import { StreamDeck } from '../../connection/streamdeck'

const ptzSize = '18'
export function create(_deck: StreamDeck): CompanionPresetDefinitions {
	const presets = {}

	presets[`AutoSwitchEnable}`] = {
		category: `AutoSwitching`,
		name: `Set AutoSwitching Enable`,
		type: 'button',
		style: {
			text: `Enable`,
			size: ptzSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		feedbacks: [
			{
				feedbackId: FeedbackId.AutoSwitchEnable,
				options: {
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
						actionId: AudioSwitch.ActionId.AutoSwitchingEnable,
						options: {
							enable: 2,
						},
					},
				],
				up: [],
			},
		],
	}
	// const a_sources = state.ASources.map((s)=>({id:s,label:String(getEnumKeyByValue(sourceID, s))}))
	// for (let index = 0; index < a_sources.length; index++) {
	// 	presets[`ASource_${a_sources[index].id}`] = {
	// 		category: `AutoSwitching`,
	// 		name: `Set A ${a_sources[index].label} Enable`,
	// 		type: 'button',
	// 		style: {
	// 			text: `Audio A Source_${a_sources[index].label}`,
	// 			size: 'auto',
	// 			color: combineRgb(255, 255, 255),
	// 			bgcolor: combineRgb(0, 0, 0),
	// 		},
	// 		feedbacks: [
	// 			{
	// 				feedbackId: FeedbackId.AutoSwitchASource,
	// 				options: {
	// 					audioSource: a_sources[index].id,
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
	// 						actionId: ActionId.AutoSwitchingSetAProperties,
	// 						options: {
	// 							audioSource: a_sources[index].id,
	// 						},
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 	}
	// }
	return presets
}
