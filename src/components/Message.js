import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { newMessage } from '../actions'
import './message.css'

const Message = (props) => {
    let message = props.message

    useEffect(() => {
        message = props.newMessage({})
    }, [props.turn])

    if (!message.text) {
        return null
    }

    return ReactDom.createPortal(
        (<div className={`message__box message__box--${message.type}`}>
            <ion-icon className="message__icon" name="information-circle"></ion-icon>
            <div className="message__text">
                {message.text}
            </div>
            
        </div>),
        document.querySelector('#message')
    )
}

const mapStateToProps = (state) => {
    return { message: state.message,
            turn: state.turn }
}

export default connect(
    mapStateToProps, 
    { newMessage }
    )(Message)