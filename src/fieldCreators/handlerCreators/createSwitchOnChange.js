import getValue from './getValue'

const createOnChange = (fieldPath, switchChange, deps) =>
    (event, value) => {
        value = typeof value === `undefined` ? getValue(event) : value
        switchChange(fieldPath, value, deps)
    }

export default createOnChange
