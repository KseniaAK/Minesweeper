import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from './styles/buttons.scss'
import classNames from 'classnames/bind'
import { changeMineNumber } from '../actions/index'

const cx = classNames.bind(styles)

const OneMineOption = (props) => {
  return (
    <button 
      type='button' 
      className={cx('one-mine-option')}
      onClick={(event) => props.changeMineNumber(props.mineNum)}
    >
      {props.mineNum}
    </button>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeMineNumber }, dispatch)
}

export default connect(null, mapDispatchToProps)(OneMineOption)
// export default OneMineOption
