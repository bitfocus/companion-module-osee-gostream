import {
	runEntrypoint,
	InstanceBase,
	InstanceStatus,
	SomeCompanionConfigField,
	CompanionActionDefinitions,
	CompanionPresetDefinitions,
	CompanionFeedbackDefinitions,
} from '@companion-module/base'
import { GoSteamDeckConfig, GetConfigFields } from './config'
import { GoSteamDeckV1 } from './GoSteamDeckV1'
import { GoStreamDeckState } from './state'
export interface GoSteamDeckClient {
	instance: GoSteamDeckInstance

	connect(): void
	disconnectSocket(): void

	getVariables(self: GoSteamDeckInstance): void
	getActions(self: GoSteamDeckInstance): CompanionActionDefinitions
	getFeedbacks(self: GoSteamDeckInstance): CompanionFeedbackDefinitions
	getPresets(): CompanionPresetDefinitions
}
export class GoSteamDeckInstance extends InstanceBase<GoSteamDeckConfig> {
	public config!: GoSteamDeckConfig
	public gostreamdeck!: GoSteamDeckClient
	public states!: GoStreamDeckState

	async init(config: GoSteamDeckConfig): Promise<void> {
		this.config = config

		this.log('debug', 'Initializing module')
		this.updateStatus(InstanceStatus.Disconnected)

		// this.config.reconnect = true
		// this.config.reconnectInterval = 5
		this.saveConfig(this.config)

		this.gostreamdeck = new GoSteamDeckV1(this);

		this.initConnection()
		this.init_variables()
		this.init_actions()
		this.init_feedbacks()
		this.init_presets()
		this.checkFeedbacks()
	}

	async destroy(): Promise<void> {
		this.gostreamdeck.disconnectSocket()
		this.updateStatus(InstanceStatus.Disconnected)
		this.log('debug', 'destroy ' + this.id)
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	async configUpdated(config: GoSteamDeckConfig): Promise<void> {
		this.config = config
		this.gostreamdeck.disconnectSocket()
		this.updateStatus(InstanceStatus.Disconnected)

		/* if (this.config.version === 'v1') {
			this.ontime = new OntimeV1(this)
		} else if (this.config.version === 'v2') {
			// this.ontime = new OntimeV2(this)
		} */
		this.gostreamdeck = new GoSteamDeckV1(this)

		this.initConnection()
		this.init_variables()
		this.init_actions()
		this.init_feedbacks()
		this.init_presets()
		this.checkFeedbacks()
	}

	initConnection(): void {
		this.log('debug', 'Initializing connection')
		this.gostreamdeck.connect()
	}

	init_variables(): void {
		this.log('debug', 'Initializing variables')
		this.gostreamdeck.getVariables(this);
		//this.setVariableDefinitions()
	}

	init_actions(): void {
		this.log('debug', 'Initializing actions')
		this.setActionDefinitions(this.gostreamdeck.getActions(this))
	}

	init_feedbacks(): void {
		this.log('debug', 'Initializing feedbacks')
		this.setFeedbackDefinitions(this.gostreamdeck.getFeedbacks(this))
	}

	init_presets(): void {
		this.log('debug', 'Initializing presets')
		this.setPresetDefinitions(this.gostreamdeck.getPresets())
	}
}

runEntrypoint(GoSteamDeckInstance, [])
