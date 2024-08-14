import { DropdownChoice } from '@companion-module/base'
import { TransitionStyle } from './enums'
import { InputChannel } from './state'

export const SourceModels: InputChannel[] = [
    { inputId: 0, longName: 'Input1', shortName: 'In1' },
    { inputId: 1, longName: 'Input2' , shortName: 'In2'},
    { inputId: 2, longName: 'Input3', shortName: 'In3' },
    { inputId: 3, longName: 'Input4' , shortName: 'In4'},
]

export const OtherSourceModels: InputChannel[] = [
    { inputId: 4, longName: 'Aux', shortName: 'Aux' },
    { inputId: 5, longName: 'Still1' , shortName: 'STL1'},
    { inputId: 6, longName: 'Still2' , shortName: 'STL2'},
    { inputId: 7, longName: 'Black' , shortName: 'BLK'},
]

export const OtherDSKSourceModels: InputChannel[] = [
    { inputId: 4, longName: 'Aux' , shortName: 'Aux'},
    { inputId: 5, longName: 'Still1' , shortName: 'STL1'},
    { inputId: 6, longName: 'Still1 Key' , shortName: 'STL1 Key'},
    { inputId: 7, longName: 'Still2' , shortName: 'STL2'},
    { inputId: 8, longName: 'Still2 Key', shortName: 'STL2 Key' },
    { inputId: 9, longName: 'Color1' , shortName: 'Col1'},
    { inputId: 10, longName: 'Color2' , shortName: 'Col2'},
    { inputId: 11, longName: 'Color Bar' , shortName: 'Bar'},
    { inputId: 10, longName: 'Black' , shortName: 'BLK'},
]
export const OtherDipSourceModels: InputChannel[] = [
    { inputId: 4, longName: 'Aux', shortName: 'Aux' },
    { inputId: 5, longName: 'Black' , shortName: 'BLK'},
    { inputId: 6, longName: 'Still1' , shortName: 'STL1'},
    { inputId: 7, longName: 'Still2', shortName: 'STL2' },
    { inputId: 8, longName: 'Color1' , shortName: 'Col1'},
    { inputId: 9, longName: 'Color2' , shortName: 'Col2'},
    { inputId: 10, longName: 'Color Bar', shortName: 'Bar' },
]

export const TransitionStyleChoice: DropdownChoice[] = [
    { id: TransitionStyle.MIX, label: 'MIX' },
    { id: TransitionStyle.DIP, label: 'DIP' },
    { id: TransitionStyle.WIPE, label: 'WIPE' }
]

export const SwitchChoices: DropdownChoice[] = [
    { id: '0', label: 'Close' },
    { id: '1', label: 'Open' }
]

export const WipeDirectionChoices: DropdownChoice[] = [
    { id: '0', label: 'Normal' },
    { id: '1', label: 'Inverse' }
]

export const KeySwitchChoices: DropdownChoice[] = [
    { id: '0', label: 'Key' },
    { id: '1', label: 'DSK' },
    { id: '2', label: 'BKGD' }
]

export const ColorSwitchChoices: DropdownChoice[] = [
    { id: '0', label: 'Color1' },
    { id: '1', label: 'Color2' },
]

export const SuperSourceStyleChoices: DropdownChoice[] = [
    { id: '0', label: 'zoom in' },
    { id: '1', label: 'crop-zoom in' },
    { id: '2', label: 'crop' },
]
export const SuperSourceMaskChoices: DropdownChoice[] = [
    { id: '0', label: 'mask1' },
    { id: '1', label: 'mask2' },
]
export const SuperSourceBorderChoices: DropdownChoice[] = [
    { id: '0', label: 'border1' },
    { id: '1', label: 'border2' },
]
export const UpStreamKeyTypeChoices: DropdownChoice[] = [
    { id: '0', label: 'Luma Key' },
    { id: '1', label: 'Chroma Key' },
    { id: '2', label: 'Pattern' },
    { id: '3', label: 'PIP' },
]
export const KeyResizeSizeChoices: DropdownChoice[] = [
    { id: '0', label: '0.25' },
    { id: '1', label: '0.33' },
    { id: '2', label: '0.50' },
]

