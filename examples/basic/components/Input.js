import React from 'react'

const Input = (props) => {

    const style = {
        ...defaultStyle,
        borderColor: !props.dirty ? `none` : !props.valid ? `#ff0000` : `#363636`
    }

    return (
        <input style={style} {...props} />
    )
}

export default Input

const defaultStyle = {
    display: `block`,
    marginBottom: `10px`,
    width: `100%`,
    boxSizing: `border-box`,
    border: `1ps solid`
}