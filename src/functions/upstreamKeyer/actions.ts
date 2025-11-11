import { USK } from "../../connection/actionids"
import { getOptNumber } from './../../util'
import { createLumaKeyActions } from './keyTypes/lumaKey'
import { createChromaKeyActions } from './keyTypes/chromaKey'
import { createPatternKeyActions } from './keyTypes/patternKey'
import { createPipActions } from './keyTypes/pipKey'
import type { CompanionActionDefinitions } from '@companion-module/base'
import { GetKeyChoices, KeySwitchChoices, KeyTypeChoices } from '../../model'
import { StreamDeck } from '../../connection/streamdeck'

export function create(deck: StreamDeck): CompanionActionDefinitions {
    return {
        [USK.ActionId.KeyOnAir]: {
            name: 'Key: set On Air',
            options: [
                {
                    type: 'dropdown',
                    label: 'Key',
                    id: 'keyId',
                    choices: GetKeyChoices(deck.state),
                    default: 0,
                },
                {
                    type: 'dropdown',
                    label: 'On Air',
                    id: 'onAir',
                    choices: KeySwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                let keyId = getOptNumber(action, 'keyId')
                let paramOpt = getOptNumber(action, 'onAir')
                if (paramOpt === 2) paramOpt = deck.state?.upStreamKey.USKS[keyId]?.onAir ? 0 : 1
                await deck.setKeyOnAir(keyId, Boolean(paramOpt))
            },
        },
        [USK.ActionId.KeyEnable]: {
            name: 'Key:set PVW Enable',
            options: [
                {
                    type: 'dropdown',
                    label: 'Key',
                    id: 'keyId',
                    choices: GetKeyChoices(deck.state),
                    default: 0,
                },
                {
                    type: 'dropdown',
                    label: 'Enable',
                    id: 'enable',
                    choices: KeySwitchChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                let keyId = getOptNumber(action, 'keyId')
                let paramOpt = getOptNumber(action, 'enable')
                if (paramOpt === 2) paramOpt = deck.state?.upStreamKey.USKS[keyId]?.enabled ? 0 : 1
                await deck.setKeyEnable(keyId, Boolean(paramOpt))
            },
        },
        [USK.ActionId.KeyType]: {
            name: 'Key:set key type',
            options: [
                {
                    type: 'dropdown',
                    label: 'Key',
                    id: 'keyId',
                    choices: GetKeyChoices(deck.state),
                    default: 0,
                },
                {
                    type: 'dropdown',
                    label: 'Type',
                    id: 'type',
                    choices: KeyTypeChoices,
                    default: 0,
                },
            ],
            callback: async (action) => {
                // range {"Luma","Chroma","Pattern","PIP"}

                let type = "";
                let opt = getOptNumber(action, 'type');
                switch (opt) {
                    case 0:
                    default:
                        type = "Luma";
                        break;
                    case 1:
                        type = "Chroma";
                        break;
                    case 2:
                        type = "Pattern";
                        break;
                    case 3:
                        type = "PIP";
                        break;
                }
                await deck.setKeyType(getOptNumber(action, 'keyId'), type)
            },
        },
        ...createLumaKeyActions(deck),
        ...createChromaKeyActions(deck),
        ...createPatternKeyActions(deck),
        ...createPipActions(deck),
    }
}
