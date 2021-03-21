import React, { useState } from 'react'
import { connect } from 'react-redux'
import './chessBoard.css'
import Cell from './Cell'
import { movePiece } from '../actions'

const ChessBoard = (props) => {

    const [selectedPiece, setSelectedPiece] = useState(undefined)

    const onCellClick = (targetLocation) => {
        ////////////////////////////////////
        // Validation of the movement

        // Check if there is a piece in the target location
        const targetRow = targetLocation.row
        const targetColumn = targetLocation.column
        const targetPiece = props.board[targetRow][targetColumn]
        // if in the target location is a piece from the same player the movement 
        // is invalid
        if (targetPiece && targetPiece.player === selectedPiece.player) {
            console.log('invalid: same player') // DELETE
            return
        }
        // if there is an oponent's player piece it is a capture movement
        if (targetPiece && targetPiece.player !== selectedPiece.player) {
            if (!selectedPiece.validCaptureMovement(targetLocation, props.board)) {
                console.log('Invalid capture movement') // DELETE
                return
            }
        }
        // if the target cell is empty it is a simple movement
        if (targetPiece === null) {
            if (!selectedPiece.validMovement(targetLocation, props.board)) {
                console.log('Invalid movement') // DELETE
                return
            }
        }

        ////////////////////////////////////
        props.movePiece(selectedPiece, targetLocation, props.board)
    }

    const renderBoard = () => {
        console.log(props.board) // DELETE FOR PRODUCTION
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
        board: state.board
    }
}

export default connect(mapStateToProps, {
        movePiece
    })(ChessBoard)