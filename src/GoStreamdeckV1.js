"use strict;"

//Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoSteamDeckV1 = void 0;

const actions_1 = require("./actions.js");
const feedback_1 = require("./feedback.js");
const presets_1 = require("./presets.js");
const variables_1 = require("./variables.js");
const connection_1 = require("./connection.js");
const state_1 = require("./state.js");

class GoSteamDeckV1 {
    instance;
    constructor(instance) {
        this.instance = instance;
        this.instance.states = (0, state_1.Create)();
    }
    getVariables() {
        (0, variables_1.variables)(this.instance);
    }
    getActions() {
        return (0, actions_1.actions)(this.instance);
    }
    getFeedbacks() {
        return (0, feedback_1.feedbacks)(this.instance);
    }
    getPresets() {
        return (0, presets_1.presets)(this.instance);
    }
    connect() {
        (0, connection_1.connect)(this.instance);
    }
    disconnectSocket() {
        (0, connection_1.disconnectSocket)();
    }
}
exports.GoSteamDeckV1 = GoSteamDeckV1;
//# sourceMappingURL=GoSteamDeckV1.js.map

//# sourceURL=webpack://osee-gostreamdeck/./dist/GoSteamDeckV1.js?
