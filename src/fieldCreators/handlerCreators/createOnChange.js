import getValue from './getValue'

const createOnChange = (fieldPath, change, changeCaretPosition) =>
    (event, value, caretPosition) => {
        value = typeof value === `undefined` ? getValue(event) : value
        change(fieldPath, value)

        if (caretPosition) {
            changeCaretPosition(fieldPath, caretPosition)
        }
    }

export default createOnChange
