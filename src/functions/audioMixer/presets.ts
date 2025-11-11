import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { AudioMixer } from "../../connection/actionids"
import { FeedbackId } from './feedbackId'
import { getEnumKeyByValue } from '../../util'
import { StreamDeck } from '../../connection/streamdeck'
import { sourceID } from '../../connection/enums'
const ptzSize = '18'
export function create(deck: StreamDeck): CompanionPresetDefinitions {
	const presets = {}
	let am_sources = deck.state ? Object.keys(deck.state.audioMixer.commonChannels).map(s => ({ id: Number(s), label: String(getEnumKeyByValue(sourceID, Number(s))) })) : []
	for (const source of am_sources) {
		presets[`AudioMixer_Enable_${source.id}`] = {
			category: 'AudioMixer',
			name: `Audio Mixer: Set Audio ${source.label} Enable`,
			type: 'button',
			style: {
				text: `${source.label}`,
				size: ptzSize,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: FeedbackId.AudioMixerEnable,
					options: {
						audioMixSource: source.id,
						audioMixEnable: 0,
					},
					style: {
						bgcolor: combineRgb(0, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
				{
					feedbackId: FeedbackId.AudioMixerEnable,
					options: {
						audioMixSource: source.id,
						audioMixEnable: 1,
					},
					style: {
						bgcolor: combineRgb(255, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
				{
					feedbackId: FeedbackId.AudioMixerEnable,
					options: {
						audioMixSource: source.id,
						audioMixEnable: 2,
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
							actionId: AudioMixer.ActionId.AudioMixerEnable,
							options: {
								audioMixerSourceID: source.id,
								audioMixerEnable: 2,
							},
						},
					],
					up: [],
				},
			],
		}
	}
	return presets
}
