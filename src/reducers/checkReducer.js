const checkReducer = (player = '', action) => {
    if (action.type === 'CHECK') {
        return action.payload
    }

    if (action.type === 'MOVEMENT') {
        return ''
    }

    if (action.type === "RESTART") {
        return ''
    }

    return player
}

export default checkReducer