import { initialGame } from '../utils/elements'

const initialBoard = initialGame()

const boardReducer = (board = initialBoard, action) => {
    let finalBoard = board

    if (action.type === 'MOVEMENT') {
        const row = action.payload.targetLocation.row
        const column = action.payload.targetLocation.column
        
        const oldRow = action.payload.piece.location.row
        const oldColumn = action.payload.piece.location.column

        finalBoard = board.slice()
        // Update the location in the piece object
        action.payload.piece.location.row = row
        action.payload.piece.location.column = column
        // Save the movement in the history of the piece
        action.payload.piece.history.push({ column, row })
        // Set piece in the new location
        finalBoard[row][column] = action.payload.piece
        // Erase piece from the old location
        finalBoard[oldRow][oldColumn] = null

        return finalBoard
    }

    if (action.type === 'RESTART') {
        return initialGame()
    }

    if (action.type === 'EN PASSANT') {
        finalBoard = board.slice()
        // Erase the captured pawn with the en passant move
        finalBoard[action.payload.row][action.payload.column] = null
        return finalBoard
    }

    if (action.type === 'CASTLING') {
        finalBoard = board.slice()

        const king = action.payload.king
        const rook = action.payload.rook

        // Erase old locations
        finalBoard[king.location.row][king.location.column] = null
        finalBoard[rook.location.row][rook.location.column] = null

        // Update location in the pieces
        king.location = action.payload.kingNewLocation
        rook.location = action.payload.rookNewLocation

        // Pieces in the new location
        finalBoard[king.location.row][king.location.column] = king
        finalBoard[rook.location.row][rook.location.column] = rook

        return finalBoard
    }

    if (action.type === 'PROMOTE PAWN') {
        finalBoard = board.slice()

        const row = action.payload.pawnLocation.row
        const column = action.payload.pawnLocation.column
        // replace the pawn with the new piece
        finalBoard[row][column] = action.payload.newPiece
        return finalBoard
    }

    return finalBoard
}

export default boardReducer