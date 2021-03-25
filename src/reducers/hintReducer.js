const hintReducer = (hint = { active: false }, action) => {
    if (action.type === 'NEW HINT') {
        return { active: false, cells: action.payload}
    }

    if (action.type === 'ACTIVE HINT') {
        return { ...hint, active: true }
    }

    if (action.type === 'MOVEMENT') {
        return { active: false }
    }

    if (action.type === 'RESTART') {
        return { active: false }
    }

    return hint
}

export default hintReducer