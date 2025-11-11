import { StreamDeckState } from ".";
import { 
    AudioFadeSwitching, 
    EffectStyle, 
    inputModeType, 
    LiveStatus, 
    Model, 
    Period, 
    Priority, 
    recodingFormat,
    recodingQuality, 
    sourceID, 
    WipeDirection
} from "../enums";

export function Create(): StreamDeckState {
	return {
		device: {
            fwVersion: '',
            buildInfo: '',
            deviceID: '',
            deviceName: '',
            deviceModel:Model.Deck,
            
            inputSources:[],
            audioMixSources:[],

            multiSourceWindowCount:0,
            keyCount:0,
            dskCount:0,
            playCount:0,
            micSources:[],

            colorBackCount:0,
            mediaCount:0, 
            streamCount:0,
        
            RecordISOChannels:[],
        
            VideoOutSources:[],
            AudioOutSources:[],
            OutPutColorSpaceSources:[],
            InputColorSpaceSources:[],
        },
        audioSwitching:{
            enable: false,
            ASources:[],
            BSources:[],
            AMapSources:[],
            BMapSources:[],
            ABMapSources:[],
        
            A:{
                threshold:0,
                selectSource:sourceID.IN1,
            },
            B:{
                threshold:0,
                selectSource:sourceID.IN1,
            },
        
            video:{
                AMapSelectSource:sourceID.IN1,
                BMapSelectSource:sourceID.IN1,
                ABMapSelectSource:sourceID.IN1,
                Period:Period.Normal,
                ABPriority:Priority.Balance,
            }
        },
        audioMixer: {
            HeadphoneSources:[],
            commonChannels:[],
            audioFade:AudioFadeSwitching.HardCut,
            micChannels:[],
        },
        colorBack:{
            colorBacks:[],
        },
        downStreamKey:{
            FillSources: [],
            KeySources: [],
            DSKS: {
                [sourceID.IN1]:undefined
            },
        },
        effect: {
            PvwSrc: sourceID.IN1,
            PgmSrc: sourceID.IN1,
            transitionPosition: {
                inTransition: false,
                handlePosition: 0,
            },
            fadeToBlack: {
                inTransition: false,
                isFullyBlack: false,
                AFV: false,
                rate: 0,
            },
            selectTransitionStyle: {
                PrevState: false,
                style: EffectStyle.Mix,
                mix:{
                    rate:0
                },
                dip:{
                    selectDipSource:sourceID.IN1,
                    rate:0
                },
                wipe: {
                    selectPattern:0,
                    rate:0,
                    x:0,
                    y:0,
                    direction:WipeDirection.Normal,
                    symmetry:0,
                    softness:0,
                    borderWidth:0,
                    selectWipeSource:sourceID.IN1,
                },
            },
            tied: false,
            dipFillSources: [],
            wipeFillSource:[],
        },
        intputSetting:{
            inputMode:inputModeType.physicalPorts_4_0
        },
        outputSetting:{
            outFormat: '',
            audioSourcesRange:[],
            videoSourcesRange:{},
            colorSpaceRange:[],
            outFormatRange:[]
        },
        macro:{
            macros: {0:undefined}
        },
        media: {
            mpTypes:[],
            mpStrills:[],
            mpBrowsers:[],
        },
        mutiSource: {
            multiSourceWindowsSources:[],
            eightWins:{
                0:undefined
            },
            fourWins:{
                0:undefined
            },
        },
        mutiView: {
            layoutStyle: 0,
            mutiViewWinSources: [],
            meterEnable: false,
            marker: false,
        },
        playBack: {
            modeRanges:[],
            config:{
                0:undefined
            }
        },
        record:{
            format:recodingFormat.H264,
            quality:recodingQuality.High,
            isRecording:0 ,//0关 1：pgm 开 2： iso开
            recordTime :0,
            recordFree:{
                freeSpace:0,
	            freeTime: 0
            },
            ISORecordFree:{
                freeSpace:0,
	            freeTime: 0
            },
            channels:{[sourceID.IN1] :false },
            channelsCount:0,
            //目前只有一种 errCode:0  没有插入USB存储设备 pgm录制无
            isoErrCode:-1,
        },
        stream:{
            status: LiveStatus.Off,
            streamInfos: [],
            platforms: [{ name: 'Loading', servers: [{serName:'Loading',url:''}]}],
            quality: 0,
        },
        upStreamKey:{
            USKS: { 0:undefined },
            LumaFillSources: [],
            LumaKeySources: [],
            ChromaFillSource: [],
            PatternFillSource: [],
            PatternWipes: [],
            PipFileSource: [],
        },
        initComplete:false,
	}
}