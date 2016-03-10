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
import {List, Map} from 'immutable'

const initialState = Map({
    fields: Map(),
    focusedFieldPath: List(),
    caretPosition: List(),
    submitting: false
})

const formReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case INITIALIZE:
            return state.update(`fields`, fields => fields.merge(action.result.data))
        case CHANGE:
            return state.setIn([ `fields`, ...action.result.fieldPath, `value` ], action.result.value)
        case SWITCH_CHANGE:
            {
                state = state.setIn([ `fields`, ...action.result.fieldPath, `value` ], action.result.value)

                const fieldPathSkipLast = action
                    .result
                    .fieldPath
                    .slice(0, -1)

                return state.updateIn([ `fields`, ...fieldPathSkipLast ], st => action
                    .result
                    .deps
                    .reduce((s, dep) => s.delete(dep), st))
            }
        case VALIDATE:
            return state.setIn([ `fields`, ...action.result.fieldPath, `valid` ], action.result.value)
        case START_VALIDATION:
            return state.setIn([ `fields`, ...action.result.fieldPath, `validating` ], true)
        case END_VALIDATION:
            return state.updateIn([ `fields`, ...action.result.fieldPath ], field => field.withMutations(f =>
                f.set(`validating`, false)
                    .set(`valid`, action.result.value)
            ))
        case REMOVE:
            return state.removeIn([ `fields`, ...action.result.fieldPath, `list`, action.result.index ])
        case ADD:
            {
                state = state.updateIn([ `fields`, ...action.result.fieldPath, `list` ], (list = List()) =>
                    typeof action.result.index === `undefined` ? list.push(action.result.data) : list.splice(action.result.index, 0, action.result.data))

                if (action.result.focused) {
                    state = state.set(`focusedFieldPath`, List([ ...action.result.fieldPath,
                        typeof action.result.index === `undefined` ? state.getIn([ `fields`, ...action.result.fieldPath ]).size - 1 : action.result.index ]))
                }
                return state
            }
        case FOCUS:
            return state.set(`focusedFieldPath`, List(action.result.fieldPath))
        case CHANGE_CARET_POSITION:
            return state.withMutations(s =>
                s.set(`focusedFieldPath`, List(action.result.fieldPath))
                    .set(`caretPosition`, List(action.result.caretPosition))
            )
        case BLUR:
            return state.withMutations(s =>
                s.set(`focusedFieldPath`, List())
                    .set(`caretPosition`, List())
            )
        case START_SUBMITTING:
            return state.set(`submitting`, true)
        case END_SUBMITTING:
            return state.set(`submitting`, false)
    }

    return state
}

export default formReducer