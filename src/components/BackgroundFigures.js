import './backgroundFigures.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Bishop from './chessPieces/Bishop'
import Knight from './chessPieces/Knight'
import Rook from './chessPieces/Rook'
import { connect } from 'react-redux'

const BackgroundFigures = (props) => {
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

    return ReactDOM.createPortal(
        <div className="background-figures">
            <div className="background-figures__figure background-figures__figure--1">
                <Bishop color={colors[props.turn].color} color2={colors[props.turn].color2}/>
            </div>
            <div className="background-figures__figure background-figures__figure--2">
                <Rook color={colors[props.turn].color} color2={colors[props.turn].color2}/>
            </div>
            <div className="background-figures__figure background-figures__figure--3">
                <Knight color={colors[props.turn].color} color2={colors[props.turn].color2}/>
            </div>
        </div>,
        document.getElementById('background')
    )
}

const mapStateToProps = (state) => {
    return { turn: state.turn }
}

export default connect(mapStateToProps)(BackgroundFigures)