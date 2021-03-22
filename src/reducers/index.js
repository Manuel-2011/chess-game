import { combineReducers } from 'redux'
import boardReducer from './boardReducer'
import turnReducer from './turnReducer'
import checkReducer from './checkReducer'

export default combineReducers({
    board: boardReducer,
    turn: turnReducer,
    inCheck: checkReducer,
})