import isEvent from './isEvent'

const getSelectedValues = options => {
    const result = []
    if (options) {
        for (let index = 0; index < options.length; index++) {
            const option = options[index]
            if (option.selected) {
                result.push(option.value)
            }
        }
    }
    return result
}

const getValue = (event) => {
    if (isEvent(event)) {
        const {target: {type, value, checked, files}, dataTransfer} = event
        if (type === `checkbox`) {
            return checked
        }
        if (type === `file`) {
            return files || dataTransfer && dataTransfer.files
        }
        if (type === `select-multiple`) {
            return getSelectedValues(event.target.options)
        }
        return value
    }

    return event && typeof event === `object` && event.value !== undefined ?
        event.value :
        event
}

export default getValue
