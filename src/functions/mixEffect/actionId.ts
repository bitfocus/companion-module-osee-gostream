export enum ActionId {
	PgmIndex = 'pgmIndex',
	PvwIndex = 'pvwIndex',
	CutTransition = 'cutTransition',
	AutoTransition = 'autoTransition',
	FTB = 'ftb',
	FtbAudioAFV = 'ftbAudioAFV',
	FtbRate = 'ftbRate',
	Prev = 'prev',
	TransitionIndex = 'transitionIndex',
	TransitionRate = 'transitionRate',
	TransitionDipSource = 'transitionDipSource',
	TransitionWipePattern = 'transitionWipePattern',
	TransitionWipeXPosition = 'transitionWipeXPosition',
	TransitionWipeYPosition = 'transitionWipeYPosition',
	TransitionWipeDirection = 'transitionWipeDirection',
	TransitionWipeSymmetry = 'transitionWipeSymmetry',
	TransitionWipeSoftness = 'transitionWipeSoftness',
	TransitionWipeBorder = 'transitionWipeBorder',
	TransitionWipeFillSource = 'transitionWipeFillSource',
	TransitionSourceBG = 'transitionSourceBG', // @deprecated
	NextTransitionButtons = 'transitionSource',
	OnAirButtons = 'onAirButtons', // this is a custom function for KEY and DSK On Air
	USKOnPreview = 'uskOnPreview', // @deprecated This is custom function
	KeyOnAir = 'keyOnAir', // needed for communications; action is deprecated
	DskOnAir = 'dskOnAir', // needed for communications; action is deprecated
}
