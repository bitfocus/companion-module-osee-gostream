import { Config } from '../config'
import {
	CompanionStaticUpgradeResult,
	CompanionUpgradeContext,
	CompanionStaticUpgradeProps,
	CompanionMigrationAction,
	CompanionOptionValues,
	CompanionMigrationFeedback,
} from '@companion-module/base'

export function getScripts(
	_context: CompanionUpgradeContext<Config>,
	props: CompanionStaticUpgradeProps<Config>,
): CompanionStaticUpgradeResult<Config> {
	const result: CompanionStaticUpgradeResult<Config> = {
		updatedActions: [],
		updatedConfig: null,
		updatedFeedbacks: [],
	}

	const actions: CompanionMigrationAction[] = props.actions

	for (const action of actions) {
		if (action.actionId === 'keyPatternWipeXPosition') {
			console.log('UPDATE KeyPatternWipeXPosition ')
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
			const oldActionId = action.actionId

			const newOpts: CompanionOptionValues = {
				props: [],
			}
			const newProps: string[] = []
			// Just so happens that the old options was named as the action
			if (oldActionId.endsWith('MaskEnable')) {
				newProps.push('enable')
				newOpts['maskEnable'] = action.options[oldActionId]
			}
			if (oldActionId.endsWith('MaskHStart')) {
				newProps.push('hMaskStart')
				newOpts['maskHStart'] = action.options[oldActionId]
			}
			if (oldActionId.endsWith('MaskHEnd')) {
				newProps.push('hMaskEnd')
				newOpts['maskHEnd'] = action.options[oldActionId]
			}
			if (oldActionId.endsWith('MaskVStart')) {
				newProps.push('vMaskStart')
				newOpts['maskVStart'] = action.options[oldActionId]
			}
			if (oldActionId.endsWith('MaskVEnd')) {
				newProps.push('vMaskEnd')
				newOpts['maskVEnd'] = action.options[oldActionId]
			}
			const keyType = oldActionId.substring(0, oldActionId.indexOf('Mask'))
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
	'chromaMaskEnable',
	'chromaMaskHStart',
	'chromaMaskVStart',
	'chromaMaskHEnd',
	'chromaMaskVEnd',
	'lumaMaskEnable',
	'lumaMaskHStart',
	'lumaMaskVStart',
	'lumaMaskHEnd',
	'lumaMaskVEnd',
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
