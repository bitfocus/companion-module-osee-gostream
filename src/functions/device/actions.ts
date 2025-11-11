import { Device } from "../../connection/actionids"
import { getOptString } from '../../util'
import { StreamDeck } from '../../connection/streamdeck'
import type { CompanionActionDefinitions } from '@companion-module/base'

export function create(deck: StreamDeck): CompanionActionDefinitions {
    return {
        [Device.ActionId.DeviceName]: {
            name: 'Device:Set Device Name',
            options: [
				{
					type: 'textinput',
					label: 'DeviceName',
					id: 'deviceName',
					required: true,
					default: '',
					useVariables: true,
				}
			],
            callback: async (action) => {
                const optNameString = getOptString(action, 'deviceName')
                await deck.setDeviceName(optNameString)
            },
        }
    }
}
