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
export const isCheck = (oponent, board) => {
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
    let check = false
    oponentPieces.forEach(piece => {
        if (movementIsValid(oponent, piece, king.location, board).valid) {
            console.log('check by', piece)
            check = true
        }
    })

    return check
}



// Defines wheter the movement is valid or not
export const movementIsValid = (turn, piece, targetLocation, board, checkState) => {
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
    if (targetPiece && targetPiece.player !== piece.player) {
        if (!piece.validCaptureMovement(targetLocation, board)) {
            return { valid: false, error: 'Invalid capture movement' }
        }
    }
    // if the target cell is empty it is a simple movement
    if (targetPiece === null) {
        if (!piece.validMovement(targetLocation, board)) {
            return { valid: false, error: 'Invalid movement' }
        }
    }

    // if player is in check the movement must eliminates the check
    if (checkState=== turn) {
        // make hypothetical movement
        const hBoard = makeHypotheticalMove(board, piece, targetLocation)

        // check if movement eliminates the check
        // if doesn't the movement is invalid
        const oponent = turn === 'white' ? 'black' : 'white'
        if (isCheck(oponent, hBoard)) {
            return { valid: false, error: 'Player is still in check' }
        }
    }

    // if movement passes all tests the movement is valid
    return { valid: true }
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
const makeHypotheticalMove = (board, piece, targetLocation) => {
    const hBoard = cloneBoard(board)
    const clonePiece = hBoard[piece.location.row][piece.location.column]
    const oldLocation = clonePiece.location
    clonePiece.location = {row: targetLocation.row, column: targetLocation.column}
    hBoard[targetLocation.row][targetLocation.column] = clonePiece
    hBoard[oldLocation.row][oldLocation.column] = null

    return hBoard
}