import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import { FeedbackId } from './feedbackId'
import { MultiSourceEnableChoices, GetMultiSourceWindowChoices } from '../../model'
import { StreamDeck } from '../../connection/streamdeck'
import { sourceID } from '../../connection/enums'
import { getEnumKeyByValue } from '../../util'
export function create(deck: StreamDeck): CompanionFeedbackDefinitions {
    return {
        [FeedbackId.MultiSourceWinEnable]: {
            type: 'boolean',
            name: 'MultiSource: Set multi source window Enable',
            description: 'If you turn on  multi source window, change style of the button',
            options: [
                {
                    type: 'dropdown',
                    label: 'window:',
                    id: 'windowID',
                    choices: GetMultiSourceWindowChoices(deck.state),
                    default: 0,
                },
                {
                    type: 'dropdown',
                    label: 'State:',
                    id: 'multiSourceWindowEnable',
                    choices: MultiSourceEnableChoices,
                    default: 0,
                },
            ],
            defaultStyle: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0),
            },
            callback: (feedback) => {
                const winId = Number(feedback.options.windowID)
                const winState = Boolean(feedback.options.multiSourceWindowEnable)
                const info = deck.state?.mutiSource.eightWins[winId];
                return info?.enable === winState
            },
        },
        [FeedbackId.MultiSourceWinSelectSource]: {
            type: 'boolean',
            name: 'MultiSource: Set multi source window Source',
            description: 'If you change multi source window Source, change style of the button',
            options: [
                {
                    type: 'dropdown',
                    label: 'window:',
                    id: 'windowID',
                    choices: GetMultiSourceWindowChoices(deck.state),
                    default: 0,
                },
                {
                    type: 'dropdown',
                    label: 'Source:',
                    id: 'multiSourceWindowSource',
                    choices: deck.state?.mutiSource.multiSourceWindowsSources ? deck.state.mutiSource.multiSourceWindowsSources.map((s) => ({ id: s, label: String(getEnumKeyByValue(sourceID, s)), })) : [],
                    default: 0,
                },
            ],
            defaultStyle: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0),
            },
            callback: (feedback) => {
                const winId = Number(feedback.options.windowID)
                const sourceID = Number(feedback.options.multiSourceWindowSource)
                const info = deck.state?.mutiSource.eightWins[winId];
                return info?.selectSource === sourceID
            },
        },
    }
}
