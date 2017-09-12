import React, { Component } from 'react'
import { connect } from 'react-redux'

class BoardSquare extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div 
        className='board-square' 
        style={{backgroundColor: this.props.color}}
      >
        {this.props.boardConfig[this.props.squareNum - 1].val}
      </div>
    )
  }
}

function mapStateToProps({ color, boardConfig }) {
  return { color, boardConfig }
}

export default connect(mapStateToProps)(BoardSquare)
