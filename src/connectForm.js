import * as actions from './formActions'

import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import composeFields from './composeFields'
import {connectState} from 'redux-state'
import extractValues from './extractValues'
import reducer from './reducer'

const mapStateToProps = state => ({
    state
})

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(actions, dispatch)
})

const createFormProps = (fields, inst) => {
    const {state, submit} = inst.props
    const composeResult = composeFields(fields, [ `fields` ], state, inst.props)
    const formFields = composeResult.get(`map`).toJS()
    const valid = composeResult.get(`valid`)
    const submitting = state.get(`submitting`)
    const submitAllowed = !submitting && valid
    const getValues = () => extractValues(composeResult.get(`map`))
    const handleSubmit = (sendValues) => submit(sendValues(getValues()))


    return {
        fields: formFields,
        getValues,
        handleSubmit,
        submitAllowed,
        submitting,
        valid
    }
}

const connectForm = fields => Target => {
    class ConnectForm extends Component {
        componentWillMount() {
            const {initialize, initialValue} = this.props

            initialize(initialValue)
        }

        render() {
            return <Target {...createFormProps(fields, this)} />
        }
    }

    return connectState(mapStateToProps, mapDispatchToProps, undefined, reducer)(ConnectForm)
}

export default connectForm