import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BoardRow from '../components/BoardRow'
import { initializeBoard } from '../actions/index'

class Board extends Component {
  componentWillMount() {
    this.props.initializeBoard()
  }
  
  render() {
    const boardRows = []
    const width = 9
    for (let i = 1; i <= width; i++) {
      boardRows.push(<BoardRow key={i} rowNum={i} width={width} />)
    }

    return (
      <div className='board'>
        {boardRows}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initializeBoard }, dispatch)
}

export default connect(null, mapDispatchToProps)(Board)