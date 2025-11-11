import { LiveStatus } from "../enums"

export interface ServerInfo{
    serName:string
    url:string
}

export interface StreamPlatform {
    name: string
    servers: ServerInfo[]
}

export type StreamInfo = {
    enabled: boolean
    status: LiveStatus
    platform: string
    url:string
    key:string
}
export interface StreamingStateT {
    status: LiveStatus
    streamInfos: {[index: number]: StreamInfo | undefined }
    platforms: StreamPlatform[]
    quality: number
}