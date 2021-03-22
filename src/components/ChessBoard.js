import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './chessBoard.css'
import Cell from './Cell'
import { movePiece, check } from '../actions'
import { isCheck, movementIsValid, cloneBoard } from '../utils/math'

const ChessBoard = (props) => {

    const [selectedPiece, setSelectedPiece] = useState(undefined)

    // Select a pice to move or select where you want to move the piece
    const onCellClick = (targetLocation) => {
        if (movementIsValid(props.turn, selectedPiece, targetLocation, props.board)) {

            // if player is in check the movement must eliminates the check
            if (props.inCheck === props.turn) {
                // make hypotetical movement
                const hBoard = cloneBoard(props.board)
                const piece = hBoard[selectedPiece.location.row][selectedPiece.location.column]
                console.log('same rows', hBoard === props.board)
                console.log('same columns', hBoard[0] === props.board[0])
                console.log('same piece', hBoard[0][0] === props.board[0][0])
                const oldLocation = piece.location
                piece.location = {row: targetLocation.row, column: targetLocation.column}
                hBoard[targetLocation.row][targetLocation.column] = piece
                hBoard[oldLocation.row][oldLocation.column] = null

                // check if movement eliminates the check
                // if doesn't the movement is invalid
                const oponent = props.turn === 'white' ? 'black' : 'white'
                console.log('hypo board', hBoard)
                if (isCheck(oponent, hBoard)) {
                    console.log('Player is still in check')
                    return
                }
            }

            // If movement is valid send the action with the move
            props.movePiece(selectedPiece, targetLocation, props.board)
        }
    }

    useEffect(() => {
        // Check if there is a check
        const oponent = props.turn === 'white' ? 'black' : 'white'
        if (isCheck(oponent, props.board)) {
            console.log('Player is in check')
            props.check(props.turn)
        }
    }, [props.turn])

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
        board: state.board,
        turn: state.turn,
        inCheck: state.inCheck,
    }
}

export default connect(mapStateToProps, {
        movePiece,
        check
    })(ChessBoard)