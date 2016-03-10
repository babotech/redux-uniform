import Forms from './Forms'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import store from './store'

document.addEventListener(`DOMContentLoaded`, () => {
    ReactDOM.render(
        <Provider store={store}>
            <Forms />
        </Provider>,
        document.getElementById(`app`)
    )
})