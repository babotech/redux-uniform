import {FieldTypes, connectForm} from '../../lib'

import Input from './components/Input'
import React from 'react'
import Submit from './components/Submit'

const Form = ({fields}) => (
    <div>
        <Input {...fields.firstName} />
        <Input {...fields.lastName} />
        <Submit />
    </div>
)

export default connectForm({
    firstName: FieldTypes.field(),
    lastName: FieldTypes.field()
})(Form)
