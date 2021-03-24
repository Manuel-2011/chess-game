import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import './gameOver.css'
import { restartGame } from '../actions'

const GameOver = (props) => {
    if (!props.checkmate) {
        return null
    }

    const winner = props.checkmate === 'white' ? 'black' : 'white'

    return ReactDom.createPortal(
        (<div className="game-over__background">
            <div className="game-over__box">
                <img src="/img/winner.png" alt="winner image" className="game-over__img" />
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
    { restartGame }
    )(GameOver)