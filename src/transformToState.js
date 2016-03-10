import {List, Map} from 'immutable'

const mapState = Map({
    map: Map({})
})

const createFieldState = value => Map({
    initial: value,
    value,
    validating: false
})

const isObject = candidate => typeof candidate === `object` && candidate !== null

const transformToState = data =>
    isObject(data) ?
        Object.keys(data).reduce((acc, key) =>
                Array.isArray(data[ key ]) ?
                    acc.setIn([ `map`, key, `list` ], List(data[ key ].map(item =>
                        isObject(item) ?
                            transformToState(item) :
                            createFieldState(item))
                    )) :
                    isObject(data[ key ]) ?
                        acc.setIn([ `map`, key ], transformToState(data[ key ])) :
                        acc.setIn([ `map`, key ], createFieldState(data[ key ]))
            , mapState) :
        createFieldState(data)

export default transformToState