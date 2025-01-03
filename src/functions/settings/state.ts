import { ActionId } from './actionId'
import { sendCommand, GoStreamData } from '../../connection'
import { ReqType, ActionType } from '../../enums'
import { GoStreamInstance } from '../../index'
import { getChoices } from './../../choices'
import { updateRecordVariables } from './../../variables'

export type State = {
	auxSource: number
	inputWindowLayout: number
	mvMeter: number[]
	outSource: number[] // hdmi1, hdmi2, uvc
	outputColorSpace: number[]
	outputFormat: number
	micInput: number[]
	mvLayout: number
	sourceSelection: number[]
}

export type SettingsState = {
	Settings: State
}

export function create(): SettingsState {
	return {
		Settings: {
			auxSource: 0,
			inputWindowLayout: 0,
			mvMeter: [0, 0, 0, 0, 0, 0],
			outSource: [0, 0, 0],
			outputColorSpace: [0, 0],
			outputFormat: 0,
			micInput: [0, 0],
			mvLayout: 0,
			sourceSelection: [0, 0, 0, 0],
		},
	}
}

export function handleData(instance: GoStreamInstance, data: GoStreamData): boolean {
	switch (data.id as ActionId) {
		case ActionId.AuxSource:
			instance.states.SettingsProp.AuxSource = data.value[0]
			return true
		case ActionId.InputWindowLayout:
			instance.states.SettingsProp.SettingsInputWindowLayout = data.value[0]
			return true
		case ActionId.MvMeter:
			instance.states.SettingsProp.MvMeter[data.value[0]] = data.value[1]
			return true
		case ActionId.OutSource: {
			const outType = data.value[0]
			const outTypeValue = data.value[1]
			const selectSource = getChoices(ActionType.SettingsoutSource).find((s) => s.id === outTypeValue)
			if (outType === 0) {
				if (selectSource !== undefined) {
					instance.states.SettingsProp.OutSource.hdmi1 = selectSource
				}
			} else if (outType === 1) {
				if (selectSource !== undefined) {
					instance.states.SettingsProp.OutSource.hdmi2 = selectSource
				}
			} else if (outType === 2) {
				if (selectSource !== undefined) {
					instance.states.SettingsProp.OutSource.uvc = selectSource
				}
			}
			return true
		}
		case ActionId.OutputColorSpace:
			instance.states.SettingsProp.OutputColorSpace[data.value[0]] = data.value[1]
			return true
		case ActionId.OutFormat:
			instance.states.SettingsProp.OutputFormat = data.value[0]
			return true
		case ActionId.MicInput:
			instance.states.SettingsProp.MicInput[data.value[0]] = data.value[1]
			return true
		case ActionId.MvLayout:
			instance.states.SettingsProp.MvLayout = data.value[0]
			return true
		case ActionId.SrcSelection:
			instance.states.SettingsProp.SourceSelection[data.value[0]] = data.value[1]
			return true
		case ActionId.RecordTime:
			updateRecordVariables(instance, data.value[0].toString())
			return true
	}
	return false
}

export async function sync(): Promise<void> {
	await sendCommand(ActionId.AuxSource, ReqType.Get)
	await sendCommand(ActionId.OutSource, ReqType.Get, [0])
	await sendCommand(ActionId.OutSource, ReqType.Get, [1])
	await sendCommand(ActionId.OutSource, ReqType.Get, [2])
	await sendCommand(ActionId.InputWindowLayout, ReqType.Get)
	await sendCommand(ActionId.MvMeter, ReqType.Get, [0])
	await sendCommand(ActionId.MvMeter, ReqType.Get, [1])
	await sendCommand(ActionId.MvMeter, ReqType.Get, [2])
	await sendCommand(ActionId.MvMeter, ReqType.Get, [3])
	await sendCommand(ActionId.MvMeter, ReqType.Get, [4])
	await sendCommand(ActionId.MvMeter, ReqType.Get, [5])
	await sendCommand(ActionId.OutputColorSpace, ReqType.Get)
	await sendCommand(ActionId.OutFormat, ReqType.Get)
	await sendCommand(ActionId.MvLayout, ReqType.Get)
	await sendCommand(ActionId.MicInput, ReqType.Get, [0])
	await sendCommand(ActionId.MicInput, ReqType.Get, [1])
}
