import Input from '../Input'
import React, {Component} from 'react'

const Error = () => (
    <div>OMG</div>
)

const Success = () => (
    <div>Good girl</div>
)

const Boy = ({firstName, lastName}) => (
    <div>
        <Input placeholder="first name" {...firstName} />
        <Input placeholder="last name" {...lastName} />
    </div>
)

const initialState = {
    firstName: null,
    lastName: null
}

class Female extends Component {

    constructor() {
        super()
        this.state = initialState
    }

    render() {
        const {addField, list, valid} = this.props

        const onClick = () => {
            addField(this.state)
            this.setState(initialState)
        }

        const getOnChange = field => (e) => {
            const {target} = e

            this.setState({
                [field]: target.value
            })
        }

        return (
            <div>
                {valid ? <Success /> : <Error />}
                {list.map(({map}, i) =>
                    <Boy key={i} {...map} />
                )}
                <div style={form}>
                    <Input placeholder="first name" value={this.state.firstName} onChange={getOnChange(`firstName`)}/>
                    <Input placeholder="last name" value={this.state.lastName} onChange={getOnChange(`lastName`)}/>
                    <button style={add} onClick={onClick}>Add boyfriend</button>
                </div>
            </div>
        )
    }
}

export default Female

const add = {
    marginBottom: `10px`
}

const form = {
    padding: `5px`,
    border: `solid 1px grey`
}