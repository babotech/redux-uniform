const createRemoveField = (fieldPath, removeField) =>
    index => removeField(fieldPath, index)

export default createRemoveField