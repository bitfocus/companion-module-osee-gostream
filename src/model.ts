import { EffectStyle } from './connection/enums'
import { StreamDeckState } from './connection/state'
import type { DropdownChoice } from '@companion-module/base'

//base

const ColorSwitchChoices = [
	{ id: 0, label: 'Color1' },
	{ id: 1, label: 'Color2' },
]

const EnableChoices = [
	{ id: 0, label: 'off' },
	{ id: 1, label: 'on' },
]

const SwitchChoices = [
	{ id: 0, label: 'Off' },
	{ id: 1, label: 'On' },
	{ id: 2, label: 'Toggle' },
]

const KeyType = [
	{ id: 0, label: 'Luma Key' },
	{ id: 1, label: 'Chroma Key' },
	{ id: 2, label: 'Pattern' },
	{ id: 3, label: 'PIP' },
]


//ISO

///Setting
export const SettingEnableChoices = [
	...SwitchChoices
]

//MutiView
export const WindowLayoutChoices = [
	{ id: 0, label: 'Style 1' },
	{ id: 1, label: 'Style 2' },
]

///Streaming
export function StreamingOptionChoices(state: StreamDeckState | undefined): DropdownChoice[] {
	const streamCount = state ? state.device.streamCount : 0;
	const streams: DropdownChoice[] = [];
	for (let index = 0; index < streamCount; index++) {
		streams.push({ id: index, label: `Stream${index + 1}` });
	}
	return streams;
}

export const StreamingEnableChoices = [
	...SwitchChoices
]

export const StreamQualityChoices = [
	{ id: 0, label: 'low' },
	{ id: 1, label: 'medium' },
	{ id: 2, label: 'height' },
	{ id: 3, label: 'user defined' }
]

//playback
export function GetPlayerSourceChoices(state: StreamDeckState | undefined): DropdownChoice[] {
	let count = state ? state.device.playCount : 0;
	const players: DropdownChoice[] = [];
	for (let index = 0; index < count; index++) {
		// const element = array[index];
		players.push({ id: index, label: `Player${index + 1}` })
	}
	return players;
}
export const PlayBackEnableChoices = [
	...SwitchChoices
]

//Macro
export function getChoicesByMacro(): DropdownChoice[] {
	const Source: DropdownChoice[] = []
	for (let i = 0; i < 100; i++) {
		Source.push({ id: i, label: 'Macro' + (i + 1).toString() })
	}
	return Source
}


//MediaPlayer
export const MediaTypeChoice = [
	{ id: 0, label: 'Strill' },
	{ id: 1, label: 'Browser' },
]

//AutoSwitching
export const AutoSwitchingChoices = {
	...SwitchChoices
}
export const PeriodChoice = [
	{ id: 0, label: 'Fast' },
	{ id: 1, label: 'Normal' },
	{ id: 2, label: 'Slow' },
]
export const PriorityChoice = [
	{ id: 0, label: 'Low' },
	{ id: 1, label: 'Balance' },
	{ id: 2, label: 'Hight' },
]

//Mixeffect
export const TransitionStyleChoice = [
	{ id: EffectStyle.Mix, label: 'MIX' },
	{ id: EffectStyle.Dip, label: 'DIP' },
	{ id: EffectStyle.Wipe, label: 'WIPE' },
]
export const WipeDirectionChoices = [
	{ id: 0, label: 'Normal' },
	{ id: 1, label: 'Inverse' },
]

export const MixEfectSwitchChoices = {
	...SwitchChoices
}


//Key
export const KeySwitchChoices = [
	...SwitchChoices
]
export function GetKeyChoices(state: StreamDeckState | undefined): DropdownChoice[] {
	const keyCount = state ? state.device.keyCount : 0;
	const keys: DropdownChoice[] = [];
	for (let index = 0; index < keyCount; index++) {
		keys.push({ id: index, label: `Key${index + 1}` });
	}
	return keys;
}

export const KeyTypeChoices = [
	...KeyType
]

//DSK
export function GetDSKChoices(state: StreamDeckState | undefined): DropdownChoice[] {
	const keyCount = state ? state?.device.dskCount : 0;
	const keys: DropdownChoice[] = [];
	for (let index = 0; index < keyCount; index++) {
		keys.push({ id: index, label: `DSK${index + 1}` });
	}
	return keys;
}

export const DSKSwitchChoices = [
	...SwitchChoices
]

//Color Back
export const ColorSourceChoices = [
	...ColorSwitchChoices
]


//audioMix
export const AudioMixHeadphoneChoices = [
	{ id: 2301, label: 'Headphone' },
]

export const AudioMixSwitchTypeChoices = [
	{ id: 0, label: 'Hard Cut' },
	{ id: 1, label: 'Switch with effect' },
]

export const AudioMixSwichEnableChoices = {
	...SwitchChoices
}

export const AudioMixAFVChoices = [
	{ id: 0, label: 'Off' },
	{ id: 1, label: 'On' },
	{ id: 2, label: 'Afv' },
]



export const AudioSourcesEnableChoices = [
	...EnableChoices
]

//MultiSource:
export const MultiSourceEnableChoices = {
	...SwitchChoices
}

export function GetMultiSourceWindowChoices(state: StreamDeckState | undefined): DropdownChoice[] {
	const winCount = state ? state.device.multiSourceWindowCount : 0;
	const windows: DropdownChoice[] = [];
	for (let index = 0; index < winCount; index++) {
		windows.push({ id: index, label: `window${index + 1}` });
	}
	return windows;
}

export const MultiSourceStyleChoices = [
	{ id: 0, label: 'zoomOut' },
	{ id: 1, label: 'cropZoomOut' },
	{ id: 2, label: 'zoomOutCrop' },
	{ id: 3, label: 'crop' },
	{ id: 4, label: 'CropZoomOut2_3' },
	{ id: 5, label: 'ZoomOutCrop2_3' },
]


