import React from 'react'
import BoardSquare from '../containers/BoardSquare'

export default ({ rowNum, width }) => {
  const boardSquares = []
  for (let i = 1; i <= width; i++) {
    boardSquares.push(<BoardSquare key={i} squareNum={(rowNum - 1) * width + i} />)
  }

  return (
    <div className='board-row'>
      {boardSquares}
    </div>
  )
}