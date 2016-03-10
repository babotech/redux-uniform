import {FieldTypes, uniform} from '../../lib'

import Input from './components/Input'
import React from 'react'
import Users from './components/Users'
import Select from './components/Select'
import Submit from './components/Submit'
import Values from './components/Values'

import shortUserList from './fieldTypes/shortUserList'
import fullUserList from './fieldTypes/fullUserList'
import required from './fieldTypes/validations/required'

const Form = ({fields, getValues, submitAllowed, handleSubmit}) => {

    return (
        <div style={container}>
            <div style={form}>
                <Input placeholder="First Name" {...fields.firstName} />
                <Input placeholder="Last Name" {...fields.lastName} />
                <Select {...fields.type} />
                <Users {...fields} />
                <Submit submitAllowed={submitAllowed} handleSubmit={handleSubmit}/>
            </div>
            <div style={values}>
                <Values getValues={getValues}/>
            </div>
        </div>
    )
}

export default uniform({
    firstName: FieldTypes.field(required),
    lastName: FieldTypes.field(required),
    type: FieldTypes.switch(`users`, required),
    users: {
        [form => form.getIn([ `type`, `value` ]) === `short`]: shortUserList,
        [form => form.getIn([ `type`, `value` ]) === `full`]: fullUserList
    }
})(Form)

const container = {
    display: `flex`
}

const form = {}

const values = {
    paddingLeft: `30px`
}