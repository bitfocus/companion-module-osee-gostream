import { ActionId } from './actionId'
import { sendCommands, GoStreamCmd, sendCommand } from '../../connection'
import { PortCaps, PortType, ReqType } from '../../enums'
import type { GoStreamModel } from '../../models/types'
import { Range } from '../../util'

export type NDISource = {
	name: string
	address: string
}

export type SettingsStateT = {
	auxSource: number
	inputWindowLayout: number
	mvMeter: number[]
	outSource: number[] // hdmi1, hdmi2, uvc
	outputColorSpace: number[]
	outputFormat: number
	micInput: number[]
	mvLayout: number
	sourceSelection: number[]
	sourceSelectionList: string[]
	sourceName: string[]
	version: string
	buildInfo: string
	deviceId: string
	deviceName: string
	ndiSources: NDISource[]
	connectedNdiSouce: NDISource
}

export function create(model: GoStreamModel): SettingsStateT {
	const micInputs = model.inputs.filter((inp) => inp.type & PortType.Mic).length
	const nameableVideoInputs = model.inputs.filter((inp) => inp.caps & PortCaps.Renameable).length
	const audioCapableInputs = model.inputs.filter((inp) => inp.caps & PortCaps.Audio).length
	const colorSpaceCapableOutputs = model.outputs.filter((out) => out.caps & PortCaps.Colorspace).length
	const srcSelectable = model.inputs.filter((inp) => inp.type & (PortType.HDMI | PortType.SDI)).length
	return {
		auxSource: 0,
		inputWindowLayout: 0,
		mvMeter: Array(audioCapableInputs),
		outSource: Array(model.outputs.length),
		outputColorSpace: Array(colorSpaceCapableOutputs),
		outputFormat: 0,
		micInput: Array(micInputs),
		mvLayout: 0,
		sourceSelection: Array(srcSelectable),
		sourceSelectionList: ['Loading'], // Loading data per default
		sourceName: new Array(nameableVideoInputs),
		version: '',
		buildInfo: '',
		deviceId: '',
		deviceName: '',
		ndiSources: [],
		connectedNdiSouce: { name: '', address: '' },
	}
}

export async function sync(model: GoStreamModel): Promise<boolean> {
	const micInputs = model.inputs.filter((inp) => inp.type & PortType.Mic).length
	const nameableVideoInputs = model.inputs.filter((inp) => inp.caps & PortCaps.Renameable).length
	const audioCapableInputs = model.inputs.filter(
		(inp) => inp.type & (PortType.HDMI | PortType.SDI) && inp.caps & PortCaps.Audio,
	).length
	const srcSelectable = model.inputs.filter((inp) => inp.type & (PortType.HDMI | PortType.SDI)).length
	const cmds: GoStreamCmd[] = [
		{ id: ActionId.AuxSource, type: ReqType.Get },
		...Range(model.outputs.length).map((id) => ({ id: ActionId.OutSource, type: ReqType.Get, value: [id] })),
		{ id: ActionId.InputWindowLayout, type: ReqType.Get },
		...Range(audioCapableInputs).map((id) => ({ id: ActionId.MvMeter, type: ReqType.Get, value: [id] })),
		{ id: ActionId.OutputColorSpace, type: ReqType.Get },
		{ id: ActionId.OutFormat, type: ReqType.Get },
		{ id: ActionId.MvLayout, type: ReqType.Get },
		...Range(micInputs).map((id) => ({ id: ActionId.MicInput, type: ReqType.Get, value: [id] })),
		...Range(nameableVideoInputs).map((id) => ({ id: ActionId.SrcName, type: ReqType.Get, value: [id] })),
		...Range(srcSelectable).map((id) => ({ id: ActionId.SrcSelection, type: ReqType.Get, value: [id] })),
		{ id: ActionId.GetSrcSelectionList, type: ReqType.Get },
		{ id: ActionId.Version, type: ReqType.Get },
		{ id: ActionId.BuildInfo, type: ReqType.Get },
		{ id: ActionId.DeviceId, type: ReqType.Get },
		{ id: ActionId.DeviceName, type: ReqType.Get },
	]
	return sendCommands(cmds)
}

let interval: any = undefined
const ndiListTimeout = 5000

export function update(state: SettingsStateT, data: GoStreamCmd): boolean {
	switch (data.id as ActionId) {
		case ActionId.AuxSource: {
			if (data.value) state.auxSource = data.value[0]
			if (state.auxSource == 2) {
				interval = setInterval(() => {
					sendCommand(ActionId.NDIList, ReqType.Get)
						.catch((err) => {
							console.log('Unexpected NDI sync error', err)
						})
						.then((_err) => {})
						.catch((_err) => {})
				}, ndiListTimeout)
			} else {
				clearInterval(interval)
			}
			break
		}
		case ActionId.InputWindowLayout:
			if (data.value) state.inputWindowLayout = data.value[0]
			break
		case ActionId.MvMeter:
			if (data.value) state.mvMeter[data.value[0]] = data.value[1]
			break
		case ActionId.OutSource: {
			const outType = data.value && data.value[0]
			const outValue = data.value && data.value[1]
			state.outSource[outType] = outValue
			break
		}
		case ActionId.OutputColorSpace:
			if (data.value) state.outputColorSpace[data.value[0]] = data.value[1]
			break
		case ActionId.OutFormat:
			state.outputFormat = data.value && data.value[0]
			break
		case ActionId.MicInput:
			if (data.value) state.micInput[data.value[0]] = data.value[1]
			break
		case ActionId.MvLayout:
			state.mvLayout = data.value && data.value[0]
			break
		case ActionId.SrcSelection:
			if (data.value) state.sourceSelection[data.value[0]] = data.value[1]
			break
		case ActionId.SrcName:
			if (!data.value) return true
			state.sourceName[data.value[0]] = data.value[1]
			break
		case ActionId.GetSrcSelectionList:
			if (!data.value) return true
			state.sourceSelectionList = <string[]>data.value
			return true
		case ActionId.Version:
			if (!data.value) return true
			state.version = data.value[0]
			break
		case ActionId.BuildInfo:
			if (!data.value) return true
			state.buildInfo = data.value[0]
			break
		case ActionId.DeviceId:
			if (!data.value) return true
			state.deviceId = data.value[0]
			break
		case ActionId.DeviceName:
			if (!data.value) return true
			state.deviceName = data.value[0]
			break
		case ActionId.NDIConnect:
			if (!data.value) return false
			state.connectedNdiSouce = { name: data.value[0], address: data.value[1] }
			break
		case ActionId.NDIList: {
			if (!data.value) {
				state.ndiSources = []
				return true
			}
			const values = data.value as string[]
			const ndiSources: NDISource[] = []
			for (let i = 0; i < values.length; i += 2) {
				ndiSources.push({ name: String(values[i]), address: String(values[i + 1]) })
			}
			ndiSources.sort((a, b) => (a.name < b.name ? -1 : 1))
			state.ndiSources = ndiSources
			// Reload actions etc
			return true
		}
	}
	return false
}
