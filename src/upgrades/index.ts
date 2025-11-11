import { DeckConfig } from '../config'
import {
	CompanionUpgradeContext,
	CompanionStaticUpgradeProps,
	CompanionMigrationAction,
	CompanionStaticUpgradeScript,
	CompanionMigrationFeedback,
	EmptyUpgradeScript,
} from '@companion-module/base'

import * as UpgradeToConsolidatedSSRCMaskAction from './upgradeToConsolidatedSSRCMaskAction'
import * as UpgradeToV15 from './upgradeToV15'
import { tryUpdateNTAction, tryUpdateNTFeedback } from './upgradeNextTransitiontov1-4'
import {
	upgradeActionToV1_5 as upgradeActionToV1_5,
	upgradeFeedbackToV1_5 as upgradeFeedbackToV1_5,
} from './upgradeAKworkTo_v15'

// The following functions are modified from:
// https://github.com/bitfocus/companion-module-allenheath-sq/blob/main/src/upgrades.ts
// used with permission
type actionUpgradeFn = (action: CompanionMigrationAction) => boolean
type feedbackUpgradeFn = (action: CompanionMigrationFeedback) => boolean
type configUpgradeFn = (config: DeckConfig | null) => boolean
const falseFn = () => false

type UpdateScript = CompanionStaticUpgradeScript<DeckConfig>
type UpdContext = CompanionUpgradeContext<DeckConfig>
type UpdConfig = CompanionStaticUpgradeProps<DeckConfig>

// return a function that will receive a set of actions,feedbacks and config and must return the upgraded ones.
// This returned function sends each action/feedback to the functions passed in here as `actionsUpgrader` and `feedbackUpgrader`.
// The actionsUpgrader/feedbackUpgrader funcs take a single argument (one action or feedback)
// and is called once for each action or feedback currently defined
// it should return true only if the action was updated.
// The Upgrader functions must modify the passed object, not create a new one (JavaScript does not copy on write)
export function ModuleUpgrader(
	actionsUpgrader: actionUpgradeFn = falseFn,
	feedbackUpgrader: feedbackUpgradeFn = falseFn,
	configUpgrader: configUpgradeFn = falseFn,
): UpdateScript {
	return (_context: UpdContext, props: UpdConfig) => {
		return {
			updatedActions: props.actions.filter(actionsUpgrader),
			updatedConfig: configUpgrader(props.config) ? props.config : null,
			updatedFeedbacks: props.feedbacks.filter(feedbackUpgrader),
		}
	}
}

// The list of upgrade scripts that will be passed to Companion's init method...
// Note: the number of items in this list must grow monotonically, and new items must be added to the end for this to work properly
// (In some cases very old upgraders can be replaced by EmptyUpgradeScript)
export const UpgradeScriptList: CompanionStaticUpgradeScript<DeckConfig>[] = [
	EmptyUpgradeScript,
	UpgradeToV15.getScripts,
	UpgradeToConsolidatedSSRCMaskAction.getScripts,
	ModuleUpgrader(tryUpdateNTAction, tryUpdateNTFeedback),
	UpgradeToV15.getScripts, // Johan upgrades
	ModuleUpgrader(upgradeActionToV1_5, upgradeFeedbackToV1_5), // Ari upgrades
]
