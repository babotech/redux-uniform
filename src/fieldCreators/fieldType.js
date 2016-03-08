import {List, Map, is} from 'immutable'
import createOnBlur from './handlerCreators/createOnBlur'
import createOnChange from './handlerCreators/createOnChange'
import createOnFocus from './handlerCreators/createOnFocus'

const field = Map({
    value: undefined,
    initialValue: undefined,
    valid: true,
    validating: false,
    dirty: undefined,
    focused: undefined,
    caretPosition: List()
})

const validate = (options, value) => {
    if(typeof options === `function`) {
        const execValidate = options

        return execValidate(value)
    } else if(options && options.validate) {
        return options.validate(value)
    }

    return true
}

const fieldType = (options) => (fieldPath, fieldsPath = [], state = Map(), props = {}) => {
    const focused = is(List(fieldPath), state.get(`focusedFieldPath`))
    const fieldState = state.getIn([ ...fieldsPath, ...fieldPath ])

    return field.merge(fieldState, {
        focused,
        dirty: !!fieldState && fieldState.get(`value`) !== fieldState.get(`initialValue`),
        caretPosition: focused ? state.get(`caretPosition`) : List(),
        valid: validate(options, fieldState ? fieldState.get(`value`) : undefined),
        onChange: createOnChange(fieldPath, props.change, props.changeCaretPosition),
        onBlur: createOnBlur(props.blur),
        onFocus: createOnFocus(fieldPath, props.focus)
    })
}

export default fieldType
