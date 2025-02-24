# companion-module-osee-gostream

[![License](https://img.shields.io/github/license/bitfocus/companion-module-osee-gostream)](https://github.com/bitfocus/companion-module-osee-gostream/blob/main/LICENSE)
[![Version](https://img.shields.io/github/v/release/bitfocus/companion-module-osee-gostream)](https://github.com/bitfocus/companion-module-osee-gostream/releases)

This module is created for use with GoStream Devices.

- [Read the docs](./How%20to%20connect%20to%20computer%20software%20and%20companion.pdf)
- [Follow on github](https://github.com/bitfocus/companion-module-osee-gostream)

## On developing the module

Follow the [developing module guidelines](https://github.com/bitfocus/companion-module-base/wiki) to setup the environment.
Install all the dependencies using

'yarn'

The GoStream module is written in TypeScript and need to be compiled before changes takes place. This is done using

'yarn build'

When done with a change make sure you lint it, there should be no warnings

'yarn eslint'

and also format the code

'yarn format'

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
A pus command is send by the switcher when something has changed, e.g. after a set command or if user pushes a hardware button on device.
A get command will request the specified parameter in the value array, the reply will be a get message.
A set command will change a parameter with the value in the value array, the response will be a pus command.

```
struct GoStreamCommand:
  id: string
  type: CommandType
  value?: (number|string|any)[]
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

## Notes on module development

The Osee GoStream module follows as long as possible the [semver major.minor.patch format](https://semver.org/) . 
* MAJOR version increases with incompatible API changes or big refactoring works 
* MINOR version increases with added functionality in a backward compatible manner
* PATCH version increases when a release has regressed from the prior release. 
  
As Companion supports upgrade scripts not all non backwards compatible changes will require a major number increase. If upgrade is possible then 
just a minor number increase is needed. 
A PATCH release should be made only on regression of the sw, i.e. when something that previously worked stopped working. There are probably several unknown
bugs in the current sw, as these are discovered they do not warrant a patch release but should be planned in a future minor release.

Development will always take place on a branch named after
the coming release , so all v1.3.0 development happens on the
branch v1.3.0 . When planned content is delivered to the branch
a pre-release for testing is done on that branch . If all seem
well a PR to master is done and the release is tagged .

## Help

See [HELP.md](./companion/HELP.md)

## License

[MIT License](./LICENSE)
