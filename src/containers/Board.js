import React, { Component } from 'react'
import BoardRow from '../components/BoardRow'

export default class Board extends Component {
  render() {
    const boardRows = []
    for (let i = 0; i < 9; i++) {
      boardRows.push(<BoardRow key={i} />)
    }

    return (
      <div className='board'>
        {boardRows}
      </div>
    )
  }
}