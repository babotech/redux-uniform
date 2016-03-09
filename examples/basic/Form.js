import {FieldTypes, connectForm} from '../../lib'

import Input from './components/Input'
import React from 'react'
import Select from './components/Select'
import Submit from './components/Submit'
import Values from './components/Values'

const Form = ({fields, getValues}) => (
    <div>
        <Values getValues={getValues}/>
        <Input {...fields.firstName} />
        <Input {...fields.lastName} />
        <Select {...fields.sex}/>
        <Submit />
    </div>
)


const friendType = FieldTypes.map({
    firstName: FieldTypes.field(),
    lastName: FieldTypes.field()
})

export default connectForm({
    firstName: FieldTypes.field(),
    lastName: FieldTypes.field(),
    sex: FieldTypes.field(),
    params: {
        [form => form.getIn([ `sex`, `value` ]) === `male`]: FieldTypes.map({
            girlfriends: FieldTypes.list(friendType)
        }),
        [form => form.getIn([ `sex`, `value` ]) === `female`]: FieldTypes.map({
            boyfriend: friendType
        })
    }
})(Form)
