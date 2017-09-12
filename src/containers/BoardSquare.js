import React, { Component } from 'react'
import { connect } from 'react-redux'

class BoardSquare extends Component {
  render() {
    return (
      <div className='board-square' style={{backgroundColor: this.props.color}}>
      </div>
    )
  }
}

function mapStateToProps({ color }) {
  return { color }
}

export default connect(mapStateToProps)(BoardSquare)
