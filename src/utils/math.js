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