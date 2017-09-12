import React, { Component } from 'react'
import ColorOptions from '../components/ColorOptions'
import Board from '../containers/Board'
import NewGameButton from '../containers/NewGameButton'

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <ColorOptions />
        <NewGameButton />
        <Board />
      </div>
    )
  }
}