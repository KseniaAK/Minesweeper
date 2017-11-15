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
        console.log('should be passing this:', props.widthOpt)
        props.changeWidth(props.widthOpt)
        props.initializeBoard(props.widthOpt)
        if (props.gameOn === false) props.revertColor()        
      }}
    >
      {props.widthOpt}
    </button>
  )
}

function mapStateToProps({ gameOn, selectedWidth }) {
  return { gameOn, selectedWidth }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeWidth, revertColor, initializeBoard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OneWidthOption)
