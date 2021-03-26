import React, { useState } from 'react'
import { connect } from 'react-redux'
import './sidebar.css'
import { restartGame, checkmate, activeHint } from '../actions'

import SpecialMoves from './SpecialMoves'

const Sidebar = (props) => {
    const [specialMovesWindow, setSpecialMovesWindow] = useState(false)

    let hintButton
    if (props.inCheck) {
        hintButton = (
            <button className="sidebar__btn"
            onClick= {props.activeHint}
            >Hint</button>
        )
    }

    return (
        <div className="sidebar">
            <div className="info-box">
                <div className="info-box__item">
                    <h3 className="info-box__title">Turn</h3>
                    <p className="info-box__text">{props.turn}</p>
                </div>
            </div>
            <div className="sidebar__actions">
                <button 
                className="sidebar__btn"
                onClick={props.restartGame}
                >Restart Game</button>

                <button 
                className="sidebar__btn"
                onClick={() => setSpecialMovesWindow(true)}
                >Special Moves</button>

                {props.inCheckmate ==='' && 
                <React.Fragment>
                    <button 
                    className="sidebar__btn"
                    onClick={() => props.checkmate(props.turn)}
                    >Give Up</button>
                    {hintButton}
                </React.Fragment>}  
            </div>

            { specialMovesWindow && 
            <SpecialMoves windowState={specialMovesWindow}
                changeWindowState={setSpecialMovesWindow}
            />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        turn: state.turn,
        inCheck: state.inCheck,
        inCheckmate: state.inCheckmate,
        hint: state.hint
    }
}

export default connect(
    mapStateToProps,
    {
        restartGame,
        checkmate,
        activeHint
    }
    )(Sidebar)