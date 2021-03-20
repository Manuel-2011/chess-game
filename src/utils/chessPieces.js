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
        validMovement: () => {},
        validCaptureMovement: () => {},
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
        validMovement: () => {},
        validCaptureMovement: () => {},
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
        validMovement: () => {},
        validCaptureMovement: () => {},
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
        validMovement: () => {},
        validCaptureMovement: () => {},
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