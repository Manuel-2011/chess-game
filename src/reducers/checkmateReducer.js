const checkmateReducer = (player = '', action) => {
    if (action.type === 'CHECKMATE') {
        return action.payload
    }

    return player
}

export default checkmateReducer