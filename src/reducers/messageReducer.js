const messageReducer = (message = {}, action) => {
    if (action.type === 'MESSAGE') {
        return { type: action.payload.type, text: action.payload.text}
    }

    if (action.type === 'RESTART') {
        return {}
    }

    return message
}

export default messageReducer