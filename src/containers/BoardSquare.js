import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clickBoardSquare, initializeBoard, gameOver, changeColor } from '../actions/index'
import classNames from 'classnames/bind'

import styles from './styles/board-square.scss'

const cx = classNames.bind(styles)

class BoardSquare extends Component {
  constructor(props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown(event) {
    event.preventDefault()
    this.props.clickBoardSquare(event.button, this.props.squareNum)
  }

  render() {
    const isGameOn = this.props.gameOn
    const currSquare = this.props.boardConfig[this.props.squareNum - 1]
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
        && currSquare.val === 0
      ) {
       return 'zero'
      }
      else return ''
    }()

    return (
      <div 
        className={cx('board-square', classSuffix)}
        onMouseDown={this.handleMouseDown}
        onContextMenu={(event) => {
          event.preventDefault()
          return false
        }}
      >
        {valueToRender}
      </div>
    )
  }
}

function mapStateToProps({ boardConfig, gameOn }) {
  return { boardConfig, gameOn }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clickBoardSquare, initializeBoard, gameOver, changeColor }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardSquare)
