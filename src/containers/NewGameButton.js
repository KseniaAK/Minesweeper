import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initializeBoard, changeColor } from '../actions/index'

class NewGameButton extends Component {
  render() {
    return (
      <button 
      type='button' 
      onClick={(event) => {
          event.preventDefault()
          this.props.changeColor('white')
          this.props.initializeBoard()
        }}
      >
        New Game!
      </button>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initializeBoard, changeColor }, dispatch)
}

export default connect(null, mapDispatchToProps)(NewGameButton)