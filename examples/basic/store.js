import {applyMiddleware, combineReducers, createStore} from 'redux'
import createLogger from 'redux-logger'
import {reducer as formReducer} from '../../lib'

const reducer = combineReducers({
    states: formReducer
})

const logger = createLogger({
    stateTransformer: (state) =>
        Object.keys(state.states).reduce((acc, key) => {
            const {state: localState, ...rest} = state.states[ key ]
            acc[ key ] = {
                state: localState.toJS(),
                ...rest
            }
            return acc
        }, {})
})

const store = createStore(
    reducer,
    applyMiddleware(logger)
)

export default store