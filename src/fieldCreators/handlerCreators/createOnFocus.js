const createOnFocus = (fieldPath, focus) =>
    () => focus(fieldPath)
export default createOnFocus
