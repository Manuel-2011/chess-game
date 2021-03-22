const checkReducer = (player = '', action) => {
    if (action.type === 'CHECK') {
        return action.payload
    }

    return player
}

export default checkReducer