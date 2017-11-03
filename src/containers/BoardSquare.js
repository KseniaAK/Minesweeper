import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clickBoardSquare, initializeBoard, gameOver, changeColor } from '../actions/index'
import classNames from 'classnames/bind'

import styles from './styles/board-square.scss'

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
  const classSuffix = function() {
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

  return (
    <div 
      className={cx('board-square', classSuffix)}
      onMouseDown={(event) => {
        event.preventDefault()
        props.clickBoardSquare(event.button, props.squareNum)
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

function mapStateToProps({ boardConfig, gameOn }) {
  return { boardConfig, gameOn }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clickBoardSquare, initializeBoard, gameOver, changeColor }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardSquare)
