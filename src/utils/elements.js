import { pawn, rook, knight, bishop, queen, king } from './chessPieces'

const initialGameSetup = () => {
    const initialSetup = []

    // White player
    initialSetup.push(pawn('white', 6, 0))
    initialSetup.push(pawn('white', 6, 1))
    initialSetup.push(pawn('white', 6, 2))
    initialSetup.push(pawn('white', 6, 3))
    initialSetup.push(pawn('white', 6, 4))
    initialSetup.push(pawn('white', 6, 5))
    initialSetup.push(pawn('white', 6, 6))
    initialSetup.push(pawn('white', 6, 7))
    initialSetup.push(rook('white', 7, 0))
    initialSetup.push(rook('white', 7, 7))
    initialSetup.push(knight('white', 7, 1))
    initialSetup.push(knight('white', 7, 6))
    initialSetup.push(bishop('white', 7, 2))
    initialSetup.push(bishop('white', 7, 5))
    initialSetup.push(queen('white', 7, 3))
    initialSetup.push(king('white', 7, 4))

    // Black player
    initialSetup.push(pawn('black', 1, 0))
    initialSetup.push(pawn('black', 1, 1))
    initialSetup.push(pawn('black', 1, 2))
    initialSetup.push(pawn('black', 1, 3))
    initialSetup.push(pawn('black', 1, 4))
    initialSetup.push(pawn('black', 1, 5))
    initialSetup.push(pawn('black', 1, 6))
    initialSetup.push(pawn('black', 1, 7))
    initialSetup.push(rook('black', 0, 0))
    initialSetup.push(rook('black', 0, 7))
    initialSetup.push(knight('black', 0, 1))
    initialSetup.push(knight('black', 0, 6))
    initialSetup.push(bishop('black', 0, 2))
    initialSetup.push(bishop('black', 0, 5))
    initialSetup.push(queen('black', 0, 3))
    initialSetup.push(king('black', 0, 4))

    return initialSetup
}


const makeBoard = (rows, columns) => {
    let table = []
    // make table rows
    for (let row=0; row < rows; row++) {
        table.push([])
        // make table columns
        for (let column=0; column < columns; column++) {
            // each column will be the cell
            table[row].push(null)
        }
    }

    return table
}

export const initialGame = () => {
    const board = makeBoard(8, 8)
    // inject chess pieces in the board
    const finalBoard = board.slice()
    initialGameSetup().forEach(piece => {   
        const row = piece.location.row
        const column = piece.location.column
        finalBoard[row][column] = piece
    })

    return finalBoard
}