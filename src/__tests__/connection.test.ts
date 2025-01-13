import { handleGoStreamPacket } from './../connection'

/*
{
    "id": "srcSelection",
    "type": "set",
    "value": [
        0,
        2
    ]
}
*/
const srcSelectionData = [
	0xeb, 0xa6, 0x00, 0x5d, 0x00, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x22, 0x69, 0x64, 0x22, 0x3a, 0x20, 0x22, 0x73,
	0x72, 0x63, 0x53, 0x65, 0x6c, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x22, 0x2c, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x22,
	0x74, 0x79, 0x70, 0x65, 0x22, 0x3a, 0x20, 0x22, 0x73, 0x65, 0x74, 0x22, 0x2c, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x22,
	0x76, 0x61, 0x6c, 0x75, 0x65, 0x22, 0x3a, 0x20, 0x5b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x30,
	0x2c, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x32, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x5d, 0x0a, 0x7d,
	0x0a, 0x6a, 0x10,
]

test('Decode single command', () => {
	const srcSelectionPacket = Buffer.from(srcSelectionData)
	const data = handleGoStreamPacket(srcSelectionPacket)
	expect(data.length).toBe(1)
	expect(data[0].id).toBe('srcSelection')
	expect(data[0].type).toBe('set')
	expect(JSON.stringify(data[0].value)).toBe(JSON.stringify([0, 2]))
})

test('Decode multiple command', () => {
	const srcSelectionPacket = Buffer.from(srcSelectionData.concat(srcSelectionData))
	const data = handleGoStreamPacket(srcSelectionPacket)
	expect(data.length).toBe(2)
})

test('Decode multiple command, split in two parts', () => {
	const srcSelectionPacket = Buffer.from(srcSelectionData.concat(srcSelectionData))
	let data = handleGoStreamPacket(srcSelectionPacket.subarray(0, srcSelectionData.length + 10))
	expect(data.length).toBe(1)
	data = handleGoStreamPacket(srcSelectionPacket.subarray(srcSelectionData.length + 10))
	expect(data.length).toBe(1)
})

test('Decode multiple command, split in three parts', () => {
	const srcSelectionPacket = Buffer.from(srcSelectionData.concat(srcSelectionData))
	let data = handleGoStreamPacket(srcSelectionPacket.subarray(0, srcSelectionData.length + 10))
	expect(data.length).toBe(1)
	data = handleGoStreamPacket(srcSelectionPacket.subarray(srcSelectionData.length + 10, srcSelectionData.length + 20))
	expect(data.length).toBe(0)
	data = handleGoStreamPacket(srcSelectionPacket.subarray(srcSelectionData.length + 20))
	expect(data.length).toBe(1)
})
