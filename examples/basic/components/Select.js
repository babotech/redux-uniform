import React from 'react'

const Select = (props) => (
    <select style={style} {...props}>
        <option value="">Sex</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
    </select>
)
export default Select

const style = {
    marginBottom: `10px`
}