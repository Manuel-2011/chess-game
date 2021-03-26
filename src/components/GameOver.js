import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import './gameOver.css'
import { restartGame, newMessage } from '../actions'

const GameOver = (props) => {
    const [activeWindow, setActiveWindow] = useState(true)

    useEffect(() => {
        setActiveWindow(true)
    }, [props.checkmate])

    if (!props.checkmate) {
        return null
    }

    if (!activeWindow) {
        return null
    }

    const winner = props.checkmate === 'white' ? 'black' : 'white'

    const closeWindow = () => {
       setActiveWindow(false)
       props.newMessage({ type: 'success', text: `Congratulations! The ${winner} player wins.`})
    }

    return ReactDom.createPortal(
        (<div className="game-over__background" onClick={closeWindow}>
            <div className="game-over__box">
                <img src="/img/winner.png" alt="winner" className="game-over__img" />
                <div className="game-over__text">
                    Player {winner} wins!
                </div>
                <button className="game-over__btn" onClick={props.restartGame}>Restart Game</button>
            </div>
        </div>),
        document.querySelector('#game-over')
    )
}

const mapStateToProps = (state) => {
    return { checkmate: state.inCheckmate }
}

export default connect(
    mapStateToProps,
    { restartGame, newMessage }
    )(GameOver)