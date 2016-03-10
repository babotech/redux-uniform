import React from 'react'

const Select = (props) => (
    <select style={style} {...props}>
        <option value="">Type</option>
        <option value="short">Short form</option>
        <option value="full">Full form</option>
    </select>
)
export default Select

const style = {
    marginBottom: `10px`
}