import {applyMiddleware, combineReducers, createStore} from 'redux'
import {reducer as formReducer} from '../../lib'
import createLogger from 'redux-logger'

const reducer = combineReducers({
    states: formReducer
})

const logger = createLogger()

const store = createStore(
    reducer,
    applyMiddleware(logger)
)

export default store