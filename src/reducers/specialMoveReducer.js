const specialMoveReducer = (specialMove = {}, action) => {

    if (action.type === 'ENABLE EN PASSANT') {
        return { ...specialMove, enPassant: action.payload }
    }

    if (action.type === 'MOVEMENT') {
        return { ...specialMove, enPassant: undefined }
    }

    return specialMove
}

export default specialMoveReducer