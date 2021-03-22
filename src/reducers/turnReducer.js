const turnReducer = (turn = 'white', action) => {
    if (action.type === 'MOVEMENT') {
        turn = turn === 'white' ? 'black' : 'white'
    }

    return turn
}

export default turnReducer