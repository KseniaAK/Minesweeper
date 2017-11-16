import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
  clickBoardSquare, 
  doubleClickBoardSquare
} from '../actions/index'
import classNames from 'classnames/bind'
import styles from './styles/board-square.scss'

import { MINE } from '../appConstants'

const cx = classNames.bind(styles)

const BoardSquare = (props) => {
  const isGameOn = props.gameOn
  const currSquare = props.boardConfig[props.squareNum - 1]
  let valueToRender

  // Only render square's value once user has clicked on it
  if (currSquare.open === true || currSquare.flag === true) {
    valueToRender = currSquare.valueToRender
  }
  
  // squares that touch no mines are of a different color
  // squares with flags and mines require a different font stack
  // if game is over, take this color off to have whole board be uniform 'game-over' color
  let valueClassNames = []
  if (
    currSquare.open === true
    && isGameOn === true
  ) valueClassNames = ['open']
  else if (currSquare.valueToRender === 'flag') {
    valueClassNames = ['flag', 'material-icons']
  } else if (currSquare.valueToRender === MINE) {
    valueClassNames = ['mine', 'material-icons']
  }

  // square's position dictates whether right and/or bottom border should be rendered
  // allow both class names for bottom right square being both last in row and last in column
  const positionClassNames = []
  if (props.lastInRow) positionClassNames.push('last-in-row')
  if (props.lastInColumn) positionClassNames.push('last-in-column')

  // default or player-chosen board background color
  // render on each square so that there's no chance of board color stepping out of square's boundaries and vice versa
  const boardColorClassName = 'color-' + props.colorNum.present

  return (
    <div 
      className={cx('board-square', ...valueClassNames, ...positionClassNames, boardColorClassName)}
      onMouseDown={(event) => {
        event.preventDefault()
        props.clickBoardSquare(event.button, props.squareNum)
      }}
      onDoubleClick={(event) => {
        props.doubleClickBoardSquare(props.squareNum)
      }}
      onContextMenu={(event) => {
        event.preventDefault()
        return false
      }}
    >
      {valueToRender}
    </div>
  )
}

function mapStateToProps({ boardConfig, gameOn, colorNum }) {
  return { boardConfig, gameOn, colorNum }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    clickBoardSquare, 
    doubleClickBoardSquare
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardSquare)
