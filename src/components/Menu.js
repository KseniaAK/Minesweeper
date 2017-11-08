import React from 'react'
import ColorOptions from './ColorOptions.js'
import MineOptions from './MineOptions.js'

import styles from './styles/menu.scss'

const Menu = () => {
  return (
    <div className='menu'>
      <ColorOptions />
      <MineOptions />
    </div>
  )
}

export default Menu