
//Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetConfigFields = exports.portDefault = void 0;
const base_1 = require("@companion-module/base");
exports.portDefault = 19010;
function GetConfigFields() {
    return [
        {
            label: 'Information',
            id: 'info',
            type: 'static-text',
            value: 'This module controls GoSteamDeck over IP protocol',
            width: 12,
        },
        {
            label: 'GoSteamDeck target IP',
            id: 'host',
            type: 'textinput',
            default: '192.168.1.80',
            width: 6,
            required: true,
            regex: base_1.Regex.IP,
            tooltip: 'GoSteamDeck address',
        },
        {
            label: 'GoSteamDeck target port ',
            id: 'port',
            type: 'number',
            default: exports.portDefault,
            width: 6,
            min: 1,
            max: 0xffff,
            step: 1,
            tooltip: 'Usually 19010 by default',
        },
        {
            label: 'Reconnect',
            id: 'reconnect',
            type: 'checkbox',
            default: true,
            width: 4,
            tooltip: 'Chose if you want Companion to try to reconnect to GoSteamDeck when the connection is lost.',
        },
        {
            label: 'Reconnect interval (seconds)',
            id: 'reconnectInterval',
            type: 'number',
            min: 1,
            max: 60,
            default: 5,
            width: 4,
            isVisible: (config) => config.reconnect === true,
            tooltip: 'The interval in seconds between each reconnect attempt.',
        },
    ];
}
exports.GetConfigFields = GetConfigFields;
//# sourceMappingURL=config.js.map

//# sourceURL=webpack://osee-gostreamdeck/./dist/config.js?
