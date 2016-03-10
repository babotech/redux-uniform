# Redux uniform [![Build Status](https://travis-ci.org/babotech/redux-uniform.svg?branch=master)](https://travis-ci.org/babotech/redux-uniform)

## Installation

```
npm install --save redux-uniform
```

## Implementation

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
