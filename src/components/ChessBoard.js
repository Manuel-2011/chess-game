import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './chessBoard.css'
import Cell from './Cell'
import { movePiece, check, checkmate, newMessage, newHint, enableEnPassant, enPassant, castling, enablePromotion, promotionWindow } from '../actions'
import { isCheck, movementIsValid, isCheckMate } from '../utils/chessLogic'

const ChessBoard = (props) => {

    const [selectedPiece, setSelectedPiece] = useState(undefined)

    // Select a piece to move or select where you want to move the piece
    const onCellClick = (targetLocation) => {
        const valid = movementIsValid(props.turn, selectedPiece, targetLocation, props.board, props.inCheck, props.specialMove)
        if (valid.valid) {

            // Check if it is a castling movement
            if (valid.special && valid.special.name === 'castling') {
                props.castling(valid.special)
                setTimeout(() => {
                    props.newMessage({ 
                        type: 'success', 
                        text: '"Castling" move!'
                    })
                }, 200)
                return 
            }
            
            // If movement is valid send the action with the move
            props.movePiece(selectedPiece, targetLocation, props.board)

            // Check if the move enables pawn promotion
            if (valid.special && valid.special.name === 'promote pawn') {
                props.enablePromotion(valid.special)
            }

            // Check if this movement makes possible en passant move
            if (valid.special && valid.special.name === 'en passant') {
                props.enableEnPassant(valid.special)
            }

            // check if special movement en passant is done
            if (valid.special && valid.special.name === 'en passant done') {
                props.enPassant(props.specialMove.enPassant.piece)
                setTimeout(() => {
                    props.newMessage({ 
                        type: 'success', 
                        text: '"En passant" move!'
                    })
                }, 200)
            }
            return
        }

        props.newMessage({ type: 'error', text: valid.error })
    }

    useEffect(() => {
        // Check if there is a check
        const oponent = props.turn === 'white' ? 'black' : 'white'
        if (isCheck(oponent, props.board, props.specialMove).result) {

            // Is it a check mate?
            const checkmate = isCheckMate(props.turn, props.board, props.specialMove)
            if (checkmate.result) {
                props.checkmate(props.turn)
                props.check(props.turn)
            } else {
                props.check(props.turn)
                props.newHint(checkmate.move)
                setTimeout(() => {
                    props.newMessage({ 
                        type: 'info', 
                        text: `The ${props.turn} player is in check! You can use a hint if you want.` 
                    })
                }, 200)
            }
        }
    }, [props.board])

    const renderBoard = () => {
        // Iterate for each row
        return props.board.map((row, rowNumber) => {

            // Iterrate for each column to create the cells
            const renderCells = row.map((cell, columnNumber) => {
                // if the sum of row and column is even the color will be white,
                // if it is even the cell will be black
                let color = (rowNumber + columnNumber) % 2 === 0 ? 'white' : 'black'
                return <Cell 
                            turn={props.turn}
                            color={color} 
                            row={rowNumber} 
                            column={columnNumber} 
                            content={cell} 
                            key={`${rowNumber}-${columnNumber}`}
                            onClick={onCellClick}
                            selectedPiece={selectedPiece}
                            setSelectedPiece={setSelectedPiece}
                            hint={props.hint}
                            specialMove={props.specialMove}
                            showPromotionWindow={props.promotionWindow}
                            inCheckmate={props.inCheckmate}
                        />
            })

            return (
                <div className="board__row" key={rowNumber}>
                    {renderCells}
                </div>
            )
        })
    }

    return (
        <div className="board-box">
            <div className="board">
                {renderBoard()}
            </div>
        </div> 
    )
}

const mapStateToProps = (state) => {
    return {
        board: state.board,
        turn: state.turn,
        inCheck: state.inCheck,
        inCheckmate: state.inCheckmate,
        hint: state.hint,
        specialMove: state.specialMove
    }
}

export default connect(mapStateToProps, {
        movePiece,
        check,
        checkmate,
        newMessage,
        newHint,
        enableEnPassant,
        enPassant,
        castling,
        enablePromotion,
        promotionWindow
    })(ChessBoard)