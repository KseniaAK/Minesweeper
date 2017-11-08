import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BoardSquare from '../containers/BoardSquare'
import { initializeBoard } from '../actions/index'
import classNames from 'classnames/bind'
import styles from './styles/board.scss'

import { WIDTH, DEFAULT_MINES } from '../appConstants'

const cx = classNames.bind(styles)

console.log(styles)
class Board extends Component {
  componentWillMount() {
    // initialize the first game
    this.props.initializeBoard(DEFAULT_MINES)
  }
  
  render() {
    const boardSquares = []
    for (let i = 1; i <= WIDTH*WIDTH; i++) {
      boardSquares.push(<BoardSquare key={i} squareNum={i} />)
    }

    return (
      <div className={cx('board')}>
        {boardSquares}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initializeBoard }, dispatch)
}

export default connect(null, mapDispatchToProps)(Board)