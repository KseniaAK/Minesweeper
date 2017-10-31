import React from 'react'
import { bindActionCreators } from 'redux'
import { changeColor } from '../actions/index'
import { connect } from 'react-redux'
import styles from './styles/buttons.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const OneColorOption = (props) => {
  return (
    <button 
      type='button' 
      className={cx('one-color-option', 'color-' + props.colorNum)}
      onClick={(event) => props.changeColor(props.colorNum)}
    />
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeColor }, dispatch)
}

export default connect(null, mapDispatchToProps)(OneColorOption)
