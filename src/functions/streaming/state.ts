import { ActionId } from './actionId'
import { sendCommands } from '../../connection'
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
	const cmds = [
		{ id: ActionId.StreamOutput, type: ReqType.Get, value: [0] },
		{ id: ActionId.StreamOutput, type: ReqType.Get, value: [1] },
		{ id: ActionId.StreamOutput, type: ReqType.Get, value: [2] },
		{ id: ActionId.StreamPlatform, type: ReqType.Get, value: [0] },
		{ id: ActionId.StreamPlatform, type: ReqType.Get, value: [1] },
		{ id: ActionId.StreamPlatform, type: ReqType.Get, value: [2] },
		{ id: ActionId.StreamServer, type: ReqType.Get, value: [0] },
		{ id: ActionId.StreamServer, type: ReqType.Get, value: [1] },
		{ id: ActionId.StreamServer, type: ReqType.Get, value: [2] },
		{ id: ActionId.StreamKey, type: ReqType.Get, value: [0] },
		{ id: ActionId.StreamKey, type: ReqType.Get, value: [1] },
		{ id: ActionId.StreamKey, type: ReqType.Get, value: [2] },
		{ id: ActionId.Live, type: ReqType.Get },
		{ id: ActionId.LiveInfo, type: ReqType.Get, value: [0] },
		{ id: ActionId.LiveInfo, type: ReqType.Get, value: [1] },
		{ id: ActionId.LiveInfo, type: ReqType.Get, value: [2] },
		{ id: ActionId.Live, type: ReqType.Get },
		{ id: ActionId.StreamProfileAll, type: ReqType.Get },
	]
	await sendCommands(cmds)
}
