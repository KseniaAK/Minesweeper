import React from 'react'
import BoardSquare from '../containers/BoardSquare'

export default () => {
  const boardSquares = []
  for (let i = 0; i < 9; i++) {
    boardSquares.push(<BoardSquare key={i} />)
  }

  return (
    <div className='board-row'>
      {boardSquares}
    </div>
  )
}