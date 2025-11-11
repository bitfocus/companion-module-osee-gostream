// import { ActionId } from './actionId'
// import { sendCommands } from '../../connection'
// import { ReqType,sourceID } from '../../enums'
// import type { GoStreamModel } from '../../models/types'
// import { GoStreamCmd } from '../../connection'

// export type AudioMixerState= {
// 	sourceIndex:sourceID,
// 	audioMixerEffectEnable:boolean,
// 	lowCutEnable:boolean,
// 	audioMixerEnable:AfvState,
// 	noiseGateEnable:boolean,
// 	compressorEnable:boolean,
// 	EQEnable:boolean,
// 	PGMLimiterEnable:boolean,
// 	audioFadeSwitching:AudioFadeSwitching,
// }
// export enum AudioFadeSwitching
// {
// 	HardCut =0, 
// 	SwitchWithEffect=1
// }

// export enum AfvState
// {
// 	off =0, 
// 	on=1,
// 	afv=2,
// }

// export type AudioMixerStateT = {
// 	model: GoStreamModel
// 	AudioMixerStates:AudioMixerState[]
// 	HeadphoneSources:sourceID[]
// }

// export function create(model: GoStreamModel): AudioMixerStateT {
// 	let state:AudioMixerStateT={
// 		model: model,
// 		AudioMixerStates:[],
// 		HeadphoneSources:[],
// 	}
// 	for (let index = 0; index < model.audioMixSources.length; index++) {
// 		state.AudioMixerStates.push({
// 			sourceIndex:model.audioMixSources[index],
// 			audioMixerEffectEnable:false,
// 			lowCutEnable:false,
// 			audioMixerEnable:AfvState.off,
// 			noiseGateEnable:false,
// 			compressorEnable:false,
// 			EQEnable:false,
// 			PGMLimiterEnable:false,
// 			audioFadeSwitching:AudioFadeSwitching.HardCut
// 		});
// 	}
// 	return state
// }

// export async function sync(model: GoStreamModel): Promise<boolean> {
// 	// const audioCapableInputs = model.inputs.filter((inp) => inp.caps & PortCaps.Audio).length
// 	const cmds: GoStreamCmd[] = []
// 	if(model.audioMixSources.length>0)
// 	{
// 		cmds.push({id:ActionId.AudioMixerHeadphoneSourceList,type:ReqType.Get});
// 		for (let index = 0; index < model.audioMixSources.length; index++) {
// 			const source_id =model.audioMixSources[index];
// 			cmds.push({id:ActionId.AudioMixerCompressorEnable,type:ReqType.Get, value: [source_id]});
// 			cmds.push({id:ActionId.AudioMixerEffectEnable,type:ReqType.Get, value: [source_id]});
// 			cmds.push({id:ActionId.AudioMixerEnable,type:ReqType.Get, value: [source_id]});
// 			cmds.push({id:ActionId.AudioMixerHPFEnable,type:ReqType.Get, value: [source_id]});
// 			cmds.push({id:ActionId.AudioMixerNoiseGateEnable,type:ReqType.Get, value: [source_id]});
// 			cmds.push({id:ActionId.AudioMixerEQEnable,type:ReqType.Get, value: [source_id]});
// 			cmds.push({id:ActionId.AudioMixerLimiterEnable,type:ReqType.Get, value: [source_id]});
// 			cmds.push({id:ActionId.AudioMixerSwitchType,type:ReqType.Get, value: [source_id]});

			
// 		}
// 	}
// 	return await sendCommands(cmds)
// }

// export function update(state: AudioMixerStateT, data: GoStreamCmd): boolean {
// 	if (!data.value) return false
// 	switch (data.id as ActionId) {
// 		case ActionId.AudioMixerEnable:
// 			var source=state.AudioMixerStates.find(s=>s.sourceIndex===Number(data.value![0]));
// 			if (source) {
// 				source.audioMixerEnable = Number(data.value![1]);
// 			}
// 			break;
// 		case ActionId.AudioMixerCompressor:
// 			var source =state.AudioMixerStates.find(s=>s.sourceIndex===Number(data.value![0]));
// 			if (source) {
// 				source.compressorEnable = Boolean(data.value![1]);
// 			}
// 			break;
// 		case ActionId.AudioMixerEffectEnable:
// 			var source = state.AudioMixerStates.find(s=>s.sourceIndex===Number(data.value![0]));
// 			if (source) {
// 				source.audioMixerEffectEnable = Boolean(data.value![1]);
// 			}
// 			break;
// 		case ActionId.AudioMixerHPF:
// 			var source = state.AudioMixerStates.find(s=>s.sourceIndex===Number(data.value![0]));
// 			if (source) {
// 				source.lowCutEnable = Boolean(data.value![1]);
// 			}
// 			break;
// 		case ActionId.AudioMixerNoiseGate:
// 			var source = state.AudioMixerStates.find(s=>s.sourceIndex===Number(data.value![0]));
// 			if (source) {
// 				source.noiseGateEnable = Boolean(data.value![1]);
// 			}
// 			break;
// 		case ActionId.AudioMixerEQEnable:
// 			var source = state.AudioMixerStates.find(s=>s.sourceIndex===Number(data.value![0]));
// 			if (source) {
// 				source.EQEnable = Boolean(data.value![1]);
// 			}
// 			break;
// 		case ActionId.AudioMixerLimiter:
// 			var source = state.AudioMixerStates.find(s=>s.sourceIndex===Number(data.value![0]));
// 			if (source) {
// 				source.PGMLimiterEnable = Boolean(data.value![1]);
// 			}
// 			break;
// 		case ActionId.AudioMixerSwitchType:
// 			var source = state.AudioMixerStates.find(s=>s.sourceIndex===Number(data.value![0]));
// 			if (source) {
// 				source.audioFadeSwitching = Number(data.value![1]);
// 			}
// 			break;
// 		case ActionId.AudioMixerHeadphoneSourceList:
// 			var str = String(data.value)
// 			state.HeadphoneSources =  str ? str.split(',').map(Number) : []
// 			break;
// 	}
// 	return false
// }
