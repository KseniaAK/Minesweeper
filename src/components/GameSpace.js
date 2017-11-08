import React from 'react'
import NewGameButton from '../containers/NewGameButton'
import Board from '../containers/Board'
import styles from './styles/game-space.scss'

const GameSpace = () => {
  return (
    <div className='game-space'>
      <NewGameButton />
      <Board />
    </div>
  )
}

export default GameSpace