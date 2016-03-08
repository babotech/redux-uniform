import {Map} from 'immutable'

import expect from 'expect'
import fieldType from '../../src/fieldCreators/fieldType'
import mapType from '../../src/fieldCreators/mapType'

describe(`redux-uniform`, () => {

    describe(`mapType`, () => {

        it(`should compose fields`, () => {
            const fields = {
                foo: fieldType()
            }

            const fieldPaths = [ `fields` ]
            const state = Map({
                fields: Map({
                    map: Map({
                        foo: Map({
                            value: `bar`
                        })
                    })
                })
            })

            const result = mapType(fields)(fieldPaths, undefined, state)
            expect(result.getIn([ `fields`, `foo`, `value` ])).toEqual(`bar`)
            expect(result.get(`valid`)).toBeTruthy()
        })

        it(`should invalidate form if at least one of the fields is invalid`, () => {
            const validate = expect
                .createSpy()
                .andReturn(false)

            const fields = {
                foo: fieldType(validate)
            }

            const fieldPaths = [ `fields` ]
            const state = Map({
                fields: Map({
                    foo: Map({
                        value: `bar`
                    })
                })
            })

            const result = mapType(fields)(fieldPaths, undefined, state)
            expect(result.get(`valid`)).toBeFalsy()
        })
    })
})