
//Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransitionStyle = exports.SourceType = exports.variableId = exports.feedbackId = exports.ActionType = exports.ReqType = exports.ActionId = void 0;
var ActionId;
(function (ActionId) {
    ActionId["PgmIndex"] = "pgmIndex";
    ActionId["PvwIndex"] = "pvwIndex";
    //Transition
    ActionId["CutTransition"] = "cutTransition";
    ActionId["AutoTransition"] = "autoTransition";
    ActionId["FTB"] = "ftb";
    ActionId["FtbAudioAFV"] = "ftbAudioAFV";
    ActionId["FtbRate"] = "ftbRate";
    ActionId["Prev"] = "prev";
    ActionId["TransitionIndex"] = "transitionIndex";
    ActionId["TransitionRate"] = "transitionRate";
    ActionId["TransitionDipSource"] = "transitionDipSource";
    //TransitionWipePattern='transitionWipePattern',
    ActionId["TransitionWipeXPosition"] = "transitionWipeXPosition";
    ActionId["TransitionWipeYPosition"] = "transitionWipeYPosition";
    ActionId["TransitionWipeDirection"] = "transitionWipeDirection";
    ActionId["TransitionWipeSymmetry"] = "transitionWipeSymmetry";
    ActionId["TransitionWipeSoftness"] = "transitionWipeSoftness";
    ActionId["TransitionWipeBorder"] = "transitionWipeBorder";
    ActionId["TransitionWipeFillSource"] = "transitionWipeFillSource";
    ActionId["TransitionSourceBG"] = "transitionSourceBG";
    ActionId["TransitionSource"] = "transitionSource";
    //DSK
    ActionId["KeyOnAir"] = "keyOnAir";
    ActionId["DskOnAir"] = "dskOnAir";
    ActionId["DskSourceFillKey"] = "dskSourceFillKey";
    ActionId["DskSourceFill"] = "dskSourceFill";
    ActionId["DskSourceKey"] = "dskSourceKey";
    ActionId["DskMaskEnable"] = "dskMaskEnable";
    ActionId["DskMaskHStart"] = "dskMaskHStart";
    ActionId["DskMaskVStart"] = "dskMaskVStart";
    ActionId["DskMaskHEnd"] = "dskMaskHEnd";
    ActionId["DskMaskVEnd"] = "dskMaskVEnd";
    ActionId["DskControlShapedKey"] = "dskControlShapedKey";
    ActionId["DskControlClip"] = "dskControlClip";
    ActionId["DskControlGain"] = "dskControlGain";
    ActionId["DskControlInvert"] = "dskControlInvert";
    ActionId["DskRate"] = "dskRate";
    ActionId["ColorHue"] = "colorHue";
    ActionId["ColorSaturation"] = "colorSaturation";
    ActionId["ColorBrightness"] = "colorBrightness";
    //Super Source
    ActionId["SuperSourceEnable"] = "superSourceEnable";
    ActionId["SuperSourceSource1"] = "superSourceSource1";
    ActionId["SuperSourceSource2"] = "superSourceSource2";
    ActionId["SuperSourceBackground"] = "superSourceBackground";
    ActionId["SuperSourceControlStyle"] = "superSourceControlStyle";
    ActionId["SuperSourceControlYPosition"] = "superSourceControlYPosition";
    ActionId["SuperSourceMaskEnable"] = "superSourceMaskEnable";
    ActionId["SuperSourceMaskHStart"] = "superSourceMaskHStart";
    ActionId["SuperSourceMaskVStart"] = "superSourceMaskVStart";
    ActionId["SuperSourceMaskHEnd"] = "superSourceMaskHEnd";
    ActionId["SuperSourceMaskVEnd"] = "superSourceMaskVEnd";
    ActionId["SuperSourceBorderWidth"] = "superSourceBorderWidth";
    ActionId["SuperSourceBorderHue"] = "superSourceBorderHue";
    ActionId["SuperSourceBorderSaturation"] = "superSourceBorderSaturation";
    ActionId["SuperSourceBorderBrightness"] = "superSourceBorderBrightness";
    //UpStream Key
    ActionId["UpStreamKeyFillKeyType"] = "upStreamKeyFillKeyType";
    ActionId["UpStreamKeyType"] = "upStreamKeyType";
    ActionId["LumaKeySourceFill"] = "lumaKeySourceFill";
    ActionId["LumaKeySourceKey"] = "lumaKeySourceKey";
    ActionId["LumaKeyMaskEnable"] = "lumaKeyMaskEnable";
    ActionId["LumaKeyMaskHStart"] = "lumaKeyMaskHStart";
    ActionId["LumaKeyMaskVStart"] = "lumaKeyMaskVStart";
    ActionId["LumaKeyMaskHEnd"] = "lumaKeyMaskHEnd";
    ActionId["LumaKeyMaskVEnd"] = "lumaKeyMaskVEnd";
    ActionId["LumaKeyControlShapedKey"] = "lumaKeyControlShapedKey";
    ActionId["LumaKeyControlClip"] = "lumaKeyControlClip";
    ActionId["LumaKeyControlGain"] = "lumaKeyControlGain";
    ActionId["LumaKeyControlInvert"] = "lumaKeyControlInvert";
    ActionId["LumaKeyResizeEnable"] = "lumaKeyResizeEnable";
    ActionId["LumaKeyResizeSize"] = "lumaKeyResizeSize";
    ActionId["LumaKeyResizeXPosition"] = "lumaKeyResizeXPosition";
    ActionId["LumaKeyResizeYPosition"] = "lumaKeyResizeYPosition";
    ActionId["ChromaKeyFill"] = "chromaKeyFill";
    ActionId["ChromaKeyMaskEnable"] = "chromaKeyMaskEnable";
    ActionId["ChromaKeyMaskHStart"] = "chromaKeyMaskHStart";
    ActionId["ChromaKeyMaskVStart"] = "chromaKeyMaskVStart";
    ActionId["ChromaKeyMaskHEnd"] = "chromaKeyMaskHEnd";
    ActionId["ChromaKeyMaskVEnd"] = "chromaKeyMaskVEnd";
    ActionId["ChromaKeyResizeEnable"] = "chromaKeyResizeEnable";
    ActionId["ChromaKeyResizeSize"] = "chromaKeyResizeSize";
    ActionId["ChromaKeyResizeXPosition"] = "chromaKeyResizeXPosition";
    ActionId["ChromaKeyResizeYPosition"] = "chromaKeyResizeYPosition";
    ActionId["ChromaKeyControlSMPXPosition"] = "chromaKeyControlSMPXPosition";
    ActionId["ChromaKeyControlSMPYPosition"] = "chromaKeyControlSMPYPosition";
    ActionId["ChromaKeyControlSample"] = "chromaKeyControlSample";
    ActionId["ChromaKeyControlColor"] = "chromaKeyControlColor";
    ActionId["ChromaKeyControlForeground"] = "chromaKeyControlForeground";
    ActionId["ChromaKeyControlBackground"] = "chromaKeyControlBackground";
    ActionId["ChromaKeyControlKeyEdge"] = "chromaKeyControlKeyEdge";
    ActionId["KeyPatternSourceFill"] = "keyPatternSourceFill";
    ActionId["KeyPatternWipePattern"] = "keyPatternWipePattern";
    ActionId["KeyPatternWipeSize"] = "keyPatternWipeSize";
    ActionId["KeyPatternWipeXPosition"] = "keyPatternWipeXPosition";
    ActionId["KeyPatternWipeYPosition"] = "keyPatternWipeYPosition";
    ActionId["KeyPatternWipeSymmetry"] = "keyPatternWipeSymmetry";
    ActionId["KeyPatternWipeSoftness"] = "keyPatternWipeSoftness";
    ActionId["KeyPatternMaskEnable"] = "keyPatternMaskEnable";
    ActionId["KeyPatternMaskHStart"] = "keyPatternMaskHStart";
    ActionId["KeyPatternMaskVStart"] = "keyPatternMaskVStart";
    ActionId["KeyPatternMaskHEnd"] = "keyPatternMaskHEnd";
    ActionId["KeyPatternMaskVEnd"] = "keyPatternMaskVEnd";
    ActionId["KeyPatternResizeEnable"] = "keyPatternResizeEnable";
    ActionId["KeyPatternResizeSize"] = "keyPatternResizeSize";
    ActionId["KeyPatternResizeXPosition"] = "keyPatternResizeXPosition";
    ActionId["KeyPatternResizeYPosition"] = "keyPatternResizeYPosition";
    ActionId["PipSource"] = "pipSource";
    ActionId["PipSize"] = "pipSize";
    ActionId["PipXPosition"] = "pipXPosition";
    ActionId["PipYPosition"] = "pipYPosition";
    ActionId["PipMaskEnable"] = "pipMaskEnable";
    ActionId["PipMaskHStart"] = "pipMaskHStart";
    ActionId["PipMaskVStart"] = "pipMaskVStart";
    ActionId["PipMaskHEnd"] = "pipMaskHEnd";
    ActionId["PipMaskVEnd"] = "pipMaskVEnd";
    ActionId["PipBorderEnable"] = "pipBorderEnable";
    ActionId["PipBorderWidth"] = "pipBorderWidth";
    ActionId["PipBorderHue"] = "pipBorderHue";
    ActionId["PipBorderSaturation"] = "pipBorderSaturation";
    ActionId["PipBorderBrightness"] = "pipBorderBrightness";
    //Audio Mixer
    ActionId["AudioTransition"] = "audioTransition";
    ActionId["AudioFader"] = "audioFader";
    ActionId["AudioBalance"] = "audioBalance";
    ActionId["AudioInput"] = "audioInput";
    ActionId["AudioEnable"] = "audioEnable";
    ActionId["AudioEnable1"] = "audioEnable1";
    ActionId["AudioDelay"] = "audioDelay";
    ActionId["AudioMonitorLevel"] = "audioMonitorLevel";
    ActionId["AudioMonitorSource"] = "audioMonitorSource";
    //Still Generator
    ActionId["StillSelection"] = "stillSelection";
    ActionId["StillRemove"] = "stillRemove";
    ActionId["StillLoadIndex"] = "stillLoadIndex";
    ActionId["StillLoadImage"] = "stillLoadImage";
    //Macro
    ActionId["MacroRecord"] = "macroRecord";
    ActionId["MacroInfo"] = "macroInfo";
    ActionId["GetMacroInfoAll"] = "getMacroInfoAll";
    ActionId["MacroRun"] = "macroRun";
    ActionId["RemoveMacro"] = "removeMacro";
    ActionId["MacroSleep"] = "macroSleep";
    //Streaming
    ActionId["StreamOutput"] = "streamOutput";
    ActionId["StreamPlatform"] = "streamPlatform";
    ActionId["StreamServer"] = "streamServer";
    ActionId["StreamUrl"] = "streamUrl";
    //Playback
    ActionId["PlayModeRepeatPause"] = "playModeRepeatPause";
    ActionId["PlaybackMode"] = "playbackMode";
    ActionId["PlaybackRepeat"] = "playbackRepeat";
    ActionId["PlaybackPause"] = "playbackPause";
    ActionId["PlaybackBar"] = "playbackBar";
    ActionId["PlayFile"] = "playFile";
    ActionId["PlaybackList"] = "playbackList";
    //Settings
    ActionId["SrcName"] = "srcName";
    ActionId["MvMeter"] = "mvMeter";
    ActionId["MvLayout"] = "mvLayout";
    ActionId["Marker"] = "marker";
    ActionId["MicInput"] = "micInput";
    ActionId["RecordFileName"] = "recordFileName";
    ActionId["SrcSelection"] = "srcSelection";
    ActionId["AuxSource"] = "auxSource";
    ActionId["OutFormat"] = "outFormat";
    ActionId["OutputColorSpace"] = "outputColorSpace";
    ActionId["OutSource"] = "outSource";
    ActionId["NetworkProtocol"] = "networkProtocol";
    ActionId["NetworkIpAddress"] = "networkIpAddress";
    ActionId["NetworkSubnetMask"] = "networkSubnetMask";
    ActionId["NetworkGateway"] = "networkGateway";
    ActionId["NetworkPrimaryDNS"] = "networkPrimaryDNS";
    ActionId["NetworkSecondaryDNS"] = "networkSecondaryDNS";
    ActionId["Quality"] = "quality";
    ActionId["Panel"] = "panel";
    ActionId["SdFormat"] = "sdFormat";
    ActionId["SystemReset"] = "systemReset";
    ActionId["Record"] = "record";
    ActionId["RecordStatus"] = "recordStatus";
    ActionId["RecordTime"] = "recordTime";
    ActionId["SdCardStatus"] = "sdCardStatus";
    ActionId["SdFree"] = "sdFree";
    ActionId["Live"] = "live";
    ActionId["LiveStatus"] = "liveStatus";
    ActionId["LiveInfo"] = "liveInfo";
})(ActionId = exports.ActionId || (exports.ActionId = {}));
var ReqType;
(function (ReqType) {
    ReqType["Get"] = "get";
    ReqType["Set"] = "set";
    ReqType["Push"] = "pus";
})(ReqType = exports.ReqType || (exports.ReqType = {}));
var ActionType;
(function (ActionType) {
    ActionType[ActionType["Unknown"] = 0] = "Unknown";
    ActionType[ActionType["Heart"] = 1] = "Heart";
    ActionType[ActionType["Program"] = 2] = "Program";
    ActionType[ActionType["Preview"] = 3] = "Preview";
    ActionType[ActionType["TransitionStyle"] = 4] = "TransitionStyle";
    ActionType["TransitionDipSource"] = "5";
    ActionType["TransitionWipeFillSource"] = "6";
    ActionType["DskSourceFill"] = "7";
    ActionType["SuperSourceSource"] = "8";
    ActionType["LumaKeySourceKey"] = "9";
    ActionType["ChromaKeySourceKey"] = "10";
    ActionType["KeyPatternSourceKey"] = "11";
    ActionType["PipSource"] = "12";
    ActionType["AudioFader"] = "13";
    ActionType["AudioMonitorSource"] = "14";
    ActionType["SettingsoutSource"] = "15";
    ActionType["AudioEnable"] = "16";
    ActionType["AudioEnableSource"] = "17";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
var feedbackId;
(function (feedbackId) {
    feedbackId["PreviewBG"] = "preview_bg";
    feedbackId["PreviewBG2"] = "preview_bg_2";
    feedbackId["PreviewBG3"] = "preview_bg_3";
    feedbackId["PreviewBG4"] = "preview_bg_4";
    feedbackId["ProgramBG"] = "program_bg";
    feedbackId["ProgramBG2"] = "program_bg_2";
    feedbackId["ProgramBG3"] = "program_bg_3";
    feedbackId["ProgramBG4"] = "program_bg_4";
    feedbackId["TransitionStyle"] = "TransitionStyle";
    feedbackId["InTransition"] = "inTransition";
    feedbackId["Cut"] = "cut";
    feedbackId["Prev"] = "prev";
    feedbackId["TransitionRate"] = "transitionRate";
    feedbackId["TransitionKeySwitch"] = "transitionKeySwitch";
    feedbackId["TransitionSelection"] = "transitionSelection";
    feedbackId["KeyOnAir"] = "keyOnAir";
    feedbackId["DskOnAir"] = "dskOnAir";
    feedbackId["SettingOutSource"] = "settingOutSource";
    feedbackId["Macro"] = "macro";
    feedbackId["Still"] = "still";
    feedbackId["FadeToBlackIsBlack"] = "fadeToBlackIsBlack";
    feedbackId["FadeToBlackRate"] = "fadeToBlackRate";
    feedbackId["FTBAFV"] = "FTBAFV";
    feedbackId["AuxBG"] = "auxBG";
    feedbackId["UpStreamKeyType"] = "upStreamKeyType";
    feedbackId["DskSourceFill"] = "dskSourceFill";
    feedbackId["KeySourceFill"] = "keySourceFill";
    feedbackId["SuperSourceEnable"] = "superSourceEnable";
    feedbackId["SuperSourceSelect"] = "superSourceSelect";
    feedbackId["SuperSourceControlStyle"] = "superSourceControlStyle";
    feedbackId["SuperSourceMask"] = "superSourceMask";
    //AudioMixer
    feedbackId["AudioEnable"] = "audioEnable";
    feedbackId["AudioTransition"] = "audioTransition";
    //Streamming
    feedbackId["StreamOutput"] = "streamOutput";
    //Playback
    feedbackId["PlaybackMode"] = "playbackMode";
    feedbackId["PlaybackRepeat"] = "playbackRepeat";
    feedbackId["PlaybackPause"] = "playbackPause";
    feedbackId["PlaybackBar"] = "playbackBar";
    feedbackId["PlayFile"] = "playFile";
    //Record
    feedbackId["Record"] = "record";
    //Live
    feedbackId["Live"] = "live";
})(feedbackId = exports.feedbackId || (exports.feedbackId = {}));
var variableId;
(function (variableId) {
    variableId["PlayState"] = "playState";
    variableId["Clock"] = "clock";
    variableId["TimerStart"] = "timer_start";
    variableId["TimerFinish"] = "timer_finish";
    variableId["TimerDelay"] = "timer_delay";
    variableId["Time"] = "time";
    variableId["TimeHM"] = "time_hm";
    variableId["TimeH"] = "time_h";
    variableId["TimeM"] = "time_m";
    variableId["TimeS"] = "time_s";
    variableId["TitleNow"] = "titleNow";
    variableId["SubtitleNow"] = "subtitleNow";
    variableId["SpeakerNow"] = "speakerNow";
    variableId["NoteNow"] = "noteNow";
    variableId["TitleNext"] = "titleNext";
    variableId["SubtitleNext"] = "subtitleNext";
    variableId["SpeakerNext"] = "speakerNext";
    variableId["NoteNext"] = "noteNext";
    variableId["OnAir"] = "onAir";
    variableId["SpeakerMessage"] = "speakerMessage";
    variableId["PublicMessage"] = "publicMessage";
    variableId["LowerMessage"] = "lowerMessage";
})(variableId = exports.variableId || (exports.variableId = {}));
var SourceType;
(function (SourceType) {
    SourceType[SourceType["Input1"] = 0] = "Input1";
    SourceType[SourceType["Input2"] = 1] = "Input2";
    SourceType[SourceType["Input3"] = 2] = "Input3";
    SourceType[SourceType["Input4"] = 3] = "Input4";
    SourceType[SourceType["Aux"] = 4] = "Aux";
})(SourceType = exports.SourceType || (exports.SourceType = {}));
var TransitionStyle;
(function (TransitionStyle) {
    TransitionStyle[TransitionStyle["MIX"] = 0] = "MIX";
    TransitionStyle[TransitionStyle["DIP"] = 1] = "DIP";
    TransitionStyle[TransitionStyle["WIPE"] = 2] = "WIPE";
})(TransitionStyle = exports.TransitionStyle || (exports.TransitionStyle = {}));
//# sourceMappingURL=enums.js.map

//# sourceURL=webpack://osee-gostreamdeck/./dist/enums.js?
