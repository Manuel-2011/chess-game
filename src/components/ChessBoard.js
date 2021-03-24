import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './chessBoard.css'
import Cell from './Cell'
import { movePiece, check, checkmate, newMessage, newHint } from '../actions'
import { isCheck, movementIsValid, isCheckMate } from '../utils/chessLogic'

const ChessBoard = (props) => {

    const [selectedPiece, setSelectedPiece] = useState(undefined)

    // Select a piece to move or select where you want to move the piece
    const onCellClick = (targetLocation) => {
        const valid = movementIsValid(props.turn, selectedPiece, targetLocation, props.board, props.inCheck)
        if (valid.valid) {
            // If movement is valid send the action with the move
            return props.movePiece(selectedPiece, targetLocation, props.board)
        }

        props.newMessage({ type: 'error', text: valid.error })
    }

    useEffect(() => {
        // Check if there is a check
        const oponent = props.turn === 'white' ? 'black' : 'white'
        if (isCheck(oponent, props.board).result) {

            // Is it a check mate?
            const checkmate = isCheckMate(props.turn, props.board)
            if (checkmate.result) {
                props.checkmate(props.turn)
                props.check(props.turn)
            } else {
                props.check(props.turn)
                props.newHint(checkmate.move)
                setTimeout(() => {
                    props.newMessage({ 
                        type: 'info', 
                        text: `The ${props.turn} player is in check!` 
                    })
                }, 200)
            }
        }
    }, [props.turn])

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
        hint: state.hint
    }
}

export default connect(mapStateToProps, {
        movePiece,
        check,
        checkmate,
        newMessage,
        newHint
    })(ChessBoard)