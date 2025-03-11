import { Config } from '../config'
import {
	CompanionStaticUpgradeResult,
	CompanionUpgradeContext,
	CompanionStaticUpgradeProps,
	CompanionMigrationAction,
	CompanionOptionValues,
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
		if (actionIdsToUpgrade.includes(action.actionId)) {
			const oldActionId = action.actionId

			const newOpts: CompanionOptionValues = {
				props: [],
			}
			const newProps: string[] = []
			if (oldActionId === 'pipMaskEnable') {
				newProps.push('enable')
				newOpts['pipMaskEnable'] = action.options.SuperSourceMaskEnable
			}
			if (oldActionId === 'pipMaskHStart') {
				newProps.push('hMaskStart')
				newOpts['pipMaskHStart'] = action.options.SuperSourceMaskHStart
			}
			if (oldActionId === 'pipMaskHEnd') {
				newProps.push('hMaskEnd')
				newOpts['pipMaskHEnd'] = action.options.SuperSourceMaskHEnd
			}
			if (oldActionId === 'pipMaskVStart') {
				newProps.push('vMaskStart')
				newOpts['pipMaskVStart'] = action.options.SuperSourceMaskVStart
			}
			if (oldActionId === 'pipMaskVEnd') {
				newProps.push('vMaskEnd')
				newOpts['pipMaskVEnd'] = action.options.SuperSourceMaskVEnd
			}
			action.actionId = 'pipSetMaskProperties'

			action.options = newOpts
			action.options['props'] = newProps
			result.updatedActions.push(action)
		}
	}

	return result
}

const actionIdsToUpgrade = ['pipMaskEnable', 'pipMaskHStart', 'pipMaskVStart', 'pipMaskHEnd', 'pipMaskVEnd']
