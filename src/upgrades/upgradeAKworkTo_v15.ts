import { CompanionMigrationAction, CompanionMigrationFeedback } from '@companion-module/base'

// note: use local constants rather than the "official" ActionIDs for the comparisons
// so we are not dependent on code changes down the line
// (these conversion are supposed to persist beyond any code removals)
enum CompanionID {
	// these are share by Action and Feedback
	UpStreamKeyType = 'upStreamKeyType',
	PipSize = 'pipSize',
	PipXPosition = 'pipXPosition',
	PipYPosition = 'pipYPosition',
	// note: Johan's script upgraded quality to numeric recordQuality, here we'll upgrade to string values
	RecordQuality = 'recordQuality',
}

// note: unlike some languages, these modification affect the original object (no copy on write)

const pipSizes = [0.25, 0.33, 0.5]
const keyTypes = ['Luma Key', 'Chroma Key', 'Key Pattern', 'PIP']
// note: although this isn't right for older firmware versions it's the best we can do without have access to firmware version
const recordQuality = ['high', 'good', 'medium', 'low']

// note: only upgrade if old-style values are found (as per Bitfocus Companion recommendations)
export function upgradeActionToV1_5(action: CompanionMigrationAction): boolean {
	const { actionId, options } = action
	let value: any
	switch (actionId) {
		// note: lint complains if I don't explicitly convert to string.
		case CompanionID.UpStreamKeyType.toString():
			value = action.options['USKType']
			if (Number.isInteger(value)) {
				action.options['USKType'] = keyTypes[value]
				return true
			}
			break
		case CompanionID.PipSize.toString():
			value = action.options['PipSize']
			if (Number.isInteger(value) && value <= 2) {
				action.options['PipSize'] = pipSizes[value]
				return true
			}
			break
		case CompanionID.PipXPosition.toString():
		case CompanionID.PipYPosition.toString():
			if (!('operation' in options)) {
				action.options['operation'] = 0 // 'Absolute', which was the only option prior to 1.5
				return true
			}
			break
		case CompanionID.RecordQuality.toString():
			// v1.4 quality values are strings '0', '1', '2'; v1.5 values are word strings ("high", etc.)
			value = Number(action.options['Quality'])
			if (!Number.isNaN(value)) {
				action.options['Quality'] = recordQuality[value]
				return true
			}
			break
		default:
			return false
	}
	// if we reached here, no conversion is needed
	return false
}

export function upgradeFeedbackToV1_5(feedback: CompanionMigrationFeedback): boolean {
	const { feedbackId } = feedback
	let value: any
	switch (feedbackId) {
		case CompanionID.UpStreamKeyType.toString():
			value = feedback.options['USKType']
			if (Number.isInteger(value)) {
				feedback.options['USKType'] = keyTypes[value]
				return true
			}
			break
		case CompanionID.PipSize.toString():
			// PiP Size feedback is new in v1.5.
			break
		case CompanionID.PipXPosition.toString():
		case CompanionID.PipYPosition.toString():
			// these feedbacks were not changed (only the action was changed)
			break
		case CompanionID.RecordQuality.toString():
			// there was no feedback for quality in v1.4
			break
		default:
			return false
	}
	// if we reached here, no conversion is needed
	return false
}
