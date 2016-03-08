import isEvent from './isEvent'

const getCaretPosition = event => {
    if (isEvent(event)) {
        const {target: {selectionStart, selectionEnd}} = event
        return [ selectionStart, selectionEnd ]
    }

    return false
}

export default getCaretPosition
