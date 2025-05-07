export enum VariableId {
	PlayState = 'PlayState',
	PlayFile = 'PlayFile',
	PlaybackPlayhead = 'Playhead', // this is not a communication ID. It is part of playbackSkip
	PlaybackPlaylength = 'PlaybackLength', // this is not a communication ID. It is part of playbackSkip
	PlaybackPlayheadMMSS = 'PlayheadMMSS',
	PlaybackRemainingMMSS = 'PlaybackRemainingMMSS',
	PlaybackPlaylengthMMSS = 'PlaybackLengthMMSS',
}
