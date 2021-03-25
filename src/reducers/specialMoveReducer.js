const specialMoveReducer = (specialMove = {}, action) => {

    if (action.type === 'ENABLE EN PASSANT') {
        return { ...specialMove, enPassant: action.payload }
    }

    if (action.type === 'MOVEMENT') {
        return { ...specialMove, enPassant: undefined }
    }

    if (action.type === 'ENABLE PROMOTION') {
        return { ...specialMove, promotePawn: action.payload }
    }

    if (action.type === 'PROMOTE PAWN') {
        return { ...specialMove, promotePawn: undefined }
    }

    if (action.type === 'CHANGE PROMOTION WINDOW STATE') {
        const modifiedWindow = { ...specialMove.promotePawn, active: !specialMove.promotePawn.active}
        return { ...specialMove, promotePawn: modifiedWindow }
    }

    return specialMove
}

export default specialMoveReducer