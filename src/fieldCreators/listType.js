import {List, Map} from 'immutable'
import createAddField from './handlerCreators/createAddField'
import createRemoveField from './handlerCreators/createRemoveField'
import fieldType from './fieldType'
import mapType from './mapType'

const list = Map({
    list: List(),
    valid: true,
    validating: false
})

const validate = (options, items) => {
    if(typeof options === `function`) {
        const execValidate = options
        return execValidate(items)
    }
    return true
}

const listType = (field = fieldType(), options) => (fieldPath, fieldsPath = [], state = Map(), props = {}) => {

    const listMethods = {
        addField: createAddField(fieldPath, props.addField),
        removeField: createRemoveField(fieldPath, props.removeField)
    }

    return (state.getIn([ ...fieldsPath, ...fieldPath, `list` ]) || List())
        .reduce((acc, item, index) => {
            const listItem = (typeof field === `object` ?
                mapType(field) :
                field)([ ...fieldPath, `list`, index ], fieldsPath, state, props)

            return acc
                .setIn([ `list`, index ], listItem)
                .update(`valid`, v => v && listItem.get(`valid`))
        }, list)
        .update(l => l.update(`valid`, v => v && validate(options, l.get(`list`))))
        .merge(listMethods)
}

export default listType
