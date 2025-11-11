import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { FeedbackId } from './feedbackId'
import { GetKeyChoices, KeySwitchChoices, KeyTypeChoices } from '../../model'
import { StreamDeck } from '../../connection/streamdeck'

export function create(deck: StreamDeck): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.KeyEnable]: {
			type: 'boolean',
			name: 'Key:Enable',
			description: 'Set the special effect Key Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetKeyChoices(deck.state),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'enable',
					choices: KeySwitchChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const keyId = Number(feedback.options.keyId)
				const enable = Boolean(feedback.options.enable)
				return deck.state?.upStreamKey.USKS[keyId]?.enabled === enable
			},
		},
		[FeedbackId.KeyOnAir]: {
			type: 'boolean',
			name: 'Key:On Air',
			description: 'Set the special effect Key On Air',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetKeyChoices(deck.state),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Enable',
					id: 'enable',
					choices: KeySwitchChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const keyId = Number(feedback.options.keyId)
				const enable = Boolean(feedback.options.enable)
				return deck.state?.upStreamKey.USKS[keyId]?.onAir === enable
			},
		},
		[FeedbackId.KeyType]: {
			type: 'boolean',
			name: 'Key:Type',
			description: 'Set the special effect Key type',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'keyId',
					choices: GetKeyChoices(deck.state),
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Type',
					id: 'type',
					choices: KeyTypeChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const keyId = Number(feedback.options.keyId)
				const type = String(feedback.options.type)
				let value = -1;
				switch (type) {
					case 'Luma Key':
					default:
						value = 0;
						break;
					case 'Chroma Key':
						value = 1;
						break;
					case 'Pattern':
						value = 2;
						break;
					case 'PIP':
						value = 3;
						break;
				}
				return deck.state?.upStreamKey.USKS[keyId]?.keyType === value
			},
		},
	}
}
