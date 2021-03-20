export const movePiece = (piece, targetLocation, actualBoard) => {
    

    return {
        type: 'MOVEMENT',
        payload: {
            piece,
            targetLocation
        }
    }
}