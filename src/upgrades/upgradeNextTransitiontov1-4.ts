import {
	//	CompanionStaticUpgradeResult,
	//	CompanionUpgradeContext,
	//	CompanionStaticUpgradeProps,
	CompanionMigrationAction,
	CompanionMigrationFeedback,
	InputValue,
	//CompanionOptionValues,
} from '@companion-module/base'

import { ActionId } from '../functions/mixEffect/actionId'
import { FeedbackId } from '../functions/mixEffect/feedbackId'

// note: use string constants rather than variables for the comparisons
//   so we are not dependent on code changes down the line
//  (these conversion are supposed to persist beyond any code removals)

// note: unlike some languages, these modification affect the original object (no copy on write)

const keyswitchMap = { '0': 'KEY', '1': 'DSK', '2': 'BKGD' }

export function tryUpdateNTAction(action: CompanionMigrationAction): boolean {
	const { actionId, options } = action
	const uskOnPvwMapping = [2, 0, 0, 0, 3, 4] // (5 = on, 4 = off, 0 = toggle) ==> (2 = Toggle, 3 = Off PVW, 4 = On PVW)
	let keyName: InputValue
	switch (actionId) {
		case 'transitionSource':
			// in 1.3.1 option type was incorrectly set to dropdown, so it didn't work. This is a bit of handwaving...
			//  If it was, indeed, a single-choice dropdown it would only turn the key on; never off...
			if (Object.keys(options).includes('KeySwitch')) {
				action.actionId = ActionId.NextTransitionButtons // this is a no-op
				keyName = keyswitchMap[String(options['KeySwitch'])]
				action.options = { KeyButton: keyName, ButtonAction: 1, BKGDAction: 1 }
				return true
			} else {
				// first optionis now called 'KeyButton', no need to test
				return false
			}
		case 'transitionSourceBG':
			action.actionId = ActionId.NextTransitionButtons
			action.options = { KeyButton: 'BKGD', ButtonAction: 0, BKGDAction: options['Background'] ? 1 : 0 }
			return true
		case 'uskOnPreview':
			// upgrade from 1.3.1 (ignore changes made before 1.4.0 was released)
			action.actionId = ActionId.NextTransitionButtons
			action.options = {
				KeyButton: 'KEY',
				ButtonAction: uskOnPvwMapping[Number(options['USKPvwState'])],
				BKGDAction: 1,
			}
			return true
		case 'keyOnAir':
			action.actionId = ActionId.OnAirButtons
			action.options = { KeyButton: 'KEY', ButtonAction: options['KeyOnAir'] }
			return true
		case 'dskOnAir':
			action.actionId = ActionId.OnAirButtons
			action.options = { KeyButton: 'DSK', ButtonAction: options['DSKOnAir'] }
			return true
		default:
			return false
	}
}

export function tryUpdateNTFeedback(feedback: CompanionMigrationFeedback): boolean {
	const { feedbackId, options } = feedback
	switch (feedbackId) {
		case 'transitionSource':
			// make sure we're not clobbering a "good" version
			if (Object.keys(options).includes('KeyTied')) {
				feedback.feedbackId = FeedbackId.KeysVisibility // this is a no-op
				feedback.options = { KeyButton: 'KEY', LayerState: options['KeyTied'] }
				return true
			} else {
				// assume object is up-to-date (we could make an explicit test, but it appears to have been consistent)
				return false
			}
		case 'transitionSelection':
			// doesn't map to new feedback function, but it didn't do anything anyway, so let's just do _something_ ...
			feedback.feedbackId = FeedbackId.KeysVisibility
			feedback.options = { KeyButton: 'KEY', LayerState: 0 }
			return false
		case 'transitionKeySwitch':
			// note: this works because the option type was incorrectly set to dropdown!
			feedback.feedbackId = FeedbackId.KeysVisibility
			feedback.options = { KeyButton: keyswitchMap[String(options['KeySwitch'])], LayerState: 0 }
			return true
		case 'keyOnAir':
			feedback.feedbackId = FeedbackId.KeysVisibility
			feedback.options = { KeyButton: 'KEY', LayerState: 2 }
			feedback.isInverted = options['KeyOnAir'] == 0
			return true
		case 'dskOnAir':
			// note: dskOnAir is not in v1.3.1 but we'll do it anyway (it's in 1.4.0)
			feedback.feedbackId = FeedbackId.KeysVisibility
			feedback.options = { KeyButton: 'DSK', LayerState: 2 }
			feedback.isInverted = options['DSKOnAir'] == 0
			return true
		case 'keyOnPvw':
			feedback.feedbackId = FeedbackId.KeysVisibility
			feedback.options = { KeyButton: 'KEY', LayerState: 3 }
			feedback.isInverted = options['KeyOnAir'] == 0
			return true
		default:
			return false
	}
}
