const turnReducer = (turn = 'white', action) => {
    if (action.type === 'MOVEMENT' || action.type === 'CASTLING') {
        turn = turn === 'white' ? 'black' : 'white'
    }

    if (action.type === "RESTART") {
        return 'white'
    }

    return turn
}

export default turnReducer