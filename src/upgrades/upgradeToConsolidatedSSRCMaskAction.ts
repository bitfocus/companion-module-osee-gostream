import { Config } from '../config'
import {
	CompanionStaticUpgradeResult,
	CompanionUpgradeContext,
	CompanionStaticUpgradeProps,
	CompanionMigrationAction,
    CompanionOptionValues,
} from '@companion-module/base'

export function getScripts(_context: CompanionUpgradeContext<Config>, props: CompanionStaticUpgradeProps<Config>): CompanionStaticUpgradeResult<Config> {

	const result: CompanionStaticUpgradeResult<Config> = {
		updatedActions: [],
		updatedConfig: null,
		updatedFeedbacks: [],
	}

	const actions: CompanionMigrationAction[] = props.actions
	
	for (const action of actions) {
		if (actionIdsToUpgrade.includes(action.actionId)) {
			const oldActionId = action.actionId
			
			let newOpts: CompanionOptionValues = {
				'SuperSourceMask': action.options.SuperSourceMask,
				'props': []
			}
			const newProps : string[] = [];

			if (oldActionId === 'superSourceMaskEnable') {
				newProps.push('enable')
				newOpts['SuperSourceMaskEnable'] = action.options.SuperSourceMaskEnable
			}
			if (oldActionId === 'superSourceMaskHStart') {
				newProps.push('hMaskStart')
				newOpts['SuperSourceMaskHStart'] = action.options.SuperSourceMaskHStart
			}
			if (oldActionId === 'superSourceMaskHEnd') {
				newProps.push('hMaskEnd')
				newOpts['SuperSourceMaskHEnd'] = action.options.SuperSourceMaskHEnd
			}
			if (oldActionId === 'superSourceMaskVStart') {
				newProps.push('vMaskStart')
				newOpts['SuperSourceMaskVStart'] = action.options.SuperSourceMaskVStart
			}
			if (oldActionId === 'superSourceMaskVEnd') {
				newProps.push('vMaskEnd')
				newOpts['SuperSourceMaskVEnd'] = action.options.SuperSourceMaskVEnd
			}
			action.actionId = 'superSourceSetMaskProperties'

			action.options = newOpts
			action.options['props'] = newProps
			result.updatedActions.push(action)
		}
	}

	return result
}

const actionIdsToUpgrade = [
	'superSourceMaskEnable',
	'superSourceMaskHStart',
	'superSourceMaskVStart',
	'superSourceMaskHEnd',
	'superSourceMaskVEnd',
]
