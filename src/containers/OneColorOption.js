import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { changeColor } from '../actions/index'
import { connect } from 'react-redux'

class OneColorOption extends Component {
  constructor(props) {
    super(props)
    this.onButtonClick = this.onButtonClick.bind(this)
  }

  onButtonClick(event) {
    event.preventDefault()
    this.props.changeColor(this.props.color)
  }

  render() {
    return (
      <button type='button' className='one-color-option' onClick={this.onButtonClick}>
        {this.props.color}
      </button>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeColor }, dispatch)
}

export default connect(null, mapDispatchToProps)(OneColorOption)
