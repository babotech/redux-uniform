import React, {Component} from 'react'

import Female from './Sex/Female'
import Male from './Sex/Male'

class Relationships extends Component {
    render() {
        const {sex, relationships} = this.props

        switch (sex.value) {
            case `male`:
                return <Male {...relationships} />
            case `female`:
                return <Female {...relationships} />
            default:
                return null
        }
    }
}

export default Relationships

