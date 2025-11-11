import net from 'net'
import { EventEmitter } from 'eventemitter3'
import { TcpStatus } from '../enums/index'
import { ReqType } from "../enums"
import crc16modbus from 'crc/crc16modbus'


export type GoStreamCmd = {
	id: string
	type: ReqType
	value?: (string | number)[]
}

const HEAD1 = 0xeb
const HEAD2 = 0xa6
const ProType = 0x00

const PACKET_HEADER_SIZE = 5
const PACKET_HEAD = new Uint8Array([HEAD1, HEAD2])
let partialPacketBuffer: Buffer | null = null

type TCPStatuses =
	| TcpStatus.Ok
	| TcpStatus.Connecting
	| TcpStatus.Disconnected
	| TcpStatus.UnknownError

export interface TCPHelperEvents {
	// when an error occurs
	error: [err: Error]
	// a packet of data has been received
	data: [msg: GoStreamCmd[]]

	// the connection has opened
	connect: []
	// the socket has ended
	end: []
	// the write buffer has emptied
	drain: []

	// the connection status changes
	status_change: [status: TCPStatuses, message: string | undefined]
}

export interface TCPHelperOptions {
	/** default 2000 */
	reconnect_interval?: number
	/** default true */
	reconnect?: boolean
}

function IsCrcOK(datas: Buffer): boolean {
	const length = datas.length - 2
	const recvCrc = datas.readUInt16LE(length)
	const calcCrc = crc16modbus(datas.subarray(0, length))
	return recvCrc === calcCrc
}
export class TCPHelper extends EventEmitter<TCPHelperEvents> {
	#host: string
	#port: number
	readonly _socket: net.Socket
	#options: Required<TCPHelperOptions>

	#connected = false
	#connecting = false
	#destroyed = false
	#lastStatus: TcpStatus | undefined
	#reconnectTimer: NodeJS.Timeout | undefined
	#missingErrorHandlerTimer: NodeJS.Timeout | undefined

	get isConnected(): boolean {
		return this.#connected
	}
	get isConnecting(): boolean {
		return this.#connecting
	}
	get isDestroyed(): boolean {
		return this.#destroyed
	}

	constructor(host: string, port: number, options?: TCPHelperOptions) {
		super()

		this.#host = host
		this.#port = port
		this.#options = {
			reconnect_interval: 2000,
			reconnect: true,
			...options,
		}

		this._socket = new net.Socket()
		this._socket.setKeepAlive(true,2000)
		this._socket.setNoDelay(true)

		this._socket.on('error', (err) => {
			this.#connecting = false
			this.#connected = false
			if (this.#options.reconnect) {
				this.#queueReconnect()
			}

			this.#new_status(TcpStatus.UnknownError, err.message)
			this.emit('error', err)
		})

		this._socket.on('ready', () => {
			this.#connected = true
			this.#connecting = false

			this.#new_status(TcpStatus.Ok)
			this.emit('connect')
		})

		this._socket.on('end', () => {
			this.#connected = false
			this.#new_status(TcpStatus.Disconnected)

			if (!this.#connecting && this.#options.reconnect) {
				this.#queueReconnect()
			}
			this.emit('end')
		})

