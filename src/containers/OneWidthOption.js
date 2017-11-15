import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from './styles/buttons.scss'
import classNames from 'classnames/bind'
import { changeWidth, revertColor, initializeBoard } from '../actions/index'

const cx = classNames.bind(styles)

const OneWidthOption = (props) => {
  return (
    <button 
      type='button' 
      className={cx('one-option', props.widthOpt === props.selectedWidth ? 'current' : '')}
      onClick={(event) => {
        props.changeWidth(props.widthOpt)
        props.initializeBoard(props.selectedMineNum)
        if (props.gameOn === false) props.revertColor()        
      }}
    >
      {props.widthOpt}
    </button>
  )
}

function mapStateToProps({ gameOn, selectedWidth, selectedMineNum }) {
  return { gameOn, selectedWidth, selectedMineNum }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeWidth, revertColor, initializeBoard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OneWidthOption)
