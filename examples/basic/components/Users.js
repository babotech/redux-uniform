import React, {Component} from 'react'

import Short from './Users/Short'
import Full from './Users/Full'

class Users extends Component {
    render() {
        const {type, users} = this.props

        switch (type.value) {
            case `short`:
                return <Short {...users} />
            case `full`:
                return <Full {...users} />
            default:
                return null
        }
    }
}

export default Users

