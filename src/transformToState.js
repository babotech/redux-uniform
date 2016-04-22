import {Iterable, List, Map} from 'immutable'

const mapState = Map({
    map: Map({})
})

const createFieldState = value => Map({
    initial: value,
    value,
    validating: false
})

const transformImmutable = data => data.reduce((acc, value, key) => List.isList(value) ?
    acc.setIn([ `map`, key, `list` ], List(value.map(item => transformToState(item)))) :
    acc.setIn([ `map`, key ], transformToState(value)), mapState)

const isObject = candidate => typeof candidate === `object` && candidate !== null

const transformPlainObject = data => Object
    .keys(data)
    .reduce((acc, key) =>
            Array.isArray(data[ key ]) ?
                acc.setIn([ `map`, key, `list` ], List(data[ key ].map(item => transformToState(item)))) :
                acc.setIn([ `map`, key ], transformToState(data[ key ]))
        , mapState)

const transformToState = data =>
    Iterable.isIterable(data) ? transformImmutable(data) : isObject(data) ? transformPlainObject(data) : createFieldState(data)


export default transformToState