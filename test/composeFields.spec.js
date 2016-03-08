import {Map} from 'immutable'

import composeFields from '../src/composeFields'
import expect from 'expect'
import fieldType from '../src/fieldCreators/fieldType'

describe(`redux-uniform`, () => {

    describe(`composeFields`, () => {

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

            const result = composeFields(fields, fieldPaths, state)
            expect(result.getIn([ `map`, `foo`, `value` ])).toEqual(`bar`)
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
                map: Map({
                    foo: Map({
                        value: `bar`
                    })
                })
            })

            const result = composeFields(fields, fieldPaths, state)
            expect(result.get(`valid`)).toBeFalsy()
        })
    })
})