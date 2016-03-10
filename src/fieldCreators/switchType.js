import createSwitchOnChange from './handlerCreators/createSwitchOnChange'
import fieldType from './fieldType'

const switchType = (dependencies = [], options) => (fieldPath, fieldsPath, state, props) => {
    const deps = typeof dependencies === `string` ? [ dependencies ] : dependencies

    return fieldType(options)(fieldPath, fieldsPath, state, props)
        .merge({
            onChange: createSwitchOnChange(fieldPath, props.switchChange, deps)
        })
}

export default switchType