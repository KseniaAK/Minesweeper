import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BoardSquare from '../containers/BoardSquare'
import { initializeBoard } from '../actions/index'
import classNames from 'classnames/bind'
import styles from './styles/board.scss'

import { DEFAULT_MINES } from '../appConstants'

const cx = classNames.bind(styles)

class Board extends Component {
  componentWillMount() {
    // initialize the first game
    this.props.initializeBoard(DEFAULT_MINES)
  }
  
  render() {
    const width = this.props.selectedWidth
    const boardSquares = []

    // assemble board squares in a list, sequentially from 1 to last square to fit in board area
    for (let i = 1; i <= width * width; i++) {
      // for rendering square borders, important to know whether square is last in row or column
      let lastInRow = false
      let lastInColumn = false
      
      if (i % width === 0) lastInRow = true
      if (i > (width * width - width)) lastInColumn = true
      
      boardSquares.push(<BoardSquare 
        key={i} 
        squareNum={i} 
        lastInRow={lastInRow} 
        lastInColumn={lastInColumn} 
        />)
      }
      
    return (
      <div className={cx('board')}>
        {boardSquares}
      </div>
    )
  }
}

function mapStateToProps({ selectedWidth }) {
  return { selectedWidth }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initializeBoard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)