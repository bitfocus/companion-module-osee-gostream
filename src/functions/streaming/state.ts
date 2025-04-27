import { ActionId } from './actionId'
import { sendCommands, GoStreamCmd } from '../../connection'
import { ReqType } from '../../enums'
import { LiveStatus } from './actions'
import type { GoStreamModel } from '../../models/types'

export type StreamPlatform = {
	name: string
	servers: string[]
}

type StreamInfo = {
	enabled: boolean
	status: LiveStatus
	platform: string
}
export type StreamingStateT = {
	status: LiveStatus
	streamInfo: StreamInfo[]
	platforms: StreamPlatform[]
	quality: number
}

export function create(_model: GoStreamModel): StreamingStateT {
	return {
		status: LiveStatus.Off,
		streamInfo: [
			{ enabled: false, status: LiveStatus.Off, platform: '' },
			{ enabled: false, status: LiveStatus.Off, platform: '' },
			{ enabled: false, status: LiveStatus.Off, platform: '' },
		],
		platforms: [{ name: 'Loading', servers: ['Loading'] }],
		quality: 0,
	}
}

export async function sync(_model: GoStreamModel): Promise<boolean> {
	const cmds: GoStreamCmd[] = [
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
		{ id: 'quality', type: ReqType.Get, value: [1] },
	]
	return await sendCommands(cmds)
}

export function update(state: StreamingStateT, data: GoStreamCmd): boolean {
	switch (data.id as ActionId) {
		case ActionId.StreamOutput: {
			state.streamInfo[Number(data.value![0])].enabled = Boolean(data.value![1])
			break
		}
		case ActionId.Live: {
			state.status = Number(data.value![0])
			break
		}
		case ActionId.LiveInfo: {
			state.streamInfo[Number(data.value![0])].status = Number(data.value![1])
			break
		}
		case ActionId.StreamProfile: {
			const arrData: any[] = data.value as any[]
			const name = arrData.shift()
			const servers: any[] = []
			arrData.forEach((server) => servers.push(server))
			state.platforms.push({ name: name, servers: servers })
			return true
		}
		case ActionId.StreamPlatform: {
			state.streamInfo[Number(data.value![0])].platform = String(data.value![1])
			return true
		}
		case 'quality' as ActionId: {
			// 1 indicates stream
			if (data.value![0] == 1) {
				state.quality = Number(data.value![1])
			}
			break
		}
	}
	return false
}
