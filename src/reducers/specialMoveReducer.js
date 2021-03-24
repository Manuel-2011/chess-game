const specialMoveReducer = (specialMove = {}, action) => {

    if (action.type === 'ENABLE EN PASSANT') {
        return { ...specialMove, enPassant: action.payload }
    }

    return specialMove
}

export default specialMoveReducer