import expect from 'expect'
import extractValues from '../src/extractValues'
import {fromJS} from 'immutable'

describe(`redux-uniform`, () => {

    describe(`extractValues`, () => {

        it(`should extract values from fields`, () => {
            const fields = fromJS({
                field1: {
                    value: `value1`
                },
                field2: {
                    value: `value2`
                }
            })

            expect(extractValues(fields))
                .toEqual({
                    field1: `value1`,
                    field2: `value2`
                })
        })

        it(`should extract values from array`, () => {
            const fields = fromJS({
                field: {
                    list: [ {
                        value: `value`
                    } ]
                }
            })

            expect(extractValues(fields))
                .toEqual({
                    field: [
                        `value`
                    ]
                })
        })

        it(`should extract values from deep array`, () => {
            const fields = fromJS({
                field: {
                    list: [
                        {
                            field1: {
                                value: `value1`
                            },
                            field2: {
                                value: `value2`
                            }
                        }
                    ]
                }
            })

            expect(extractValues(fields))
                .toEqual({
                    field: [
                        {
                            field1: `value1`,
                            field2: `value2`
                        }
                    ]
                })
        })

        it(`should extract values from map`, () => {
            const fields = fromJS({
                field: {
                    map: {
                        subField1: {
                            value: `value1`
                        },
                        subField2: {
                            value: `value2`
                        }
                    }
                }
            })

            expect(extractValues(fields))
                .toEqual({
                    field: {
                        subField1: `value1`,
                        subField2: `value2`
                    }
                })
        })
    })

})