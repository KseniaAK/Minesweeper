import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { revealSquare } from '../actions/index'

class BoardSquare extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const currSquare = this.props.boardConfig[this.props.squareNum - 1]
    let valueToRender

    // Only render square's value once user has clicked on it
    if (currSquare.open === true) valueToRender = currSquare.val
    else valueToRender = ''

    return (
      <div 
        className='board-square' 
        style={{backgroundColor: this.props.color}}
        onClick={(event) => {
          event.preventDefault()
          this.props.revealSquare(this.props.squareNum)
        }}
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
  return bindActionCreators({ revealSquare }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardSquare)
