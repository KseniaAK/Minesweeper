import React from 'react'
import ColorOptions from './ColorOptions.js'
import MineOptions from './MineOptions.js'
import WidthOptions from './WidthOptions.js'

import styles from './styles/menu.scss'

const Menu = () => {
  return (
    <div className='menu'>
      <ColorOptions />
      <MineOptions />
      <WidthOptions />
    </div>
  )
}

export default Menu