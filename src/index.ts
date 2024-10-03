import { runEntrypoint, InstanceBase, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, Config } from './config'
import { GoStreamDeckV1 } from './GoStreamdeckV1'

class GoSteamDeckInstance extends InstanceBase<Config> {
	config
	gostreamdeck
	states
	async init(config) {
		this.config = config
		this.log('debug', 'Initializing module')
		this.updateStatus(InstanceStatus.Disconnected)
		// this.config.reconnect = true
		// this.config.reconnectInterval = 5
		this.saveConfig(this.config)
		this.gostreamdeck = new GoStreamDeckV1(this)
		this.initConnection()
		this.init_variables()
		this.init_actions()
		this.init_feedbacks()
		this.init_presets()
		this.checkFeedbacks()
	}
	async destroy() {
		this.gostreamdeck.disconnectSocket()
		this.updateStatus(InstanceStatus.Disconnected)
		this.log('debug', 'destroy ' + this.id)
	}

	public getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}
	async configUpdated(config) {
		this.config = config
		this.gostreamdeck.disconnectSocket()
		this.updateStatus(InstanceStatus.Disconnected)
		/* if (this.config.version === 'v1') {
            this.ontime = new OntimeV1(this)
        } else if (this.config.version === 'v2') {
            // this.ontime = new OntimeV2(this)
        } */
		this.gostreamdeck = new GoStreamDeckV1(this)
		this.initConnection()
		this.init_variables()
		this.init_actions()
		this.init_feedbacks()
		this.init_presets()
		this.checkFeedbacks()
	}
	initConnection() {
		this.log('debug', 'Initializing connection')
		this.gostreamdeck.connect()
	}
	init_variables() {
		this.log('debug', 'Initializing variables')
		this.gostreamdeck.getVariables(this)
		//this.setVariableDefinitions()
	}
	init_actions() {
		this.log('debug', 'Initializing actions')
		this.setActionDefinitions(this.gostreamdeck.getActions(this))
	}
	init_feedbacks() {
		this.log('debug', 'Initializing feedbacks')
		this.setFeedbackDefinitions(this.gostreamdeck.getFeedbacks(this))
	}
	init_presets() {
		this.log('debug', 'Initializing presets')
		this.setPresetDefinitions(this.gostreamdeck.getPresets())
	}
}
export { GoSteamDeckInstance }
runEntrypoint(GoSteamDeckInstance, [])
