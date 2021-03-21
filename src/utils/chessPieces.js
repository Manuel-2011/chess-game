import { isJumping } from './math'

const colors ={
    white: {
        color: '#fff',
        color2: '#717171'
    },
    black: {
        color: '#292929',
        color2: '#fff'
    }
}

export const pawn = (player, row, column) => {
    return {
        name: 'pawn',
        color: colors[player].color,
        color2: colors[player].color2,
        player,
        location: {
            column,
            row
        },
        validMovement(targetLocation) {return pawnValidMovement(this, targetLocation)},
        validCaptureMovement(targetLocation) {return pawnValidCaptureMovement(this, targetLocation)},
        jump: false,
        history: [],
    }
}

export const king = (player, row, column) => {
    return {
        name: 'king',
        color: colors[player].color,
        color2: colors[player].color2,
        player,
        location: {
            column,
            row
        },
        validMovement(targetLocation) {return kingValidMovement(this, targetLocation)},
        validCaptureMovement(targetLocation) {return kingValidMovement(this, targetLocation)},
        jump: false,
        history: [],
    }
}

export const rook = (player, row, column) => {
    return {
        name: 'rook',
        color: colors[player].color,
        color2: colors[player].color2,
        player,
        location: {
            column,
            row
        },
        validMovement(targetLocation, board) {return rookValidMovement(this, targetLocation, board)},
        validCaptureMovement(targetLocation, board) {return rookValidMovement(this, targetLocation, board)},
        jump: false,
        history: [],
    }
}

export const knight = (player, row, column) => {
    return {
        name: 'knight',
        color: colors[player].color,
        color2: colors[player].color2,
        player,
        location: {
            column,
            row
        },
        validMovement: () => {},
        validCaptureMovement: () => {},
        jump: false,
        history: [],
    }
}

export const bishop = (player, row, column) => {
    return {
        name: 'bishop',
        color: colors[player].color,
        color2: colors[player].color2,
        player,
        location: {
            column,
            row
        },
        validMovement(targetLocation, board) {return bishopValidMovement(this, targetLocation, board)},
        validCaptureMovement(targetLocation, board) {return bishopValidMovement(this, targetLocation, board)},
        jump: false,
        history: [],
    }
}

export const queen = (player, row, column) => {
    return {
        name: 'queen',
        color: colors[player].color,
        color2: colors[player].color2,
        player,
        location: {
            column,
            row
        },
        validMovement(targetLocation, board) {return queenValidMovement(this, targetLocation, board)},
        validCaptureMovement(targetLocation, board) {return queenValidMovement(this, targetLocation, board)},
        jump: false,
        history: [],
    }
}

// movement validation formulas

const pawnValidMovement = (piece, targetLocation) => {
        const rowOffset = targetLocation.row - piece.location.row
        const columnOffset = targetLocation.column - piece.location.column
        
        // Pawn moves 1 column forward
        if (piece.player === 'black') {
            if (rowOffset === 1 && columnOffset === 0) {
                return true
            }
            // If it is the first movement pawn is allowed to advance two steps
            if (piece.history.length === 0 && rowOffset === 2 && columnOffset === 0) {
                return true
            }
        } else {
            if (rowOffset === -1 && columnOffset === 0) {
                return true
            }
            // If it is the first movement pawn is allowed to advance two steps
            if (piece.history.length === 0 && rowOffset === -2 && columnOffset === 0) {
                return true
            }
        }

    return false
}
const pawnValidCaptureMovement = (piece, targetLocation) => {
    const rowOffset = targetLocation.row - piece.location.row
    const absColumnOffset = Math.abs(targetLocation.column - piece.location.column)
    
    // Pawn capture in diagonal
    if (piece.player === 'black') {
        if (rowOffset === 1 && absColumnOffset === 1) {
            return true
        }
    } else {
        if (rowOffset === -1 && absColumnOffset === 1) {
            return true
        }
    }

return false
}
const kingValidMovement = (piece, targetLocation) => {
    const absRowOffset = Math.abs(targetLocation.row - piece.location.row)
    const absColumnOffset = Math.abs(targetLocation.column - piece.location.column)
    
    // King moves 1 step in any direction
    console.log(absRowOffset, absColumnOffset)
    if ((absRowOffset === 1 || absColumnOffset === 1) && absRowOffset + absColumnOffset <= 2) {
        return true
    }

return false
}
const queenValidMovement = (piece, targetLocation, board) => {
    const rowOffset = targetLocation.row - piece.location.row
    const columnOffset = targetLocation.column - piece.location.column
    // Queen can move any number of vacant squares diagonally, horizontally, or vertically.
    const absRowOffset = Math.abs(rowOffset)
    const absColumnOffset = Math.abs(columnOffset)
    // Check it is a diagonal, vertical or horizontal movement
    let direction
    if (absColumnOffset === 0) direction = 'vertical'
    if (absRowOffset === 0) direction = 'horizontal'
    if (absColumnOffset - absRowOffset === 0) direction = 'diagonal'
    
    if (!direction) {
        return false
    }
    // Check the piece isn´t jumping any other piece
    if (isJumping(piece.location, targetLocation, board)) {
        return false
    }

    // If the movement passed all the above tests is valid
    return true
}
const rookValidMovement = (piece, targetLocation, board) => {
    const rowOffset = targetLocation.row - piece.location.row
    const columnOffset = targetLocation.column - piece.location.column
    // rook only moves in horizontally or vertically direction
    if (rowOffset !== 0 && columnOffset !== 0) {
        return false
    }

    // rook can't jump any other piece
    if (isJumping(piece.location, targetLocation, board)) {
        return false
    }

    // If the movement passed all the above tests is valid
    return true
}
const bishopValidMovement = (piece, targetLocation, board) => {
    const absRowOffset = Math.abs(targetLocation.row - piece.location.row)
    const absColumnOffset = Math.abs(targetLocation.column - piece.location.column)
    // bishops only can moves in diagonals
    if (absColumnOffset - absRowOffset !== 0) {
        return false
    }

    // bishops can't jump any other piece
    if (isJumping(piece.location, targetLocation, board)) {
        return false
    }

    // If the movement passed all the above tests is valid
    return true
}