export const AudioMicChoices: DropdownChoice[] = [
    { id: '0', label: 'mic1' },
    { id: '1', label: 'mic2' },
]

export const AudioSourcesChoices: DropdownChoice[] = [
    { id: '0', label: 'mic1' },
    { id: '1', label: 'mic2' },
    { id: '2', label: 'in1' },
    { id: '3', label: 'in2' },
    { id: '4', label: 'in3' },
    { id: '5', label: 'in4' },
    { id: '6', label: 'aux' },
]
export const OtherAudioSourcesChoices: DropdownChoice[] = [
    { id: '7', label: 'pgm' },
]

export const AudioSourcesEnableChoices: DropdownChoice[] = [
    { id: '0', label: 'off' },
    { id: '1', label: 'on' },
]
export const OtherAudioSourcesEnableChoices: DropdownChoice[] = [
    { id: '2', label: 'afv' },
]

export const StreamingChoices: DropdownChoice[] = [
    { id: '0', label: 'Stream1' },
    { id: '1', label: 'Stream2' },
    { id: '1', label: 'Stream3' },
]

export const SettingsUMDSrcChoices: DropdownChoice[] = [
    { id: '0', label: 'pgm' },
    { id: '1', label: 'pvw' },
    { id: '2', label: 'in1' },
    { id: '3', label: 'in2' },
    { id: '4', label: 'in3' },
    { id: '5', label: 'in4' },
    { id: '6', label: 'aux' },
    { id: '7', label: 'still 1' },
    { id: '8', label: 'still 2' },
]
export const SettingsMvMeterChoices: DropdownChoice[] = [
    { id: '0', label: 'pgm' },
    { id: '1', label: 'in1' },
    { id: '2', label: 'in2' },
    { id: '3', label: 'in3' },
    { id: '4', label: 'in4' },
    { id: '5', label: 'aux' },
]
export const SettingsMvLayoutChoices: DropdownChoice[] = [
    { id: '0', label: 'PGM|PVW' },
    { id: '1', label: 'PVW|PGM' },
]

export const SettingsMicInputChoices: DropdownChoice[] = [
    { id: '0', label: 'mic+power' },
    { id: '1', label: 'mic' },
    { id: '2', label: 'line' },
]
export const SettingsColorChoices: DropdownChoice[] = [
    { id: '0', label: 'auto' },
    { id: '1', label: 'rgb full' },
    { id: '2', label: 'rgb limit' },
    { id: '3', label: 'ycbcr422 full' },
    { id: '4', label: 'ycbcr422 limit' },
    { id: '5', label: 'ycbcr444 full' },
    { id: '6', label: 'ycbcr444 limit' },
]
export const SettingsAuxSourceChoices: DropdownChoice[] = [
    //0~2，sd card,usb camera,ndi
    { id: '0', label: 'sd card' },
    { id: '1', label: 'usb camera' },
    { id: '2', label: 'ndi' },
]

export const SettingsOutFormatChoices: DropdownChoice[] = [
    //0~4，1080p24,1080p25,1080p30,
    { id: '0', label: '1080p24' },
    { id: '1', label: '1080p25' },
    { id: '2', label: '1080p30' },
    { id: '3', label: '1080p50' },
    { id: '4', label: '1080p60' },
]

export const SettingsOutSourceParamChoices: DropdownChoice[] = [
    //0~4，1080p24,1080p25,1080p30,
    {id:'0',label:'HDMI1'},
    //{id:'1',label:'HDMI2'},
    {id:'2',label:'UVC'}
]

export const SettingsOutSourceChoices: DropdownChoice[] = [
    //0~4，1080p24,1080p25,1080p30,
    { id: '4', label: 'aux' },
    { id: '5', label: 'pgm' },
    { id: '6', label: 'pvw' },
    { id: '7', label: 'multiview' },
]

