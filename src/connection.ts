import { InstanceStatus, TCPHelper, TCPHelperOptions } from '@companion-module/base'
import { GoSteamDeckInstance } from '.'
import { portDefault } from './config';
import { ActionId, ActionType, ReqType } from './enums';
import { getChoices } from './choices';

let tcp: TCPHelper | null = null;

export function connect(self: GoSteamDeckInstance): void {
	if (tcp !== null) {
		tcp.destroy();
	}

	self.updateStatus(InstanceStatus.Connecting)

	let host = self.config.host
	const port = self.config.port

	var option: TCPHelperOptions = {
		reconnect_interval: self.config.reconnectInterval,
		reconnect: self.config.reconnect,
	};
	tcp = new TCPHelper(host, port || portDefault, option)
	tcp.on('status_change', (state, message) => {
		self.updateStatus(state, message)
		self.log('debug', 'Socket reconnected')
	})

	tcp.on('connect', () => {
		self.updateStatus(InstanceStatus.Ok)
		self.log('debug', 'Socket connected')
	})

	tcp.on('error', () => {
		self.updateStatus(InstanceStatus.ConnectionFailure, 'Connection error')
		self.log('debug', 'Socket connect error')
	})
	tcp.on('end', () => {
		self.updateStatus(InstanceStatus.Disconnected, 'Disconnecting')
		self.log('debug', 'Socket Disconnecting')
	})
	tcp.on('data', (msg) => {
		let jsonStr = msg.toString("utf8");
		var json = JSON.parse(jsonStr);
		if (json.result === "0" && json.data !== "" && json.data !== null && json.data.type === ReqType.Get) {
			switch (json.data.id) {
				case ActionId.PvwIndex:
					var select = getChoices(ActionType.Preview).find(s => s.id === json.data.value[0]);
					self.states.selectPrevInput = select;
					break;
				case ActionId.PgmIndex:
					var select = getChoices(ActionType.Program).find(s => s.id === json.data.value[0]);
					self.states.selectPgmInput = select;
					break;
				case ActionId.TransitionSource:
					let intstate=Number(json.data.value[0]);
					if((intstate&1)===1){
						self.states.TKeyeState.M_Key=true;
					}
					if(((intstate>>1)&1)===1){
						self.states.TKeyeState.DSK=true;
					}
					if(((intstate>>2)&1)===1){
						self.states.TKeyeState.BKGD=true;
					}
					break;
					case ActionId.DskOnAir:
						if(json.data.value[0]=='1'){
							self.states.dskOnAir=true;
						}
						break;
						case ActionId.KeyOnAir:
						if(json.data.value[0]=='1'){
							self.states.keyOnAir=true;
						}
						break;
			}
		}
		else if (json.result === "0") {
			
		}
		else {
			self.log('error',json.error_info);
		}
	})
	ReqStateData(self)
}

export function ReqStateData(self: GoSteamDeckInstance): void {
	sendCommand(self, ActionId.PgmIndex, ReqType.Get)
	sendCommand(self, ActionId.PvwIndex, ReqType.Get)
	sendCommand(self, ActionId.FTB, ReqType.Get)
	sendCommand(self, ActionId.TransitionIndex, ReqType.Get)

	sendCommand(self, ActionId.TransitionSource, ReqType.Get)
	sendCommand(self, ActionId.DskOnAir, ReqType.Get)
	sendCommand(self, ActionId.KeyOnAir, ReqType.Get)
}

export function disconnectSocket(): void {
	if (tcp !== null) {
		tcp.destroy();
	}
}

export async function sendCommand(self: GoSteamDeckInstance, id: string, type?: string, value?: Array<string | number>): Promise<boolean> {
	if (tcp !== null) {
		let obj = { id: id, type: type, value: value };
		let json = JSON.stringify(obj);
		self.log('debug', json);
		let bufs = Buffer.from(json, "utf-8");
		return await tcp.send(bufs);
	}
	return false;
}
