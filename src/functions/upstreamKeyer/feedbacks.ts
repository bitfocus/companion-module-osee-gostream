import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { ActionType } from './../../enums'
import { FeedbackId } from './feedbackId'
import { UpStreamKeyTypeChoices, KeyResizeSizeChoices } from './../../model'
import { USKKeySourceType, USKKeyTypes } from './state'
import { UpstreamKeyerStateT } from './state'
import { GoStreamModel } from '../../models/types'
import { getOptNumber, makeChoices } from '../../util'

export function create(model: GoStreamModel, state: UpstreamKeyerStateT): CompanionFeedbackDefinitions {
	return {
		[FeedbackId.KeySourceFill]: {
			type: 'boolean',
			name: 'USK: Source Fill',
			description: 'Set the special effect UpStream Key Source Fill',
			options: [
				{
					type: 'dropdown',
					label: 'Key Type:',
					id: 'USKKeyType',
					choices: UpStreamKeyTypeChoices,
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Source Fill:',
					id: 'USKSourceFill',
					choices: model.getChoices(ActionType.KeyPatternSourceKey),
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeId = Number(feedback.options.USKKeyType)
				return state.keyInfo[typeId].sources[USKKeySourceType.Fill] === Number(feedback.options.USKSourceFill)
			},
		},
		[FeedbackId.UpStreamKeyType]: {
			type: 'boolean',
			name: 'USK: Set type',
			description: 'If you Select UpStream Key, change style of the button',
			options: [
				{
					type: 'dropdown',
					label: 'Type',
					id: 'USKType',
					choices: UpStreamKeyTypeChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const typeid = Number(feedback.options.USKType)
				return state.UpStreamKeyType === typeid
			},
		},
		[FeedbackId.PipSize]: {
			type: 'boolean',
			name: 'USK: PIP Size',
			description: 'Change style of button based on pip size',
			options: [
				{
					type: 'dropdown',
					label: 'Size',
					id: 'pipSizeId',
					...makeChoices(state.keyScalingSizes()),
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const pipSizeChoice = getOptNumber(feedback, 'pipSizeId')
				const curSize = state.keyInfo[USKKeyTypes.Pip].size
				return curSize === pipSizeChoice
			},
			learn: (feedback) => {
				return {
					...feedback.options,
					pipSizeId: state.keyInfo[USKKeyTypes.Pip].size,
				}
			},
		},
		[FeedbackId.PipXPosition]: {
			type: 'boolean',
			name: 'USK: PIP X position',
			description: 'Change style of button based on pip x position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'pipXPosId',
					min: -16,
					max: 16,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const pipXPos = Number(feedback.options.pipXPosId)
				return state.keyInfo[USKKeyTypes.Pip].xPosition === pipXPos
			},
		},
		[FeedbackId.PipYPosition]: {
			type: 'boolean',
			name: 'USK: PIP Y position',
			description: 'Change style of button based on pip y position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'pipYPosId',
					min: -9,
					max: 9,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const pipYPos = Number(feedback.options.pipYPosId)
				return state.keyInfo[USKKeyTypes.Pip].yPosition === pipYPos
			},
		},
		[FeedbackId.KeyPatternResizeXPosition]: {
			type: 'boolean',
			name: 'USK: Key Pattern X position',
			description: 'Change style of button based on key pattern x position',
			options: [
				{
					type: 'number',
					label: 'X Position',
					id: 'keyPatternResizeXId',
					min: -16,
					max: 16,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const keyPatternResizeX = Number(feedback.options.keyPatternResizeXId)
				return state.keyInfo[USKKeyTypes.KeyPattern].xPosition === keyPatternResizeX
			},
		},
		[FeedbackId.KeyPatternResizeYPosition]: {
			type: 'boolean',
			name: 'USK: Key Pattern Y position',
			description: 'Change style of button based on key pattern y position',
			options: [
				{
					type: 'number',
					label: 'Y Position',
					id: 'keyPatternResizeYId',
					min: -9,
					max: 9,
					step: 0.2,
					default: 0,
					range: true,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const keyPatternResizeY = Number(feedback.options.keyPatternResizeYId)
				return state.keyInfo[USKKeyTypes.KeyPattern].yPosition === keyPatternResizeY
			},
		},
		[FeedbackId.KeyPatternResizeSize]: {
			type: 'boolean',
			name: 'USK: Key Pattern Resize Size',
			description: 'Change style of button based on key pattern resize size',
			options: [
				{
					type: 'dropdown',
					label: 'Size',
					id: 'keyPatternResizeSizeId',
					choices: KeyResizeSizeChoices,
					default: 0,
				},
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			callback: (feedback) => {
				const keyPatternResizeSize = Number(feedback.options.keyPatternResizeSizeId)
				return state.keyInfo[USKKeyTypes.KeyPattern].size === keyPatternResizeSize
			},
		},
	}
}
