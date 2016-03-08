import {List, Map} from 'immutable'

import expect from 'expect'
import expectImmutable from 'expect-immutable'
import fieldType from '../../src/fieldCreators/fieldType'
import mockery from 'mockery'
import rndoam from 'rndoam'

expect.extend(expectImmutable)

describe(`redux-uniform`, () => {

    describe(`fieldCreators`, () => {

        describe(`fieldType`, () => {

            const getMockedOnFieldType = ({
                createOnBlur = rndoam.noop(),
                createOnChange = rndoam.noop(),
                createOnFocus = rndoam.noop()
                } = {}) => {
                mockery.enable({
                    warnOnUnregistered: false,
                    useCleanCache: true
                })

                mockery.registerMock(`./handlerCreators/createOnBlur`, createOnBlur)
                mockery.registerMock(`./handlerCreators/createOnChange`, createOnChange)
                mockery.registerMock(`./handlerCreators/createOnFocus`, createOnFocus)

                const {default: mockedFieldType} = require(`../../src/fieldCreators/fieldType`)

                mockery.disable()
                mockery.deregisterAll()

                return mockedFieldType


            }


            it(`should get value from the state`, () => {
                const fieldsPath = [ `fields` ]
                const fieldPath = [ `foo` ]
                const state = Map({
                    fields: Map({
                        foo: Map({
                            value: `bar`
                        })
                    })
                })

                const field = fieldType()
                expect(field(fieldPath, fieldsPath, state).get(`value`))
                    .toEqual(`bar`)
            })

            it(`should get initialValue from the state`, () => {
                const fieldsPath = [ `fields` ]
                const fieldPath = [ `foo` ]
                const state = Map({
                    fields: Map({
                        foo: Map({
                            initialValue: `bar`
                        })
                    })
                })

                const field = fieldType()
                expect(field(fieldPath, fieldsPath, state).get(`initialValue`))
                    .toEqual(`bar`)
            })

            it(`should determine whether the field is dirty`, () => {
                const fieldsPath = [ `fields` ]
                const fieldPath = [ `foo` ]
                const state = Map({
                    fields: Map({
                        foo: Map({
                            initialValue: `bar`,
                            value: `baz`
                        })
                    })
                })

                const field = fieldType()
                expect(field(fieldPath, fieldsPath, state).get(`dirty`))
                    .toBeTruthy()
            })

            it(`should determine that the field is not dirty`, () => {
                const fieldsPath = [ `fields` ]
                const fieldPath = [ `foo` ]
                const state = Map({
                    fields: Map({
                        foo: Map({
                            initialValue: `bar`,
                            value: `bar`
                        })
                    })
                })

                const field = fieldType()
                expect(field(fieldPath, fieldsPath, state).get(`dirty`))
                    .toBeFalsy()
            })

            it(`should determine that field is not dirty if there is no data in the state`, () => {
                const fieldsPath = [ `fields` ]
                const fieldPath = [ `foo` ]
                const state = Map({
                    fields: Map()
                })

                const field = fieldType()
                expect(field(fieldPath, fieldsPath, state).get(`dirty`))
                    .toBeFalsy()
            })

            it(`should determine that field is focused and get a caret position from the state`, () => {
                const fieldPath = [ `foo` ]
                const caretPosition = List([ 0, 1 ])
                const state = Map({
                    focusedFieldPath: List(fieldPath),
                    caretPosition
                })

                const field = fieldType()
                const result = field(fieldPath, undefined, state)

                expect(result.get(`focused`))
                    .toBeTruthy()
                expect(result.get(`caretPosition`))
                    .toEqualImmutable(caretPosition)
            })

            it(`should determine that field is not focused`, () => {
                const fieldPath = [ `foo` ]
                const state = Map({
                    focusedFieldPath: List([ `baz` ])
                })

                const field = fieldType()
                const result = field(fieldPath, undefined, state)

                expect(result.get(`focused`))
                    .toBeFalsy()
                expect(result.get(`caretPosition`))
                    .toEqualImmutable(List())
            })

            it(`should set field valid default`, () => {
                const fieldPath = [ `foo` ]
                const state = Map({
                    foo: Map({
                        value: `bar`
                    })
                })

                const field = fieldType()
                expect(field(fieldPath, undefined, state).get(`valid`))
                    .toBeTruthy()
            })

            it(`should call method for validation`, () => {
                const fieldPath = [ `foo` ]
                const state = Map({
                    foo: Map({
                        value: `bar`
                    })
                })

                const validate = expect.createSpy()
                    .andReturn(false)

                const field = fieldType(validate)

                expect(field(fieldPath, undefined, state).get(`valid`))
                    .toBeFalsy()

                expect(validate.calls.length).toEqual(1)

                const {arguments: args} = validate.calls[0]

                expect(args).toEqual([ `bar` ])
            })

            it(`should call method for a validation from options object`, () => {
                const fieldPath = [ `foo` ]
                const state = Map({
                    foo: Map({
                        value: `bar`
                    })
                })

                const validate = expect.createSpy()
                    .andReturn(false)

                const field = fieldType({validate})

                expect(field(fieldPath, undefined, state).get(`valid`))
                    .toBeFalsy()

                expect(validate.calls.length).toEqual(1)

                const {arguments: args} = validate.calls[0]

                expect(args).toEqual([ `bar` ])
            })

            it(`should add onChange handler`, () => {

                const onChange = rndoam.noop()
                const createOnChangeSpy = expect.createSpy()
                    .andReturn(onChange)

                const mockedFieldType = getMockedOnFieldType({
                    createOnChange: createOnChangeSpy
                })
                const fieldPath = [ `foo` ]
                const props = {
                    change: rndoam.noop(),
                    changeCaretPosition: rndoam.noop()
                }

                const field = mockedFieldType()
                expect(field(fieldPath, undefined, undefined, props).get(`onChange`))
                    .toEqual(onChange)

                expect(createOnChangeSpy.calls.length)
                    .toEqual(1)

                const {arguments: args} = createOnChangeSpy.calls[0]
                expect(args).toEqual(
                    [ fieldPath, props.change, props.changeCaretPosition ]
                )
            })

            it(`should add onBlur handler`, () => {
                const onBlur = rndoam.noop()
                const createOnBlurSpy = expect.createSpy()
                    .andReturn(onBlur)

                const mockedFieldType = getMockedOnFieldType({
                    createOnBlur: createOnBlurSpy
                })

                const fieldPath = [ `foo` ]
                const props = {
                    blur: rndoam.noop()
                }

                const field = mockedFieldType()
                expect(field(fieldPath, undefined, undefined, props).get(`onBlur`))
                    .toEqual(onBlur)

                expect(createOnBlurSpy.calls.length)
                    .toEqual(1)

                const {arguments: args} = createOnBlurSpy.calls[0]
                expect(args).toEqual(
                    [ props.blur ]
                )
            })

            it(`should add onFocus handler`, () => {
                const onFocus = rndoam.noop()
                const createOnFocusSpy = expect.createSpy()
                    .andReturn(onFocus)
                const mockedFieldType = getMockedOnFieldType({
                    createOnFocus: createOnFocusSpy
                })

                const fieldPath = [ `foo` ]
                const props = {
                    focus: rndoam.noop()
                }

                const field = mockedFieldType()
                expect(field(fieldPath, undefined, undefined, props).get(`onFocus`))
                    .toEqual(onFocus)

                expect(createOnFocusSpy.calls.length)
                    .toEqual(1)

                const {arguments: args} = createOnFocusSpy.calls[0]
                expect(args).toEqual(
                    [ fieldPath, props.focus ]
                )
            })
        })
    })
})