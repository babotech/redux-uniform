import {Map} from 'immutable'

const composedFields = Map({
    fields: Map(),
    valid: true,
    validating: false
})

const composeSwitch = (accumulator, switchField) => {
    for (const predictor in switchField) {
        if (eval(`(${predictor})`)(accumulator)) {
            return switchField[predictor]
        }
    }

    throw new Error(`Field not found`)
}

const mapType = fields => (fieldPath, fieldsPath, state, props) =>
    Object.keys(fields)
        .reduce((acc, key) => {
            const field = (typeof fields[key] === `function` ? fields[key] : composeSwitch(acc, fields[key]))([ ...fieldPath, `map`, key ], fieldsPath, state, props)
            return acc
                .setIn([ `fields`, key ], field)
                .update(`valid`, v => v && field.get(`valid`))
        }, composedFields)

export default mapType