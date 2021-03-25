import React from 'react'
import Pawn from './chessPieces/Pawn'
import Bishop from './chessPieces/Bishop'
import King from './chessPieces/King'
import Knight from './chessPieces/Knight'
import Queen from './chessPieces/Queen'
import Rook from './chessPieces/Rook'

const Cell = ({ turn, color, row, column, content, selectedPiece, setSelectedPiece, onClick, hint, specialMove, showPromotionWindow }) => {
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
    
    const colorClassname = `board__cell board__cell--${color}`
    const occupiedClassname = content ? 'board__cell--occupied' : ''
    const selectedClassname = selectedCell ? 'board__cell--selected' : ''
    const playerClassname = content ? content.player === turn ? 'board__cell--my-pieces' : 'board__cell--oponent' : ''
    let hintClassname = ''
    if (hint.active) {
        hint.cells.forEach(cell => {
            if (cell.row === row && cell.column === column) {
                hintClassname = 'board__cell--hint'
            }
        })
    }

    // tooltip if the pawn can be promoted
    let tooltip
    let tooltipClassname = ''
    const onPromoteClick = (e) => {
        showPromotionWindow()
        e.stopPropagation()
    }
    const promotion = specialMove.promotePawn
    if (promotion && promotion.pawnLocation.row === row && promotion.pawnLocation.column === column) {
        tooltip = <div className="tooltip__text" onClick={onPromoteClick}>Promote</div>
        tooltipClassname = "tooltip"
    }

    return (
        <div 
        className={`board__cell ${colorClassname} ${occupiedClassname} ${selectedClassname} ${playerClassname} ${hintClassname} ${tooltipClassname}`} 
        id={`${row}-${column}`}
        onClick={() => onCellClick(content, row, column)}
        >
            {tooltip}
            {renderPiece()}
        </div>
    )
}

export default Cell