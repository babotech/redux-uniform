import React from 'react'

const tab = 4

const Values = ({getValues}) => (
    <pre>
        {JSON.stringify(getValues(), null, tab)}
    </pre>
)

export default Values