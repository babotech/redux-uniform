import React from 'react'

const Values = ({getValues}) => (
    <div>
        {JSON.stringify(getValues())}
    </div>
)

export default Values