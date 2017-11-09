import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
  clickBoardSquare, 
  initializeBoard, 
  gameOver, 
  changeColor, 
  doubleClickBoardSquare
} from '../actions/index'
import classNames from 'classnames/bind'

import styles from './styles/board-square.scss'
import { WIDTH } from '../appConstants'

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
  // if game is over, take this color off to have whole board be uniform 'game-over' color
  const valueClassName = function() {
    if (
      currSquare.open === true
      && isGameOn === true
      && currSquare.valueToRender == 0
    ) return 'zero'
    else if (
      currSquare.valueToRender === '?'
    ) return 'flag'
    else if (
      currSquare.valueToRender === 'X'
    ) return 'mine'
    else return ''
  }()

  // square's position dictates whether right and/or bottom border should be rendered
  // allow both class names for bottom right square being both last in row and last in column
  const positionClassNames = []
  if (props.squareNum % WIDTH === 0) positionClassNames.push('last-in-row')
  if (props.squareNum > (WIDTH * WIDTH - WIDTH)) positionClassNames.push('last-in-column')

  // default or player-chosen board background color
  // render on each square so that there's no chance of board color stepping out of square's boundaries and vice versa
  const boardColorClassName = 'color-' + props.colorNum.present

  return (
    <div 
      className={cx('board-square', valueClassName, ...positionClassNames, boardColorClassName)}
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
    initializeBoard, 
    gameOver, 
    changeColor, 
    doubleClickBoardSquare
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardSquare)
