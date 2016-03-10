import {
    ADD,
    BLUR,
    CHANGE,
    CHANGE_CARET_POSITION,
    END_SUBMITTING,
    END_VALIDATION,
    FOCUS,
    INITIALIZE,
    REMOVE,
    START_SUBMITTING,
    START_VALIDATION,
    SWITCH_CHANGE,
    VALIDATE
} from './actionTypes'

import transformToState from './transformToState'

export const initialize = data => ({
    type: INITIALIZE,
    result: {
        data: transformToState(data)
    }
})

export const change = (fieldPath, value) => ({
    type: CHANGE,
    result: {
        fieldPath,
        value
    }
})

export const switchChange = (fieldPath, value, deps) => ({
    type: SWITCH_CHANGE,
    result: {
        fieldPath,
        value,
        deps
    }
})

export const validate = (fieldPath, value) => {

    if (value && typeof value.then === `function`) {
        return dispatch => {
            dispatch({
                type: START_VALIDATION,
                result: {
                    fieldPath
                }
            })
            value.then(result =>
                dispatch({
                    type: END_VALIDATION,
                    result: {
                        fieldPath,
                        value: result
                    }
                }))
        }
    }
    return {
        type: VALIDATE,
        result: {
            fieldPath,
            value
        }
    }
}

export const addField = (fieldPath, data, index, focused = false) => ({
    type: ADD,
    result: {
        fieldPath,
        data: transformToState(data),
        index,
        focused
    }
})

export const removeField = (fieldPath, index) => ({
    type: REMOVE,
    result: {
        fieldPath,
        index
    }
})

export const changeCaretPosition = (fieldPath, caretPosition) => ({
    type: CHANGE_CARET_POSITION,
    result: {
        fieldPath,
        caretPosition
    }
})

export const focus = fieldPath => ({
    type: FOCUS,
    result: {
        fieldPath
    }
})

export const blur = () => ({
    type: BLUR
})

export const submit = promise => dispatch => {
    dispatch({
        type: START_SUBMITTING
    })

    promise.then(() =>
        dispatch({
            type: END_SUBMITTING
        }))
}