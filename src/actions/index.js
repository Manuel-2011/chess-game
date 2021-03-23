export const movePiece = (piece, targetLocation) => {
    return {
        type: 'MOVEMENT',
        payload: {
            piece,
            targetLocation
        }
    }
}

export const check = (player) => {
    return {
        type: 'CHECK',
        payload: player
    }
}

export const checkmate = (player) => {
    return {
        type: 'CHECKMATE',
        payload: player
    }
}