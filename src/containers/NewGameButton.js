import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initializeBoard, gameOver, revertColor } from '../actions/index'
import styles from './styles/buttons.scss'

const NewGameButton = (props) => {
    return (
      <button 
      type='button'
      className='new-game-button'
      onClick={(event) => {
          props.gameOver()
          props.initializeBoard(props.selectedMineNum)
          props.revertColor()
        }}
      >
        New Game!
      </button>
    )
}

function mapStateToProps({ selectedMineNum }) {
  return { selectedMineNum }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initializeBoard, gameOver, revertColor }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGameButton)