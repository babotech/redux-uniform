import Form from './Form'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import store from './store'

document.addEventListener(`DOMContentLoaded`, () => {
    ReactDOM.render(
        <Provider store={store}>
            <Form />
        </Provider>,
        document.getElementById(`app`)
    )
})