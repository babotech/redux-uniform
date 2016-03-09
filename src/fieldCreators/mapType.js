import {Map} from 'immutable'

const map = Map({
    map: Map(),
    valid: true,
    validating: false
})

const composeSwitch = (accumulator, switchField) => {
    for (const predictor in switchField) {
        if (eval(`(${predictor})`)(accumulator.get(`map`))) {
            return switchField[ predictor ]
        }
    }

    return undefined
}

const mapType = fields => (fieldPath, fieldsPath, state, props) =>
    Object.keys(fields)
        .reduce((acc, key) => {
            let fieldCreator
            if (typeof fields[ key ] === `function`) {
                fieldCreator = fields[ key ]
            } else {
                fieldCreator = composeSwitch(acc, fields[ key ])
                if (!fieldCreator) {
                    return acc
                }
            }

            const field = fieldCreator([ ...fieldPath, `map`, key ], fieldsPath, state, props)
            return acc
                .setIn([ `map`, key ], field)
                .update(`valid`, v => v && field.get(`valid`))
        }, map)

export default mapType