const messageReducer = (message = {}, action) => {
    if (action.type === 'MESSAGE') {
        return { type: action.payload.type, text: action.payload.text}
    }

    return message
}

export default messageReducer