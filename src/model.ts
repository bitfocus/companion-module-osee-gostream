import { TransitionStyle } from './enums'

export const SourceModels = [
	{ inputId: 0, longName: 'Input1', shortName: 'In1' },
	{ inputId: 1, longName: 'Input2', shortName: 'In2' },
	{ inputId: 2, longName: 'Input3', shortName: 'In3' },
	{ inputId: 3, longName: 'Input4', shortName: 'In4' },
]
export const OtherSourceModels = [
	{ inputId: 4, longName: 'Aux', shortName: 'Aux' },
	{ inputId: 5, longName: 'S/SRC', shortName: 'SSRC' },
	{ inputId: 6, longName: 'Still1', shortName: 'STL1' },
	{ inputId: 7, longName: 'Still2', shortName: 'STL2' },
]
export const OtherDSKSourceModels = [
	{ inputId: 4, longName: 'Aux', shortName: 'Aux' },
	{ inputId: 5, longName: 'Still1', shortName: 'STL1' },
	{ inputId: 6, longName: 'Still1 Key', shortName: 'STL1 Key' },
	{ inputId: 7, longName: 'Still2', shortName: 'STL2' },
	{ inputId: 8, longName: 'Still2 Key', shortName: 'STL2 Key' },
	{ inputId: 9, longName: 'Color1', shortName: 'Col1' },
	{ inputId: 10, longName: 'Color2', shortName: 'Col2' },
	{ inputId: 11, longName: 'Color Bar', shortName: 'Bar' },
	{ inputId: 12, longName: 'Black', shortName: 'BLK' },
]
export const OtherDipSourceModels = [
	{ inputId: 4, longName: 'Aux', shortName: 'Aux' },
	{ inputId: 5, longName: 'Black', shortName: 'BLK' },
	{ inputId: 6, longName: 'Still1', shortName: 'STL1' },
	{ inputId: 7, longName: 'Still2', shortName: 'STL2' },
	{ inputId: 8, longName: 'Color1', shortName: 'Col1' },
	{ inputId: 9, longName: 'Color2', shortName: 'Col2' },
	{ inputId: 10, longName: 'Color Bar', shortName: 'Bar' },
]
export const TransitionStyleChoice = [
	{ id: TransitionStyle.MIX, label: 'MIX' },
	{ id: TransitionStyle.DIP, label: 'DIP' },
	{ id: TransitionStyle.WIPE, label: 'WIPE' },
	{ id: TransitionStyle.CUT, label: 'CUT' },
	{ id: TransitionStyle.FTB, label: 'FTB' },
]
export const SwitchChoices = [
	{ id: 0, label: 'Off' },
	{ id: 1, label: 'On' },
	{ id: 2, label: 'Toggle' },
]
export const WipeDirectionChoices = [
	{ id: 0, label: 'Normal' },
	{ id: 1, label: 'Inverse' },
]
export const SuperSourceChoices = [
	{ id: 0, label: 'Source 1' },
	{ id: 1, label: 'Source 2' },
	{ id: 2, label: 'Background' },
]
export const ColorSwitchChoices = [
	{ id: 0, label: 'Color1' },
	{ id: 1, label: 'Color2' },
]
export const SuperSourceStyleChoices = [
	{ id: 0, label: 'zoom out' },
	{ id: 1, label: 'crop-zoom out' },
	{ id: 2, label: 'zoom out-crop' },
	{ id: 3, label: 'crop' },
]
export const SuperSourceMaskChoices = [
	{ id: 0, label: 'mask1' },
	{ id: 1, label: 'mask2' },
]
export const SuperSourceBorderChoices = [
	{ id: 0, label: 'border1' },
	{ id: 1, label: 'border2' },
]
export const UpStreamKeyTypeChoices = [
	{ id: 0, label: 'Luma Key' },
	{ id: 1, label: 'Chroma Key' },
	{ id: 2, label: 'Pattern' },
	{ id: 3, label: 'PIP' },
]
export const KeyResizeSizeChoices = [
	{ id: 0, label: '0.25' },
	{ id: 1, label: '0.33' },
	{ id: 2, label: '0.50' },
]
export const AudioMicChoices = [
	{ id: 0, label: 'mic1' },
	{ id: 1, label: 'mic2' },
]
export const AudioInputSourcesChoices = [
	{ id: 2, label: 'in1' },
	{ id: 3, label: 'in2' },
	{ id: 4, label: 'in3' },
	{ id: 5, label: 'in4' },
	{ id: 6, label: 'aux' },
]
export const AudioSourcesEnableChoices = [
	{ id: 0, label: 'off' },
	{ id: 1, label: 'on' },
]
export const OtherAudioSourcesEnableChoices = [{ id: 2, label: 'afv' }]
export const HeadphoneSourceChoices = [
	{ id: 5, label: 'mic1' },
	{ id: 6, label: 'mic2' },
	{ id: 0, label: 'in1' },
	{ id: 1, label: 'in2' },
	{ id: 2, label: 'in3' },
	{ id: 3, label: 'in4' },
	{ id: 4, label: 'aux' },
	{ id: 7, label: 'pgm' },
]
export const StreamingChoices = [
	{ id: 0, label: 'Stream1' },
	{ id: 1, label: 'Stream2' },
	{ id: 2, label: 'Stream3' },
]
export const SettingsUMDSrcChoices = [
	{ id: 0, label: 'pgm' },
	{ id: 1, label: 'pvw' },
	{ id: 2, label: 'in1' },
	{ id: 3, label: 'in2' },
	{ id: 4, label: 'in3' },
	{ id: 5, label: 'in4' },
	{ id: 6, label: 'aux' },
	{ id: 7, label: 'still 1' },
	{ id: 8, label: 'still 2' },
]
export const SettingsMvMeterChoices = [
	{ id: 0, label: 'pgm' },
	{ id: 1, label: 'in1' },
	{ id: 2, label: 'in2' },
	{ id: 3, label: 'in3' },
	{ id: 4, label: 'in4' },
	{ id: 5, label: 'aux' },
]
export const SettingsMvLayoutChoices = [
	{ id: 0, label: 'PVW|PGM' },
	{ id: 1, label: 'PGM|PVW' },
]
export const SettingsInputWindowLayoutChoices = [
	{ id: 0, label: 'Style 1' },
	{ id: 1, label: 'Style 2' },
]
export const SettingsMic1InputChoices = [
	{ id: 0, label: 'Mic+power' },
	{ id: 1, label: 'Mic' },
	{ id: 2, label: 'Line' },
]
export const SettingsMic2InputChoices = [
	{ id: 0, label: 'Mic' },
	{ id: 1, label: 'Line' },
]
export const SettingsColorChoices = [
	{ id: 0, label: 'HDMI Auto' },
	{ id: 1, label: 'HDMI RGB Full' },
	{ id: 2, label: 'HDMI RGB Limit' },
	{ id: 3, label: 'HDMI YC422 Full' },
	{ id: 4, label: 'HDMI YC422 Limit' },
	{ id: 5, label: 'HDMI YC444 Full' },
	{ id: 6, label: 'HDMI YC444 Limit' },
]
export const SettingsAuxSourceChoices = [
	//0~2，sd card,usb camera,ndi
	{ id: 0, label: 'Player' },
	{ id: 1, label: 'USB Camera' },
	{ id: 2, label: 'NDI' },
]
export const SettingsOutFormatChoices = [
	{ id: 0, label: '1080p23.98' },
	{ id: 1, label: '1080p24' },
	{ id: 2, label: '1080p25' },
	{ id: 3, label: '1080p29.97' },
	{ id: 4, label: '1080p30' },
	{ id: 5, label: '1080p50' },
	{ id: 6, label: '1080p59.94' },
	{ id: 7, label: '1080p60' },
]
export const SettingsOutSourceParamChoices = [
	{ id: 0, label: 'HDMI1' },
	{ id: 1, label: 'HDMI2' },
	{ id: 2, label: 'UVC' },
]
export const SettingsOutSourceChoices = [
	//0~4，1080p24,1080p25,1080p30,
	{ id: 4, label: 'aux' },
	{ id: 5, label: 'pgm' },
	{ id: 6, label: 'pvw' },
	{ id: 7, label: 'multiview' },
]
