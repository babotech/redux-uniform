import * as actionTypes from '../src/actionTypes'
import * as actions from '../src/actions'

import expect from 'expect'
import rndoam from 'rndoam'

describe(`redux-uniform`, () => {
    
    describe(`actions`, () => {
        
        it(`should create initialize action`, () => {
            const data = rndoam.object()
    
            expect(actions.initialize(data)).toEqual({
                type: actionTypes.INITIALIZE,
                result: {
                    data
                }
            })
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

            expect(dispatch.calls[0].arguments).toEqual([
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
                expect(dispatch.calls[1].arguments).toEqual([
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
            const index = rndoam.number()
            const focused = true
    
            expect(actions.addField(fieldPath, data, index, focused))
                .toEqual({
                    type: actionTypes.ADD,
                    result: {
                        fieldPath,
                        data,
                        index,
                        focused
                    }
                })
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

            expect(dispatch.calls[0].arguments).toEqual([
                {
                    type: actionTypes.START_SUBMITTING
                }
            ])

            setTimeout(() => {
                const expectedCallsCount = 2
                expect(dispatch.calls.length).toEqual(expectedCallsCount)
                expect(dispatch.calls[1].arguments).toEqual([
                    {
                        type: actionTypes.END_SUBMITTING
                    }
                ])
                done()
            }, 0)
        })
    })

})