import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import './promote.css'
import { promotePawn, promotionWindow } from '../actions'

import Bishop from './chessPieces/Bishop'
import Knight from './chessPieces/Knight'
import Queen from './chessPieces/Queen'
import Rook from './chessPieces/Rook'

const Promote = (props) => {
    if (!props.specialMove.promotePawn || !props.specialMove.promotePawn.active) {
        return null
    }

    let pawnLocation = props.specialMove.promotePawn.pawnLocation
    let player = props.specialMove.promotePawn.player

    const colors ={
        white: {
            color: '#f9f9f9',
            color2: '#717171'
        },
        black: {
            color: '#292929',
            color2: '#f5f5f5'
        }
    }

    const promotePawn = (event, name) => {
        props.promotePawn(pawnLocation, name, player)
        event.stopPropagation()
    }

    const closeWindow = () => {
        props.promotionWindow()
    }

    return ReactDom.createPortal(
        (<div className="promotion-window__background" onClick={closeWindow}>
            <div className="promotion-window__box">
                <div className="promotion-window__text">
                    Replace the pawn with:
                </div>
                <div className="pieces">
                    <div className="pieces__piece" onClick={(e) => promotePawn(e, 'bishop')}>
                        <Bishop color={colors[player].color} color2={colors[player].color2}/>
                    </div>
                    <div className="pieces__piece" onClick={(e) => promotePawn(e, 'knight')}>
                        <Knight color={colors[player].color} color2={colors[player].color2}/>                      
                    </div>
                    <div className="pieces__piece" onClick={(e) => promotePawn(e, 'queen')}>      
                        <Queen color={colors[player].color} color2={colors[player].color2}/>
                    </div>
                    <div className="pieces__piece" onClick={(e) => promotePawn(e, 'rook')}>                      
                        <Rook color={colors[player].color} color2={colors[player].color2}/>
                    </div>
                </div>
            </div>
        </div>),
        document.querySelector('#promotion-window')
    )
}

const mapStateToProps = (state) => {
    return { 
        specialMove: state.specialMove,
    }
}

export default connect(
    mapStateToProps,
    { promotePawn, promotionWindow }
    )(Promote)