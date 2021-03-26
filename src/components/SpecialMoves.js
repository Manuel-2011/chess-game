import React, { useState } from 'react'
import ReactDom from 'react-dom'
import './specialMoves.css'

const SpecialMoves = ({ windowState, changeWindowState }) => {

    if (!windowState) {
        return null
    }

    const closeWindow = () => {
       changeWindowState(false)
    }

    return ReactDom.createPortal(
        (<div className="game-over__background" onClick={closeWindow}>
            <div className="game-over__box" onClick={(e) => e.stopPropagation()}>
                <img src="/img/winner.png" alt="winner image" className="game-over__img" />
                <div className="game-over__text">
                    Special Moves
                </div>
                <button className="game-over__btn" >Restart Game</button>
            </div>
        </div>),
        document.querySelector('#special-moves')
    )
}

export default SpecialMoves