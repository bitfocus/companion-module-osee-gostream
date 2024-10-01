
exports.SettingsOutSourceChoices = exports.SettingsOutSourceParamChoices = exports.SettingsOutFormatChoices = exports.SettingsAuxSourceChoices = exports.SettingsColorChoices = exports.SettingsMicInputChoices = exports.SettingsMvLayoutChoices = exports.SettingsInputWindowLayoutChoices = exports.SettingsMvMeterChoices = exports.SettingsUMDSrcChoices = exports.StreamingChoices = exports.OtherAudioSourcesEnableChoices = exports.AudioSourcesEnableChoices = exports.OtherAudioSourcesChoices = exports.AudioInputSourcesChoices = exports.AudioMicChoices = exports.KeyResizeSizeChoices = exports.UpStreamKeyTypeChoices = exports.SuperSourceBorderChoices = exports.SuperSourceMaskChoices = exports.SuperSourceStyleChoices = exports.ColorSwitchChoices = exports.KeySwitchChoices = exports.WipeDirectionChoices = exports.SwitchChoices = exports.TransitionStyleChoice = exports.OtherDipSourceModels = exports.OtherDSKSourceModels = exports.OtherSourceModels = exports.SourceModels = void 0;
const enums_1 = require(/*! ./enums */ "./enums.js");
exports.SourceModels = [
    { inputId: 0, longName: 'Input1', shortName: 'In1' },
    { inputId: 1, longName: 'Input2', shortName: 'In2' },
    { inputId: 2, longName: 'Input3', shortName: 'In3' },
    { inputId: 3, longName: 'Input4', shortName: 'In4' },
];
exports.OtherSourceModels = [
    { inputId: 4, longName: 'Aux', shortName: 'Aux' },
    { inputId: 5, longName: 'S/SRC', shortName: 'SSRC' },
    { inputId: 6, longName: 'Still1', shortName: 'STL1' },
    { inputId: 7, longName: 'Still2', shortName: 'STL2' },
];
exports.OtherDSKSourceModels = [
    { inputId: 4, longName: 'Aux', shortName: 'Aux' },
    { inputId: 5, longName: 'Still1', shortName: 'STL1' },
    { inputId: 6, longName: 'Still1 Key', shortName: 'STL1 Key' },
    { inputId: 7, longName: 'Still2', shortName: 'STL2' },
    { inputId: 8, longName: 'Still2 Key', shortName: 'STL2 Key' },
    { inputId: 9, longName: 'Color1', shortName: 'Col1' },
    { inputId: 10, longName: 'Color2', shortName: 'Col2' },
    { inputId: 11, longName: 'Color Bar', shortName: 'Bar' },
    { inputId: 12, longName: 'Black', shortName: 'BLK' },
];
exports.OtherDipSourceModels = [
    { inputId: 4, longName: 'Aux', shortName: 'Aux' },
    { inputId: 5, longName: 'Black', shortName: 'BLK' },
    { inputId: 6, longName: 'Still1', shortName: 'STL1' },
    { inputId: 7, longName: 'Still2', shortName: 'STL2' },
    { inputId: 8, longName: 'Color1', shortName: 'Col1' },
    { inputId: 9, longName: 'Color2', shortName: 'Col2' },
    { inputId: 10, longName: 'Color Bar', shortName: 'Bar' },
];
exports.TransitionStyleChoice = [
    { id: enums_1.TransitionStyle.MIX, label: 'MIX' },
    { id: enums_1.TransitionStyle.DIP, label: 'DIP' },
    { id: enums_1.TransitionStyle.WIPE, label: 'WIPE' }
];
exports.SwitchChoices = [
    { id: 0, label: 'Off' },
    { id: 1, label: 'On' },
    { id: 2, label: 'Toggle' }
];
exports.WipeDirectionChoices = [
    { id: 0, label: 'Normal' },
    { id: 1, label: 'Inverse' }
];
exports.KeySwitchChoices = [
    { id: 0, label: 'Key' },
    { id: 1, label: 'DSK' },
    { id: 2, label: 'BKGD' }
];
exports.ColorSwitchChoices = [
    { id: 0, label: 'Color1' },
    { id: 1, label: 'Color2' },
];
exports.SuperSourceStyleChoices = [
    { id: 0, label: 'zoom out' },
    { id: 1, label: 'crop-zoom out' },
    { id: 2, label: 'zoom out-crop' },
    { id: 3, label: 'crop' }
];
exports.SuperSourceMaskChoices = [
    { id: 0, label: 'mask1' },
    { id: 1, label: 'mask2' },
];
exports.SuperSourceBorderChoices = [
    { id: 0, label: 'border1' },
    { id: 1, label: 'border2' },
];
exports.UpStreamKeyTypeChoices = [
    { id: 0, label: 'Luma Key' },
    { id: 1, label: 'Chroma Key' },
    { id: 2, label: 'Pattern' },
    { id: 3, label: 'PIP' },
];
exports.KeyResizeSizeChoices = [
    { id: 0, label: '0.25' },
    { id: 1, label: '0.33' },
    { id: 2, label: '0.50' },
];
exports.AudioMicChoices = [
    { id: 0, label: 'mic1' },
    { id: 1, label: 'mic2' },
];
exports.AudioInputSourcesChoices = [
    { id: 2, label: 'in1' },
    { id: 3, label: 'in2' },
    { id: 4, label: 'in3' },
    { id: 5, label: 'in4' },
    { id: 6, label: 'aux' },
];
exports.OtherAudioSourcesChoices = [
    { id: 7, label: 'pgm' },
];
exports.AudioSourcesEnableChoices = [
    { id: 0, label: 'off' },
    { id: 1, label: 'on' },
];
exports.OtherAudioSourcesEnableChoices = [
    { id: 2, label: 'afv' },
];
exports.StreamingChoices = [
    { id: 0, label: 'Stream1' },
    { id: 1, label: 'Stream2' },
    { id: 2, label: 'Stream3' },
];
exports.SettingsUMDSrcChoices = [
    { id: 0, label: 'pgm' },
    { id: 1, label: 'pvw' },
    { id: 2, label: 'in1' },
    { id: 3, label: 'in2' },
    { id: 4, label: 'in3' },
    { id: 5, label: 'in4' },
    { id: 6, label: 'aux' },
    { id: 7, label: 'still 1' },
    { id: 8, label: 'still 2' },
];
exports.SettingsMvMeterChoices = [
    { id: 0, label: 'pgm' },
    { id: 1, label: 'in1' },
    { id: 2, label: 'in2' },
    { id: 3, label: 'in3' },
    { id: 4, label: 'in4' },
    { id: 5, label: 'aux' },
];
exports.SettingsMvLayoutChoices = [
    { id: 0, label: 'PGM|PVW' },
    { id: 1, label: 'PVW|PGM' },
];
exports.SettingsInputWindowLayoutChoices = [
    { id: 0, label: 'Style 1' },
    {id: 1,label:'Style 2'},
];
exports.SettingsMicInputChoices = [
    { id: 0, label: 'mic+power' },
    { id: 1, label: 'mic' },
    { id: 2, label: 'line' },
];
exports.SettingsColorChoices = [
    { id: 0, label: 'auto' },
    { id: 1, label: 'rgb full' },
    { id: 2, label: 'rgb limit' },
    { id: 3, label: 'ycbcr422 full' },
    { id: 4, label: 'ycbcr422 limit' },
    { id: 5, label: 'ycbcr444 full' },
    { id: 6, label: 'ycbcr444 limit' },
];
exports.SettingsAuxSourceChoices = [
    //0~2，sd card,usb camera,ndi
    { id: 0, label: 'sd card' },
    { id: 1, label: 'usb camera' },
    { id: 2, label: 'ndi' },
];
exports.SettingsOutFormatChoices = [
    { id: 0, label: '1080p23.98'},
    { id: 1, label: '1080p24' },
    { id: 2, label: '1080p25' },
    { id: 3, label: '1080p29.97' },
    { id: 4, label: '1080p30' },
    { id: 5, label: '1080p50' },
    { id: 6, label: '1080p59.94' },
    { id: 7, label: '1080p60' },
];
exports.SettingsOutSourceParamChoices = [
    { id: 0, label: 'HDMI1' },
    {id: 1,label:'HDMI2'},
    { id: 2, label: 'UVC' }
];
exports.SettingsOutSourceChoices = [
    //0~4，1080p24,1080p25,1080p30,
    { id: 4, label: 'aux' },
    { id: 5, label: 'pgm' },
    { id: 6, label: 'pvw' },
    { id: 7, label: 'multiview' },
];
//# sourceMappingURL=model.js.map

//# sourceURL=webpack://osee-gostreamdeck/./dist/model.js?
