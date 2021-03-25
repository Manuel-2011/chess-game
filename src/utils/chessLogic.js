// Determines the cells a piece need to travel to get to a define location
const cellsTraveled = (initialLocation, finalLocation) => {
    let currentColumn = initialLocation.column
    const columnsTraveled = []
    do {
        columnsTraveled.push(currentColumn)
        let change = currentColumn === finalLocation.column ? 0 : currentColumn > finalLocation.column ? -1 : 1
        currentColumn += change
    } while (currentColumn !== finalLocation.column) 

    let currentRow = initialLocation.row
    const rowsTraveled = []
    do {
        rowsTraveled.push(currentRow)
        let change = currentRow === finalLocation.row ? 0 : currentRow > finalLocation.row ? -1 : 1
        currentRow += change
    }
    while (currentRow !== finalLocation.row)

    // Create an array with the cells traveled
    const cellsTraveled = []
    let cRow
    let cColumn
    for (let i=0; i < (Math.max(columnsTraveled.length, rowsTraveled.length)); i++) {
        cRow = rowsTraveled[i] !== undefined ? rowsTraveled[i] : cRow
        cColumn = columnsTraveled[i] !== undefined ? columnsTraveled[i] : cColumn
        if (cColumn !== initialLocation.column || cRow !== initialLocation.row) {
            cellsTraveled.push({ row: cRow, column: cColumn })
        }
    }

    return cellsTraveled
}



// Check if a cell is jumping another piece to get to the define location
export const isJumping = (initialLocation, finalLocation, board) => {
    const pathTraveled = cellsTraveled(initialLocation, finalLocation)

    for (let i=0; i < pathTraveled.length; i++) {
        const row = pathTraveled[i].row
        const column = pathTraveled[i].column
        // If there is a piece in the cell the piece is jumping
        if (board[row][column] !== null) {
            return true
        }
    }

    return false
}



// Defines wheter the actual player is in check or not
export const isCheck = (oponent, board, specialMove) => {
    // take all the oponent's pieces and find the actual player's king
    let king
    const oponentPieces = board.reduce((pieces, row) => {
        row.forEach(piece => {
            if (piece && piece.player === oponent) {
                return pieces.push(piece)
            }
            if (piece && piece.name === 'king' && piece.player !== oponent) {
                king = piece
            }
        });

        return pieces
    }, [])

    // Check if any of the oponent's pieces is threating the king
    let check = { result: false }
    oponentPieces.forEach(piece => {
        if (movementIsValid(oponent, piece, king.location, board, undefined, specialMove).valid) {
            check = { result: true, piece}
        }
    })

    return check
}



// Defines wheter the movement is valid or not
export const movementIsValid = (turn, piece, targetLocation, board, checkState, specialMove) => {
    // Check if the piece belongs to the player's turn
    if (piece.player !== turn) {
        return { valid: false, error: "Can't move oponent's pieces!" }
    }

    // Check if there is a piece in the target location
    const targetRow = targetLocation.row
    const targetColumn = targetLocation.column
    const targetPiece = board[targetRow][targetColumn]
    // if in the target location is a piece from the same player the movement 
    // is invalid
    if (targetPiece && targetPiece.player === piece.player) {
        return { valid: false, error: 'The cell is occupied' }
    }
    // if there is an oponent's player piece it is a capture movement
    let validMoveResult
    if (targetPiece && targetPiece.player !== piece.player) {
        validMoveResult = piece.validCaptureMovement(targetLocation, board, specialMove)
        if (!validMoveResult.result) {
            return { valid: false, error: 'Invalid capture movement' }
        }
    }
    // if the target cell is empty it is a simple movement
    if (targetPiece === null) {
        validMoveResult = piece.validMovement(targetLocation, board, specialMove)
        if (!validMoveResult.result) {
            return { valid: false, error: 'Invalid movement' }
        }
    }

    // if player is in check the movement must eliminates the check
    if (checkState=== turn) {
        // make hypothetical movement
        const hBoard = makeHypotheticalMove(board, piece, targetLocation, validMoveResult.special)

        // check if movement eliminates the check
        // if doesn't the movement is invalid
        const oponent = turn === 'white' ? 'black' : 'white'
        if (isCheck(oponent, hBoard, specialMove).result) {
            return { valid: false, error: 'Player is still in check' }
        }
    } else {
        // if move leaves the king in check the move is invalid
        // make hypothetical movement
        const hBoard = makeHypotheticalMove(board, piece, targetLocation, validMoveResult.special)
        const oponent = turn === 'white' ? 'black' : 'white'
        if (isCheck(oponent, hBoard, specialMove).result) {
            return { valid: false, error: "You can't leave the king in check!" }
        }
    }

    // if movement passes all tests the movement is valid
    return { valid: true, special: validMoveResult.special }
}



