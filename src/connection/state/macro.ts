export interface MacroState {
	name: string
	description: string
	used: boolean
	recording: boolean
	running: boolean
	waiting: boolean
}

export interface MacroStateT {
	macros: {[index:number]:MacroState|undefined}
}
