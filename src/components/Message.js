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

    if (!message) {
        return null
    }

    return ReactDom.createPortal(
        (<div className="message-box">
            <div className="message-text">
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