import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { ActionType } from '../../enums'
import { getChoices } from '../../choices'
import type { GoStreamInstance } from '../../index'
import { FeedbackId } from './feedbackId'
import { SuperSourceStyleChoices, SuperSourceChoices } from '../../model'

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
				return instance.states.SuperSource.Enable
			},
		},
		[FeedbackId.SuperSourceSelect]: {
			type: 'boolean',
			name: 'SuperSource: Set SuperSource Source',
			description: 'If you Select SuperSource, change style of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Super Source',
					id: 'typeid',
					choices: SuperSourceChoices,
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
				const sourceID = Number(feedback.options.SourceID)
				if (type === 0) {
					return instance.states.SuperSource.source1 === sourceID
				} else if (type === 1) {
					return instance.states.SuperSource.source2 === sourceID
				} else if (type === 2) {
					return instance.states.SuperSource.background === sourceID
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
				return instance.states.SuperSource.controlStyle === feedback.options.styleid
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
						{ id: 0, label: 'mask 1' },
						{ id: 1, label: 'mask 2' },
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
				return instance.states.SuperSource.maskEnable[type]
			},
		},
		[FeedbackId.SuperSourceYPosition]: {
			type: 'boolean',
			name: 'Super Source: Super Source Y Position',
			description: 'Change style of bank based on Super Source Y Position',
			options: [
				{
					type: 'number',
					label: 'Y Position (%)',
					id: 'superSourceYPosition',
					min: 0,
					max: 100,
					default: 50,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const pos = Number(feedback.options.superSourceYPosition)
				return instance.states.SuperSource.controlYPosition === pos
			},
		},
	}
}
