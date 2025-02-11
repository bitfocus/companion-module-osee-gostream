import { ActionId } from '../actionId'
import * as DSKState from '../state'
import * as Models from '../../../models'
import { Model } from '../../../models/types'
import { GoStreamCmd } from '../../../connection'
import { ReqType } from '../../../enums'
import { sourcesDomainRange } from './constants'

// Default value according to Table 5.1-10 in the reference manual
test('Check state default values', () => {
	const model = Models.GetModelSpec(Model.Duet)
	const state = DSKState.create(model!)

	// source
	expect(state.source.fill).toBe(sourcesDomainRange.indexOf("Still 2"))
	expect(state.source.key).toBe(sourcesDomainRange.indexOf("Still 2 Key"))

	// mask
	expect(state.mask.enabled).toBeFalsy()
	expect(state.mask.hStart).toBe(0)
	expect(state.mask.vStart).toBe(0)
	expect(state.mask.hEnd).toBe(100)
	expect(state.mask.vEnd).toBe(100)

	// control
	expect(state.control.shapedKey).toBeFalsy()
	expect(state.control.clip).toBe(15)
	expect(state.control.gain).toBe(50)
	expect(state.control.invert).toBeFalsy()

	// rate
	expect(state.rate.rate).toBe(1.0)
})

test('Update with DskSourceFill action', () => {
	const model = Models.GetModelSpec(Model.Duet)
	const state = DSKState.create(model!)
	let cmd: GoStreamCmd = {
		id: ActionId.DskSourceFill,
		type: ReqType.Push,
		value: [sourcesDomainRange.indexOf("In 4")]
	}
	DSKState.update(state, cmd)
	expect(state.source.fill).toBe(sourcesDomainRange.indexOf("In 4"))
})

test('Update with DskControlInvert action', () => {
	const model = Models.GetModelSpec(Model.Duet)
	const state = DSKState.create(model!)
	let cmd: GoStreamCmd = {
		id: ActionId.DskControlInvert,
		type: ReqType.Push,
		value: [1]
	}
	DSKState.update(state, cmd)
	expect(state.control.invert).toBeTruthy()

	cmd.value = [0]
	DSKState.update(state, cmd)
	expect(state.control.invert).toBeFalsy()
})

test('Update with DskMaskEnable action', () => {
	const model = Models.GetModelSpec(Model.Duet)
	const state = DSKState.create(model!)
	let cmd: GoStreamCmd = {
		id: ActionId.DskMaskEnable,
		type: ReqType.Push,
		value: [1]
	}
	DSKState.update(state, cmd)
	expect(state.mask.enabled).toBeTruthy()

	cmd.value = [0]
	DSKState.update(state, cmd)
	expect(state.mask.enabled).toBeFalsy()
})

test('Update with DskControlShapedKey action', () => {
	const model = Models.GetModelSpec(Model.Duet)
	const state = DSKState.create(model!)
	let cmd: GoStreamCmd = {
		id: ActionId.DskControlShapedKey,
		type: ReqType.Push,
		value: [1]
	}
	DSKState.update(state, cmd)
	expect(state.control.shapedKey).toBeTruthy()

	cmd.value = [0]
	DSKState.update(state, cmd)
	expect(state.control.shapedKey).toBeFalsy()
})

test('Update with DskRate action', () => {
	const model = Models.GetModelSpec(Model.Duet)
	const state = DSKState.create(model!)
	let cmd: GoStreamCmd = {
		id: ActionId.DskRate,
		type: ReqType.Push,
		value: [4, 5]
	}
	DSKState.update(state, cmd)
	expect(state.rate.rate).toBe(4.5)
})