const checkmateReducer = (player = '', action) => {
    if (action.type === 'CHECKMATE') {
        return action.payload
    }

    if (action.type === "RESTART") {
        return ''
    }

    return player
}

export default checkmateReducer