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

export const restartGame = () => {
    return { type: 'RESTART' }
}

export const newMessage = (message) => {
    return {
        type: 'MESSAGE',
        payload: message
    }
}

export const newHint = (cells) => {
    return {
        type: 'NEW HINT',
        payload: cells
    }
}

export const activeHint = () => {
    return {
        type: 'ACTIVE HINT'
    }
}

export const enableEnPassant = (specialMove) => {
    return {
        type: 'ENABLE EN PASSANT',
        payload: specialMove
    }
}

export const enPassant = (piece) => {
    return {
        type: 'EN PASSANT',
        payload: piece.location
    }
}

export const castling = (specialMove) => {
    return {
        type: 'CASTLING',
        payload: specialMove
    }
}