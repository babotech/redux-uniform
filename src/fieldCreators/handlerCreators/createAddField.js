const createAddField = (fieldPath, addField) =>
    (data, index, focused) => addField(fieldPath, data, index, focused)

export default createAddField