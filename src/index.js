
exports.GoSteamDeckInstance = void 0;
const base_1 = require("@companion-module/base");
const config_1 = require("./config.js");
const GoSteamDeckV1_1 = require("./GoStreamdeckV1.js");
class GoSteamDeckInstance extends base_1.InstanceBase {
    config;
    gostreamdeck;
    states;
    async init(config) {
        this.config = config;
        this.log('debug', 'Initializing module');
        this.updateStatus(base_1.InstanceStatus.Disconnected);
        // this.config.reconnect = true
        // this.config.reconnectInterval = 5
        this.saveConfig(this.config);
        this.gostreamdeck = new GoSteamDeckV1_1.GoSteamDeckV1(this);
        this.initConnection();
        this.init_variables();
        this.init_actions();
        this.init_feedbacks();
        this.init_presets();
        this.checkFeedbacks();
    }
    async destroy() {
        this.gostreamdeck.disconnectSocket();
        this.updateStatus(base_1.InstanceStatus.Disconnected);
        this.log('debug', 'destroy ' + this.id);
    }
    getConfigFields() {
        return (0, config_1.GetConfigFields)();
    }
    async configUpdated(config) {
        this.config = config;
        this.gostreamdeck.disconnectSocket();
        this.updateStatus(base_1.InstanceStatus.Disconnected);
        /* if (this.config.version === 'v1') {
            this.ontime = new OntimeV1(this)
        } else if (this.config.version === 'v2') {
            // this.ontime = new OntimeV2(this)
        } */
        this.gostreamdeck = new GoSteamDeckV1_1.GoSteamDeckV1(this);
        this.initConnection();
        this.init_variables();
        this.init_actions();
        this.init_feedbacks();
        this.init_presets();
        this.checkFeedbacks();
    }
    initConnection() {
        this.log('debug', 'Initializing connection');
        this.gostreamdeck.connect();
    }
    init_variables() {
        this.log('debug', 'Initializing variables');
        this.gostreamdeck.getVariables(this);
        //this.setVariableDefinitions()
    }
    init_actions() {
        this.log('debug', 'Initializing actions');
        this.setActionDefinitions(this.gostreamdeck.getActions(this));
    }
    init_feedbacks() {
        this.log('debug', 'Initializing feedbacks');
        this.setFeedbackDefinitions(this.gostreamdeck.getFeedbacks(this));
    }
    init_presets() {
        this.log('debug', 'Initializing presets');
        this.setPresetDefinitions(this.gostreamdeck.getPresets());
    }
}
exports.GoSteamDeckInstance = GoSteamDeckInstance;
(0, base_1.runEntrypoint)(GoSteamDeckInstance, []);
//# sourceMappingURL=index.js.map

//# sourceURL=webpack://osee-gostreamdeck/./dist/index.js?
