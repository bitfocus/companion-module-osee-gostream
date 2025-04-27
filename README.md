# companion-module-osee-gostream

[![License](https://img.shields.io/github/license/bitfocus/companion-module-osee-gostream)](https://github.com/bitfocus/companion-module-osee-gostream/blob/main/LICENSE)
[![Version](https://img.shields.io/github/v/release/bitfocus/companion-module-osee-gostream)](https://github.com/bitfocus/companion-module-osee-gostream/releases)

This module is created for use with GoStream Devices.

- [Read the docs](./How%20to%20connect%20to%20computer%20software%20and%20companion.pdf)
- [Follow on github](https://github.com/bitfocus/companion-module-osee-gostream)

## Notes on some oddities

Due to the client/server asyncrounous approach of communicating with the Osee device there will be some delay
(~a few tens of milliseconds) before Companions internal state matches the requested state from an action. This
can is some cases put restrictions on which actions can be used in sequence, if e.g. one action updates an internal
state that the second action will access, chances are that the second action will use the old value of the variable. E.g. 'gostream: UpStream Key:Set inputs' can not be used right after 'gostream: UpStream Key:Set Key Type' as the action will most liklely affect the old key.
The solution to this is to add a short delay (200mS) between the actions .

## On developing the module

Follow the [developing module guidelines](https://github.com/bitfocus/companion-module-base/wiki) to setup the environment.
Install all the dependencies using

`yarn`

The GoStream module is written in TypeScript and need to be compiled before changes takes place. This is done using

`yarn build`

When done with a change make sure you lint it, there should be no warnings

`yarn eslint`

and also format the code

`yarn format`

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
  value?: (number|string)[]
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

Three "active" branches exists at any given time; stable, current , a future branch . 
* FUTURE branch is for developing the major releases.
* CURRENT branch is where normal developing goes.
* STABLE branch is only open for fixes.

Branches are named v{major}.{minor} and are based from main . Labeling for companion releases occurs on each branch not on main . 
There is no need to branch out from a release branch for patches , these can just continue the normal commit flow .

When a release is made an uplift to main occurs, then uplift to all other branches (if needed) takes place from main

![Branches example](https://github.com/user-attachments/assets/ee9e2a80-e66e-4d52-99f5-4e50a61daa7e)

## Help

See [HELP.md](./companion/HELP.md)

## License

[MIT License](./LICENSE)
