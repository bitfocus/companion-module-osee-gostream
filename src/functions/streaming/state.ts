import { ActionId } from './actionId'
import { sendCommand } from '../../connection'
import { ReqType } from '../../enums'
import { LiveStatus } from './actions'

export type StreamPlatform = {
	name: string
	servers: string[]
}

type StreamInfo = {
	enabled: boolean
	status: LiveStatus
	platform: string
}
export type State = {
	status: LiveStatus
	streamInfo: StreamInfo[]
	platforms: StreamPlatform[]
}

export type StreamingState = {
	Streaming: State
}

export function create(): StreamingState {
	return {
		Streaming: {
			status: LiveStatus.Off,
			streamInfo: [
				{ enabled: false, status: LiveStatus.Off, platform: '' },
				{ enabled: false, status: LiveStatus.Off, platform: '' },
				{ enabled: false, status: LiveStatus.Off, platform: '' },
			],
			platforms: [],
		},
	}
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.StreamOutput, ReqType.Get, [0])
	await sendCommand(ActionId.StreamOutput, ReqType.Get, [1])
	await sendCommand(ActionId.StreamOutput, ReqType.Get, [2])
	await sendCommand(ActionId.StreamPlatform, ReqType.Get, [0])
	await sendCommand(ActionId.StreamPlatform, ReqType.Get, [1])
	await sendCommand(ActionId.StreamPlatform, ReqType.Get, [2])
	await sendCommand(ActionId.StreamServer, ReqType.Get, [0])
	await sendCommand(ActionId.StreamServer, ReqType.Get, [1])
	await sendCommand(ActionId.StreamServer, ReqType.Get, [2])
	await sendCommand(ActionId.StreamKey, ReqType.Get, [0])
	await sendCommand(ActionId.StreamKey, ReqType.Get, [1])
	await sendCommand(ActionId.StreamKey, ReqType.Get, [2])
	await sendCommand(ActionId.Live, ReqType.Get)
	await sendCommand(ActionId.LiveInfo, ReqType.Get, [0])
	await sendCommand(ActionId.LiveInfo, ReqType.Get, [1])
	await sendCommand(ActionId.LiveInfo, ReqType.Get, [2])

	// Request device to dump all stream profiles
	await sendCommand('getStreamProfileAll', ReqType.Get)
}
