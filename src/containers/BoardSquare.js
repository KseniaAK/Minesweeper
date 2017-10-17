import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clickBoardSquare, initializeBoard, gameOver, changeColor } from '../actions/index'
import classNames from 'classnames/bind'

import styles from './scss/board-square.scss'

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
    const currSquare = this.props.boardConfig[this.props.squareNum - 1]
    let valueToRender

    // Only render square's value once user has clicked on it
    if (currSquare.open === true || currSquare.flag === true) {
      valueToRender = currSquare.val === 0 ? '' : currSquare.val
    }
    else valueToRender = ''
    
    const classSuffix = function() {
      if (currSquare.open === true || currSquare.flag === true) {
        if (currSquare.val === 0) return 'zero'
        else if (currSquare.val > 0) return 'number'
        else if (currSquare.val === 'X') return 'mine'
      }
      else return ''
    }()

    return (
      <div 
        style={{backgroundColor: this.props.color}}
        className={cx('board-square', classSuffix)}
        onMouseDown={this.handleMouseDown}
        onContextMenu={(event) => {
          event.preventDefault()
          return false
          }
        }
      >
        {valueToRender}
      </div>
    )
  }
}

function mapStateToProps({ color, boardConfig }) {
  return { color, boardConfig }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clickBoardSquare, initializeBoard, gameOver, changeColor }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardSquare)
