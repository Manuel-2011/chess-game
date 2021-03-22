import { combineReducers } from 'redux'
import boardReducer from './boardReducer'
import turnReducer from './turnReducer'

export default combineReducers({
    board: boardReducer,
    turn: turnReducer,
})