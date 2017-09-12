import React, { Component } from 'react'
import BoardRow from '../components/BoardRow'

export default class Board extends Component {
  render() {
    const boardRows = []
    const width = 9
    for (let i = 1; i <= width; i++) {
      boardRows.push(<BoardRow key={i} rowNum={i} width={width} />)
    }

    return (
      <div className='board'>
        {boardRows}
      </div>
    )
  }
}