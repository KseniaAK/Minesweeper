import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BoardSquare from '../containers/BoardSquare'
import { initializeBoard } from '../actions/index'
import classNames from 'classnames/bind'
import styles from './styles/board.scss'

import { WIDTH } from '../appConstants'

const cx = classNames.bind(styles)

class Board extends Component {
  componentWillMount() {
    this.props.initializeBoard()
  }
  
  render() {
    const boardSquares = []
    for (let i = 1; i <= WIDTH*WIDTH; i++) {
      boardSquares.push(<BoardSquare key={i} squareNum={i} />)
    }

    return (
      <div className={cx('board', 'color-' + this.props.colorNum.present)}>
        {boardSquares}
      </div>
    )
  }
}

function mapStateToProps({ colorNum }) {
  return { colorNum }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initializeBoard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)