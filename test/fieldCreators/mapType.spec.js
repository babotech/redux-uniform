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

            const result = mapType(fields)(fieldPaths, undefined, state)
            expect(result.get(`valid`)).toBeFalsy()
        })

        it(`should do switch between field types`, () => {
            const fields = {
                type: fieldType(),
                fields: {
                    [map => map.getIn([ `type`, `value` ]) === `bar`]: mapType({
                        bar: fieldType()
                    }),
                    [map => map.get([ `type`, `value` ]) === `baz`]: mapType({
                        baz: fieldType()
                    })
                }
            }
            const fieldPath = [ `foo` ]
            const state = Map({
                foo: Map({
                    map: Map({
                        type: Map({
                            value: `bar`
                        }),
                        fields: Map({
                            bar: Map({
                                value: true
                            })
                        })
                    })
                })
            })

            const map = mapType(fields)

            expect(map(fieldPath, undefined, state).getIn([ `map`, `fields`, `map`, `bar` ]))
                .toBeTruthy()

        })
    })
})