import type { CompanionActionEvent } from '@companion-module/base'

export const HEAD1 = 0xeb
export const HEAD2 = 0xa6
export const ProType = 0x00

export function getOptNumber(action: CompanionActionEvent, key: string, defVal?: number): number {
	const rawVal = action.options[key]
	if (defVal !== undefined && rawVal === undefined) return defVal
	const val = Number(rawVal)
	if (isNaN(val)) {
		throw new Error(`Invalid option '${key}'`)
	}
	return val
}

export function getOptString(action: CompanionActionEvent, key: string, defVal?: string): string {
	const rawVal = action.options[key]
	if (defVal !== undefined && rawVal === undefined) return defVal
	const val = String(rawVal)
	if (typeof rawVal !== 'string') {
		throw new Error(`Invalid option '${key}'`)
	}
	return val
}

export function PackData(Datas: Buffer): Buffer {
	const dataLen = Datas.length + 5
	const datas = Buffer.alloc(dataLen)
	datas[0] = exports.HEAD1
	datas[1] = exports.HEAD2
	datas[2] = exports.ProType
	const lenbs = IntTo2Bytes(dataLen - 3, true)
	lenbs.copy(datas, 3, 0, lenbs.length)
	//console.log(lenbs);
	//datas.splice(3,2,...lenbs);
	if (Datas != undefined) Datas.copy(datas, 5, 0, Datas.length)
	//datas.splice(5,Datas.length,...Datas);
	const crc_datas = GetModbusCrc16(datas)
	const all_datas = Buffer.alloc(datas.length + 2)
	datas.copy(all_datas, 0, 0, datas.length)
	all_datas[datas.length] = crc_datas[0]
	all_datas[datas.length + 1] = crc_datas[1]
	//   crc_datas.forEach(ele=>{
	//     datas.push(ele);
	//   });
	return all_datas
}

export function IntTo4Bytes(value: number, lowByteFirst: boolean): Array<number> {
	const b = new Array(4)
	for (let i = 0; i < 4; i++) {
		if (lowByteFirst) b[3 - i] = value >> (24 - i * 8)
		else b[i] = value >> (24 - i * 8)
	}
	return b
}

export function IntTo2Bytes(value: number, lowByteFirst: boolean): Buffer {
	const b = IntTo4Bytes(value, lowByteFirst)
	const b2 = Buffer.alloc(2)
	if (lowByteFirst) {
		b2[0] = b[0]
		b2[1] = b[1]
	} else {
		b2[0] = b[2]
		b2[1] = b[3]
	}
	return b2
}

export function GetModbusCrc16(bytes: Buffer): number[] {
	let crcRegister_H = 0xff,
		crcRegister_L = 0xff // 预置一个值为 0xFFFF 的 16 位寄存器
	const polynomialCode_H = 0xa0,
		polynomialCode_L = 0x01 // 多项式码 0xA001
	for (let i = 0; i < bytes.length; i++) {
		crcRegister_L = crcRegister_L ^ bytes[i]
		for (let j = 0; j < 8; j++) {
			const tempCRC_H = crcRegister_H
			const tempCRC_L = crcRegister_L
			crcRegister_H = crcRegister_H >> 1
			crcRegister_L = crcRegister_L >> 1
			// 高位右移前最后 1 位应该是低位右移后的第 1 位：如果高位最后一位为 1 则低位右移后前面补 1
			if ((tempCRC_H & 0x01) == 0x01) {
				crcRegister_L = crcRegister_L | 0x80
			}
			if ((tempCRC_L & 0x01) == 0x01) {
				crcRegister_H = crcRegister_H ^ polynomialCode_H
				crcRegister_L = crcRegister_L ^ polynomialCode_L
			}
		}
	}
	const arr = [crcRegister_L, crcRegister_H]
	return arr
}

export function Bytes4ToInt(bs: number[], lowByteFirst: boolean): number {
	const mask = 0xff
	let temp = 0
	let res = 0
	for (let i = 0; i < 4; i++) {
		res <<= 8
		if (lowByteFirst) temp = bs[3 - i] & mask
		else temp = bs[i] & mask
		res |= temp
	}
	return res
}

export function Bytes2ToInt(bs: Buffer, lowByteFirst: boolean): number {
	if (lowByteFirst) {
		if (bs[1] === 0xff) return Bytes4ToInt([bs[0], 0xff, 0xff, 0xff], lowByteFirst)
	} else if (bs[0] === 0xff) {
		return Bytes4ToInt([bs[0], 0xff, 0xff, bs[1]], lowByteFirst)
	}
	const mask = 0xff
	let temp = 0
	let res = 0
	for (let i = 0; i < 2; i++) {
		res <<= 8
		if (lowByteFirst) temp = bs[1 - i] & mask
		else temp = bs[i] & mask
		res |= temp
	}
	return res
}

export function UpackDatas(resp: Buffer): Buffer {
	if (resp.length == 0) {
		throw new Error('recv null')
	}
	if (resp[0] != exports.HEAD1 || resp[1] != exports.HEAD2) {
		throw new Error('recv head error')
	}
	//let ProType = resp[2];
	const byte_resp_lens = Buffer.alloc(2)
	byte_resp_lens[0] = resp[3]
	byte_resp_lens[1] = resp[4]
	const resp_len = Bytes2ToInt(byte_resp_lens, true)
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
	const json_datas = Buffer.alloc(resp.length - 7)
	resp.copy(json_datas, 0, 5, resp.length - 2)
	return json_datas
}

export function IsCrcOK(datas: Buffer): boolean {
	const length = datas.length - 2
	// let bytes = new Array(length);
	// bytes.splice(0,length,datas);
	const bytes = Buffer.alloc(length)
	datas.copy(bytes, 0, 0, length)
	const getCrc = GetModbusCrc16(bytes)
	if (getCrc[0] == datas[length] && getCrc[1] == datas[length + 1]) {
		return true
	} else {
		return false
	}
}
