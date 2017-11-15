import React from 'react'
import OneMineOption from '../containers/OneMineOption'
import styles from './styles/color-options.scss'

// pre-defined array of number of mines
// defined in external constants file for ease of editing as needed later
import { MINE_NUMS } from '../appConstants'

const MineOptions = () => {
  const mineOptions = []
  for (let i = 0; i < MINE_NUMS.length; i++) {
    mineOptions.push(<OneMineOption key={i} mineNum={MINE_NUMS[i]} />)
  }

  return (
    <div className='options-main'>
      <div className='text'>Select the number of mines:</div>
      <div className='options'>
        {mineOptions}
      </div>
    </div>
  )
}

export default MineOptions