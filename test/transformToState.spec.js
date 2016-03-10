import {List, Map} from 'immutable'

import expect from 'expect'
import transformToState from '../src/transformToState'

describe(`redux-uniform`, () => {

    describe(`transformToState`, () => {

        it(`should transform simple object`, () => {
            const data = {
                foo: `bar`
            }

            expect(transformToState(data))
                .toEqualImmutable(Map({
                    map: Map({
                        foo: Map({
                            value: `bar`,
                            initial: `bar`,
                            validating: false
                        })
                    })
                }))
        })

        it(`should transform array`, () => {
            const data = {
                foos: [
                    `foo`
                ]
            }

            expect(transformToState(data))
                .toEqualImmutable(Map({
                    map: Map({
                        foos: Map({
                            list: List([
                                Map({
                                    value: `foo`,
                                    initial: `foo`,
                                    validating: false
                                })
                            ])
                        })
                    })
                }))
        })

        it(`should transform collection`, () => {
            const data = {
                foos: [
                    {
                        foo: `bar`
                    }
                ]
            }

            expect(transformToState(data))
                .toEqualImmutable(Map({
                    map: Map({
                        foos: Map({
                            list: List([
                                Map({
                                    map: Map({
                                        foo: Map({
                                            initial: `bar`,
                                            value: `bar`,
                                            validating: false
                                        })
                                    })
                                })
                            ])
                        })
                    })
                }))
        })

        it(`should transform deep object`, () => {
            const data = {
                foo: {
                    bar: `baz`
                }
            }

            expect(transformToState(data))
                .toEqualImmutable(Map({
                    map: Map({
                        foo: Map({
                            map: Map({
                                bar: Map({
                                    initial: `baz`,
                                    value: `baz`,
                                    validating: false
                                })
                            })
                        })
                    })
                }))
        })

        it(`should transform from primitive`, () => {
            const data = `bar`

            expect(transformToState(data))
                .toEqualImmutable(Map({
                    initial: `bar`,
                    value: `bar`,
                    validating: false
                }))
        })
    })
})