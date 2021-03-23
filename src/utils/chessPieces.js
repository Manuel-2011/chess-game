import { isJumping, 
    horizontalMoves, 
    verticalMoves,
    diagonalMoves,
 } from './chessLogic'

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
        possibleMoves() {return possiblePawnMoves(this)},
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
        possibleMoves() {return possibleKingMoves(this)},
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
        possibleMoves() {return possibleRookMoves(this)},
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
        validMovement(targetLocation) {return knightValidMovement(this, targetLocation)},
        validCaptureMovement(targetLocation) {return knightValidMovement(this, targetLocation)},
        possibleMoves() {return possibleKnightMoves(this)},
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
        possibleMoves() {return possibleBishopMoves(this)},
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
        possibleMoves() {return possibleQueenMoves(this)},
        history: [],
    }
}

//////////////////////////////////////
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
const knightValidMovement = (piece, targetLocation) => {
    const absRowOffset = Math.abs(targetLocation.row - piece.location.row)
    const absColumnOffset = Math.abs(targetLocation.column - piece.location.column)
    // knights moves in L
    let direction
    if (absRowOffset === 2 && absColumnOffset === 1) direction = 'verticalL'
    if (absRowOffset === 1 && absColumnOffset === 2) direction = 'horizontalL'
    if (direction) {
        return true
    }

    return false
}

//////////////////////////////////////
// possible movements

const possibleKingMoves = (piece) => {
    const moves = []
    for (let i=-1; i <= 1; i++) {
        for (let j=-1; j <= 1; j++) {
            const row = piece.location.row + i
            const column = piece.location.column + j
            if (row < 0 || column < 0) {
                break
            }
            if (row > 7 || column > 7) {
                break
            }
            if ((i !== 0 || j !== 0)) {
                moves.push({ row , column })
            }
        }
    }
    return moves
}

const possibleQueenMoves = (piece) => {
    const horizontal = horizontalMoves(piece.location)
    const vertical = verticalMoves(piece.location)
    const diagonals = diagonalMoves(piece.location)

    const moves = horizontal.concat(vertical).concat(diagonals)
    
    return moves
}

const possibleRookMoves = (piece) => {
    const horizontal = horizontalMoves(piece.location)
    const vertical = verticalMoves(piece.location)

    const moves = horizontal.concat(vertical)
    
    return moves
}

const possibleBishopMoves = (piece) => {
    return diagonalMoves(piece.location)
}

const possiblePawnMoves = (piece) => {
    const moves = []
    const column = piece.location.column
    const row = piece.location.row
    // one step forward
    let forward = piece.player === 'white' ? -1 : 1
    if (row + forward >= 0 && row + forward < 8) {
        moves.push({ row: row + forward, column})

        // forward diagonals
        if (column - 1 >= 0) {
            moves.push({ row: row + forward, column: column - 1})
        }
        if (column + 1 < 7) {
            moves.push({ row: row + forward, column: column + 1})
        }
    }

    // If it is the first move pawns can also move two steps forward
    if (piece.history.length === 0) {
        forward = piece.player === 'white' ? -2 : 2
        if (row + forward >= 0 && row + forward < 8) {
            moves.push({ row: row + forward, column})
        }
    }
    
    return moves
}

const possibleKnightMoves = (piece) => {
    const moves = []

    const range = [1, 2]
    const directions = [1, -1]
    
    range.forEach(rowOffset => {
        directions.forEach(cDirection => {
            directions.forEach(rDirection => {
                const columnOffset = rowOffset === 1 ? 2 : 1
                const column = piece.location.column + columnOffset*cDirection
                const row = piece.location.row + rowOffset*rDirection
                if (row >= 0 && row < 8 && column >= 0 && column < 8) {
                    moves.push({ row, column })
                }
            })
        })
    })
    return moves
}