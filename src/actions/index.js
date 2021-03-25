import { queen, bishop, knight, rook } from '../utils/chessPieces'

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

export const enablePromotion = (specialMove) => {
    return {
        type: 'ENABLE PROMOTION',
        payload: specialMove
    }
}

export const promotionWindow = () => {
    return {
        type: 'CHANGE PROMOTION WINDOW STATE'
    }
}

export const promotePawn = (pawnLocation, replacement, player) => {
    let newPiece
    switch (replacement) {
        case 'queen':
            newPiece = queen(player, pawnLocation.row, pawnLocation.column)
            break
        case 'rook':
            newPiece = rook(player, pawnLocation.row, pawnLocation.column)
            break
        case 'knight':
            newPiece = knight(player, pawnLocation.row, pawnLocation.column)
            break
        case 'bishop':
            newPiece = bishop(player, pawnLocation.row, pawnLocation.column)
            break
        default:
            break
    }

    return {
        type: 'PROMOTE PAWN',
        payload: { pawnLocation, newPiece }
    }
}