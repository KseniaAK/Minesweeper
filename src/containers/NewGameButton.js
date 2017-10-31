import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initializeBoard, gameOver, revertColor } from '../actions/index'
import styles from './styles/buttons.scss'

class NewGameButton extends Component {
  render() {
    return (
      <button 
      type='button'
      className='new-game-button'
      onClick={(event) => {
          this.props.gameOver()
          this.props.initializeBoard()
          this.props.revertColor()
        }}
      >
        New Game!
      </button>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initializeBoard, gameOver, revertColor }, dispatch)
}

export default connect(null, mapDispatchToProps)(NewGameButton)