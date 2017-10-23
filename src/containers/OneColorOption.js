import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { changeColor } from '../actions/index'
import { connect } from 'react-redux'
import styles from './styles/buttons.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class OneColorOption extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    // change color of the gameboard
    this.props.changeColor(this.props.colorNum)
  }

  render() {
    return (
      <button 
        type='button' 
        className={cx('one-color-option', 'color-' + this.props.colorNum)}
        onClick={this.handleClick}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeColor }, dispatch)
}

export default connect(null, mapDispatchToProps)(OneColorOption)
