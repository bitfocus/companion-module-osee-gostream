import { Media } from "../../connection/actionids"
import { getOptNumber, getOptString } from '../../util'
import { MediaTypeChoice } from '../../model'
import type { CompanionActionDefinitions, DropdownChoice, SomeCompanionActionInputField } from '@companion-module/base'
import { StreamDeck } from '../../connection/streamdeck'
import { Model } from "../../connection/enums"

function getIndexOptions(m_types: any[]): SomeCompanionActionInputField[] {
    return m_types.map((m_type) => {
        let choices: DropdownChoice[] = [];
        if (m_type.id == 0) {
            for (let index = 0; index < 32; index++) {
                choices.push({ id: index, label: (index+1).toString() });
            }
        } else {
            for (let index = 0; index < 1; index++) {
                choices.push({ id: index, label: (index+1).toString() });
            }
        }
        return {
            type: 'dropdown',
            label: 'Index',
            id: 'index_' + m_type.id,
            choices: choices,
            default: choices[0].id,
            isVisible: (options, data) => options.type === data.type,
            isVisibleData: { type: m_type.id },
        }
    })
}

export function create(deck: StreamDeck): CompanionActionDefinitions {
    let actions: CompanionActionDefinitions={
        [Media.ActionId.Mp1Properties]: {
            name: 'Media Player: set media player 1 properties',
            options: [
                {
                    type: 'dropdown',
                    label: 'Type',
                    id: 'type',
                    choices: [{ id: 0, label: 'Strill' }],
                    default: 0,
                },
                ...getIndexOptions(MediaTypeChoice),
            ],
            callback: async (action) => {
                const opt_type = getOptNumber(action, 'type')
                let type = "";
                if (opt_type === 0) type = "Still";
                else type = "Browser";
                const index = getOptNumber(action, 'index_' + opt_type)
                await deck.setMediaPlayer(0, type, index)
            },
        }
    }
    if(deck.state?.device.deviceModel===Model.Duet_8ISO){
        actions[Media.ActionId.Mp2Properties]= {
            name: 'Media Player: set media player 2 properties',
            options: [
                {
                    type: 'dropdown',
                    label: 'Type',
                    id: 'type',
                    choices: MediaTypeChoice,
                    default: 0,
                },
                ...getIndexOptions(MediaTypeChoice),
            ],
            callback: async (action) => {
                const opt_type = getOptNumber(action, 'type')
                const index = getOptNumber(action, 'index_' + opt_type)
                let type = "";
                if (opt_type === 0) type = "Still";
                else type = "Browser";
                await deck.setMediaPlayer(1, type, index)
            },
        },
        actions[Media.ActionId.Browser]= {
            name: 'Media Player: set Browser URL',
            options: [
                {
                    type: 'textinput',
                    label: 'Url',
                    id: 'url',
                }
            ],
            callback: async (action) => {
                await deck.setBrowser(0, getOptString(action, 'url'))
            },
        }
    }else{
        actions[Media.ActionId.Mp2Properties]= {
            name: 'Media Player: set media player 2 properties',
            options: [
                {
                    type: 'dropdown',
                    label: 'Type',
                    id: 'type',
                    choices: [{ id: 0, label: 'Strill' }],
                    default: 0,
                },
                ...getIndexOptions(MediaTypeChoice),
            ],
            callback: async (action) => {
                const opt_type = getOptNumber(action, 'type')
                const index = getOptNumber(action, 'index_' + opt_type)
                let type = "";
                if (opt_type === 0) type = "Still";
                else type = "Browser";
                await deck.setMediaPlayer(1, type, index)
            },
        }
    }
    return actions;
}
