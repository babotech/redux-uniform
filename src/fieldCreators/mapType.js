import {Map} from 'immutable'

const map = Map({
    map: Map(),
    valid: true,
    validating: false
})

const composeSwitch = (accumulator, switchField) => {
    for (const predictor in switchField) {
        if (eval(`(${predictor})`)(accumulator.get(`map`))) {
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
                .setIn([ `map`, key ], field)
                .update(`valid`, v => v && field.get(`valid`))
        }, map)

export default mapType