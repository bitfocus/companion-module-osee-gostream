import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { VariableId } from './variableId'
// import { AudioMixerStateT } from './state'
import {  sourceID } from '../../connection/enums'
import { StreamDeckState } from '../../connection/state'
import { getEnumKeyByValue } from '../../util'

export function create(_state: StreamDeckState): CompanionVariableDefinition[] {
	return [
		{
			// note: this will be a list of all enabled sources
			name: 'Audio Sources Enabled',
			variableId: VariableId.AudioEnabled,
		},
		{
			name: 'Audio: Headphones Source',
			variableId: VariableId.HeadphoneSource,
		},
	]
}

export function getValues(state: StreamDeckState): CompanionVariableValues {
	const newValues = {}
	const inputSources= Object.keys(state.audioMixer.commonChannels).map(s=>({id:Number(s),lable:getEnumKeyByValue(sourceID,Number(s))}));
	const headphoneSpec = state.audioMixer.HeadphoneSources;
	newValues[VariableId.AudioEnabled] = inputSources.join(', ')
	if(headphoneSpec) newValues[VariableId.HeadphoneSource] = getEnumKeyByValue(sourceID, headphoneSpec[2])

	return newValues
}
