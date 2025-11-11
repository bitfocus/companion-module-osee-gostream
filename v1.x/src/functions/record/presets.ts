import { combineRgb } from '@companion-module/base'
import { CompanionPresetDefinitions } from '@companion-module/base'
import { ActionId } from './actionId'
import { FeedbackId } from './feedbackId'
import { VariableId } from './variableId'
import { GoStreamModel } from '../../models/types'

const ptSize = '14'
export function create(_model: GoStreamModel): CompanionPresetDefinitions {
	const presets = {}
	presets[`Record_0`] = {
		type: 'button',
		category: 'Record',
		name: 'Start/Stop Recording',
		style: {
			text: `Record`,
			size: ptSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			png64: pngRecordIcon_B64,
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.Record,
						options: {
							Record: 2,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: FeedbackId.Record,
				options: {},
				style: {
					bgcolor: combineRgb(0, 0, 0),
					color: combineRgb(255, 255, 255),
					text: `$(gostreamdeck:record_duration_hm)`,
					png64: pngRecordingIcon_B64,
				},
			},
			{
				feedbackId: FeedbackId.mediaAbsent,
				options: {},
				style: {
					bgcolor: combineRgb(110, 110, 110),
					color: combineRgb(255, 255, 64),
					text: `Insert SD/SSD`,
				},
			},
		],
	}
	presets[`Record_1`] = {
		type: 'button',
		category: 'Record',
		name: 'Start/Stop recording with current timestamp in the filename',
		style: {
			text: `Name & Record`,
			size: ptSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			png64: pngRecordIcon_B64,
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.RecordFileName,
						options: {
							RecordFileName: `GSD_$(internal:date_iso)_$(internal:time_hms)`,
							SafeMode: true,
						},
					},
					{
						actionId: ActionId.Record,
						delay: 100, // trick to make sure the two actions occur in sequence.
						options: {
							Record: 2,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: FeedbackId.Record,
				options: {},
				style: {
					bgcolor: combineRgb(0, 0, 0),
					color: combineRgb(255, 255, 255),
					text: `$(gostreamdeck:record_duration_hm)`,
					png64: pngRecordingIcon_B64,
				},
			},
			{
				feedbackId: FeedbackId.mediaAbsent,
				options: {},
				style: {
					bgcolor: combineRgb(110, 110, 110),
					color: combineRgb(255, 255, 64),
					text: `Insert SD/SSD`,
				},
			},
		],
	}
	presets[`Record_FileName`] = {
		type: 'button',
		category: 'Record',
		name: 'Set recorded filename to include the current time',
		style: {
			text: `Update Record Filename`,
			size: ptSize,
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.RecordFileName,
						options: {
							RecordFileName: `GSD_$(internal:date_iso)_$(internal:time_hms)`,
							SafeMode: true,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}
	// Record quality. (TODO: retrieve from "official" function, rather than constants here)
	for (const qual of ['high', 'good', 'medium', 'low']) {
		presets[`Record_Quality_${qual}`] = {
			type: 'button',
			category: 'Record',
			name: `Set recording quality to ${qual}`,
			style: {
				text: `Rec Quality ${qual}`,
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RecordQuality,
							options: {
								Quality: qual,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: FeedbackId.Quality,
					options: {
						Quality: qual,
					},
					style: {
						bgcolor: combineRgb(255, 255, 0),
						color: combineRgb(0, 0, 0),
					},
				},
			],
		}
	}
	presets[`Record_Quality_Status`] = {
		type: 'button',
		category: 'Record',
		name: 'Rec Quality: Show Status',
		style: {
			text: `Rec Quality is: $(gostreamdeck:${VariableId.RecordQuality})`,
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	}
	return presets
}

const pngRecordIcon_B64 = `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`

const pngRecordingIcon_B64 = `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
wDQMj9xT+KfNgAAAABJRU5ErkJggg==`
