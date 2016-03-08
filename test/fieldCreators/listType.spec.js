import {List, Map} from 'immutable'

import expect from 'expect'
import fieldType from '../../src/fieldCreators/fieldType'
import mockery from 'mockery'
import rndoam from 'rndoam'

describe(`redux-uniform`, () => {

    describe(`fieldCreators`, () => {

        describe(`listType`, () => {

            const getMockedListType = ({
                createAddField = rndoam.noop(),
                createRemoveField = rndoam.noop()
                } = {}) => {

                mockery.registerMock(`./handlerCreators/createAddField`, createAddField)
                mockery.registerMock(`./handlerCreators/createRemoveField`, createRemoveField)

                const {default: listType} = require(`../../src/fieldCreators/listType`)

                return listType
            }

            beforeEach(() => {
                mockery.enable({
                    warnOnUnregistered: false,
                    useCleanCache: true
                })
            })

            afterEach(() => {
                mockery.deregisterAll()
                mockery.disable()
            })

            it(`should create list of simple fieldType as default`, () => {
                const fieldPath = [ `foos` ]
                const fieldsPath = [ `fields` ]
                const state = Map({
                    fields: Map({
                        foos: Map({
                            list: List([
                                Map({
                                    value: `bar`
                                }),
                                Map({
                                    value: `baz`
                                })
                            ])
                        })
                    })
                })

                const listType = getMockedListType()
                const list = listType()

                const result = list(fieldPath, fieldsPath, state)

                const expectedListSize = 2
                expect(result.get(`list`).size).toEqual(expectedListSize)

                expect(result.getIn([ `list`, 0, `value` ]))
                    .toEqual(`bar`)
                expect(result.getIn([ `list`, 1, `value` ]))
                    .toEqual(`baz`)
            })

            it(`should set list valid as default`, () => {
                const fieldPath = [ `foos` ]
                const state = Map({
                    foos: Map({
                        list: List([
                            Map({
                                value: `bar`
                            })
                        ])
                    })
                })

                const listType = getMockedListType()
                const list = listType()

                expect(list(fieldPath, undefined, state).get(`valid`))
                    .toBeTruthy()
            })

            it(`should invalidate list if it some of its items is invalid`, () => {
                const fieldPath = [ `foos` ]
                const state = Map({
                    foos: Map({
                        list: List([
                            Map({
                                value: `bar`
                            })
                        ])
                    })
                })

                const validate = expect.createSpy()
                    .andReturn(false)
                const field = fieldType(validate)
                const listType = getMockedListType()
                const list = listType(field)

                expect(list(fieldPath, undefined, state).get(`valid`))
                    .toBeFalsy()
            })

            it(`should call validation method for the list`, () => {
                const fieldPath = [ `foos` ]
                const state = Map({
                    foos: Map({
                        list: List([
                            Map({
                                value: `bar`
                            })
                        ])
                    })
                })

                const validate = expect.createSpy()
                    .andReturn(false)
                const field = fieldType()
                const listType = getMockedListType()
                const list = listType(field, validate)
                const result = list(fieldPath, undefined, state)

                expect(result.get(`valid`))
                    .toBeFalsy()

                expect(validate.calls.length).toEqual(1)

                const {arguments: args} = validate.calls[0]
                expect(args).toEqual([
                    result.get(`list`)
                ])
            })

            it(`should call validation method for the list only when all items are valid`, () => {
                const fieldPath = [ `foos` ]
                const state = Map({
                    foos: Map({
                        list: List([
                            Map({
                                value: `bar`
                            })
                        ])
                    })
                })

                const itemValidate = expect.createSpy()
                    .andReturn(false)
                const listValidate = expect.createSpy()
                const field = fieldType(itemValidate)
                const listType = getMockedListType()
                const list = listType(field, listValidate)
                const result = list(fieldPath, undefined, state)

                expect(result.get(`valid`))
                    .toBeFalsy()

                expect(listValidate.calls.length).toEqual(0)
            })

            it(`should add addItem method`, () => {
                const addField = rndoam.noop()
                const createAddField = expect.createSpy()
                    .andReturn(addField)

                const listType = getMockedListType({
                    createAddField
                })
                const fieldPath = [ `foos` ]
                const props = {
                    addField: rndoam.noop()
                }

                const list = listType()

                expect(list(fieldPath, undefined, undefined, props).get(`addField`))
                    .toEqual(addField)

                expect(createAddField.calls.length).toEqual(1)

                const {arguments: args} = createAddField.calls[0]
                expect(args).toEqual([
                    fieldPath,
                    props.addField
                ])
            })

            it(`should add removeItem method`, () => {
                const removeField = rndoam.noop()
                const createRemoveField = expect.createSpy()
                    .andReturn(removeField)

                const listType = getMockedListType({
                    createRemoveField
                })
                const fieldPath = [ `foos` ]
                const props = {
                    removeField: rndoam.noop()
                }

                const list = listType()

                expect(list(fieldPath, undefined, undefined, props).get(`removeField`))
                    .toEqual(removeField)

                expect(createRemoveField.calls.length).toEqual(1)

                const {arguments: args} = createRemoveField.calls[0]
                expect(args).toEqual([
                    fieldPath,
                    props.removeField
                ])
            })

            it(`should create collection of maps`, () => {
                const listType = getMockedListType()

                const list = listType({
                    foo: fieldType()
                })

                const fieldPath = [ `foos` ]
                const state = Map({
                    foos: Map({
                        list: List([
                            Map({
                                map: Map({
                                    foo: Map({
                                        value: `bar`
                                    })
                                })
                            })
                        ])
                    })
                })

                expect(list(fieldPath, undefined, state).getIn([ `list`, 0, `fields`, `foo`, `value` ]))
                    .toEqual(`bar`)
            })
        })
    })
})

