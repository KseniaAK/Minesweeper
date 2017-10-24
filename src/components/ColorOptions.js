import React, { Component } from 'react'
import OneColorOption from '../containers/OneColorOption'
import styles from './styles/color-options.scss'

export default class ColorOptions extends Component {
  render() {
    const NUM_OF_COLORS = 3
    const colorOptions = []
    for (let i = 1; i <= NUM_OF_COLORS; i++) {
      colorOptions.push(<OneColorOption key={i} colorNum={i} />)
    }

    return (
      <div className='color-options-main'>
        <div className='text'>Change the color of your gameboard:</div>
        <div className='color-options'>
          {colorOptions}
        </div>
      </div>
    )
  }
}
