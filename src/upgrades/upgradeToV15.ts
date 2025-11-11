import { DeckConfig } from '../config'
import {
	CompanionStaticUpgradeResult,
	CompanionUpgradeContext,
	CompanionStaticUpgradeProps,
	CompanionMigrationAction,
	CompanionOptionValues,
	CompanionMigrationFeedback,
} from '@companion-module/base'

export function getScripts(
	_context: CompanionUpgradeContext<DeckConfig>,
	props: CompanionStaticUpgradeProps<DeckConfig>,
): CompanionStaticUpgradeResult<DeckConfig> {
	const result: CompanionStaticUpgradeResult<DeckConfig> = {
		updatedActions: [],
		updatedConfig: null,
		updatedFeedbacks: [],
	}

	const actions: CompanionMigrationAction[] = props.actions

	for (const action of actions) {
		if (action.actionId === 'keyPatternWipeXPosition') {
			const newAction: CompanionMigrationAction = {
				id: action.id,
				controlId: action.controlId,
				actionId: action.actionId,
				options: {
					operation: 0,
					KeyPatternWipeXPosition: action.options['KeyPatternWipeXPosition'],
				},
			}
			result.updatedActions.push(newAction)
		} else if (action.actionId === 'keyPatternWipeYPosition') {
			const newAction: CompanionMigrationAction = {
				id: action.id,
				controlId: action.controlId,
				actionId: action.actionId,
				options: {
					operation: 0,
					KeyPatternWipeYPosition: action.options['KeyPatternWipeYPosition'],
				},
			}
			result.updatedActions.push(newAction)
		} else if (action.actionId === 'quality') {
			const newAction: CompanionMigrationAction = {
				id: action.id,
				controlId: action.controlId,
				actionId: action.options['TypeID'] === 0 ? 'recordQuality' : 'streamQuality',
				options: {
					Quality: action.options['Quality'],
				},
			}
			result.updatedActions.push(newAction)
		} else if (actionIdsToUpgrade.includes(action.actionId)) {
			// Handle mask consolidation
			// Capitalize first letter in actionId to get the optionname
			const optionName = String(action.actionId[0]).toUpperCase() + String(action.actionId).slice(1)
			const newOpts: CompanionOptionValues = {
				props: [],
			}
			const newProps: string[] = []

			if (optionName.endsWith('MaskEnable')) {
				newProps.push('enable')
				newOpts['maskEnable'] = action.options[optionName]
			}
			if (optionName.endsWith('MaskHStart')) {
				newProps.push('hMaskStart')
				let hStart = action.options[optionName]
				// "Special(crap)" naming for DSK mask
				if (optionName == 'DskMaskHStart') hStart = action.options['HStart']
				newOpts['maskHStart'] = hStart
			}
			if (optionName.endsWith('MaskHEnd')) {
				newProps.push('hMaskEnd')
				let hEnd = action.options[optionName]
				// "Special(crap)" naming for DSK mask
				if (optionName == 'DskMaskHEnd') hEnd = action.options['HEnd']
				newOpts['maskHEnd'] = hEnd
			}
			if (optionName.endsWith('MaskVStart')) {
				newProps.push('vMaskStart')
				let vStart = action.options[optionName]
				// "Special(crap)" naming for DSK mask
				if (optionName == 'DskMaskVStart') vStart = action.options['VStart']
				newOpts['maskVStart'] = vStart
			}
			if (optionName.endsWith('MaskVEnd')) {
				newProps.push('vMaskEnd')
				let vEnd = action.options[optionName]
				// "Special(crap)" naming for DSK mask
				if (optionName == 'DskMaskVEnd') vEnd = action.options['VEnd']
				newOpts['maskVEnd'] = vEnd
			}
			const keyType = action.actionId.substring(0, action.actionId.indexOf('Mask'))
			action.actionId = keyType + 'SetMaskProperties'

			action.options = newOpts
			action.options['props'] = newProps
			result.updatedActions.push(action)
		}
	}

	const feedbacks: CompanionMigrationFeedback[] = props.feedbacks
	for (const feedback of feedbacks) {
		if (feedback.feedbackId === 'dskMaskEnable') {
			if (!feedback.options['maskEnabled']) feedback.isInverted = true
		} else if (feedback.feedbackId === 'dskControlShapedKey') {
			if (!feedback.options['skeyEnabled']) feedback.isInverted = true
		}

		result.updatedFeedbacks.push(feedback)
	}

	return result
}

const actionIdsToUpgrade = [
	'pipMaskEnable',
	'pipMaskHStart',
	'pipMaskVStart',
	'pipMaskHEnd',
	'pipMaskVEnd',
	'chromaKeyMaskEnable',
	'chromaKeyMaskHStart',
	'chromaKeyMaskVStart',
	'chromaKeyMaskHEnd',
	'chromaKeyMaskVEnd',
	'lumaKeyMaskEnable',
	'lumaKeyMaskHStart',
	'lumaKeyMaskVStart',
	'lumaKeyMaskHEnd',
	'lumaKeyMaskVEnd',
	'keyPatternMaskEnable',
	'keyPatternMaskHStart',
	'keyPatternMaskVStart',
	'keyPatternMaskHEnd',
	'keyPatternMaskVEnd',
	'dskMaskEnable',
	'dskMaskHStart',
	'dskMaskVStart',
	'dskMaskHEnd',
	'dskMaskVEnd',
]
