import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './chessBoard.css'
import Cell from './Cell'
import { movePiece, check, checkmate, newMessage, newHint, enableEnPassant, enPassant, castling, enablePromotion, promotionWindow } from '../actions'
import { isCheck, movementIsValid, isCheckMate } from '../utils/chessLogic'

const ChessBoard = ({ board, turn, inCheck, inCheckmate, hint, specialMove, 
    movePiece, check, checkmate, newMessage, newHint, enableEnPassant, enPassant, 
    castling, enablePromotion, promotionWindow}) => {

    const [selectedPiece, setSelectedPiece] = useState(undefined)

    // Select a piece to move or select where you want to move the piece
    const onCellClick = (targetLocation) => {
        const valid = movementIsValid(turn, selectedPiece, targetLocation, board, inCheck, specialMove)
        if (valid.valid) {

            // Check if it is a castling movement
            if (valid.special && valid.special.name === 'castling') {
                castling(valid.special)
                setTimeout(() => {
                    newMessage({ 
                        type: 'success', 
                        text: '"Castling" move!'
                    })
                }, 200)
                return 
            }
            
            // If movement is valid send the action with the move
            movePiece(selectedPiece, targetLocation, board)

            // Check if the move enables pawn promotion
            if (valid.special && valid.special.name === 'promote pawn') {
                enablePromotion(valid.special)
            }

            // Check if this movement makes possible en passant move
            if (valid.special && valid.special.name === 'en passant') {
                enableEnPassant(valid.special)
            }

            // check if special movement en passant is done
            if (valid.special && valid.special.name === 'en passant done') {
                enPassant(specialMove.enPassant.piece)
                setTimeout(() => {
                    newMessage({ 
                        type: 'success', 
                        text: '"En passant" move!'
                    })
                }, 200)
            }
            return
        }

        newMessage({ type: 'error', text: valid.error })
    }

    useEffect(() => {
        // Check if there is a check
        const oponent = turn === 'white' ? 'black' : 'white'
        if (isCheck(oponent, board, specialMove).result) {

            // Is it a check mate?
            const checkmateResult = isCheckMate(turn, board, specialMove)
            if (checkmateResult.result) {
                checkmate(turn)
                check(turn)
            } else {
                check(turn)
                newHint(checkmateResult.move)
                setTimeout(() => {
                    newMessage({ 
                        type: 'info', 
                        text: `The ${turn} player is in check! You can use a hint if you want.` 
                    })
                }, 200)
            }         
        }
    }, [board, check, checkmate, newHint, newMessage, specialMove, turn])

    const renderBoard = () => {
        // Iterate for each row
        return board.map((row, rowNumber) => {

            // Iterrate for each column to create the cells
            const renderCells = row.map((cell, columnNumber) => {
                // if the sum of row and column is even the color will be white,
                // if it is even the cell will be black
                let color = (rowNumber + columnNumber) % 2 === 0 ? 'white' : 'black'
                return <Cell 
                            turn={turn}
                            color={color} 
                            row={rowNumber} 
                            column={columnNumber} 
                            content={cell} 
                            key={`${rowNumber}-${columnNumber}`}
                            onClick={onCellClick}
                            selectedPiece={selectedPiece}
                            setSelectedPiece={setSelectedPiece}
                            hint={hint}
                            specialMove={specialMove}
                            showPromotionWindow={promotionWindow}
                            inCheckmate={inCheckmate}
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