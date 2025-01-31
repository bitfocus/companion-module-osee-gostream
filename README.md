# companion-module-osee-gostream

[![License](https://img.shields.io/github/license/bitfocus/companion-module-osee-gostream)](https://github.com/bitfocus/companion-module-osee-gostream/blob/main/LICENSE)
[![Version](https://img.shields.io/github/v/release/bitfocus/companion-module-osee-gostream)](https://github.com/bitfocus/companion-module-osee-gostream/releases)

This module is created for use with GoStream Devices.

- [Read the docs](./How%20to%20connect%20to%20computer%20software%20and%20companion.pdf)
- [Follow on github](https://github.com/bitfocus/companion-module-osee-gostream)

## Build

To manually build the latest version for your machine:

- `yarn install`

## Notes on OSEE GoStream protocol

The GoStream protocol (GSP) is a TCP based request-response like protocol with a push functionality. Data is sent in JSON encoded datastructures and content is little-endian encoded.
There is no handshake procedure for connection (other than normal TCP handshake) and no keep-alive messages or similar, so quite a minimalistic API.
Communication is based on set/get of state variables using the following datapacket format

```
enum CommandType:
  Get: 'get'
  Set: 'set'
  Push: 'pus'
```

A get command will request the specified parameter in the value array, the reply will be a get measage.
A set command will change a parameter with the value in the value array, the response will be a push command.
A push command is send by the switcher when something has changed, e.g. after a set command or if user pushes a hardware button on device.

```
struct GoStreamCommand:
  id: string
  type: CommandType
  value: (number|string)[]
```

each command is embedded in a packet with a header and a CRC 16 modbus sum

```
struct GoStreamPacket:
  header: U16 => 0xA6 0xEB
  protoid: U8 => currently 0
  length: U16 => Total length of data to follow, including crc
  command: GoStreamCommand
  crc: U16
```

The GoStream device might send several GoStreamPackets in the same Ethernet frame, each Packet might be split in several parts depending on TCP load etc.

## Help

See [HELP.md](./companion/HELP.md)

## License

[MIT License](./LICENSE)
