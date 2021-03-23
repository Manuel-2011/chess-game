import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './chessBoard.css'
import Cell from './Cell'
import { movePiece, check } from '../actions'
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

        console.log(valid.error)
    }

    useEffect(() => {
        // Check if there is a check
        const oponent = props.turn === 'white' ? 'black' : 'white'
        if (isCheck(oponent, props.board)) {
            console.log('Player is in check')
            props.check(props.turn)

            // Is it a check mate?
            if (isCheckMate(props.turn, props.board)) {
                console.log('checkmate!!')
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
                            color={color} 
                            row={rowNumber} 
                            column={columnNumber} 
                            content={cell} 
                            key={`${rowNumber}-${columnNumber}`}
                            onClick={onCellClick}
                            selectedPiece={selectedPiece}
                            setSelectedPiece={setSelectedPiece}
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
    }
}

export default connect(mapStateToProps, {
        movePiece,
        check
    })(ChessBoard)