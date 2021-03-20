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

    return finalBoard
}

export default boardReducer