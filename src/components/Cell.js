import React from 'react'
import Pawn from './chessPieces/Pawn'
import Bishop from './chessPieces/Bishop'
import King from './chessPieces/King'
import Knight from './chessPieces/Knight'
import Queen from './chessPieces/Queen'
import Rook from './chessPieces/Rook'

const Cell = ({ color, row, column, content, selectedPiece, setSelectedPiece, onClick }) => {
    const renderPiece = () => {
        if (content) {
            switch (content.name) {
                case 'pawn':
                    return <Pawn color={content.color} color2={content.color2}/>                   
                case 'bishop':
                    return <Bishop color={content.color} color2={content.color2}/>                    
                case 'king':
                    return <King color={content.color} color2={content.color2}/>                   
                case 'knight':
                    return <Knight color={content.color} color2={content.color2}/>                   
                case 'queen':
                    return <Queen color={content.color} color2={content.color2}/>                  
                case 'rook':
                    return <Rook color={content.color} color2={content.color2}/>
                default:
                    return undefined               
            }
        }
    }

    const onCellClick = (piece, row, column) => {
        // If there is a piece inside the cell and
        // there is no piece selected yet select the piece
        if (selectedPiece) {
            // Send the location the player wants to move the piece
            const target = {
                row,
                column
            }
            // Send the information to the chessBoard
            onClick(target)

            // Clean the selected piece
            setSelectedPiece(undefined)
        } else {
            setSelectedPiece(piece)
        }
    }

    let selectedCell
    if (selectedPiece) {
        selectedCell = selectedPiece.location.column === column && selectedPiece.location.row === row
    }

    return (
        <div className={`board__cell board__cell--${color} ${content ? 'board__cell--occupied' : ''} ${selectedCell ? 'board__cell--selected' : ''}`} 
            id={`${row}-${column}`}
            onClick={() => onCellClick(content, row, column)}
            >
            {renderPiece()}
        </div>
    )
}

export default Cell