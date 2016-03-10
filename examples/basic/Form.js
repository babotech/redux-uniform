import {FieldTypes, connectForm} from '../../lib'

import Input from './components/Input'
import React from 'react'
import Relationships from './components/Relationships'
import Select from './components/Select'
import Submit from './components/Submit'
import Values from './components/Values'

import realManList from './fieldTypes/realManList'
import realWomanList from './fieldTypes/realWomanList'
import required from './fieldTypes/validations/required'

const Form = ({fields, getValues, submitAllowed, handleSubmit}) => (
    <div style={container}>
        <div style={form}>
            <Input placeholder="First Name" {...fields.firstName} />
            <Input placeholder="Last Name" {...fields.lastName} />
            <Select {...fields.sex} />
            <Relationships {...fields} />
            <Submit submitAllowed={submitAllowed} handleSubmit={handleSubmit}/>
        </div>
        <div style={values}>
            <Values getValues={getValues}/>
        </div>
    </div>
)

export default connectForm({
    firstName: FieldTypes.field(required),
    lastName: FieldTypes.field(required),
    sex: FieldTypes.switch(`relationships`, required),
    relationships: {
        [form => form.getIn([ `sex`, `value` ]) === `male`]: realManList,
        [form => form.getIn([ `sex`, `value` ]) === `female`]: realWomanList
    }
})(Form)

const container = {
    display: `flex`
}

const form = {}

const values = {
    paddingLeft: `30px`
}