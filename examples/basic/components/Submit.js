import React from 'react'

const Submit = ({submitAllowed, handleSubmit}) => {

    const onClick = () => handleSubmit(data => new Promise((resolve, reject) => confirm(JSON.stringify(data, undefined, 4)) ? resolve() : reject()))

    return (
        <button disabled={!submitAllowed} style={style} onClick={onClick}>
            Submit
        </button>
    )
}

export default Submit

const style = {
    display: `block`,
    marginTop: `10px`
}