		this._socket.on('data', (data) => {
			let cmds = this.handleGoStreamPacket(data)
			this.emit('data', cmds)
		})
		this._socket.on('drain', () => {
			this.emit('drain')
		})
		// Let caller install event handlers first
		setImmediate(() => {
			if (!this.#destroyed) this.connect()
		})

		this.#missingErrorHandlerTimer = setTimeout(() => {
			this.#missingErrorHandlerTimer = undefined
			if (!this.#destroyed && !this.listenerCount('error')) {
				// The socket is active and has no listeners. Log an error for the module devs!
				console.error(`Danger: TCP client for ${this.#host}:${this.#port} is missing an error handler!`)
			}
		}, 5000)
	}

	private connect(): boolean {
		if (this.#destroyed) throw new Error('Cannot connect destroyed socket')
		if (this.#connecting) return false

		this.#connecting = true
		this._socket.connect(this.#port, this.#host)
		return true
	}

	connection(address?: string, port?: number): boolean {
		if (address) {
			this.#host = address
		}
		if (port) {
			this.#port = port
		}
		this.#options = {
			reconnect_interval: 2000,
			reconnect: true,
		}
		return this.connect();
	}

	async send(message: string | Buffer): Promise<boolean> {
		if (this.#destroyed || this._socket.destroyed) throw new Error('Cannot write to destroyed socket')
		if (!message || !message.length) throw new Error('No message to send')

		if (!this.#connected) {
			return false
		}

		try {
			return new Promise((resolve, reject) => {
				this._socket.write(message, (error) => {
					if (error) {
						reject(error)
						return
					}

					resolve(true)
				})
			})
		} catch (error) {
			this.#connected = false

			const error2: Error = error instanceof Error ? error : new Error(`${error}`)

			// Unhandeled socket error
			this.#new_status(TcpStatus.UnknownError, error2.message)
			this.emit('error', error2)

			throw error2
		}
	}

	async sendCommands(commands: GoStreamCmd[]): Promise<boolean> {
		if (this.#destroyed || this._socket.destroyed) throw new Error('Cannot write to destroyed socket')
		if (commands.length === 0) throw new Error('No command to send')

		if (!this.#connected) {
			return false
		}
		const packedCmds: Buffer[] = []
		commands.forEach((cmd) => {
			const json = JSON.stringify(cmd)
			const buf = Buffer.from(json, 'utf-8')
			packedCmds.push(this.PackData(buf))
		})
		try {
			return new Promise((resolve, reject) => {
				this._socket.write(Buffer.concat(packedCmds), (error) => {
					if (error) {
						reject(error)
						return
					}

					resolve(true)
				})
			})
		} catch (error) {
			this.#connected = false

			const error2: Error = error instanceof Error ? error : new Error(`${error}`)

			// Unhandeled socket error
			this.#new_status(TcpStatus.UnknownError, error2.message)
			this.emit('error', error2)

			throw error2
		}
	}

	async sendCommand(id: string, type: ReqType, value?: string | number | any[]): Promise<boolean> {
		if (this.#destroyed || this._socket.destroyed) throw new Error('Cannot write to destroyed socket')
		if (id === '') throw new Error('No command to send')
		if (!this.#connected) {
			return false
		}
		const obj = { id: id, type: type, value: value }
		const json = JSON.stringify(obj)
		const bufs = Buffer.from(json, 'utf-8')
		const send_data = this.PackData(bufs)
		try {
			return new Promise((resolve, reject) => {
				this._socket.write(send_data, (error) => {
					if (error) {
						reject(error)
						return
					}

					resolve(true)
				})
			})
		} catch (error) {
			this.#connected = false

			const error2: Error = error instanceof Error ? error : new Error(`${error}`)
			this.#new_status(TcpStatus.UnknownError, error2.message)
			this.emit('error', error2)

			throw error2
		}
	}

	private PackData(data: Buffer): Buffer {
		const packetLen = data.length + 7
		const packet = Buffer.alloc(packetLen)

		packet[0] = HEAD1
		packet[1] = HEAD2
		packet[2] = ProType
		packet.writeUInt16LE(packetLen - 5, 3)

		if (data != undefined) data.copy(packet, 5, 0, data.length)
		packet.writeUInt16LE(crc16modbus(packet.subarray(0, packetLen - 2)), packet.length - 2)
		return packet
	}

	private handleGoStreamPacket(msg_data: Buffer): GoStreamCmd[] {
		const commands: GoStreamCmd[] = []

		let index = msg_data.indexOf(PACKET_HEAD)
		// Take care of data before start of packet, i.e. if index > 0
		// OR packets that dont have a head i.e. index < 0
		// The data needs to be merged with hopefully saved data
		if (index !== 0) {
			if (partialPacketBuffer != null) {
				// Either we have found a head sequence or this is plain data
				const offset = index > 0 ? index : msg_data.length
				// Merge with saved packet data
				const packet_data = Buffer.alloc(partialPacketBuffer.length + offset, partialPacketBuffer)
				const remaining_data = msg_data.subarray(0, offset)
				remaining_data.copy(packet_data, partialPacketBuffer.length)

				if (index > 0) {
					// We did found a head somewhere later in data
					// process packet to that index then resume with
					// rest of package in while loop below
					commands.push(this.unpackData(packet_data))
					partialPacketBuffer = null
				} else if (index < 0) {
					// All data in this msg_data belongs to same package
					// as we did not find any head sequence
					const expected_length = packet_data.readUInt16LE(3)
					if (expected_length + 5 === packet_data.length) {
						// This is a full packet received, process it
						commands.push(this.unpackData(packet_data))
						partialPacketBuffer = null
					} else {
						// Save packet_data as it is not complete yet
						partialPacketBuffer = Buffer.from(packet_data)
					}
					return commands
				}
			} else {
				console.error('packet data out of order, dropping packet!')
				return []
			}
		}

		while (index >= 0) {
			const packet_size = msg_data.readUInt16LE(index + 3)
			const packet_data = msg_data.subarray(index, index + PACKET_HEADER_SIZE + packet_size)
			if (index + PACKET_HEADER_SIZE + packet_size > msg_data.length) {
				// Packet is not complete, save this in partial packet buffer
				partialPacketBuffer = Buffer.alloc(msg_data.length - index, msg_data.subarray(index))
				break
			}
			commands.push(this.unpackData(packet_data))
			index = msg_data.indexOf(PACKET_HEAD, index + PACKET_HEADER_SIZE + packet_size)
		}

		return commands
	}

	private UnpackDatas(resp: Buffer): Buffer {
		if (resp.length == 0) {
			throw new Error('recv null')
		}
		if (resp[0] != HEAD1 || resp[1] != HEAD2) {
			throw new Error('recv head error')
		}
		const resp_len = resp.readInt16LE(3)
		if (resp_len != resp.length - 5) {
			console.log(
				'Recv Error:' +
				resp
					.toString('hex')
					.match(/.{1,2}/g)
					?.join(' '),
			)
			throw new Error('recv data length error')
		}
		if (!IsCrcOK(resp)) {
			throw new Error('recv data crc error')
		}
		return resp.subarray(5, resp.length - 2)
	}
	private unpackData(msg_data: Buffer): GoStreamCmd {
		const jsonContent = this.UnpackDatas(msg_data)
		const jsonStr = jsonContent.toString('utf8')
		const json = JSON.parse(jsonStr)
		return json
	}

	destroy(): void {
		this.#destroyed = true

		if (this.#reconnectTimer !== undefined) {
			clearTimeout(this.#reconnectTimer)
			this.#reconnectTimer = undefined
		}
		if (this.#missingErrorHandlerTimer !== undefined) {
			clearTimeout(this.#missingErrorHandlerTimer)
			this.#missingErrorHandlerTimer = undefined
		}

		this._socket.removeAllListeners()
		this.removeAllListeners()
		this._socket.destroy()
	}

	#queueReconnect(): void {
		if (this.#reconnectTimer !== undefined) {
			clearTimeout(this.#reconnectTimer)
		}

		this.#reconnectTimer = setTimeout(() => {
			this.#reconnectTimer = undefined

			this.#new_status(TcpStatus.Connecting)

			this.connect()
		}, this.#options.reconnect_interval)
	}

	// Private function
	#new_status(status: TCPStatuses, message?: string): void {
		if (this.#lastStatus != status) {
			this.#lastStatus = status
			this.emit('status_change', status, message)
		}
	}
}