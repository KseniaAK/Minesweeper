import React, { Component } from 'react'
import OneColorOption from '../containers/OneColorOption'

export default class ColorOptions extends Component {
  render() {
    const colors = ['purple', 'blue', 'green']
    const colorOptions = colors.map(color => <OneColorOption color={color} key={color} />)

    return (
      <div>
        {colorOptions}
      </div>
    )
  }
}