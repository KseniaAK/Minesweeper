import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from './styles/buttons.scss'
import classNames from 'classnames/bind'
import { changeMineNumber, revertColor, initializeBoard } from '../actions/index'

const cx = classNames.bind(styles)

const OneMineOption = (props) => {
  return (
    <button 
      type='button' 
      className={cx('one-option', props.mineNum === props.selectedMineNum ? 'current' : '')}
      onClick={(event) => {
        props.changeMineNumber(props.mineNum)
        props.initializeBoard(props.mineNum)
        if (props.gameOn === false) props.revertColor()        
      }}
    >
      {props.mineNum}
    </button>
  )
}

function mapStateToProps({ gameOn, selectedMineNum }) {
  return { gameOn, selectedMineNum }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeMineNumber, revertColor, initializeBoard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OneMineOption)
