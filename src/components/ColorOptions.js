import React, { Component } from 'react'
import OneColorOption from '../containers/OneColorOption'

export default class ColorOptions extends Component {
  render() {
    const NUM_OF_COLORS = 3
    const colorOptions = []
    for (let i = 1; i <= NUM_OF_COLORS; i++) {
      colorOptions.push(<OneColorOption key={i} colorNum={i} />)
    }

    return (
      <div className='color-options'>
        Change the color of your gameboard:
        {colorOptions}
      </div>
    )
  }
}
