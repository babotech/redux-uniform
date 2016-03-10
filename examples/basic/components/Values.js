import React from 'react'

const tab = 4

const Values = ({getValues}) => (
    <pre style={style}>
        {JSON.stringify(getValues(), null, tab)}
    </pre>
)

export default Values

const style = {
    margin: 0
}