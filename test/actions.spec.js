import * as actionTypes from '../src/actionTypes'
import * as actions from '../src/formActions'

import expect from 'expect'
import mockery from 'mockery'
import rndoam from 'rndoam'

describe(`redux-uniform`, () => {

    describe(`actions`, () => {

        const getMockedActions = ({transformToState}) => {
            mockery.enable({
                warnOnUnregistered: false,
                useCleanCache: true
            })

            mockery.registerMock(`./transformToState`, transformToState)

            const mockedActions = require(`../src/formActions`)

            mockery.disable()
            mockery.deregisterAll()

            return mockedActions
        }

        it(`should create initialize action`, () => {
            const data = rndoam.object()
            const transformedData = rndoam.object()
            const transformToState = expect.createSpy()
                .andReturn(transformedData)

            const {initialize} = getMockedActions({
                transformToState
            })

            expect(initialize(data)).toEqual({
                type: actionTypes.INITIALIZE,
                result: {
                    data: transformedData
                }
            })

            expect(transformToState.calls.length)
                .toEqual(1)

            const {arguments: args} = transformToState.calls[0]

            expect(args)
                .toEqual([
                    data
                ])
        })

        it(`should create change action`, () => {
            const fieldPath = rndoam.array()
            const value = rndoam.string()

            expect(actions.change(fieldPath, value)).toEqual({
                type: actionTypes.CHANGE,
                result: {
                    fieldPath,
                    value
                }
            })
        })

        it(`should create switch change action`, () => {
            const fieldPath = rndoam.array()
            const value = rndoam.string()
            const deps = rndoam.array()

            expect(actions.switchChange(fieldPath, value, deps)).toEqual({
                type: actionTypes.SWITCH_CHANGE,
                result: {
                    fieldPath,
                    value,
                    deps
                }
            })

        })

        it(`should create validate action`, () => {
            const fieldPath = rndoam.array()
            const value = rndoam.string()

            expect(actions.validate(fieldPath, value)).toEqual({
                type: actionTypes.VALIDATE,
                result: {
                    fieldPath,
                    value
                }
            })
        })

        it(`should begin validation process if value is a promise`, (done) => {
            const fieldPath = rndoam.array()
            const dispatch = expect.createSpy()

            actions.validate(fieldPath, Promise.resolve(true))(dispatch)

            expect(dispatch.calls.length).toEqual(1)

            expect(dispatch.calls[ 0 ].arguments).toEqual([
                {
                    type: actionTypes.START_VALIDATION,
                    result: {
                        fieldPath
                    }
                }
            ])

            setTimeout(() => {
                const expectedCallsCount = 2
                expect(dispatch.calls.length).toEqual(expectedCallsCount)
                expect(dispatch.calls[ 1 ].arguments).toEqual([
                    {
                        type: actionTypes.END_VALIDATION,
                        result: {
                            fieldPath,
                            value: true
                        }
                    }
                ])
                done()
            }, 0)
        })

        it(`should create action for creation of a new item`, () => {
            const fieldPath = rndoam.array()
            const data = rndoam.object()
            const transformedData = rndoam.object()
            const index = rndoam.number()
            const focused = true

            const transformToState = expect.createSpy()
                .andReturn(transformedData)

            const {addField} = getMockedActions({transformToState})


            expect(addField(fieldPath, data, index, focused))
                .toEqual({
                    type: actionTypes.ADD,
                    result: {
                        fieldPath,
                        data: transformedData,
                        index,
                        focused
                    }
                })

            expect(transformToState.calls.length)
                .toEqual(1)

            const {arguments: args} = transformToState.calls[0]

            expect(args)
                .toEqual([
                    data
                ])
        })

        it(`should create action for removing of a item`, () => {
            const fieldPath = rndoam.array()
            const index = rndoam.number()

            expect(actions.removeField(fieldPath, index))
                .toEqual({
                    type: actionTypes.REMOVE,
                    result: {
                        fieldPath,
                        index
                    }
                })
        })

        it(`should create action for changing position of a caret`, () => {
            const fieldPath = rndoam.array()
            const caretPosition = [ rndoam.number(), rndoam.number() ]

            expect(actions.changeCaretPosition(fieldPath, caretPosition))
                .toEqual({
                    type: actionTypes.CHANGE_CARET_POSITION,
                    result: {
                        fieldPath,
                        caretPosition
                    }
                })
        })

        it(`should create action for a focus event`, () => {
            const fieldPath = rndoam.array()
            expect(actions.focus(fieldPath))
                .toEqual({
                    type: actionTypes.FOCUS,
                    result: {
                        fieldPath
                    }
                })
        })

        it(`should create action for a blur event`, () => {
            expect(actions.blur())
                .toEqual({
                    type: actionTypes.BLUR
                })
        })

        it(`should process submit`, (done) => {
            const dispatch = expect.createSpy()

            actions.submit(Promise.resolve(true))(dispatch)

            expect(dispatch.calls.length).toEqual(1)

            expect(dispatch.calls[ 0 ].arguments).toEqual([
                {
                    type: actionTypes.START_SUBMITTING
                }
            ])

            setTimeout(() => {
                const expectedCallsCount = 2
                expect(dispatch.calls.length).toEqual(expectedCallsCount)
                expect(dispatch.calls[ 1 ].arguments).toEqual([
                    {
                        type: actionTypes.END_SUBMITTING
                    }
                ])
                done()
            }, 0)
        })
    })

})