import React from 'react'
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
        (<div className="special__background" onClick={closeWindow}>
            <div className="special__box" onClick={(e) => e.stopPropagation()}>
                <div className="special__close-action" onClick={closeWindow}>&times;</div>

                <h2 className="special__primary-header">Special Chess Moves</h2>

                <section className="special-section">
                    <h3 className="special-section__header">"En passant" move</h3>
                    <p className="special-section__text">
                    This special rule is called “en passant,” which is French for “in passing”. If a pawn moves out two squares on its first move, and by doing so lands to the side of an opponent's pawn (effectively jumping past the other pawn's ability to capture it), that other pawn has the option of capturing the first pawn as it passes by.
                    </p>
                    <div className="special-section__imgs-box">
                        <img className="special-section__img" src="./enPassant1.jpg" alt="En Passant first move"/>
                        <img className="special-section__img" src="./enPassant2.jpg" alt="En Passant second move"/>
                    </div>
                    <p className="special-section__text">
                        To make this movement chose the pawn that is going to make the "en passant move", and select its final location.
                    </p>
                </section>

                <section className="special-section">
                    <h3 className="special-section__header">Castling</h3>
                    <p className="special-section__text">
                    One other special chess rule is called castling. This move allows you to do two important things all in one move: get your king to safety (hopefully), and get your rook out of the corner and into the game. On a player's turn he may move his king two squares over to one side and then move the rook from that side's corner to right next to the king on the opposite side. (See the example below.) However, in order to castle, the following conditions must be met:
                    </p>
                    <div className="special-section__text">
                        <ul>
                            <li>
                            it must be that king's very first move
                            </li>
                            <li>
                            it must be that rook's very first move
                            </li>
                            <li>
                            there cannot be any pieces between the king and rook to move  
                            </li>
                            <li>
                            the king may not be in check or pass through check  
                            </li>
                        </ul>
                    </div>
                    <div className="special-section__imgs-box">
                        <img className="special-section__img" src="./castling1.jpg" alt="Castling first move"/>
                        <img className="special-section__img" src="./castling2.jpg" alt="Castling second move"/>
                    </div>
                    <p className="special-section__text">
                    To make this move you must select the king first and then select the rook which you want to make the move.
                    </p>
                </section>

                <section className="special-section">
                    <h3 className="special-section__header">Promote pawn</h3>
                    <p className="special-section__text">
                    Pawns have another special ability and that is that if a pawn reaches the other side of the board it can become any other chess piece (called promotion) excluding a king (or pawn, for that matter).
                    </p>
                    <div className="special-section__imgs-box">
                        <img className="special-section__img" src="./promotePawn.jpg" alt="Promote pawn first move"/>
                        <img className="special-section__img" src="./promotePawn2.jpg" alt="Promote pawn second move"/>
                    </div>
                    <p className="special-section__text">
                    To make this move just click in the "Promote" button that will appear when you reaches the other side and select the piece you want to replace the pawn. The pawn must be promoted as soon as it reaches the other side or the opportunity to promote it will be lost.
                    </p>
                </section>
            </div>
        </div>),
        document.querySelector('#special-moves')
    )
}

export default SpecialMoves