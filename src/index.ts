import { runEntrypoint, InstanceBase, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, DeckConfig } from './config'
import { GetActionsList } from './actions'
import { UpgradeScriptList } from './upgrades'
import { StreamDeck, StreamDeckConnectionStatus } from './connection/streamdeck'
import { updateVariables, variables } from './variables'
import { feedbacks } from './feedbacks'
import { presets } from './presets'
import { GetModelSpec } from './models'
import { StreamDeckState } from './connection/state'


export interface IpAndPort {
	ip: string
	port: number | undefined
}

export class GoStreamInstance extends InstanceBase<DeckConfig> {
	private config:DeckConfig={}
	deck
	model
	private deckState:StreamDeckState|undefined
	async init(config: DeckConfig): Promise<void> {
		this.config = config
		this.log('debug', 'Initializing module')
		this.updateStatus(InstanceStatus.Disconnected)
		this.saveConfig(this.config)
		
		this.setupDeckConnection();
	}
	async destroy(): Promise<void> {
		// this.gostream.disconnectSocket()
		this.deck.destroy();
		this.updateStatus(InstanceStatus.Disconnected)
		this.log('debug', 'destroy ' + this.id)
	}

	private setupDeckConnection(): void {
		this.deck = new StreamDeck()

		this.deck.on('connected', () => {
			this.deckState = this.deck.state;
			console.log(this.deckState)
			this.updateStatus(InstanceStatus.Ok)
			const bestModelId = this.getBestModelId()
			const newModelSpec = bestModelId ? GetModelSpec(bestModelId) : undefined
			if (newModelSpec) {
				this.model = newModelSpec
			}
			setImmediate(() => {
				console.log('save', this.config)
				this.saveConfig(this.config)
			})
			this.init_variables()
			this.init_actions()
			this.init_feedbacks()
			this.init_presets()
			this.checkFeedbacks()
		})

		this.deck.on('error', (e: any) => {
			this.log('error', e.message)
			this.updateStatus(InstanceStatus.UnknownError, e.message)
		})
		this.deck.on('disconnect', () => {
			this.updateStatus(InstanceStatus.Connecting)
			this.log('info', 'Lost connection')
		})
		this.deck.on('status_change', (_state, _message)=>{
			if(_state=== StreamDeckConnectionStatus.ERROR){
				this.updateStatus(InstanceStatus.Connecting)
				this.log('info', 'Lost connection')
			}else if(_state===StreamDeckConnectionStatus.CLOSED)
			{
				this.updateStatus(InstanceStatus.Connecting)
				this.log('info', 'Lost connection')
			}else{

			}
		});
		this.deck.on('rec_data', ()=>{
			this.checkFeedbacks()
			updateVariables(this)
		});

		const target = this.parseIpAndPort()
		if (target) {
			this.updateStatus(InstanceStatus.Connecting)
			this.deck.connect(target.ip, target.port).catch((e) => {
				this.updateStatus(InstanceStatus.ConnectionFailure)
				this.log('error', `Connecting failed: ${e}`)
			})
		}
	}

	private getBestModelId(): number | undefined {
		const configModelId = Number(this.config.modelID)
		if (!isNaN(configModelId) && configModelId !== 0xff) {
			return configModelId
		}
		const info = this.deckState?.device
		if (info && info.deviceModel) {
			return info.deviceModel
		}
		return undefined
	}

	parseIpAndPort(): IpAndPort | null {
		const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

		if (this.config.bonjourHost) {
			const [ip, rawPort] = this.config.bonjourHost.split(':')
			const port = Number(rawPort)
			if (ip.match(ipRegex) && !isNaN(port)) {
				return {
					ip,
					port,
				}
			}
		} else if (this.config.host) {
			if (this.config.host.match(ipRegex)) {
				return {
					ip: this.config.host,
					port: undefined,
				}
			}
		}
		return null
	}


	public getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}
	async configUpdated(config: DeckConfig): Promise<void> {
		this.config = config
		this.deck.destroy()
		this.updateStatus(InstanceStatus.Disconnected)
		this.setupDeckConnection()
	}
	init_variables(): void {
		this.log('debug', 'Initializing variables')
		this.setVariableDefinitions(variables(this))
	}
	init_actions(): void {
		this.log('debug', 'Initializing actions')
		this.setActionDefinitions(GetActionsList(this))
	}
	init_feedbacks(): void {
		this.log('debug', 'Initializing feedbacks')
		this.setFeedbackDefinitions(feedbacks(this))
	}
	init_presets(): void {
		this.log('debug', 'Initializing presets')
		this.setPresetDefinitions(presets(this))
	}
}

runEntrypoint(GoStreamInstance, [...UpgradeScriptList])
