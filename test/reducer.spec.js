import * as actionTypes from '../src/actionTypes'
import {Map, fromJS} from 'immutable'

import expect from 'expect'
import expectImmutable from 'expect-immutable'
import reducer from '../src/reducer'
import rndoam from 'rndoam/lib/withImmutable'

expect.extend(expectImmutable)

describe(`redux-uniform`, () => {

    describe(`reducer`, () => {

        it(`should initialize fields`, () => {
            const data = rndoam.map()

            expect(reducer(fromJS({
                fields: {}
            }), {
                type: actionTypes.INITIALIZE,
                result: {
                    data
                }
            })).toEqualImmutable(Map({
                fields: data
            }))
        })

        it(`should change field`, () => {
            expect(reducer(fromJS({
                fields: {
                    foo: {
                        value: `bar`
                    }
                }
            }), {
                type: actionTypes.CHANGE,
                result: {
                    fieldPath: [ `foo` ],
                    value: `baz`
                }
            })).toEqualImmutable(fromJS({
                fields: {
                    foo: {
                        value: `baz`
                    }
                }
            }))
        })

        it(`should update validity value`, () => {
            expect(reducer(fromJS({
                fields: {
                    foo: {
                        valid: false
                    }
                }
            }), {
                type: actionTypes.VALIDATE,
                result: {
                    fieldPath: [ `foo` ],
                    value: true
                }
            })).toEqualImmutable(fromJS({
                fields: {
                    foo: {
                        valid: true
                    }
                }
            }))
        })

        it(`should start validation`, () => {

            expect(reducer(fromJS({
                fields: {
                    foo: {
                        validating: false
                    }
                }
            }), {
                type: actionTypes.START_VALIDATION,
                result: {
                    fieldPath: [ `foo` ]
                }
            })).toEqualImmutable(fromJS({
                fields: {
                    foo: {
                        validating: true
                    }
                }
            }))
        })

        it(`should end validation`, () => {
            expect(reducer(fromJS({
                fields: {
                    foo: {
                        validating: true,
                        valid: false
                    }
                }
            }), {
                type: actionTypes.END_VALIDATION,
                result: {
                    fieldPath: [ `foo` ],
                    value: true
                }
            })).toEqualImmutable(fromJS({
                fields: {
                    foo: {
                        validating: false,
                        valid: true
                    }
                }
            }))
        })

        it(`should remove item from array`, () => {

            expect(reducer(fromJS({
                fields: {
                    foo: [
                        rndoam.map()
                    ]
                }
            }), {
                type: actionTypes.REMOVE,
                result: {
                    fieldPath: [ `foo` ],
                    index: 0
                }
            })).toEqualImmutable(fromJS({
                fields: {
                    foo: []
                }
            }))
        })

        it(`should create empty field in array`, () => {
            const data = rndoam.map()
            expect(reducer(fromJS({
                fields: {
                    foos: []
                }
            }), {
                type: actionTypes.ADD,
                result: {
                    fieldPath: [ `foos` ],
                    data,
                    focused: true
                }
            })).toEqualImmutable(fromJS({
                fields: {
                    foos: [
                        data
                    ]
                },
                focusedFieldPath: [ `foos`, 0 ]
            }))
        })

        it(`should insert value into a specific index`, () => {
            const item1 = rndoam.map()
            const item2 = rndoam.map()

            expect(reducer(fromJS({
                fields: {
                    foos: [
                        item1
                    ]
                }
            }), {
                type: actionTypes.ADD,
                result: {
                    fieldPath: [ `foos` ],
                    data: item2,
                    index: 0,
                    focused: true
                }
            })).toEqualImmutable(fromJS({
                fields: {
                    foos: [
                        item2,
                        item1
                    ]
                },
                focusedFieldPath: [ `foos`, 0 ]
            }))
        })

        it(`should update focusFieldPath`, () => {

            expect(reducer(fromJS({
                focusedFieldPath: []
            }), {
                type: actionTypes.FOCUS,
                result: {
                    fieldPath: [ `foo` ]
                }
            })).toEqualImmutable(fromJS({
                focusedFieldPath: [ `foo` ]
            }))
        })

        it(`should update caretPosition field`, () => {
            expect(reducer(fromJS({
                focusedFieldPath: [],
                caretPosition: []
            }), {
                type: actionTypes.CHANGE_CARET_POSITION,
                result: {
                    fieldPath: [ `foo` ],
                    caretPosition: [ 0, 1 ]
                }
            })).toEqualImmutable(fromJS({
                focusedFieldPath: [ `foo` ],
                caretPosition: [ 0, 1 ]
            }))
        })

        it(`should clear fields of focused state on blur`, () => {
            expect(reducer(fromJS({
                focusedFieldPath: rndoam.array(),
                caretPosition: rndoam.array()
            }), {
                type: actionTypes.BLUR
            })).toEqualImmutable(fromJS({
                focusedFieldPath: [],
                caretPosition: []
            }))
        })

        it(`should set submitting true`, () => {
            expect(reducer(fromJS({
                submitting: false
            }), {
                type: actionTypes.START_SUBMITTING
            })).toEqualImmutable(fromJS({
                submitting: true
            }))
        })

        it(`should set submitting false`, () => {
            expect(reducer(fromJS({
                submitting: true
            }), {
                type: actionTypes.END_SUBMITTING
            })).toEqualImmutable(fromJS({
                submitting: false
            }))
        })
    })
})