// make a deep copy of the board
export const cloneBoard = (board) => {
    const clone = board.map(row => {
        return row.map(cell => {
            let clonePiece = cell
            if (clonePiece) {
                clonePiece = Object.assign({}, cell)
                clonePiece.location =  Object.assign({}, clonePiece.location)
            }
            return clonePiece
        })
    })

    return clone
}

// make a hypothetical movement
const makeHypotheticalMove = (board, piece, targetLocation, specialMove) => {
    const hBoard = cloneBoard(board)
    const clonePiece = hBoard[piece.location.row][piece.location.column]
    const oldLocation = clonePiece.location
    clonePiece.location = {row: targetLocation.row, column: targetLocation.column}
    hBoard[targetLocation.row][targetLocation.column] = clonePiece
    hBoard[oldLocation.row][oldLocation.column] = null

    // Check if it is the en passant special movement
    if (specialMove && specialMove.name === 'en passant done') {
        console.log('transfer en passant is working')
        hBoard[specialMove.captured.row][specialMove.captured.column] = null
    }

    return hBoard
}

export const isCheckMate = (turn, board, specialMove) => {
    // find all the pieces of the player
    const pieces = findPlayersPieces(turn, board)
    // Find all possible movements
    let moves = []
    pieces.forEach(piece => {
        moves = moves.concat(piece.possibleMoves())
    })

    // check if there is at least one valid movement
    // iterate over every piece
    for (let j=0; j < moves.length; j++) {
        // iterate over every possible move
        const possibleMovements = moves[j].moves
        for (let i=0 ; i< possibleMovements.length; i++) {
            const validMove = movementIsValid(turn, moves[j].piece, possibleMovements[i], board, turn, specialMove).valid
            if (validMove) {
                return { result: false, move: [possibleMovements[i], moves[j].piece.location]}
            }
        }
    }

    return { result: true }
}

export const horizontalMoves = ({ row, column }) => {
    const moves = []
    for (let i=0; i < 8; i++) {
        if ( i !== column) {
            moves.push({ row, column: i})
        }
    }
    return moves
}

export const verticalMoves = ({ row, column }) => {
    const moves = []
    for (let i=0; i < 8; i++) {
        if ( i !== row) {
            moves.push({ row: i, column })
        }
    }
    return moves
}

export const diagonalMoves = ({ row, column }) => {
    const moves = []

    // from bottom left to top right diagonal
    let rowOffset = 0 - row
    let columnOffset = 0 - column
    let maxOffset = Math.min(Math.abs(rowOffset), Math.abs(columnOffset))
    let currentRow = row - maxOffset
    let currentColumn = column - maxOffset
    while (currentRow < 8 && currentColumn < 8) {
        if (currentRow !== row && currentColumn !== column) {
            moves.push({ row: currentRow , column: currentColumn })
        }
        currentRow++
        currentColumn++
    }
    // from bottom right to top left diagonal
    rowOffset = 0 - row
    columnOffset = 7 - column
    maxOffset = Math.min(Math.abs(rowOffset), Math.abs(columnOffset))
    currentRow = row - maxOffset
    currentColumn = column + maxOffset
    while (currentRow < 8 && currentColumn >= 0) {
        if (currentRow !== row && currentColumn !== column) {
            moves.push({ row: currentRow , column: currentColumn })
        }
        currentRow++
        currentColumn--
    }

    return moves
}

const findPlayersPieces = (player, board) => {
    const pieces = []
    board.forEach( row => {
        row.forEach(piece => {
            if (piece && piece.player === player) {
                pieces.push(piece)
            }
        })
    })

    return pieces
}