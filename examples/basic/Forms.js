import React, {Component} from 'react'
import Form from './Form'

const initialValue = {
    firstName: `default name`
}

class Forms extends Component {

    constructor() {
        super()
        this.state = {
            count: 1
        }
    }

    render() {
        const {count} = this.state

        const onClick = () =>
            this.setState({
                count: this.state.count + 1
            })

        return (
            <div style={container}>
                {Array(...Array(count)).map((_, i) => (
                    <div key={i} style={form}>
                        <Form initialValue={initialValue} />
                    </div>

                ))}
                <button onClick={onClick}>Add form</button>
            </div>
        )
    }
}

export default Forms

const container = {
    paddingTop: `100px`,
    width: `640px`,
    margin: `auto`,
}

const form = {
    marginBottom: `10px`
}

