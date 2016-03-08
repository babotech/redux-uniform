import * as actions from './actions'

import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import composeFields from './composeFields'
import {connectState} from 'redux-state'
import reducer from 'reducer'

const mapStateToProps = state => ({
    state
})

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(actions, dispatch)
})

const connectForm = fields => Target => {
    class ConnectForm extends Component {
        componentWillMount() {
            const {initialize, initialValue} = this.props

            initialize(initialValue)
        }

        render() {
            const {state} = this.props
            const composeResult = composeFields(fields, [ `fields` ], state, this.props)
            const formFields = composeResult.get(`map`).toJS()
            const valid = composeResult.get(`valid`)

            return <Target fields={formFields} valid={valid} />
        }
    }

    return connectState(mapStateToProps, mapDispatchToProps, undefined, reducer)(ConnectForm)
}

export default connectForm