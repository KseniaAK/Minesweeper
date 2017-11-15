import React from 'react'
import OneWidthOption from '../containers/OneWidthOption'
import styles from './styles/color-options.scss'

// pre-defined array of board widths
// defined in external constants file for ease of editing as needed later
import { WIDTH_OPTIONS } from '../appConstants'

const WidthOptions = () => {
  const widthOptions = []
  for (let i = 0; i < WIDTH_OPTIONS.length; i++) {
    widthOptions.push(<OneWidthOption key={i} widthOpt={WIDTH_OPTIONS[i]} />)
  }

  return (
    <div className='options-main'>
      <div className='text'>Select the width:</div>
      <div className='options'>
        {widthOptions}
      </div>
    </div>
  )
}

export default WidthOptions