import { combineReducers } from 'redux'
import boardReducer from './boardReducer'
import turnReducer from './turnReducer'
import checkReducer from './checkReducer'
import checkmateReducer from './checkmateReducer'

export default combineReducers({
    board: boardReducer,
    turn: turnReducer,
    inCheck: checkReducer,
    inCheckmate: checkmateReducer
})