import React from 'react'
import { connect } from 'react-redux'
import './sidebar.css'
import { restartGame } from '../actions'

const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <div className="info-box">
                <div className="info-box__item">
                    <h3 className="info-box__title">Turn</h3>
                    <p className="info-box__text">{props.turn}</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { turn: state.turn }
}

export default connect(
    mapStateToProps,
    { restartGame }
    )(Sidebar)