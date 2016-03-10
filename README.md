# Redux uniform [![Build Status](https://travis-ci.org/babotech/redux-uniform.svg?branch=master)](https://travis-ci.org/babotech/redux-uniform)

## Installation

```
npm install --save redux-uniform
```

## Implementation

Redux-uniform is based on [redux-state](https://github.com/babotech/redux-state), so if you've been already using it, you should skip this step

```javascript
import {createStore, combineReducers} from 'redux'
import {reducer as statesReducer} from 'redux-uniform'
// or directly from redux-state
// import {reducer as statesReducer} from 'redux-state'

const reducers = {
  // ... your other reducers here ...
  states: statesReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)
```

## Usage

```javascript
import {FieldTypes, uniform} from 'redux-uniform'

const Form = ({fields, getValues, submitAllowed, handleSubmit}) => {

    return (
        <div>
            <input placeholder="First Name" {...fields.firstName} />
            <input placeholder="Last Name" {...fields.lastName} />
            ...
        </div>
    )
}

const required = value => typeof value !== `undefined` && value !== null && value !== ``

export default uniform({
    firstName: FieldTypes.field(required),
    lastName: FieldTypes.field(required),
    address: FieldTypes.map({
        country: FieldTypes.field(),
        city: FieldTypes.field(),
        street: FieldTypes.field()
    }),
    sex: FieldTypes.switch(`relationships`, required),
    relationships: {
        [form => form.getIn([ `sex`, `value` ]) === `male`]: FieldTypes.list(
            FieldTypes.field()
        ),
        [form => form.getIn([ `sex`, `value` ]) === `female`]: FieldTypes.list(
            FieldTypes.map({
                firstName: FieldTypes.field(),
                lastName: FieldTypes.field()
            })
        )
    }
})(Form)

```

## Props

### fields:

FieldTypes.field()
```javascript
uniform({
    firsName: FieldTypes.field()
})

const fields = {
    firstName: {
        dirty: Boolean,
        value: Any,
        initial: Any,
        valid: Boolean,
        validating: Boolean
    }
}
```

FieldTypes.map()
```javascript
uniform({
    user: FieldTypes.map({
        firstName: FieldTypes.field(),
        lastName: FieldTypes.field()
    })
})

const fields = {
    user: {
        valid: Boolean,
        validating: Boolean,
        map: {
            firstName: {
                ...
            },
            lastName: {
                ...
            }
        }
    }
}
```

FieldTypes.list()
```javascript
uniform({
    users: FieldTypes.list()
})

const fields = {
    users: {
        addField: Function,
        removeField: Function,
        valid: Boolean,
        validating: Boolean,
        list: [
            {
                dirty: Boolean,
                value: Any,
                initial: Any,
                valid: Boolean,
                validating: Boolean
            }
        ]
    }
}
```

### handleSubmit

```javascript
handleSubmit(data => new Promise((resolve, reject) => ...))
```

### valid: Boolean
### submitting: Boolean
### submitAllowed: Boolean

```javascript
submitAllowed = valid && !submitting
```

## License

**MIT**
