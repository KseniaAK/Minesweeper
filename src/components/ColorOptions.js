import React, { Component } from 'react'
import OneColorOption from '../containers/OneColorOption'

export default class ColorOptions extends Component {
  render() {
    const colors = ['aquamarine', 'plum', 'paleturquoise']
    const colorOptions = colors.map(color => <OneColorOption color={color} key={color} />)

    return (
      <div id='color-options'>
        {colorOptions}
      </div>
    )
  }
}