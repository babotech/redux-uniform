import Input from '../Input'
import React, {Component} from 'react'

const Error = () => (
    <div>Not enough girls</div>
)

const Success = () => (
    <div>Good</div>
)

const initialState = {
    value: null
}

class Male extends Component {

    constructor() {
        super()
        this.state = initialState
    }

    render() {
        const {addField, list, valid} = this.props

        const onKeyDown = (e) => {
            const ENTER = 13;
            if (e.keyCode === ENTER) {
                addField(this.state.value)
                this.setState(initialState)
            }
        }

        const onChange = (e) => {
            const {target} = e

            this.setState({
                value: target.value
            })
        }

        return (
            <div>
                {valid ? <Success /> : <Error />}
                {list.map((item, i) =>
                    <Input key={i} placeholder="name" {...item} />
                )}
                <div style={form}>
                    <input style={add} placeholder="girlfriend" value={this.state.value} onChange={onChange} onKeyDown={onKeyDown}/>
                </div>
            </div>
        )
    }
}

export default Male

const form = {
    padding: `5px`,
    border: `solid 1px grey`
}

const add = {
    width: `100%`,
    boxSizing: `border-box`
}