import * as UpgradeToConsolidatedSSRCMaskAction from './upgradeToConsolidatedSSRCMaskAction'
import { Config } from '../config'
import { CompanionStaticUpgradeScript } from '@companion-module/base'

export const UpgradeScriptList: CompanionStaticUpgradeScript<Config>[] = [
	UpgradeToConsolidatedSSRCMaskAction.getScripts,
]
