import mapType from './fieldCreators/mapType'
const composeFields = (fields = {}, fieldsPath, state, props, fieldPath = []) =>
    mapType(fields)(fieldPath, fieldsPath, state, props)

export default composeFields