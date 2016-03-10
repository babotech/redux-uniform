import {Map} from 'immutable'

import expect from 'expect'
import mockery from 'mockery'
import rndoam from 'rndoam'

describe(`redux-uniform`, () => {

    describe(`switchType`, () => {

        const getMockedSwitchType = ({
            fieldType,
            createSwitchOnChange = rndoam.noop()
            }) => {
            mockery.enable({
                warnOnUnregistered: false,
                useCleanCache: true
            })

            mockery.registerMock(`./fieldType`, fieldType)
            mockery.registerMock(`./handlerCreators/createSwitchOnChange`, createSwitchOnChange)

            const {default: mockedSwitchType} = require(`../../src/fieldCreators/switchType`)

            mockery.disable()
            mockery.deregisterAll()

            return mockedSwitchType
        }

        it(`should be composed with fieldType`, () => {

            const fieldTypeCreatorSpy = expect.createSpy()
                .andReturn(Map({
                    foo: `bar`
                }))
            const fieldTypeSpy = expect.createSpy()
                .andReturn(fieldTypeCreatorSpy)


            const deps = rndoam.array()
            const options = rndoam.object()
            const argLength = 4
            const args = rndoam.array(argLength)

            const switchType = getMockedSwitchType({
                fieldType: fieldTypeSpy
            })

            const switchField = switchType(deps, options)

            expect(switchField(...args).get(`foo`)).toEqual(`bar`)

            expect(fieldTypeSpy.calls.length).toEqual(1)

            const {arguments: fieldTypeArgs} = fieldTypeSpy.calls[ 0 ]

            expect(fieldTypeArgs).toEqual([
                options
            ])

            expect(fieldTypeCreatorSpy.calls.length).toEqual(1)

            const {arguments: fieldTypeCreatorArgs} = fieldTypeCreatorSpy.calls[ 0 ]

            expect(fieldTypeCreatorArgs).toEqual(args)
        })

        it(`should override onChangeHandler`, () => {
            const fieldType = () => () => Map({
                onChange: rndoam.noop()
            })

            const switchOnChange = rndoam.noop()
            const createSwitchOnChangeSpy = expect
                .createSpy()
                .andReturn(switchOnChange)

            const switchType = getMockedSwitchType({
                fieldType,
                createSwitchOnChange: createSwitchOnChangeSpy
            })

            const deps = rndoam.array()
            const fieldPath = rndoam.array()
            const props = {
                switchChange: rndoam.noop()
            }

            const switchField = switchType(deps)

            expect(switchField(fieldPath, undefined, undefined, props).get(`onChange`))
                .toEqual(switchOnChange)

            expect(createSwitchOnChangeSpy.calls.length).toEqual(1)

            const {arguments: args} = createSwitchOnChangeSpy.calls[ 0 ]

            expect(args).toEqual([
                fieldPath,
                props.switchChange,
                deps
            ])
        })
    })
})