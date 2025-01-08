import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { ActionType } from '../../enums'
import { getChoices } from '../../choices'
import type { GoStreamInstance } from '../../index'
import { FeedbackId } from './feedbackId'
import { SuperSourceStyleChoices } from '../../model'

export function create(instance: GoStreamInstance): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.SuperSourceEnable]: {
			type: 'boolean',
			name: 'SuperSource: Set Super Source Enable',
			description: 'If you turn on Super Source, change style of the bank',
			options: [],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: () => {
				return instance.states.SuperSourcePorp.SSEnable
			},
		},
		[FeedbackId.SuperSourceSelect]: {
			type: 'boolean',
			name: 'SuperSource: Set SuperSource Source',
			description: 'If you Select SuperSource, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'type',
					id: 'typeid',
					choices: [
						{ id: 0, label: 'superSourceSource1' },
						{ id: 1, label: 'superSourceSource2' },
						{ id: 2, label: 'superSourceBackgroud' },
					],
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'SourceID',
					choices: getChoices(ActionType.SuperSourceSource),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const type = Number(feedback.options.typeid)
				const SourceID = Number(feedback.options.SourceID)
				if (type === 0) {
					return instance.states.SuperSourcePorp.SuperSourceSource1.id === SourceID
				} else if (type === 1) {
					return instance.states.SuperSourcePorp.SuperSourceSource2.id === SourceID
				} else if (type === 2) {
					return instance.states.SuperSourcePorp.SuperSourceBackground.id === SourceID
				}
				return false
			},
		},
		[FeedbackId.SuperSourceControlStyle]: {
			type: 'boolean',
			name: 'SuperSource: Set SuperSource ControlStyle',
			description: 'If you Select SuperSource, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'style',
					id: 'styleid',
					choices: SuperSourceStyleChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				return instance.states.SuperSourcePorp.SuperSourceControlStyle.id === feedback.options.styleid
			},
		},
		[FeedbackId.SuperSourceMask]: {
			type: 'boolean',
			name: 'SuperSource: Set SuperSource Mask',
			description: 'If you Select SuperSource, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Type',
					id: 'typeid',
					choices: [
						{ id: 0, label: 'mask1' },
						{ id: 1, label: 'mask2' },
					],
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const type = Number(feedback.options.typeid)
				if (type === 0) {
					return instance.states.SuperSourcePorp.SuperSourceMaskEnable.mask1
				} else {
					return instance.states.SuperSourcePorp.SuperSourceMaskEnable.mask2
				}
			},
		},
	}
}
