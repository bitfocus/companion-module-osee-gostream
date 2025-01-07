import { runEntrypoint, InstanceBase, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, Config } from './config'
import { GoStream } from './GoStream'
//import { type IModelSpec, MODEL_AUTO_DETECT } from './models/types'
//import { GetModelSpec, GetAutoDetectModel } from './models/index'
import { GetActionsList } from './actions'

export class GoStreamInstance extends InstanceBase<Config> {
	config
	gostream
	states
	//private model!: IModelSpec
	async init(config: Config): Promise<void> {
		this.config = config
		//this.model = GetModelSpec(this.config.modelId || MODEL_AUTO_DETECT) || GetAutoDetectModel()
		this.log('debug', 'Initializing module')
		this.updateStatus(InstanceStatus.Disconnected)
		this.saveConfig(this.config)
		this.gostream = new GoStream(this)
		this.initConnection()
		this.init_variables()
		this.init_actions()
		this.init_feedbacks()
		this.init_presets()
		this.checkFeedbacks()
	}
	async destroy(): Promise<void> {
		this.gostream.disconnectSocket()
		this.updateStatus(InstanceStatus.Disconnected)
		this.log('debug', 'destroy ' + this.id)
	}

	public getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}
	async configUpdated(config: Config): Promise<void> {
		this.config = config
		this.gostream.disconnectSocket()
		this.updateStatus(InstanceStatus.Disconnected)
		/* if (this.config.version === 'v1') {
            this.ontime = new OntimeV1(this)
        } else if (this.config.version === 'v2') {
            // this.ontime = new OntimeV2(this)
        } */
		this.gostream = new GoStream(this)
		this.initConnection()
		this.init_variables()
		this.init_actions()
		this.init_feedbacks()
		this.init_presets()
		this.checkFeedbacks()
	}
	initConnection(): void {
		this.log('debug', 'Initializing connection')
		this.gostream.connect()
	}
	init_variables(): void {
		this.log('debug', 'Initializing variables')
		this.setVariableDefinitions(this.gostream.getVariables(this))
		//this.setVariableDefinitions()
	}
	init_actions(): void {
		this.log('debug', 'Initializing actions')
		this.setActionDefinitions(GetActionsList(this))
	}
	init_feedbacks(): void {
		this.log('debug', 'Initializing feedbacks')
		this.setFeedbackDefinitions(this.gostream.getFeedbacks(this))
	}
	init_presets(): void {
		this.log('debug', 'Initializing presets')
		this.setPresetDefinitions(this.gostream.getPresets())
	}
}
runEntrypoint(GoStreamInstance, [])
